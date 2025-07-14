
import { useState } from "react";
import { MessageSquare, Send, MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialChats = [
  {
    id: 1,
    seller: "john_designer",
    lastMessage: "Sure, I can help you with the logo design!",
    time: "5 min ago",
    unread: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    online: true,
    messages: [
      { id: 1, text: "Hi! I'm interested in your logo design service.", sender: "user", time: "10:30 AM" },
      { id: 2, text: "Sure, I can help you with the logo design!", sender: "seller", time: "10:32 AM" }
    ]
  },
  {
    id: 2,
    seller: "sarah_dev",
    lastMessage: "The website is ready for review",
    time: "1 hour ago",
    unread: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e37caf?w=40&h=40&fit=crop&crop=face",
    online: true,
    messages: [
      { id: 1, text: "How's the website progress?", sender: "user", time: "9:00 AM" },
      { id: 2, text: "The website is ready for review", sender: "seller", time: "10:00 AM" }
    ]
  },
  {
    id: 3,
    seller: "mike_content",
    lastMessage: "Thanks for the order! I'll start working on it.",
    time: "2 hours ago",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    online: false,
    messages: [
      { id: 1, text: "I need content for my blog", sender: "user", time: "8:00 AM" },
      { id: 2, text: "Thanks for the order! I'll start working on it.", sender: "seller", time: "8:30 AM" }
    ]
  },
  {
    id: 4,
    seller: "emma_video",
    lastMessage: "Your video editing project is complete!",
    time: "Yesterday",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    online: false,
    messages: [
      { id: 1, text: "Can you edit my promotional video?", sender: "user", time: "Yesterday 3:00 PM" },
      { id: 2, text: "Your video editing project is complete!", sender: "seller", time: "Yesterday 5:00 PM" }
    ]
  }
];

const MessagingPopover = () => {
  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const unreadChats = chats.filter(c => c.unread).length;

  const markAsRead = (chatId: number) => {
    setChats(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, unread: false }
          : chat
      )
    );
  };

  const sendMessage = (chatId: number) => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setChats(prev => 
        prev.map(chat => 
          chat.id === chatId 
            ? { 
                ...chat, 
                lastMessage: newMessage, 
                time: "now", 
                unread: false,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now(),
                    text: newMessage,
                    sender: "user",
                    time: currentTime
                  }
                ]
              }
            : chat
        )
      );
      
      setNewMessage("");
      
      // Simulate seller response after 2 seconds
      setTimeout(() => {
        const responses = [
          "Thanks for your message! I'll get back to you soon.",
          "Got it! Let me work on that for you.",
          "Perfect! I understand what you need.",
          "Thanks! I'll send you the updates shortly.",
          "Received! Working on it now."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setChats(prev => 
          prev.map(chat => 
            chat.id === chatId 
              ? { 
                  ...chat, 
                  lastMessage: randomResponse, 
                  time: "now",
                  messages: [
                    ...chat.messages,
                    {
                      id: Date.now() + 1,
                      text: randomResponse,
                      sender: "seller",
                      time: responseTime
                    }
                  ]
                }
              : chat
          )
        );
      }, 2000);
    }
  };

  const selectedChatData = chats.find(c => c.id === selectedChat);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-all duration-200">
          <MessageSquare className="h-5 w-5" />
          {unreadChats > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {unreadChats}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        {selectedChat ? (
          // Chat view
          <div className="h-96 flex flex-col">
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="mr-3 text-gray-500 hover:text-gray-700"
                >
                  ←
                </button>
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={selectedChatData?.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    {selectedChatData?.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-2">
                    <h3 className="font-medium text-sm">
                      {selectedChatData?.seller}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedChatData?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
              <div className="space-y-3">
                {selectedChatData?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-900 border'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-3 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage(selectedChat);
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => sendMessage(selectedChat)}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Chat list view
          <>
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-lg">Messages</h3>
              <p className="text-sm text-gray-600">
                {unreadChats > 0 ? `${unreadChats} unread messages` : 'All messages read'}
              </p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    chat.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => {
                    setSelectedChat(chat.id);
                    markAsRead(chat.id);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={chat.seller}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {chat.seller}
                        </h4>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t bg-gray-50">
              <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium py-2 hover:bg-green-100 rounded transition-colors">
                View all conversations
              </button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default MessagingPopover;
