import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskItem = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task-item"
                >
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <span>Status: {task.status}</span>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;