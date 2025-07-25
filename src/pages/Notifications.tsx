import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Check, Clock, AlertCircle, Info, CheckCircle, X } from "lucide-react";
import { mockNotifications } from "@/lib/mockData";

const typeIcons = {
  case_assigned: AlertCircle,
  case_overdue: Clock,
  case_transferred: CheckCircle,
  system: Info
};

const typeColors = {
  case_assigned: "text-blue-600",
  case_overdue: "text-red-600", 
  case_transferred: "text-green-600",
  system: "text-purple-600"
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const filteredNotifications = {
    all: notifications,
    unread: notifications.filter(n => !n.isRead),
    case_assigned: notifications.filter(n => n.type === 'case_assigned'),
    case_overdue: notifications.filter(n => n.type === 'case_overdue'),
    system: notifications.filter(n => n.type === 'system')
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notifications
          </h1>
          <p className="text-muted-foreground">Stay updated with important alerts and updates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'case_overdue').length}
                </p>
                <p className="text-sm text-muted-foreground">Overdue Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'case_assigned').length}
                </p>
                <p className="text-sm text-muted-foreground">Assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="case_assigned">Assignments</TabsTrigger>
          <TabsTrigger value="case_overdue">Overdue</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {Object.entries(filteredNotifications).map(([key, notificationList]) => (
          <TabsContent key={key} value={key}>
            {notificationList.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {key === 'unread' ? "You're all caught up!" : "No notifications in this category"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {notificationList.map((notification) => {
                  const Icon = typeIcons[notification.type];
                  return (
                    <Card key={notification.id} className={`transition-all hover:shadow-md ${
                      !notification.isRead ? 'border-primary/50 bg-primary/5' : ''
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className={`mt-1 ${typeColors[notification.type]}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between">
                              <h4 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(notification.createdAt)}
                                </span>
                                {!notification.isRead && (
                                  <div className="h-2 w-2 bg-primary rounded-full" />
                                )}
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2">
                              <Badge variant="outline" className="text-xs">
                                {notification.type.replace('_', ' ')}
                              </Badge>
                              
                              <div className="flex items-center space-x-2">
                                {!notification.isRead && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-7 px-2 text-xs"
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    Mark Read
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {unreadCount > 0 && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</h4>
                  <p className="text-sm text-muted-foreground">
                    Stay on top of important updates and assignments
                  </p>
                </div>
              </div>
              <Button onClick={markAllAsRead} className="bg-gradient-primary hover:opacity-90">
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}