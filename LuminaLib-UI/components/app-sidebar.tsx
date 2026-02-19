"use client";

import { useAuth } from "@/context/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  LayoutDashboard,
  Settings,
  Users,
  LogOut,
  Library,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const userLinks = [
  { label: "Browse Books", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Borrowings", href: "/dashboard/borrowings", icon: BookOpen },
];

const adminLinks = [
  { label: "Manage Books", href: "/admin", icon: Settings },
  { label: "Manage Users", href: "/admin/users", icon: Users },
];

export function AppSidebar() {
  const { user, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Library className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-sidebar-foreground">
            LuminaLib
          </h1>
          <p className="text-xs text-sidebar-foreground/60">
            Management System
          </p>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
          Menu
        </p>
        {userLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </button>
          );
        })}

        {isAdmin && (
          <>
            <Separator className="my-3 bg-sidebar-border" />
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3" />
                Admin
              </span>
            </p>
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </button>
              );
            })}
          </>
        )}
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* User section */}
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {user?.username || "User"}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/60">
              {isAdmin ? "Administrator" : "Member"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-8 w-8 shrink-0 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
