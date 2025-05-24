# 🎯 Life Goals App

A modern, full-stack application for tracking and managing your life goals with a beautiful UI and robust backend.

![Life Goals App Banner](https://via.placeholder.com/1200x400/4F46E5/ffffff?text=Life+Goals+App)

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based authentication with Spring Security
- 🎨 **Modern UI**: Beautiful, responsive design with Next.js and Tailwind CSS
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎯 **Goal Management**: Create, update, delete, and track your goals
- 📊 **Progress Tracking**: Visual statistics and progress indicators
- 🚀 **Real-time Updates**: Instant UI updates when managing goals
- 🔒 **Secure API**: Protected endpoints with user-specific data access

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Framework**: [Spring Boot 3](https://spring.io/projects/spring-boot)
- **Language**: Java 17
- **Security**: Spring Security with JWT
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Java** (JDK 17 or higher)
- **PostgreSQL** (v14 or higher)
- **Maven** (v3.8 or higher)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hgpt185/life-goals-app.git
cd life-goals-app
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE lifegoalsapp;
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Configure the database connection in `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/lifegoalsapp
    username: your_db_username
    password: your_db_password
```

Update the JWT secret in the same file:

```yaml
jwt:
  secret: your-256-bit-secret-key-here-make-it-long-and-secure
  expiration: 86400000 # 24 hours
```

Start the backend server:

```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 📖 Usage

### 1. Register a New Account
- Navigate to `http://localhost:3000`
- Click on "Get Started" or "Sign Up"
- Fill in your details and create an account

### 2. Login
- Use your email and password to login
- You'll be redirected to the dashboard

### 3. Create Goals
- Click "Add New Goal" on the dashboard
- Enter goal title and description
- Track your progress by marking goals as complete

### 4. Manage Goals
- Edit goals by clicking the "Edit" button
- Delete goals you no longer need
- Toggle completion status with one click

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x600/4F46E5/ffffff?text=Landing+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x600/4F46E5/ffffff?text=Dashboard)

### Goal Management
![Goal Management](https://via.placeholder.com/800x600/4F46E5/ffffff?text=Goal+Management)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x600/1F2937/ffffff?text=Dark+Mode)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Goals
- `GET /api/goals` - Get all goals for authenticated user
- `POST /api/goals` - Create a new goal
- `PUT /api/goals/{id}` - Update a goal
- `DELETE /api/goals/{id}` - Delete a goal

## 📁 Project Structure

```
life-goals-app/
├── backend/                  # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/lifegoalsapp/
│   │   │   │       ├── controller/     # REST controllers
│   │   │   │       ├── dto/           # Data Transfer Objects
│   │   │   │       ├── model/         # Entity models
│   │   │   │       ├── repository/    # JPA repositories
│   │   │   │       ├── security/      # Security configuration
│   │   │   │       └── service/       # Business logic
│   │   │   └── resources/
│   │   │       └── application.yml    # Configuration
│   └── pom.xml
│
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
│
└── README.md
```

## 🔧 Configuration

### Backend Configuration

Key configuration options in `application.yml`:

```yaml
# Server Configuration
server:
  port: 8080

# Database Configuration
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/lifegoalsapp
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

# JWT Configuration
jwt:
  secret: your-secret-key
  expiration: 86400000

# CORS Configuration
spring:
  security:
    cors:
      allowed-origins: http://localhost:3000
```

### Frontend Configuration

Environment variables in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 🚀 Deployment

### Backend Deployment

1. Build the JAR file:
```bash
cd backend
./mvnw clean package
```

2. Run the JAR:
```bash
java -jar target/lifegoalsapp-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment

1. Build for production:
```bash
cd frontend
npm run build
```

2. Start production server:
```bash
npm start
```

### Docker Support (Coming Soon)

Docker configuration will be added to simplify deployment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Hemesh Gupta** - [hgpt185](https://github.com/hgpt185)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Spring Boot team for the robust backend framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who help improve this project

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/hgpt185/life-goals-app/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide as much detail as possible

---

<div align="center">
  Made with ❤️ by Hemesh Gupta
</div> 