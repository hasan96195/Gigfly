
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  Bell, 
  Check, 
  Trash2, 
  MessageSquare, 
  ShoppingBag, 
  Star,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    messages: true,
    reviews: true,
    promotions: false,
    system: true
  });

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Completed',
      message: 'Your logo design order has been completed by john_designer',
      time: '2 hours ago',
      read: false,
      icon: ShoppingBag
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'sarah_dev replied to your conversation',
      time: '4 hours ago',
      read: false,
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'review',
      title: 'Review Request',
      message: 'Please leave a review for your completed order',
      time: '1 day ago',
      read: true,
      icon: Star
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Update',
      message: 'Your website development order is 75% complete',
      time: '2 days ago',
      read: true,
      icon: ShoppingBag
    },
    {
      id: 5,
      type: 'system',
      title: 'Account Security',
      message: 'Your password was successfully updated',
      time: '3 days ago',
      read: true,
      icon: Settings
    }
  ];

  const [notificationList, setNotificationList] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-800';
      case 'message': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'system': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Bell className="h-8 w-8 mr-3" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>
                )}
              </h1>
              <p className="text-gray-600">Manage your notifications and preferences</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notification Settings */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Order Updates</Label>
                  <p className="text-sm text-gray-600">Status changes, deliveries</p>
                </div>
                <Switch
                  checked={notificationSettings.orderUpdates}
                  onCheckedChange={(checked) => handleSettingChange('orderUpdates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Messages</Label>
                  <p className="text-sm text-gray-600">New messages from sellers</p>
                </div>
                <Switch
                  checked={notificationSettings.messages}
                  onCheckedChange={(checked) => handleSettingChange('messages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Reviews</Label>
                  <p className="text-sm text-gray-600">Review requests and responses</p>
                </div>
                <Switch
                  checked={notificationSettings.reviews}
                  onCheckedChange={(checked) => handleSettingChange('reviews', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Promotions</Label>
                  <p className="text-sm text-gray-600">Deals and offers</p>
                </div>
                <Switch
                  checked={notificationSettings.promotions}
                  onCheckedChange={(checked) => handleSettingChange('promotions', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">System</Label>
                  <p className="text-sm text-gray-600">Account and security updates</p>
                </div>
                <Switch
                  checked={notificationSettings.system}
                  onCheckedChange={(checked) => handleSettingChange('system', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {notificationList.length > 0 ? (
                  <div className="space-y-4">
                    {notificationList.map((notification) => {
                      const IconComponent = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 border rounded-lg transition-colors ${
                            !notification.read 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-full ${
                                !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium text-gray-900">
                                    {notification.title}
                                  </h4>
                                  <Badge className={getTypeColor(notification.type)}>
                                    {notification.type}
                                  </Badge>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No notifications yet</p>
                    <p className="text-sm text-gray-500">
                      You'll see your notifications here when you have them
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Notifications;
