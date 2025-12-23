import React from 'react';
import { Project } from '../../types';

const ProjectsSection: React.FC = () => {
  // Datos de ejemplo - puedes reemplazarlos con tus proyectos reales
  const projects: Project[] = [
    {
      id: '1',
      title: 'Proyecto 01',
      description: '',
      technologies: [''],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: '2',
      title: 'Proyecto 02 ',
      description: '',
      technologies: [''],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: '3',
      title: 'Proyecto 03',
      description: '',
      technologies: [''],
      githubUrl: 'https://github.com',
    },
  ];

  return (
    <section id="proyectos" className="projects-section">
      <div className="container">
        <h2 className="section-title">Proyectos</h2>
        <p className="section-subtitle">
          Algunos de los proyectos en los que he trabajado
        </p>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                     
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

