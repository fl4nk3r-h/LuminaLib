"use client";

import { PrivateRoute } from "@/components/private-route";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ShieldCheck, User } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@library.edu",
    role: "ROLE_ADMIN",
    status: "Active",
  },
  {
    id: 2,
    username: "john_doe",
    email: "john@university.edu",
    role: "ROLE_USER",
    status: "Active",
  },
  {
    id: 3,
    username: "jane_smith",
    email: "jane@university.edu",
    role: "ROLE_USER",
    status: "Active",
  },
  {
    id: 4,
    username: "bob_wilson",
    email: "bob@university.edu",
    role: "ROLE_USER",
    status: "Inactive",
  },
];

export default function ManageUsersPage() {
  return (
    <PrivateRoute requiredRole="ROLE_ADMIN">
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Manage Users
          </h1>
          <p className="mt-1 text-muted-foreground">
            View and manage library system users.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockUsers.length}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockUsers.filter((u) => u.role === "ROLE_ADMIN").length}
              </p>
              <p className="text-xs text-muted-foreground">Administrators</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">All Users</CardTitle>
            <CardDescription>
              A list of all registered users in the library system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-foreground">User</TableHead>
                  <TableHead className="text-foreground">Email</TableHead>
                  <TableHead className="text-foreground">Role</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {u.role === "ROLE_ADMIN" ? (
                            <ShieldCheck className="h-4 w-4 text-primary" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <span className="font-medium text-foreground">{u.username}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={u.role === "ROLE_ADMIN" ? "default" : "secondary"}
                      >
                        {u.role === "ROLE_ADMIN" ? "Admin" : "User"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          u.status === "Active"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : ""
                        }
                      >
                        {u.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PrivateRoute>
  );
}
