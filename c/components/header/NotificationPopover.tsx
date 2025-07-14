
import { useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const initialNotifications = [
  {
    id: 1,
    title: "New order received",
    message: "You have a new order for Website Design",
    time: "2 minutes ago",
    unread: true,
    type: "order"
  },
  {
    id: 2,
    title: "Payment completed",
    message: "Payment of $150 has been processed",
    time: "1 hour ago",
    unread: true,
    type: "payment"
  },
  {
    id: 3,
    title: "Review received",
    message: "You received a 5-star review from John",
    time: "3 hours ago",
    unread: false,
    type: "review"
  },
  {
    id: 4,
    title: "Message from buyer",
    message: "Client wants to discuss project details",
    time: "Yesterday",
    unread: false,
    type: "message"
  }
];

const NotificationPopover = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-all duration-200">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Notifications</h3>
              <p className="text-sm text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer group relative ${
                  notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                    >
                      <X className="h-3 w-3 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-1">No notifications</h4>
              <p className="text-sm">You're all caught up!</p>
            </div>
          )}
        </div>
        <div className="p-3 border-t bg-gray-50">
          <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium py-2 hover:bg-green-100 rounded transition-colors">
            View notification settings
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
