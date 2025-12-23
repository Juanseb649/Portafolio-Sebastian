import React, { useEffect, useRef, useState } from 'react';

const AboutSection: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsImageVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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
          0%, 50% { border-color: #000; }
          50.01%, 100% { border-color: transparent; }
        }

        .about-section {
          padding: 80px 20px;
          background-color: #f8f9fa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 50px;
          color: #000;
          font-family: 'Courier New', monospace;
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .typing-wrapper {
          display: inline-block;
          position: relative;
        }

        .typing-wrapper::after {
          content: "S";
          display: inline-block;
          border-right: 3px solid #000;
          padding-right: 5px;
          animation: typing 4s steps(1) infinite, blink 0.8s step-end infinite;
          white-space: nowrap;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }

        .about-text p {
          margin-bottom: 20px;
          line-height: 1.8;
          color: #555;
          font-size: 1.1rem;
        }

        .about-highlights {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .highlight-item {
          padding: 15px;
          background-color: #fff;
          border-left: 4px solid #007bff;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .highlight-item strong {
          color: #007bff;
          display: block;
          margin-bottom: 5px;
        }

        .about-image {
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .about-image.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .tux-gif {
          max-width: 100%;
          height: auto;
          border-radius: 80px;
          box-shadow: 0 80px 30px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }

          .about-image {
            margin-top: 30px;
          }
        }
      `}</style>

      <section id="sobre-mi" className="about-section">
        <div className="container">
          <h2 className="section-title">
            <span className="typing-wrapper"></span>
          </h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Soy un desarrollador apasionado por brindar soluciones de software de alta calidad y escalables.
                Como Ingeniero, busco crear aplicaciones que sean eficientes, mantenibles y escalables.
                Mi enfoque principal es en la ingeniería en nube y el análisis de software
              </p>
              <p>
                Disfruto aprendiendo nuevas tecnologías y enfrentando desafíos que me permitan
                crecer profesionalmente. Mi objetivo es brindar soluciones escalables, mantenibles
                y con excelente experiencia de usuario.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <strong>Experiencia:</strong> Planteamiento de ingeniería de requerimientos con metodologías ágiles y análisis
                  para el desarrollo de una aplicación web y móviles
                </div>
                <div className="highlight-item">
                  <strong>Enfoque:</strong> Código limpio, buenas prácticas y trabajo en equipo
                </div>
              </div>
            </div>
            <div
              className={`about-image ${isImageVisible ? 'visible' : ''}`}
              ref={imageContainerRef}
            >
              <img
                src="https://media.tenor.com/_6N6J2xPY_wAAAAj/tux-linux.gif"
                alt="Tux el pingüino siendo mimado"
                className="tux-gif"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;