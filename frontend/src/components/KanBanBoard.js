import React from 'react';
import './KanbanBoard.css';

const KanbanBoard = ({ tasks, updateTask }) => {
    const handleDrop = (e, status) => {
        const id = e.dataTransfer.getData('id');
        const task = tasks.find(task => task.id === id);
        const updatedTask = { ...task, status };
        updateTask(id, updatedTask);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };

    const renderTasks = (status) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (
                <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="kanban-task"
                >
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                </div>
            ));
    };

    return (
        <div className="kanban-board">
            <div
                className="kanban-column"
                onDrop={(e) => handleDrop(e, 'To Do')}
                onDragOver={handleDragOver}
            >
                <h3>To Do</h3>
                {renderTasks('To Do')}
            </div>
            <div
                className="kanban-column"
                onDrop={(e) => handleDrop(e, 'In Progress')}
                onDragOver={handleDragOver}
            >
                <h3>In Progress</h3>
                {renderTasks('In Progress')}
            </div>
            <div
                className="kanban-column"
                onDrop={(e) => handleDrop(e, 'Done')}
                onDragOver={handleDragOver}
            >
                <h3>Done</h3>
                {renderTasks('Done')}
            </div>
        </div>
    );
};

export default KanbanBoard;