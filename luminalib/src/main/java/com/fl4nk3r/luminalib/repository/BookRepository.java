package com.fl4nk3r.luminalib.repository;

import com.fl4nk3r.luminalib.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    /**
     * Find a book by ISBN
     * @param isbn ISBN number
     * @return Optional containing book if found
     */
    Optional<Book> findByIsbn(String isbn);

    /**
     * Search books by title or author (case-insensitive)
     * @param title Title keyword
     * @param author Author keyword
     * @return List of matching books
     */
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);

    /**
     * Find books by genre (case-insensitive)
     * @param genre Genre name
     * @return List of books in that genre
     */
    List<Book> findByGenreIgnoreCase(String genre);

    /**
     * Find books by author (case-insensitive)
     * @param author Author name
     * @return List of books by that author
     */
    List<Book> findByAuthorContainingIgnoreCase(String author);
}
