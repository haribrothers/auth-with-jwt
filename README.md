# Full Stack Authentication System

This project consists of a Node.js backend API and an Angular frontend application demonstrating a complete authentication system.

## Project Structure

```
.
├── server/         # Node.js backend
├── ui/            # Angular frontend
└── README.md
```

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
# Install UI dependencies
cd ui
npm install

# Install server dependencies
cd ../server
npm install
```

3. Configure environment:
   - Copy `.env.example` to `.env` in the server directory
   - Update the environment variables as needed

4. Start the applications:

```bash
# Start the backend server (from server directory)
npm start

# Start the Angular dev server (from ui directory)
npm start
```

## Default Users

The system comes with these pre-configured users:

1. Admin User:
   - Username: admin
   - Password: test123
   - Roles: ADMIN, USER

2. Regular User:
   - Username: testuser
   - Password: test123
   - Roles: USER

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Protected Routes

- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile

## Environment Variables

Server environment variables (`.env`):

- `PORT` - Server port (default: 3000)
- `JWT_SECRET` - Secret key for JWT tokens
- `DB_PATH` - Path to JSON database file