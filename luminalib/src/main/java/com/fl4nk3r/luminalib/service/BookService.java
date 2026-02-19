package com.fl4nk3r.luminalib.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fl4nk3r.luminalib.entity.Book;
import com.fl4nk3r.luminalib.exception.BadRequestException;
import com.fl4nk3r.luminalib.exception.ResourceNotFoundException;
import com.fl4nk3r.luminalib.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    /**
     * Get all books
     * 
     * @return List of all books
     */
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    /**
     * Get a book by ID
     * 
     * @param id Book ID
     * @return Book entity
     * @throws ResourceNotFoundException if book not found
     */
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }

    /**
     * Create a new book
     * 
     * @param book Book entity
     * @return Saved book entity
     */
    @Transactional
    public Book createBook(Book book) {
        // Check if ISBN already exists
        if (bookRepository.findByIsbn(book.getIsbn()).isPresent()) {
            throw new BadRequestException("Book with ISBN " + book.getIsbn() + " already exists");
        }

        // Validate book copies
        if (book.getTotalCopies() < 0) {
            throw new BadRequestException("Total copies cannot be negative");
        }
        if (book.getAvailableCopies() < 0) {
            throw new BadRequestException("Available copies cannot be negative");
        }
        if (book.getAvailableCopies() > book.getTotalCopies()) {
            throw new BadRequestException("Available copies cannot exceed total copies");
        }

        return bookRepository.save(book);
    }

    /**
     * Update an existing book
     * 
     * @param id          Book ID
     * @param bookDetails Updated book details
     * @return Updated book entity
     * @throws ResourceNotFoundException if book not found
     */
    @Transactional
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));

        // Check if ISBN is being changed to a different one that already exists
        if (!book.getIsbn().equals(bookDetails.getIsbn())) {
            bookRepository.findByIsbn(bookDetails.getIsbn()).ifPresent(existingBook -> {
                throw new BadRequestException("Book with ISBN " + bookDetails.getIsbn() + " already exists");
            });
        }

        // Validate book copies
        if (bookDetails.getTotalCopies() < 0) {
            throw new BadRequestException("Total copies cannot be negative");
        }
        if (bookDetails.getAvailableCopies() < 0) {
            throw new BadRequestException("Available copies cannot be negative");
        }
        if (bookDetails.getAvailableCopies() > bookDetails.getTotalCopies()) {
            throw new BadRequestException("Available copies cannot exceed total copies");
        }

        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setIsbn(bookDetails.getIsbn());
        book.setPublicationYear(bookDetails.getPublicationYear());
        book.setGenre(bookDetails.getGenre());
        book.setTotalCopies(bookDetails.getTotalCopies());
        book.setAvailableCopies(bookDetails.getAvailableCopies());

        return bookRepository.save(book);
    }

    /**
     * Delete a book
     * 
     * @param id Book ID
     * @throws ResourceNotFoundException if book not found
     */
    @Transactional
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        bookRepository.delete(book);
    }

    /**
     * Search books by title or author
     * 
     * @param keyword Search keyword
     * @return List of matching books
     */
    public List<Book> searchBooks(String keyword) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(keyword, keyword);
    }

    /**
     * Get books by genre
     * 
     * @param genre Genre name
     * @return List of books in that genre
     */
    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenreIgnoreCase(genre);
    }
}
