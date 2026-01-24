import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes aboutTyping {
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

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .about-section {
          padding: 100px 20px;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          min-height: 60vh;
          display: flex;
          align-items: center;
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .about-content {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .about-text-container {
          flex: 1;
          animation: slideInLeft 1s ease-out;
        }

        .about-image {
          flex: 0 0 300px;
          animation: slideInRight 1s ease-out;
        }

        .about-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #1f2937;
          font-family: 'Courier New', monospace;
          text-align: left;
        }

        .about-typing {
          display: inline-block;
        }

        .about-typing::after {
          content: "S";
          border-right: 3px solid #3b82f6;
          padding-right: 5px;
          animation: aboutTyping 4s steps(1) infinite, blink 0.8s step-end infinite;
          white-space: nowrap;
        }

        .about-text {
          max-width: 700px;
        }

        .about-text p {
          margin-bottom: 1.5rem;
          line-height: 1.9;
          color: #4b5563;
          font-size: 1.125rem;
        }

        @media (max-width: 768px) {
          .about-content {
            flex-direction: column;
            gap: 2rem;
          }

          .section-title {
            text-align: center;
            font-size: 2rem;
          }

          .about-text p {
            font-size: 1rem;
            text-align: justify;
          }
        }
      `}</style>

      <section id="sobre-mi" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text-container">
              <h2 className="section-title">
                <span className="about-typing"></span>
              </h2>

              <div className="about-text">
                <p>
                  Soy Ingeniero de Software con experiencia como desarrollador freelance,
                  enfocado en documentación técnica y pruebas de calidad (QA), trabajando
                  bajo metodologías ágiles como SCRUM.
                </p>
                <p>
                  Mi trabajo incluye documentación técnica, análisis de requerimientos
                  funcionales y no funcionales, así como pruebas manuales y automatizadas.
                </p>
                <p>
                  Me enfoco en código limpio, buenas prácticas y trabajo colaborativo,
                  siempre comprometido con la calidad del software.
                </p>
              </div>
            </div>

            <div className="about-image">
              <img
                src="https://www.clipartmax.com/png/middle/47-471561_club-penguin-clip-art-pinguino-de-club-penguin.png"
                alt="Tu foto de perfil"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
