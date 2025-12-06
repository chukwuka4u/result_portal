"use client"
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  School, 
  FileText, 
  Upload,
  LogOut
} from "lucide-react";
import { useSession } from "next-auth/react";
import { NavLink } from "@/components/navlink";
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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { data : session} = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = session?.user as any;

  const adminItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Teachers", url: "/admin/teachers", icon: Users },
    { title: "Students", url: "/admin/students", icon: GraduationCap },
    { title: "Classes", url: "/admin/classes", icon: School },
    { title: "Subjects", url: "/admin/subjects", icon: BookOpen },
    { title: "Results", url: "/admin/results", icon: FileText },
  ];

  const teacherItems = [
    { title: "Dashboard", url: "/teacher", icon: LayoutDashboard },
    { title: "Upload Results", url: "/teacher/upload", icon: Upload },
    { title: "My Classes", url: "/teacher/classes", icon: School },
  ];

  const studentItems = [
    { title: "Dashboard", url: "/student", icon: LayoutDashboard },
    { title: "My Results", url: "/student/results", icon: FileText },
  ];

  const items = user?.role === 'admin' ? adminItems : user?.role === 'teacher' ? teacherItems : studentItems;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <School className="h-8 w-8 text-sidebar-primary" />
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">School Portal</h2>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role}</p>
            </div>
          </div>
        )}
        {collapsed && <School className="h-6 w-6 text-sidebar-primary mx-auto" />}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      href={item.url}
                      className="hover:bg-sidebar-accent" 
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!collapsed && (
          <div className="mb-2">
            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/60">{user?.email}</p>
          </div>
        )}
        <Separator className="my-2" />
        <a href={"/api/auth/signout"}>
        <Button 
            type="button"
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
            </a>
      </SidebarFooter>
    </Sidebar>
  );
}
