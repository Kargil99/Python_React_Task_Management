import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api/api';
import ProjectItem from './ProjectItem';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        getProjects();
    }, []);

    if (loading) {
        return <div>Loading projects...</div>;
    }

    return (
        <div className="project-list">
            {projects.length === 0 ? (
                <p>No projects available.</p>
            ) : (
                projects.map(project => (
                    <ProjectItem key={project.id} project={project} />
                ))
            )}
        </div>
    );
};

export default ProjectList;