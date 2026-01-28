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

        .about-typing::after {
          content: "S";
          border-right: 3px solid #3b82f6;
          padding-right: 5px;
          animation: aboutTyping 4s steps(1) infinite, blink 0.8s step-end infinite;
          white-space: nowrap;
        }

        .slide-in-left {
          animation: slideInLeft 1s ease-out;
        }

        .slide-in-right {
          animation: slideInRight 1s ease-out;
        }
      `}</style>

      <section 
        id="sobre-mi" 
        className="py-24 px-5 bg-gradient-to-br from-gray-50 to-white min-h-[60vh] flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-16 flex-col md:flex-row">
            {/* Texto */}
            <div className="flex-1 slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 font-mono text-left md:text-left">
                <span className="about-typing inline-block"></span>
              </h2>

              <div className="max-w-2xl">
                <p className="mb-6 leading-relaxed text-gray-600 text-lg">
                  Soy Ingeniero de Software con experiencia como desarrollador freelance,
                  enfocado en documentación técnica y pruebas de calidad (QA), trabajando
                  bajo metodologías ágiles como SCRUM.
                </p>
                <p className="mb-6 leading-relaxed text-gray-600 text-lg">
                  Mi trabajo incluye documentación técnica, análisis de requerimientos
                  funcionales y no funcionales, así como pruebas manuales y automatizadas.
                </p>
                <p className="mb-6 leading-relaxed text-gray-600 text-lg">
                  Me enfoco en código limpio, buenas prácticas y trabajo colaborativo,
                  siempre comprometido con la calidad del software.
                </p>
              </div>
            </div>

            {/* Imagen */}
            <div className="flex-none w-full md:w-[300px] slide-in-right">
              <img
                src="https://www.clipartmax.com/png/middle/47-471561_club-penguin-clip-art-pinguino-de-club-penguin.png"
                alt="Tu foto de perfil"
                className="w-full h-[300px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;