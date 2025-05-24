# 100 Life Goals Application

A web application to track and manage your life goals. Built with Spring Boot, Next.js, and PostgreSQL.

## Project Structure

```
life-goals-app/
├── frontend/    # Next.js frontend application
└── backend/     # Spring Boot backend application
```

## Backend Setup

1. Install Java 17 or higher
2. Install PostgreSQL and create a database named `lifegoals`
3. Navigate to the backend directory:
   ```bash
   cd backend
   ```
4. Update database credentials in `src/main/resources/application.yml`
5. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
6. Backend will be available at `http://localhost:8080/api`

## Frontend Setup

1. Install Node.js (v18 or higher)
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Frontend will be available at `http://localhost:3000`

## Features

- User authentication and authorization
- Create, read, update, and delete life goals
- Categorize goals
- Track progress
- Mark goals as completed
- User profile management

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Query
- Axios

### Backend
- Spring Boot 3
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication

## Deployment

- Frontend: Vercel
- Backend: Railway.app
- Database: Railway.app PostgreSQL

## Development

1. For local development, ensure both frontend and backend are running
2. Frontend makes API calls to `http://localhost:8080/api`
3. Backend handles database operations and business logic

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 