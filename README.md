

# Task Manager Web Application

This project is a small web application for managing a list of tasks. It includes both front-end and back-end components.

## Features

### Front-End
- Display a list of tasks with title, description, and completion status.
- Add, edit, delete, and mark tasks as completed or not completed.
- Responsive design for desktop and mobile devices.
- also i add login system and admin panel.

### admin email and password
- adminjobayer@gmail.com
- admin123




### Back-End
- RESTful API endpoints to manage tasks.
- Persistent storage using a relational database.
- Basic security measures implemented.

## Technologies Used

- **Front-End**: React.js.
- **Back-End**: Node.js with Express.js
- **Database**: mongodb
- **CSS Framework**: Tailwind CSS

## Setup Instructions

### Installation

1. Clone the repository from GitHub:

   ```
   git clone <repository_url>
  
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



### Running the Application

1. Start the back-end server:

   ```bash
   
    nodemon index.js
   ```

   The server should start on `http://localhost:7000`.

2. Start the front-end application:

   ```bash
   
   npm run dev
   ```

   The front-end should open in your default browser at `http://localhost:5173`.

## API Documentation

### Endpoints

- `GET /tasks`: Retrieve all tasks.
- `GET /tasks/:id`: Retrieve a specific task by ID.
- `POST /tasks`: Create a new task.
- `PUT /tasks/update/:id`: Update an existing task by ID.
- `DELETE /tasks/delete/:id`: Delete a task by ID.
- `PUT /tasks/toggle/:id`: Mark a task as completed by ID.


### Example Usage


## Deployment

The application is deployed on Heroku at [https://task-b1ed3.web.app/](https://task-b1ed3.web.app/).

