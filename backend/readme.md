# Backend API

A Node.js Express API for task management with user authentication.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (admin, user)
- CRUD operations for tasks
- Input validation using express-validator

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Installation

1. Clone the repository.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`

## Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000  # optional, defaults to 3000
```

## Usage

- Development: `npm run dev` (uses nodemon for auto-restart)
- Production: `npm start`

The server will run on the specified PORT (default 3000).

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST /api/auth/register**

  - Registers a new user.
  - Body: `{ "name": "string", "email": "string", "password": "string" }`

- **POST /api/auth/login**
  - Logs in a user and returns a JWT token.
  - Body: `{ "email": "string", "password": "string" }`

### Task Routes (`/api/tasks`) - All require authentication

- **POST /api/tasks**

  - Creates a new task.
  - Body: `{ "title": "string", "description": "string", "status": "pending|in-progress|completed" }` (status optional)

- **GET /api/tasks**

  - Retrieves all tasks for the authenticated user.

- **PUT /api/tasks/:id**

  - Updates a task by ID (requires admin or user role).
  - Body: `{ "title": "string", "description": "string", "status": "pending|in-progress|completed" }`

- **DELETE /api/tasks/:id**
  - Deletes a task by ID (requires admin or user role).

## Middleware

- **authMiddleware**: Verifies JWT token for protected routes.
- **roleMiddleware**: Checks user roles for certain operations.

## Models

- **User**: Fields include name, email, password (hashed), role.
- **Task**: Fields include title, description, status, user (reference).

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## License

ISC
