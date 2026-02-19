"use client";

import type { Book } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BookOpen, User, Calendar, Hash } from "lucide-react";

interface BookCardProps {
  book: Book;
  onBorrow?: (bookId: number) => void;
  borrowing?: boolean;
}

export function BookCard({ book, onBorrow, borrowing }: BookCardProps) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <Badge
            variant={book.available ? "default" : "secondary"}
            className={
              book.available
                ? "bg-emerald-600 text-white hover:bg-emerald-600/90"
                : "bg-muted text-muted-foreground"
            }
          >
            {book.available ? "Available" : "Borrowed"}
          </Badge>
        </div>
        <div className="mt-3">
          <h3 className="text-balance text-base font-semibold leading-snug text-foreground">
            {book.title}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>{book.author}</span>
        </div>
        {book.genre && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            <span>{book.genre}</span>
          </div>
        )}
        {book.publishedYear && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{book.publishedYear}</span>
          </div>
        )}
        {book.description && (
          <p className="pt-1 text-xs leading-relaxed text-muted-foreground/80 line-clamp-2">
            {book.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          className="w-full"
          disabled={!book.available || borrowing}
          onClick={() => onBorrow?.(book.id)}
        >
          {borrowing ? "Borrowing..." : book.available ? "Borrow Book" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}
