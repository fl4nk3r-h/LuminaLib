"use client";

import type { Book } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface AdminTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

export function AdminTable({ books, onEdit, onDelete }: AdminTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-12 text-foreground">ID</TableHead>
            <TableHead className="text-foreground">Title</TableHead>
            <TableHead className="text-foreground">Author</TableHead>
            <TableHead className="text-foreground">ISBN</TableHead>
            <TableHead className="text-foreground">Genre</TableHead>
            <TableHead className="text-center text-foreground">Status</TableHead>
            <TableHead className="text-center text-foreground">Qty</TableHead>
            <TableHead className="text-right text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                No books found. Add your first book to get started.
              </TableCell>
            </TableRow>
          ) : (
            books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium text-muted-foreground">
                  {book.id}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {book.title}
                </TableCell>
                <TableCell className="text-muted-foreground">{book.author}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {book.isbn || "-"}
                </TableCell>
                <TableCell>
                  {book.genre ? (
                    <Badge variant="outline" className="text-xs font-normal">
                      {book.genre}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-center">
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
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {book.quantity ?? "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => onEdit(book)}
                      aria-label={`Edit ${book.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(book.id)}
                      aria-label={`Delete ${book.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
