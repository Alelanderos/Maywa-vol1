
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

import { 
  BookOpen, 
  Clipboard, 
  FileCheck, 
  Calendar,
  CheckSquare,
  ListTodo,
  BookCheck
} from "lucide-react";

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: BookOpen },
    { title: "Products", url: "/products", icon: BookCheck },
    { title: "Ingredients", url: "/ingredients", icon: Clipboard },
    { title: "Documents", url: "/documents", icon: FileCheck },
    { title: "Tasks", url: "/tasks", icon: ListTodo },
    { title: "HACCP Protocol", url: "/haccp", icon: CheckSquare },
    { title: "Quality Plan", url: "/quality", icon: Calendar },
  ];

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "flex items-center w-full px-3 py-2 rounded-md bg-purple-100 text-purple-700 font-medium" 
      : "flex items-center w-full px-3 py-2 rounded-md text-gray-600 hover:bg-muted/50";

  return (
    <Sidebar
      className={`border-r transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}
      collapsible
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="text-xl font-bold text-purple-700">RegulPro</div>
        )}
        <SidebarTrigger className="ml-auto" />
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase font-semibold text-gray-500 px-3 py-2">
            {!collapsed && "Main Navigation"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className={`h-5 w-5 ${!collapsed ? "mr-3" : ""}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup defaultOpen={true}>
          <SidebarGroupLabel className="text-xs uppercase font-semibold text-gray-500 px-3 py-2">
            {!collapsed && "Regulatory"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <NavLink to="/nom-051" className={getNavCls}>
                    <BookCheck className={`h-5 w-5 ${!collapsed ? "mr-3" : ""}`} />
                    {!collapsed && <span>NOM-051</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <NavLink to="/cofepris" className={getNavCls}>
                    <CheckSquare className={`h-5 w-5 ${!collapsed ? "mr-3" : ""}`} />
                    {!collapsed && <span>COFEPRIS</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
