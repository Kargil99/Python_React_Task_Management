import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import KanbanBoard from './components/KanbanBoard';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Task Management Application</h1>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/kanban" element={<KanbanBoard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;