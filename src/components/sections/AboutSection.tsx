import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes typing {
          0%, 5% { content: "S"; }
          5%, 10% { content: "So"; }
          10%, 15% { content: "Sob"; }
          15%, 20% { content: "Sobr"; }
          20%, 25% { content: "Sobre"; }
          25%, 30% { content: "Sobre "; }
          30%, 35% { content: "Sobre M"; }
          35%, 40% { content: "Sobre Mí"; }
          40%, 90% { content: "Sobre Mí"; }
          90%, 92% { content: "Sobre M"; }
          92%, 94% { content: "Sobre "; }
          94%, 96% { content: "Sobre"; }
          96%, 98% { content: "Sobr"; }
          98%, 100% { content: "Sob"; }
        }

        @keyframes blink {
          0%, 50% { border-color: #3b82f6; }
          50.01%, 100% { border-color: transparent; }
        }

        .about-section {
          padding: 100px 20px;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          min-height: 60vh;
          display: flex;
          align-items: center;
        }

        .about-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color: #1f2937;
          font-family: 'Courier New', monospace;
          position: relative;
        }

        .typing-wrapper {
          display: inline-block;
          position: relative;
        }

        .typing-wrapper::after {
          content: "S";
          display: inline-block;
          border-right: 3px solid #3b82f6;
          padding-right: 5px;
          animation: typing 4s steps(1) infinite, blink 0.8s step-end infinite;
          white-space: nowrap;
        }

        .about-text {
          max-width: 700px;
          margin: 0 auto;
        }

        .about-text p {
          margin-bottom: 1.5rem;
          line-height: 1.9;
          color: #4b5563;
          font-size: 1.125rem;
          text-align: left;
        }

        .about-text p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 60px 20px;
          }

          .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .about-text p {
            font-size: 1rem;
            text-align: justify;
          }
        }
      `}</style>

      <section id="sobre-mi" className="about-section">
        <div className="about-container">
          <h2 className="section-title">
            <span className="typing-wrapper"></span>
          </h2>
          <div className="about-text">
            <p>
              Soy Ingeniero de Software con experiencia como desarrollador freelance, enfocado en documentación técnica 
              y pruebas de calidad (QA), trabajando bajo metodologías ágiles como SCRUM. Mi pasión está en crear 
              soluciones de software de alta calidad, escalables y mantenibles.
            </p>
            <p>
              Mi trabajo incluye la elaboración de documentación técnica completa, análisis y definición de requerimientos 
              funcionales y no funcionales, así como la ejecución de pruebas manuales y automatizadas para garantizar 
              la calidad del software. Colaboro activamente con equipos de desarrollo para priorizar correcciones y 
              mejorar continuamente la experiencia del usuario.
            </p>
            <p>
              Mi enfoque se basa en código limpio, buenas prácticas de desarrollo y trabajo colaborativo en equipo. 
              Disfruto aprendiendo nuevas tecnologías y enfrentando desafíos que me permitan crecer profesionalmente, 
              siempre comprometido con la calidad del software y la mejora continua.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;