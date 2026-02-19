"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const { login, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.replace(isAdmin ? "/admin" : "/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid username or password. Try demo mode below.");
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: "admin" | "user") => {
    // Simulate login for demo purposes
    const demoToken = "demo-jwt-token-" + role;
    const demoRole = role === "admin" ? "ROLE_ADMIN" : "ROLE_USER";
    const demoUsername = role === "admin" ? "admin" : "john_doe";

    localStorage.setItem("token", demoToken);
    localStorage.setItem("role", demoRole);
    localStorage.setItem("username", demoUsername);

    // Force page reload so AuthContext picks up the new values
    window.location.href = role === "admin" ? "/admin" : "/dashboard";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <Library className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            LuminaLib
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your library account
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-foreground">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Demo Mode */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setDemoMode(!demoMode)}
            className="w-full text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {demoMode ? "Hide demo options" : "No backend? Try demo mode"}
          </button>
          {demoMode && (
            <div className="mt-3 space-y-2 rounded-lg border border-dashed border-border bg-muted/50 p-4">
              <p className="text-center text-xs font-medium text-muted-foreground">
                Quick Demo Login
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDemoLogin("user")}
                >
                  Login as User
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDemoLogin("admin")}
                >
                  Login as Admin
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
