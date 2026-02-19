```
src/main/java/com/luminalib/api/
├── LuminaLibApplication.java        # Main entry point (@SpringBootApplication)
│
├── config/                          # Configuration beans
│   ├── WebConfig.java               # CORS settings for your React frontend
│   └── SecurityConfig.java          # Spring Security & RBAC rules
│
├── controller/                      # REST API Endpoints (@RestController)
│   ├── AuthController.java          # Login, Register
│   ├── BookController.java          # CRUD for Books
│   └── UserController.java          # Profile and Admin user management
│
├── dto/                             # Data Transfer Objects (Request/Response)
│   ├── request/                     # LoginRequest, SignupRequest
│   └── response/                    # JwtResponse, MessageResponse
│
├── entity/                          # Database Models (@Entity)
│   ├── User.java                    # User with Role
│   ├── Role.java                    # Enum for ADMIN/USER
│   └── Book.java                    # Book details
│
├── exception/                       # Custom error handling
│   ├── GlobalExceptionHandler.java  # @ControllerAdvice
│   └── ResourceNotFoundException.java
│
├── repository/                      # Database Access (JpaRepository)
│   ├── UserRepository.java
│   └── BookRepository.java
│
├── security/                        # JWT & Security Logic
│   ├── JwtUtils.java                # Token generation/validation
│   ├── AuthTokenFilter.java         # Intercepts every request
│   └── UserDetailsServiceImpl.java  # Loads user from DB for Spring Security
│
└── service/                         # Business Logic (@Service)
    ├── BookService.java
    └── AuthService.java
```