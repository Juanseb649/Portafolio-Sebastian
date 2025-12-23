import React from 'react';
import { Skill } from '../../types';

const SkillsSection: React.FC = () => {
  // Función para obtener el logo de cada tecnología
  const getSkillLogo = (name: string): string => {
    const logoMap: { [key: string]: string } = {
      'React': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
      'TypeScript': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
      'JavaScript': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg',
      'HTML/CSS': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg',
      'Java': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/java.svg',
      'Springboot': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spring.svg',
      'Python': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg',
      'Git': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg',
    };
    return logoMap[name] || '';
  };

  // Datos de ejemplo - personaliza con tus habilidades reales
  const skills: Skill[] = [
    { name: 'React', level: 'advanced', category: 'frontend' },
    { name: 'TypeScript', level: 'advanced', category: 'frontend' },
    { name: 'JavaScript', level: 'advanced', category: 'frontend' },
    { name: 'HTML/CSS', level: 'advanced', category: 'frontend' },
    { name: 'Java', level: 'intermediate', category: 'backend' },
    { name: 'Springboot', level: 'intermediate', category: 'backend' },
    { name: 'Python', level: 'intermediate', category: 'backend' },
    { name: 'Git', level: 'advanced', category: 'tools' },
  ];

  return (
    <section id="habilidades" className="skills-section">
      <div className="container">
        <h2 className="section-title">Habilidades</h2>
        <p className="section-subtitle">
          Tecnologías y herramientas que domino
        </p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <img 
                  src={getSkillLogo(skill.name)} 
                  alt={skill.name}
                  className="skill-logo"
                />
                <h3 className="skill-name">{skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

