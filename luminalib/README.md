# LuminaLib - Library Management System API

A modern, secure REST API for managing library resources built with Spring Boot 3.0. This system enables users to browse books, manage their accounts, and libraries to manage book inventory with role-based access control.

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Configuration Files](#configuration-files)

---

## 🎯 Features

✅ **User Authentication & Authorization**

- User registration and login with email/password
- JWT token-based authentication (stateless)
- Role-based access control (RBAC) - USER and ADMIN roles
- Secure password hashing using BCrypt

✅ **Book Management**

- View all books with pagination support
- Search books by title or author (case-insensitive)
- Create, update, and delete books (Admin only)
- Track available and total book copies

✅ **Security**

- CORS support for frontend integration
- JWT token validation on every request
- Method-level security annotations (@PreAuthorize)
- Custom exception handling with standardized error responses

✅ **Database**

- MySQL database integration
- JPA/Hibernate ORM
- Automatic database schema creation
- Transaction management

---

## 🛠 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Spring Boot | 3.0.2 |
| **Java Version** | OpenJDK | 21 LTS |
| **Database** | MySQL | 8.0.45 |
| **ORM** | JPA/Hibernate | 3.0.2 |
| **Security** | Spring Security | 7.0.2 |
| **JWT** | JJWT | 0.11.5 |
| **Build Tool** | Maven | 3.x |
| **dotenv** | dotenv-java | 3.0.0 |

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Java Development Kit (JDK) 21 LTS** - [Download here](https://www.oracle.com/java/technologies/downloads/#java21)
- **Maven 3.8+** - [Download here](https://maven.apache.org/download.cgi)
- **MySQL Server 8.0+** - [Download here](https://www.mysql.com/downloads/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **Postman** or **curl** for testing APIs (optional)

### Verify Installation

```bash
java -version          # Should show JDK 21
mvn -version          # Should show Maven 3.8+
mysql --version       # Should show MySQL 8.0+
```

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
cd /path/to/your/workspace
git clone <repository-url>
cd luminalib
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root directory:

```bash
# Database Configuration
DB_URL=jdbc:mysql://localhost:3306/luminalib?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=root
DB_SHOW_SQL=true

# JWT Configuration
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
JWT_EXPIRATION=86400000
```

**Note:**

- `JWT_EXPIRATION` is in milliseconds (86400000 = 24 hours)
- `JWT_SECRET` should be a strong, random string in production
- Database will be created automatically with `createDatabaseIfNotExist=true`

### Step 3: Install Dependencies

```bash
mvn clean install
```

This will:

- Download all dependencies
- Compile the source code
- Run any tests
- Create the compiled classes in `/target` directory

---

## ▶️ Running the Application

### Option 1: Using Maven

```bash
mvn spring-boot:run
```

### Option 2: Running the JAR file

```bash
mvn clean package
java -jar target/luminalib-0.0.1-SNAPSHOT.jar
```

### Option 3: Using IDE (IntelliJ IDEA or VS Code)

1. Open the project in your IDE
2. Run the `LuminalibApplication.java` class
3. Check console for startup messages

### Verify the Application is Running

You should see output similar to:

```
2026-02-15T01:23:12.177+05:30  INFO 407449 --- [luminalib] [main] org.hibernate.orm.core : HHH000003: HikariCP initialized
2026-02-15T01:23:12.210+05:30  INFO 407449 --- [luminalib] [main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2026-02-15T01:23:12.623+05:30  INFO 407449 --- [luminalib] [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8080 (http)
2026-02-15T01:23:12.633+05:30  INFO 407449 --- [luminalib] [main] com.fl4nk3r.luminalib.LuminalibApplication : Started LuminalibApplication
```

The API will be available at: **<http://localhost:8080>**

---

## 🗄️ Database Configuration

### MySQL Setup

1. **Start MySQL Server:**

```bash
# On Linux/Mac
mysql.server start

# On Windows
net start MySQL80
```

1. **Login to MySQL:**

```bash
mysql -u root -p
# Enter password: root
```

1. **The database will be created automatically** when the app starts because of the `createDatabaseIfNotExist=true` parameter in the connection string.

2. **To manually create the database:**

```sql
CREATE DATABASE luminalib CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE luminalib;
```

The tables will be created automatically by Hibernate with `spring.jpa.hibernate.ddl-auto=update`.

### Database Schema

#### Users Table

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Books Table

```sql
CREATE TABLE books (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    publication_year INT,
    genre VARCHAR(100),
    total_copies INT NOT NULL DEFAULT 1,
    available_copies INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🔌 API Endpoints

All API requests return JSON responses. The API is divided into two main groups:

### Base URL

```
http://localhost:8080
```

---

### 1️⃣ Authentication APIs

#### Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account

**Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "username": "john@example.com",
  "roles": ["ROLE_USER"]
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

#### Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive JWT token

**Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "username": "john@example.com",
  "roles": ["ROLE_USER"]
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

---

### 2️⃣ Book Management APIs

#### Get All Books

**Endpoint:** `GET /api/books`

**Description:** Retrieve all books from the library (public access)

**Headers:**

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Query Parameters:**

- `page` (optional): Page number (0-indexed), default: 0
- `size` (optional): Number of books per page, default: 10
- `sort` (optional): Sort field, e.g., `title,asc`

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0743273565",
    "publicationYear": 1925,
    "genre": "Fiction",
    "totalCopies": 5,
    "availableCopies": 3
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "isbn": "978-0061120084",
    "publicationYear": 1960,
    "genre": "Fiction",
    "totalCopies": 4,
    "availableCopies": 2
  }
]
```

**cURL Example:**

```bash
curl -X GET "http://localhost:8080/api/books" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

#### Get Book by ID

**Endpoint:** `GET /api/books/{id}`

**Description:** Retrieve a specific book by its ID (public access)

**Headers:**

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Path Parameters:**

- `id`: Book ID (required)

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publicationYear": 1925,
  "genre": "Fiction",
  "totalCopies": 5,
  "availableCopies": 3
}
```

**Response (404 Not Found):**

```json
{
  "timestamp": "2026-02-15T01:23:12.000+00:00",
  "status": 404,
  "error": "NOT_FOUND",
  "message": "Book not found with id: 999",
  "path": "/api/books/999"
}
```

**cURL Example:**

```bash
curl -X GET "http://localhost:8080/api/books/1" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

#### Search Books

**Endpoint:** `GET /api/books/search`

**Description:** Search books by title or author (case-insensitive, public access)

**Headers:**

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Query Parameters:**

- `keyword` (required): Search term

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0743273565",
    "publicationYear": 1925,
    "genre": "Fiction",
    "totalCopies": 5,
    "availableCopies": 3
  }
]
```

**cURL Example:**

```bash
curl -X GET "http://localhost:8080/api/books/search?keyword=Gatsby" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

#### Create Book ⚠️ (Admin Only)

**Endpoint:** `POST /api/books`

**Description:** Add a new book to the library (Admin access only)

**Headers:**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <ADMIN_JWT_TOKEN>"
}
```

**Request Body:**

```json
{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publicationYear": 1949,
  "genre": "Dystopian",
  "totalCopies": 10,
  "availableCopies": 10
}
```

**Response (201 Created):**

```json
{
  "id": 3,
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publicationYear": 1949,
  "genre": "Dystopian",
  "totalCopies": 10,
  "availableCopies": 10
}
```

**Response (403 Forbidden - Non-Admin):**

```json
{
  "timestamp": "2026-02-15T01:23:12.000+00:00",
  "status": 403,
  "error": "FORBIDDEN",
  "message": "Access Denied",
  "path": "/api/books"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publicationYear": 1949,
    "genre": "Dystopian",
    "totalCopies": 10,
    "availableCopies": 10
  }'
```

---

#### Update Book ⚠️ (Admin Only)

**Endpoint:** `PUT /api/books/{id}`

**Description:** Update book details (Admin access only)

**Headers:**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <ADMIN_JWT_TOKEN>"
}
```

**Path Parameters:**

- `id`: Book ID to update (required)

**Request Body:**

```json
{
  "title": "1984 - New Edition",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publicationYear": 1949,
  "genre": "Dystopian",
  "totalCopies": 15,
  "availableCopies": 12
}
```

**Response (200 OK):**

```json
{
  "id": 3,
  "title": "1984 - New Edition",
  "author": "George Orwell",
  "isbn": "978-0451524935",
  "publicationYear": 1949,
  "genre": "Dystopian",
  "totalCopies": 15,
  "availableCopies": 12
}
```

**cURL Example:**

```bash
curl -X PUT http://localhost:8080/api/books/3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  -d '{
    "title": "1984 - New Edition",
    "author": "George Orwell",
    "isbn": "978-0451524935",
    "publicationYear": 1949,
    "genre": "Dystopian",
    "totalCopies": 15,
    "availableCopies": 12
  }'
```

---

#### Delete Book ⚠️ (Admin Only)

**Endpoint:** `DELETE /api/books/{id}`

**Description:** Remove a book from the library (Admin access only)

**Headers:**

```json
{
  "Authorization": "Bearer <ADMIN_JWT_TOKEN>"
}
```

**Path Parameters:**

- `id`: Book ID to delete (required)

**Response (204 No Content):**

```
[Empty body]
```

**Response (404 Not Found):**

```json
{
  "timestamp": "2026-02-15T01:23:12.000+00:00",
  "status": 404,
  "error": "NOT_FOUND",
  "message": "Book not found with id: 999",
  "path": "/api/books/999"
}
```

**cURL Example:**

```bash
curl -X DELETE http://localhost:8080/api/books/3 \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Token Payload

The JWT token contains:

```json
{
  "sub": "user@example.com",
  "iat": 1676361792,
  "exp": 1676448192,
  "roles": ["ROLE_USER"]
}
```

### User Roles

| Role | Permissions |
|------|------------|
| **ROLE_USER** | View books, search, user profile |
| **ROLE_ADMIN** | All USER permissions + Create/Update/Delete books |

### Authorization Rules

| Endpoint | Public | Authenticated | Admin Only |
|----------|--------|---------------|-----------|
| POST /api/auth/register | ✅ | - | - |
| POST /api/auth/login | ✅ | - | - |
| GET /api/books | ✅ | ✅ | - |
| GET /api/books/{id} | ✅ | ✅ | - |
| GET /api/books/search | ✅ | ✅ | - |
| POST /api/books | - | - | ✅ |
| PUT /api/books/{id} | - | - | ✅ |
| DELETE /api/books/{id} | - | - | ✅ |

---

## 📁 Project Structure

```
src/main/java/com/fl4nk3r/luminalib/
├── LuminalibApplication.java           # Main entry point
│
├── config/                             # Configuration classes
│   ├── EnvConfig.java                  # .env file loader
│   ├── JwtAuthFilter.java              # JWT validation filter
│   ├── SecurityConfig.java             # Spring Security configuration
│   ├── UserDetailsServiceImplementation.java
│   └── WebConfig.java                  # CORS configuration
│
├── controller/                         # REST API endpoints
│   ├── AuthController.java             # Auth endpoints
│   ├── BookController.java             # Book CRUD endpoints
│   └── UserController.java             # User management endpoints
│
├── dto/                                # Data Transfer Objects
│   ├── request/
│   │   ├── LoginRequest.java
│   │   └── RegisterRequest.java
│   └── response/
│       ├── AuthResponse.java
│       └── ErrorResponse.java
│
├── entity/                             # JPA Entities
│   ├── User.java                       # User entity (UserDetails)
│   ├── Role.java                       # Role enum
│   └── Book.java                       # Book entity
│
├── exception/                          # Exception handling
│   ├── BadRequestException.java
│   ├── GlobalExceptionHandler.java     # @ControllerAdvice
│   ├── ResourceNotFoundException.java
│   └── UnauthorizedException.java
│
├── repository/                         # Data Access Layer
│   ├── BookRepository.java             # JpaRepository<Book>
│   └── UserRepository.java             # JpaRepository<User>
│
├── security/                           # JWT & Authentication
│   ├── AuthTokenFilter.java            # JWT interceptor
│   ├── JwtUtils.java                   # JWT generation/validation
│   └── UserDetailsServiceImpl.java      # Spring Security integration
│
└── service/                            # Business Logic
    ├── AuthService.java                # Registration & Login logic
    ├── BookService.java                # Book CRUD logic
    └── JwtService.java                 # JWT token handling

src/main/resources/
├── application.properties               # Spring configuration
└── static/                             # Static resources (if needed)
```

---

## ⚠️ Error Handling

All errors are returned in a standardized format:

### Error Response Format

```json
{
  "timestamp": "2026-02-15T01:23:12.000+00:00",
  "status": 400,
  "error": "BAD_REQUEST",
  "message": "Validation failed",
  "path": "/api/auth/register"
}
```

### Common Error Codes

| Status | Error | Reason |
|--------|-------|--------|
| 400 | BAD_REQUEST | Invalid input/validation failed |
| 401 | UNAUTHORIZED | Missing or invalid JWT token |
| 403 | FORBIDDEN | Insufficient permissions (not admin) |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Email already registered |
| 500 | INTERNAL_SERVER_ERROR | Server error |

### Example Error Responses

**Invalid Email Format:**

```json
{
  "timestamp": "2026-02-15T01:23:12.000+00:00",
  "status": 400,
  "error": "BAD_REQUEST",
  "message": "Invalid email format",
  "path": "/api/auth/register"
}
```

**User Not Found:**

```json
{
  "timestamp": "2026-02-15T01:23:12.000+00:00",
  "status": 404,
  "error": "NOT_FOUND",
  "message": "User not found with email: test@example.com",
  "path": "/api/auth/login"
}
```

**Email Already Exists:**

```json
{
  "timestamp": "2026-02-15T01:23:12.000+00:00",
  "status": 409,
  "error": "CONFLICT",
  "message": "Email already registered",
  "path": "/api/auth/register"
}
```

---

## ⚙️ Configuration Files

### application.properties

Located at: `src/main/resources/application.properties`

```properties
spring.application.name=luminalib

# Database Configuration (MySQL)
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=${DB_SHOW_SQL}
spring.jpa.properties.hibernate.format_sql=true

# Disable the default Whitelabel Error Page
spring.web.error.whitelabel.enabled=false

# Error handling
spring.web.error.include-stacktrace=never

# JWT Configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION}
```

### .env File

```bash
# Database Configuration
DB_URL=jdbc:mysql://localhost:3306/luminalib?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=root
DB_SHOW_SQL=true

# JWT Configuration
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
JWT_EXPIRATION=86400000
```

---

## 🧪 Testing APIs with Postman

### Import Collection

1. Open Postman
2. Click "Import" → "Raw text" → Paste the following:

```json
{
  "info": {
    "name": "LuminalLib API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/auth/register",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"SecurePass123!\",\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\"\n}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"SecurePass123!\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Books",
      "item": [
        {
          "name": "Get All Books",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/books",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ]
          }
        },
        {
          "name": "Search Books",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/books/search?keyword=Gatsby",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ]
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8080"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

1. Set environment variables in Postman:
   - `base_url`: <http://localhost:8080>
   - `token`: (paste the JWT token from login response)

---

## 🚀 Deployment

### Build for Production

```bash
mvn clean package -DskipTests
```

This creates: `target/luminalib-0.0.1-SNAPSHOT.jar`

### Deploy to Server

```bash
# Copy JAR to server
scp target/luminalib-0.0.1-SNAPSHOT.jar user@server:/path/to/app/

# On server, run:
java -jar luminalib-0.0.1-SNAPSHOT.jar
```

---

## 📝 Future Enhancements

- [ ] Book borrowing/returning functionality
- [ ] User profile management
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Book ratings and reviews
- [ ] Pagination for book listing
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**fl4nk3r** - Creator and Maintainer

---

## 📞 Support

For issues and questions:

- Open an issue on GitHub
- Contact: <fl4nk3r@example.com>

---

## 🔗 Useful Links

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [JWT Introduction](https://jwt.io/introduction)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Postman Learning Center](https://learning.postman.com/)

---

**Last Updated:** February 15, 2026  
**Version:** 1.0.0
