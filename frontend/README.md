# Frontend - Task Management App

A React-based frontend for a task management application with user authentication.

## Features

- User registration and login
- JWT-based authentication with token storage
- Task creation, viewing, updating, and deletion
- Responsive UI with basic styling
- Integration with backend API

## Tech Stack

- React 19
- Vite for build tool
- Axios for HTTP requests
- ESLint for code linting

## Installation

1. Clone the repository.
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`

## Usage

- Development: `npm run dev` (starts Vite dev server)
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

The development server will run on `http://localhost:5173` by default.

## Project Structure

- `src/App.jsx`: Main application component with routing logic
- `src/components/`: React components
  - `Login.jsx`: Login form
  - `Register.jsx`: Registration form
  - `TaskForm.jsx`: Form to create new tasks
  - `TaskList.jsx`: Displays list of tasks with edit/delete options
- `src/services/api.js`: Axios configuration and API functions

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`. It includes:

- Authentication endpoints: `/auth/register`, `/auth/login`
- Task endpoints: `/tasks` (GET, POST), `/tasks/:id` (PUT, DELETE)

JWT tokens are stored in localStorage and automatically included in API requests.

## Components Overview

- **App**: Manages authentication state and renders appropriate views
- **Login/Register**: Handle user authentication
- **TaskForm**: Allows creating new tasks
- **TaskList**: Displays tasks and provides update/delete functionality

## Environment Setup

Ensure the backend server is running on `http://localhost:3000` for full functionality.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## License

ISC

## login

<!--First user -->

"name": "Sufiyan",
"email": "sufiyan@gmail.com",
"password": "123456"

<!-- Second User -->

"name": "Munsi",
"email": "munsi@gmail.com",
"password": "munsi123"
