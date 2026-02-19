# LuminaLib Monorepo

LuminaLib is a full-stack library management system organized as a monorepo with:

- `luminalib`: Java + Spring Boot REST API
- `LuminaLib-UI`: Next.js frontend application

## Repository Structure

```text
.
├── luminalib/        # Backend API (Spring Boot)
├── LuminaLib-UI/     # Frontend app (Next.js)
└── README.md         # Monorepo documentation
```

## Tech Stack

### Backend (`luminalib`)

- Java 21 (LTS)
- Spring Boot 4.0.2
- Spring Security + JWT
- Spring Data JPA + MySQL
- Maven

### Frontend (`LuminaLib-UI`)

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS + Radix UI
- Axios

## Prerequisites

Install these tools before starting:

- Java 21
- Maven 3.8+
- Node.js 20+ and npm
- MySQL 8+

Verify installed versions:

```bash
java -version
mvn -version
node -v
npm -v
mysql --version
```

## Quick Start (Run Backend + Frontend)

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd LuminaLib
```

### 2) Configure backend environment

Create a `.env` file inside `luminalib/`:

```dotenv
DB_URL=jdbc:mysql://localhost:3306/luminalib?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=root
DB_SHOW_SQL=true

JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRATION=86400000
```

### 3) Configure frontend environment (optional)

The frontend defaults to `http://localhost:8080/api`.

If needed, create `LuminaLib-UI/.env.local`:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

### 4) Start backend

In terminal 1:

```bash
cd luminalib
./mvnw spring-boot:run
```

Backend runs at `http://localhost:8080`.

### 5) Start frontend

In terminal 2:

```bash
cd LuminaLib-UI
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Development Commands

### Backend (`luminalib`)

```bash
cd luminalib
./mvnw clean test
./mvnw clean package
./mvnw spring-boot:run
```

### Frontend (`LuminaLib-UI`)

```bash
cd LuminaLib-UI
npm run dev
npm run build
npm run start
npm run lint
```

## API and App Notes

- API base URL: `http://localhost:8080/api`
- The frontend automatically attaches JWT token from `localStorage`.
- On `401`, frontend clears auth data and redirects to `/login`.

## Troubleshooting

- **Backend fails to start due to DB connection**:
 	- Ensure MySQL is running.
 	- Verify `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` in `luminalib/.env`.
- **Frontend cannot reach API**:
 	- Ensure backend is running on port `8080`.
 	- Check `NEXT_PUBLIC_API_BASE_URL` in `LuminaLib-UI/.env.local`.
- **CORS/Auth issues**:
 	- Confirm backend security configuration and token validity.

## Additional Docs

- Backend details: `luminalib/README.md`
- Backend environment guide: `luminalib/README-ENV.md`
- Backend structure notes: `luminalib/ProjectStructure.md`

## License

Add your preferred license information here.
