# TASKIN - Python_React_Task_Management


This is a fullstack Task Management Application built with Flask for the backend and React for the frontend. The application allows users to manage tasks, user accounts, and project details with an interactive UI that supports drag-and-drop functionality.

## Project Structure

```
task-management-app
├── backend
│   ├── app.py               # Entry point for the backend application
│   ├── models.py            # Data models for tasks, users, and projects
│   ├── routes.py            # RESTful API route definitions
│   ├── requirements.txt      # Backend dependencies
│   └── README.md            # Documentation for the backend
├── frontend
│   ├── src
│   │   ├── App.js           # Main component of the React application
│   │   ├── index.js         # Entry point for the React application
│   │   ├── api
│   │   │   └── api.js       # API call functions
│   │   ├── components
│   │   │   ├── TaskList.js  # Component to display a list of tasks
│   │   │   ├── TaskItem.js  # Component for individual task representation
│   │   │   ├── ProjectList.js# Component to display a list of projects
│   │   │   ├── ProjectItem.js# Component for individual project representation
│   │   │   └── UserAccount.js# Component for user account management
│   │   ├── context
│   │   │   └── AppContext.js# Context for managing global state
│   │   ├── hooks
│   │   │   └── useDragAndDrop.js # Custom hook for drag-and-drop functionality
│   │   └── styles
│   │       └── App.css      # CSS styles for the application
│   ├── public
│   │   └── index.html       # Main HTML file for the React application
│   ├── package.json         # Configuration file for npm
│   └── README.md            # Documentation for the frontend
└── README.md                # Overview of the entire project
```

## Getting Started

### Backend Setup

1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the Flask application:
   ```
   python app.py
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Features

- User authentication and account management
- Task management with drag-and-drop functionality
- Project management with associated tasks
- RESTful APIs for seamless communication between frontend and backend

## License

This project is licensed under the MIT License.
