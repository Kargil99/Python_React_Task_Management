# FILE: /task-management-app/task-management-app/backend/README.md

# Task Management Application - Backend

## Overview
This is the backend for the Task Management Application, built using Flask. It provides RESTful APIs for managing tasks, user accounts, and project details.

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd task-management-app/backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv task_managementenv
   source venv/bin/activate  # On Windows use `task_managementenv\Scripts\activate
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```
   python app.py
   ```

   The backend will be running on `http://127.0.0.1:5000`.

## API Endpoints

### User Accounts
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in an existing user.
- **GET /api/users/:id**: Get user details.

### Projects
- **GET /api/projects**: Retrieve all projects.
- **POST /api/projects**: Create a new project.
- **GET /api/projects/:id**: Get project details.
- **PUT /api/projects/:id**: Update a project.
- **DELETE /api/projects/:id**: Delete a project.

### Tasks
- **GET /api/tasks**: Retrieve all tasks.
- **POST /api/tasks**: Create a new task.
- **GET /api/tasks/:id**: Get task details.
- **PUT /api/tasks/:id**: Update a task.
- **DELETE /api/tasks/:id**: Delete a task.

## Usage Examples
- To register a user, send a POST request to `/api/users/register` with the user details in the request body.
- To fetch all tasks, send a GET request to `/api/tasks`.

## License
This project is licensed under the MIT License.