import React from 'react';
import { Project } from '../../types';

type Language = 'es' | 'en';

interface ProjectsSectionProps {
  language: Language;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ language }) => {

  const projects: Project[] = [
    {
      id: '1',
      title: 'SATRAA- Empopasto',
      description:
        language === 'es'
          ? 'SATRAA es una aplicación web que permite gestionar y supervisar el control de trabajos de alcantarillado en la ciudad de Pasto-Nariño.'
          : 'SATRAA is a web application used to manage and monitor sewer maintenance operations in Pasto-Narino.',
      technologies: ['Java','Springboot']
    },

    {
      id: '2',
      title: 'A&C Soluciones en TI Landing Page ',
      description:
        language === 'es'
          ? 'Landing page corporativa enfocada en presentar servicios TI y mejorar el contacto comercial.'
          : 'Corporate landing page focused on presenting IT services and improving lead generation.',
      technologies: ['JavaScript'],
      liveUrl: 'https://www.aycsolucionesenti.com/',
    },


    
  ];

  return (
    <section id="proyectos" className="projects-section">
      <div className="container">
        <h2 className="section-title">{language === 'es' ? 'Proyectos' : 'Projects'}</h2>
        <p className="section-subtitle">
          {language === 'es'
            ? 'Algunos de los proyectos en los que he trabajado'
            : 'Some of the projects I have worked on'}
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
                    {language === 'es' ? 'Visitar A&C Soluciones en TI' : 'Visit A&C IT Solutions'}
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

