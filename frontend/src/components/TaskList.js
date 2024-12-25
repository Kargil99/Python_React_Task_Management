import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask, getKanbanView, getGanttView, getCalendarView } from '../api';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
    const [editingTask, setEditingTask] = useState(null);
    const [editingTaskData, setEditingTaskData] = useState({ title: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
    const [view, setView] = useState('list');

    useEffect(() => {
        const getTasks = async () => {
            const tasks = await fetchTasks();
            setTasks(tasks);
        };
        getTasks();
    }, []);

    const handleAddTask = async () => {
        if (newTask.title.trim()) {
            const task = { ...newTask, id: Date.now().toString(), completed: false };
            const addedTask = await addTask(task);
            setTasks([...tasks, addedTask]);
            setNewTask({ title: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
        }
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setEditingTaskData(task);
    };

    const handleUpdateTask = async () => {
        if (editingTaskData.title.trim()) {
            const updatedTask = { ...editingTask, ...editingTaskData };
            await updateTask(editingTask.id, updatedTask);
            setTasks(tasks.map(task => (task.id === editingTask.id ? updatedTask : task)));
            setEditingTask(null);
            setEditingTaskData({ title: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setEditingTaskData({ title: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
    };

    const handleViewChange = async (view) => {
        setView(view);
        let tasks;
        if (view === 'kanban') {
            tasks = await getKanbanView();
        } else if (view === 'gantt') {
            tasks = await getGanttView();
        } else if (view === 'calendar') {
            tasks = await getCalendarView();
        } else {
            tasks = await fetchTasks();
        }
        setTasks(tasks);
    };

    return (
        <div className="task-list">
            <h2>Task List</h2>
            <div className="task-input">
                <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task Title"
                />
                <input
                    type="text"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task Description"
                />
                <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="view-buttons">
                <button onClick={() => handleViewChange('list')}>List View</button>
                <button onClick={() => handleViewChange('kanban')}>Kanban View</button>
                <button onClick={() => handleViewChange('gantt')}>Gantt View</button>
                <button onClick={() => handleViewChange('calendar')}>Calendar View</button>
            </div>
            {view === 'kanban' ? (
                <div className="kanban-view">
                    <div className="kanban-column">
                        <h3>To Do</h3>
                        {tasks.to_do.map(task => (
                            <div key={task.id} className="kanban-task">
                                <span>{task.title}</span>
                                <span>{task.description}</span>
                                <span>{task.dueDate}</span>
                                <span>{task.priority}</span>
                                <button onClick={() => handleEditTask(task)}>Edit</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <div className="kanban-column">
                        <h3>In Progress</h3>
                        {tasks.in_progress.map(task => (
                            <div key={task.id} className="kanban-task">
                                <span>{task.title}</span>
                                <span>{task.description}</span>
                                <span>{task.dueDate}</span>
                                <span>{task.priority}</span>
                                <button onClick={() => handleEditTask(task)}>Edit</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <div className="kanban-column">
                        <h3>Done</h3>
                        {tasks.done.map(task => (
                            <div key={task.id} className="kanban-task">
                                <span>{task.title}</span>
                                <span>{task.description}</span>
                                <span>{task.dueDate}</span>
                                <span>{task.priority}</span>
                                <button onClick={() => handleEditTask(task)}>Edit</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : view === 'gantt' ? (
                <div className="gantt-view">
                    {tasks.map(task => (
                        <div key={task.id} className="gantt-task">
                            <span>{task.title}</span>
                            <span>{task.description}</span>
                            <span>{task.dueDate}</span>
                            <span>{task.priority}</span>
                            <button onClick={() => handleEditTask(task)}>Edit</button>
                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            ) : view === 'calendar' ? (
                <div className="calendar-view">
                    {Object.keys(tasks).map(date => (
                        <div key={date} className="calendar-day">
                            <h3>{date}</h3>
                            {tasks[date].map(task => (
                                <div key={task.id} className="calendar-task">
                                    <span>{task.title}</span>
                                    <span>{task.description}</span>
                                    <span>{task.dueDate}</span>
                                    <span>{task.priority}</span>
                                    <button onClick={() => handleEditTask(task)}>Edit</button>
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <ul>
                    {tasks.length === 0 ? (
                        <li>No tasks available</li>
                    ) : (
                        tasks.map(task => (
                            <li key={task.id}>
                                {editingTask && editingTask.id === task.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editingTaskData.title}
                                            onChange={(e) => setEditingTaskData({ ...editingTaskData, title: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            value={editingTaskData.description}
                                            onChange={(e) => setEditingTaskData({ ...editingTaskData, description: e.target.value })}
                                        />
                                        <input
                                            type="date"
                                            value={editingTaskData.dueDate}
                                            onChange={(e) => setEditingTaskData({ ...editingTaskData, dueDate: e.target.value })}
                                        />
                                        <select
                                            value={editingTaskData.priority}
                                            onChange={(e) => setEditingTaskData({ ...editingTaskData, priority: e.target.value })}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                        <button onClick={handleUpdateTask}>Update</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <span>{task.title}</span>
                                        <span>{task.description}</span>
                                        <span>{task.dueDate}</span>
                                        <span>{task.priority}</span>
                                        <button onClick={() => handleEditTask(task)}>Edit</button>
                                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                    </>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default TaskList;