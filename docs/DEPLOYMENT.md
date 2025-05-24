# 🚀 Life Goals App - Deployment Guide

This guide will walk you through deploying the Life Goals App to production.

## 📋 Table of Contents
- [Database Setup (Supabase)](#database-setup-supabase)
- [Backend Deployment (Railway)](#backend-deployment-railway)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Alternative Deployment Options](#alternative-deployment-options)
- [Post-Deployment Configuration](#post-deployment-configuration)

## Database Setup (Supabase)

### Step 1: Create Supabase Account
1. Go to [Supabase](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Choose a region close to your users
5. Set a strong database password (save this!)

### Step 2: Get Database Connection Details
1. Go to Settings → Database
2. Copy the connection string (choose "JDBC" for Spring Boot)
3. Your connection string will look like:
   ```
   jdbc:postgresql://db.xxxxxxxxxxxx.supabase.co:5432/postgres?user=postgres&password=YOUR_PASSWORD
   ```

### Step 3: Configure Database
No additional setup needed - Hibernate will create tables automatically on first run.

## Backend Deployment (Railway)

### Step 1: Prepare Backend for Deployment

1. Create `system.properties` in backend root:
```properties
java.runtime.version=17
```

2. Update `backend/src/main/resources/application.yml`:
```yaml
spring:
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:dev}

---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect

jwt:
  secret: ${JWT_SECRET}
  expiration: 86400000

server:
  port: ${PORT:8080}

logging:
  level:
    root: INFO
```

3. Create `backend/src/main/resources/application-dev.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/lifegoalsapp
    username: postgres
    password: postgres
  jpa:
    show-sql: true

jwt:
  secret: your-256-bit-secret-key-here-make-it-long-and-secure
  expiration: 86400000

logging:
  level:
    com.example.lifegoalsapp: DEBUG
```

### Step 2: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `life-goals-app` repository
5. Railway will detect it's a monorepo, select `/backend`
6. Add environment variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=your_supabase_jdbc_url
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_supabase_password
   JWT_SECRET=generate-a-secure-256-bit-key
   ```

7. Railway will automatically build and deploy your Spring Boot app

### Step 3: Get Backend URL
1. Once deployed, go to Settings → Domains
2. Generate a domain (e.g., `life-goals-backend.up.railway.app`)
3. Your API will be available at `https://life-goals-backend.up.railway.app`

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Deployment

1. Update `frontend/src/utils/api.ts`:
```typescript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
```

2. Update CORS in backend `SecurityConfig.java`:
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of(
        "http://localhost:3000",
        "https://your-app-name.vercel.app" // Add your Vercel URL
    ));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setExposedHeaders(List.of("Authorization"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New..." → "Project"
4. Import your `life-goals-app` repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://life-goals-backend.up.railway.app
   ```
7. Click "Deploy"

### Step 3: Update Backend CORS
After getting your Vercel URL:
1. Update the CORS configuration in Railway with your Vercel domain
2. Redeploy the backend

## Alternative Deployment Options

### Backend Alternatives

#### Option 1: Render
1. Go to [Render](https://render.com)
2. Create a Web Service
3. Connect GitHub repository
4. Configure:
   - Root Directory: `backend`
   - Build Command: `./mvnw clean install`
   - Start Command: `java -jar target/*.jar`
5. Add environment variables

#### Option 2: Heroku (Paid)
1. Install Heroku CLI
2. Create `Procfile` in backend:
   ```
   web: java -jar target/*.jar
   ```
3. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set SPRING_PROFILES_ACTIVE=prod
   heroku config:set DATABASE_URL=your_db_url
   git push heroku main
   ```

### Database Alternatives

#### Option 1: Neon
1. Go to [Neon](https://neon.tech)
2. Create a database
3. Get connection string
4. Similar setup to Supabase

#### Option 2: Railway PostgreSQL
1. In Railway project, add PostgreSQL service
2. Connect it to your backend service
3. Railway auto-configures DATABASE_URL

### Frontend Alternatives

#### Option 1: Netlify
1. Go to [Netlify](https://netlify.com)
2. Drag and drop `frontend/out` folder (after `npm run build && npm run export`)
3. Configure environment variables

#### Option 2: Railway
1. Deploy frontend as a separate service
2. Configure build commands similar to backend

## Post-Deployment Configuration

### 1. Update Environment Variables
Ensure all services have correct URLs:
- Frontend: `NEXT_PUBLIC_API_URL` points to backend
- Backend: CORS includes frontend URL

### 2. Test the Application
1. Register a new account
2. Create, update, delete goals
3. Test logout/login
4. Verify dark mode works

### 3. Set Up Monitoring (Optional)
- Use Railway's built-in metrics
- Add Sentry for error tracking
- Set up Uptime monitoring

### 4. Configure Custom Domain (Optional)
1. Buy a domain (e.g., from Namecheap)
2. Configure DNS:
   - Frontend: Add CNAME to Vercel
   - Backend: Add CNAME to Railway

## 🔒 Security Checklist

- [ ] Change default JWT secret
- [ ] Use HTTPS everywhere
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular dependency updates
- [ ] Database backups enabled

## 🐛 Troubleshooting

### CORS Issues
- Ensure frontend URL is in backend CORS config
- Check credentials are included in requests
- Verify OPTIONS requests are handled

### Database Connection Issues
- Check connection string format
- Verify firewall rules
- Ensure SSL is configured if required

### Build Failures
- Check Java version (17 required)
- Verify Maven wrapper permissions
- Check Node.js version for frontend

## 📊 Monitoring

### Backend Logs (Railway)
```bash
railway logs
```

### Frontend Logs (Vercel)
- Check Functions tab in Vercel dashboard

## 🎉 Congratulations!
Your Life Goals App is now live! Share it with the world and start tracking your goals.

---

For support, check the [main README](../README.md) or create an issue on GitHub. 