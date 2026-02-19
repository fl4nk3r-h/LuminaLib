package com.fl4nk3r.luminalib.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Book entity representing a book in the library system.
 * Includes fields for title, author, ISBN, publication year, genre, total
 * copies, and available copies.
 * Uses JPA annotations for ORM mapping and validation annotations for
 * input validation.
 * This class is a central part of the library management
 * system, allowing for the storage and retrieval of book information in the
 * database.
 * Example usage:
 * Book book = new Book();
 * book.setTitle("The Great Gatsby");
 * book.setAuthor("F. Scott Fitzgerald");
 * book.setIsbn("978-0743273565");
 * book.setPublicationYear(1925);
 * book.setGenre("Fiction");
 * book.setTotalCopies(5);
 * book.setAvailableCopies(5);
 * 
 * @author fl4nk3r
 * @version 1.0
 * @since 2024-06
 */
@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author is required")
    private String author;

    @NotBlank(message = "ISBN is required")
    @Column(unique = true)
    private String isbn;

    @Min(value = 1000, message = "Year must be valid")
    private int publicationYear;

    @NotBlank(message = "Genre is required")
    private String genre;

    @Min(0)
    private int totalCopies;

    @Min(0)
    private int availableCopies;

}