"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function BorrowingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          My Borrowings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Track your currently borrowed books and history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Borrowed Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed bg-muted/30">
            <div className="text-center">
              <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                You have no active borrowings.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Borrow a book from the dashboard to see it here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
