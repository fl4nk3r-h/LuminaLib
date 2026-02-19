"use client";

import { PrivateRoute } from "@/components/private-route";
import { AppSidebar } from "@/components/app-sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <div className="flex h-screen overflow-hidden bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </PrivateRoute>
  );
}
