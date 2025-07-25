import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { mockUsers, mockNotifications } from "@/lib/mockData"

export function AppHeader() {
  const currentUser = mockUsers[0] // Sarah Johnson - executive
  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4 px-4">
        <SidebarTrigger className="h-9 w-9" />
        
        <div className="flex-1 flex items-center gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search cases, customers..." 
              className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-9 w-9">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary">{unreadNotifications} new</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockNotifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-sm">{notification.title}</span>
                    {!notification.isRead && <div className="h-2 w-2 bg-primary rounded-full" />}
                  </div>
                  <span className="text-sm text-muted-foreground">{notification.message}</span>
                  <span className="text-xs text-muted-foreground">
                    {notification.createdAt.toLocaleTimeString()}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center w-full">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-3 gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {currentUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline-block">
                  {currentUser.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}