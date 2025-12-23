import React from 'react';
import { Project } from '../../types';

const ProjectsSection: React.FC = () => {

  const projects: Project[] = [
    {
      id: '1',
      title: 'SATRAA- Empopasto',
      description: 'SATRAA es una aplicacion web, permite gestionar y supervisar el control de trabajos de alcantarillado en la ciudad de Pasto-Nariño ',
      technologies: ['Java','Springboot']
    },

    {
      id: '2',
      title: 'A&C Soluciones en TI Landing Page ',
      description: '',
      technologies: ['JavaScript'],
      liveUrl: 'https://www.aycsolucionesenti.com/',
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
                {project.id === '2' && (
                  <a
                    href="https://www.aycsolucionesenti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ac-button"
                  >
                    Visitar A&C Soluciones en TI
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

