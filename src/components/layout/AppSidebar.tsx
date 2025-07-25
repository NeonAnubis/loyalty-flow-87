import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  Target,
  Settings,
  Home,
  Bell,
  Search,
  Plus
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Cases", url: "/cases", icon: FileText },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Campaigns", url: "/campaigns", icon: Target },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Templates", url: "/templates", icon: MessageSquare },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/"
    return currentPath.startsWith(path)
  }

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
      : "hover:bg-accent hover:text-accent-foreground"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-foreground">ServiceHub</h2>
              <p className="text-xs text-muted-foreground">Customer Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {!isCollapsed && (
          <div className="mb-4">
            <Button className="w-full justify-start gap-2 bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4" />
              New Case
            </Button>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${getNavCls({ isActive })}`
                      }
                      >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full">
                      <Search className="h-4 w-4" />
                      <span>Search Cases</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/notifications" 
                      className={({ isActive }) => 
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors w-full ${getNavCls({ isActive })}`
                      }
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                      <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">3</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}