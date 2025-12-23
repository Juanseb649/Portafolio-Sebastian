import React from 'react';
import { Skill } from '../../types';

const SkillsSection: React.FC = () => {
  // Datos de ejemplo - personaliza con tus habilidades reales
  const skills: Skill[] = [
    { name: 'React', level: 'advanced', category: 'frontend' },
    { name: 'TypeScript', level: 'advanced', category: 'frontend' },
    { name: 'JavaScript', level: 'advanced', category: 'frontend' },
    { name: 'HTML/CSS', level: 'advanced', category: 'frontend' },
    { name: 'Node.js', level: 'intermediate', category: 'backend' },
    { name: 'Python', level: 'intermediate', category: 'backend' },
    { name: 'Git', level: 'advanced', category: 'tools' },
    { name: 'Vite', level: 'intermediate', category: 'tools' },
  ];

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'advanced':
        return '#4ade80';
      case 'intermediate':
        return '#fbbf24';
      case 'beginner':
        return '#60a5fa';
      default:
        return '#9ca3af';
    }
  };

  const getLevelLabel = (level: Skill['level']) => {
    switch (level) {
      case 'advanced':
        return 'Avanzado';
      case 'intermediate':
        return 'Intermedio';
      case 'beginner':
        return 'Principiante';
      default:
        return level;
    }
  };

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
                <h3 className="skill-name">{skill.name}</h3>
                <span
                  className="skill-level"
                  style={{ color: getLevelColor(skill.level) }}
                >
                  {getLevelLabel(skill.level)}
                </span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{
                    width:
                      skill.level === 'advanced'
                        ? '100%'
                        : skill.level === 'intermediate'
                        ? '70%'
                        : '40%',
                    backgroundColor: getLevelColor(skill.level),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

