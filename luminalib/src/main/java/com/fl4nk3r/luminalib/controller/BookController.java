package com.fl4nk3r.luminalib.controller;

import com.fl4nk3r.luminalib.entity.Book;
import com.fl4nk3r.luminalib.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    /**
     * Get all books
     * GET /api/books
     * 
     * @return List of all books
     */
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    /**
     * Get a single book by ID
     * GET /api/books/{id}
     * 
     * @param id Book ID
     * @return Book entity
     */
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    /**
     * Create a new book (Admin only)
     * POST /api/books
     * 
     * @param book Book entity
     * @return Created book entity
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
        Book createdBook = bookService.createBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    /**
     * Update an existing book (Admin only)
     * PUT /api/books/{id}
     * 
     * @param id          Book ID
     * @param bookDetails Updated book details
     * @return Updated book entity
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book bookDetails) {
        Book updatedBook = bookService.updateBook(id, bookDetails);
        return ResponseEntity.ok(updatedBook);
    }

    /**
     * Delete a book (Admin only)
     * DELETE /api/books/{id}
     * 
     * @param id Book ID
     * @return No content
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Search books by title or author
     * GET /api/books/search?keyword=...
     * 
     * @param keyword Search keyword
     * @return List of matching books
     */
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String keyword) {
        List<Book> books = bookService.searchBooks(keyword);
        return ResponseEntity.ok(books);
    }

    /**
     * Get books by genre
     * GET /api/books/genre/{genre}
     * 
     * @param genre Genre name
     * @return List of books in that genre
     */
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Book>> getBooksByGenre(@PathVariable String genre) {
        List<Book> books = bookService.getBooksByGenre(genre);
        return ResponseEntity.ok(books);
    }
}
