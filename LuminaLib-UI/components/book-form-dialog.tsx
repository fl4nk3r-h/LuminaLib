"use client";

import { useState, useEffect } from "react";
import type { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface BookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book?: Book | null;
  onSave: (book: Omit<Book, "id"> & { id?: number }) => void;
}

export function BookFormDialog({
  open,
  onOpenChange,
  book,
  onSave,
}: BookFormDialogProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [available, setAvailable] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [publishedYear, setPublishedYear] = useState<number | "">(2024);
  const [description, setDescription] = useState("");

  const isEditing = !!book;

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn || "");
      setGenre(book.genre || "");
      setAvailable(book.available);
      setQuantity(book.quantity ?? 1);
      setPublishedYear(book.publishedYear ?? "");
      setDescription(book.description || "");
    } else {
      setTitle("");
      setAuthor("");
      setIsbn("");
      setGenre("");
      setAvailable(true);
      setQuantity(1);
      setPublishedYear(2024);
      setDescription("");
    }
  }, [book, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(book?.id ? { id: book.id } : {}),
      title,
      author,
      isbn: isbn || undefined,
      genre: genre || undefined,
      available,
      quantity,
      publishedYear: publishedYear || undefined,
      description: description || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? "Edit Book" : "Add New Book"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the book details below."
              : "Fill in the details to add a new book to the library."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book title"
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="978-..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={0}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Published Year</Label>
              <Input
                id="year"
                type="number"
                value={publishedYear}
                onChange={(e) =>
                  setPublishedYear(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="e.g., 2024"
              />
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Switch
                id="available"
                checked={available}
                onCheckedChange={setAvailable}
              />
              <Label htmlFor="available">Available for borrowing</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
