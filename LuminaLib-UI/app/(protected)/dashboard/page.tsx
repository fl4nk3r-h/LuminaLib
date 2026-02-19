"use client";

import { useState, useMemo, useCallback } from "react";
import { mockBooks } from "@/lib/mock-data";
import type { Book } from "@/lib/types";
import { BookCard } from "@/components/book-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Search, BookOpen, BookCheck, BookX } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "available" | "borrowed">("all");
  const [borrowingId, setBorrowingId] = useState<number | null>(null);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.genre?.toLowerCase().includes(search.toLowerCase());

      if (filter === "available") return matchesSearch && book.available;
      if (filter === "borrowed") return matchesSearch && !book.available;
      return matchesSearch;
    });
  }, [books, search, filter]);

  const stats = useMemo(
    () => ({
      total: books.length,
      available: books.filter((b) => b.available).length,
      borrowed: books.filter((b) => !b.available).length,
    }),
    [books]
  );

  const handleBorrow = useCallback(
    async (bookId: number) => {
      setBorrowingId(bookId);
      // Simulate API call
      await new Promise((res) => setTimeout(res, 800));
      setBooks((prev) =>
        prev.map((b) =>
          b.id === bookId ? { ...b, available: false, quantity: Math.max(0, (b.quantity ?? 1) - 1) } : b
        )
      );
      setBorrowingId(null);
    },
    []
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, {user?.username || "Reader"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Browse and borrow books from our collection.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Books</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <BookCheck className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.available}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <BookX className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.borrowed}</p>
            <p className="text-xs text-muted-foreground">Borrowed</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title, author, or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "available" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("available")}
          >
            Available
          </Button>
          <Button
            variant={filter === "borrowed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("borrowed")}
          >
            Borrowed
          </Button>
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed bg-muted/30">
          <div className="text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No books match your search.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBorrow={handleBorrow}
              borrowing={borrowingId === book.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
