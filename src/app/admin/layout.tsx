
"use client";

import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { UserRoleProvider, useUserRole } from "@/hooks/use-user-role";
import {
  BarChart,
  BookOpen,
  FilePieChart,
  FlaskConical,
  Headset,
  History,
  LayoutDashboard,
  PlayCircle,
  Settings,
  Upload,
  User,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from 'react';


function AdminNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path) && (path !== '/admin' || pathname === '/admin');

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin')} tooltip="Dashboard">
          <Link href="/admin"><LayoutDashboard /> <span>Dashboard</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin/courses')} tooltip="Courses">
          <Link href="/admin/courses"><BookOpen /> <span>Manage Courses</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin/internships')} tooltip="Internships">
          <Link href="/admin/internships"><Briefcase /> <span>Manage Internships</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin/data-upload')} tooltip="Data Upload">
          <Link href="/admin/data-upload"><Upload /> <span>Data Upload</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin/allocation')} tooltip="Allocation Engine">
          <Link href="/admin/allocation"><PlayCircle /> <span>Allocation Engine</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin/results')} tooltip="Results Dashboard">
          <Link href="/admin/results"><BarChart /> <span>Results Dashboard</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin/fairness-report')} tooltip="Fairness Report">
          <Link href="/admin/fairness-report"><FilePieChart /> <span>Fairness Report</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin/simulator')} tooltip="What-If Simulator">
          <Link href="/admin/simulator"><FlaskConical /> <span>What-If Simulator</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/admin/logs')} tooltip="Audit & Logs">
          <Link href="/admin/logs"><History /> <span>Audit & Logs</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = (path: string) => pathname.startsWith(path);
    return (
        <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2" >
                <Button variant="ghost" asChild className="h-8 w-8 p-0">
                    <Link href="/">
                        <Logo className="h-6 w-6" />
                    </Link>
                </Button>
                <span className="font-bold text-lg">CareerMatch</span>
             </div>
          </SidebarHeader>
          <SidebarContent>
            <AdminNav />
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile" isActive={isActive('/profile')}>
                        <Link href="/profile"><User /> <span>Profile</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                     <SidebarMenuButton asChild tooltip="Contact Hosts" isActive={isActive('/admin/contact')}>
                       <Link href="/admin/contact"><Headset /> <span>Contact Hosts</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings" isActive={isActive('/admin/settings')}>
                       <Link href="/admin/settings"><Settings /> <span>Settings</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
             <SidebarTrigger/>
            <div className="flex-1">
              <h1 className="font-semibold text-lg hidden data-[state=collapsed]:block">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <UserNav />
            </div>
          </header>
          <main className="flex-1 flex flex-col overflow-auto p-4 sm:px-6 sm:py-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserRoleProvider>
      <InnerLayout>{children}</InnerLayout>
    </UserRoleProvider>
  );
}
