

# Task Manager Web Application

This project is a small web application for managing a list of tasks. It includes both front-end and back-end components.

## Features

### Front-End
- Display a list of tasks with title, description, and completion status.
- Add, edit, delete, and mark tasks as completed or not completed.
- Responsive design for desktop and mobile devices.

### Back-End
- RESTful API endpoints to manage tasks.
- Persistent storage using a relational database.
- Basic security measures implemented.

## Technologies Used

- **Front-End**: React.js
- **Back-End**: Node.js with Express.js
- **Database**: PostgreSQL
- **CSS Framework**: Bootstrap

## Setup Instructions

### Prerequisites

- Node.js (version >= 12.0.0)
- npm (Node Package Manager)
- PostgreSQL

### Installation

1. Clone the repository from GitHub:

   ```
   git clone <repository_url>
   cd task-manager-app
   ```

2. Install dependencies for both front-end and back-end:

   ```bash
   # Install back-end dependencies
   cd backend
   npm install

   # Install front-end dependencies
   cd ../frontend
   npm install
   ```

3. Set up the database:
   
   - Create a PostgreSQL database named `task_manager`.
   - Configure the database connection in `backend/config/db.config.js`.

4. Seed the database (if necessary):

   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

1. Start the back-end server:

   ```bash
    npm i
    nodemon index.js
   ```

   The server should start on `http://localhost:7000`.

2. Start the front-end application:

   ```bash
   npm i
   npm run dev
   ```

   The front-end should open in your default browser at `http://localhost:3001`.

## API Documentation

### Endpoints

- `GET /api/tasks`: Retrieve all tasks.
- `GET /api/tasks/:id`: Retrieve a specific task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update an existing task by ID.
- `DELETE /api/tasks/:id`: Delete a task by ID.

### Example Usage

- **GET /api/tasks**

  ```bash
  curl http://localhost:3000/api/tasks
  ```

- **POST /api/tasks**

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"title":"Task 1","description":"This is task 1","completed":false}' http://localhost:3000/api/tasks
  ```

## Deployment

The application is deployed on Heroku at [example-app.herokuapp.com](https://example-app.herokuapp.com).

