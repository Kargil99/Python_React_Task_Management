import React from 'react';

const ProjectItem = ({ project, onSelect }) => {
    return (
        <div className="project-item" onClick={() => onSelect(project.id)}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <span>{project.tasks.length} tasks</span>
        </div>
    );
};

export default ProjectItem;