
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
  BookOpen,
  Briefcase,
  Headset,
  LayoutDashboard,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from 'react';


function HostNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path) && (path !== '/host' || pathname === '/host');


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/host')} tooltip="Dashboard">
          <Link href="/host"><LayoutDashboard /> <span>Dashboard</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/host/courses')} tooltip="Courses">
          <Link href="/host/courses"><BookOpen /> <span>Manage Courses</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/host/internships')} tooltip="Internships">
          <Link href="/host/internships"><Briefcase /> <span>Internships</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/host/students')} tooltip="Applicants">
          <Link href="/host/students"><Users /> <span>Applicants</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/host/feedback')} tooltip="Feedback">
          <Link href="/host/feedback"><MessageSquare /> <span>Feedback</span></Link>
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
            <HostNav />
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile" isActive={isActive('/host/profile')}>
                        <Link href="/host/profile"><User /> <span>Profile</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Contact Admin" isActive={isActive('/host/contact')}>
                       <Link href="/host/contact"><Headset /> <span>Contact Admin</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings" isActive={isActive('/host/settings')}>
                       <Link href="/host/settings"><Settings /> <span>Settings</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
             <SidebarTrigger/>
            <div className="flex-1">
                <h1 className="font-semibold text-lg hidden data-[state=collapsed]:block">Host Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <UserNav />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    )
}

export default function HostLayout({
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
