"use client";

import { useState, useMemo } from "react";
import { mockBooks } from "@/lib/mock-data";
import type { Book } from "@/lib/types";
import { AdminTable } from "@/components/admin-table";
import { BookFormDialog } from "@/components/book-form-dialog";
import { PrivateRoute } from "@/components/private-route";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Plus, BookOpen, BookCheck, BookX } from "lucide-react";

export default function AdminPage() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredBooks = useMemo(() => {
    if (!search) return books;
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.isbn?.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

  const stats = useMemo(
    () => ({
      total: books.length,
      available: books.filter((b) => b.available).length,
      borrowed: books.filter((b) => !b.available).length,
    }),
    [books]
  );

  const handleSave = (bookData: Omit<Book, "id"> & { id?: number }) => {
    if (bookData.id) {
      // Edit
      setBooks((prev) =>
        prev.map((b) => (b.id === bookData.id ? { ...b, ...bookData } as Book : b))
      );
    } else {
      // Add
      const newId = Math.max(...books.map((b) => b.id), 0) + 1;
      setBooks((prev) => [...prev, { ...bookData, id: newId } as Book]);
    }
    setEditingBook(null);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setDialogOpen(true);
  };

  const handleDelete = (bookId: number) => {
    setDeleteId(bookId);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setBooks((prev) => prev.filter((b) => b.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleAdd = () => {
    setEditingBook(null);
    setDialogOpen(true);
  };

  return (
    <PrivateRoute requiredRole="ROLE_ADMIN">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Manage Books
            </h1>
            <p className="mt-1 text-muted-foreground">
              Add, edit, and manage the library catalog.
            </p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            Add New Book
          </Button>
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

        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Table */}
        <AdminTable
          books={filteredBooks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add/Edit Dialog */}
        <BookFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          book={editingBook}
          onSave={handleSave}
        />

        {/* Delete Confirmation */}
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">Delete Book</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this book? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PrivateRoute>
  );
}
