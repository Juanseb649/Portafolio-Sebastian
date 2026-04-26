import React from 'react';

type Language = 'es' | 'en';

interface AboutSectionProps {
  language: Language;
}

const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const aboutTitle = language === 'es' ? 'Sobre Mí' : 'About Me';

  return (
    <>
      <style>{`
        @keyframes aboutTyping {
          0%, 10% { width: 0; }
          40%, 70% { width: 8ch; }
          92%, 100% { width: 0; }
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

        .about-typing {
          display: inline-block;
          width: 0;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #3b82f6;
          padding-right: 5px;
          animation: aboutTyping 5.2s steps(8, end) infinite, blink 0.8s step-end infinite;
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
        className="py-24 px-5 min-h-[60vh] flex items-center bg-transparent text-slate-100"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="rounded-[2rem] border border-slate-700/70 bg-slate-950/72 shadow-2xl backdrop-blur-xl overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[1.25fr_0.8fr]">
              <div className="slide-in-left p-8 md:p-10 lg:p-12 border-b border-slate-800/80 lg:border-b-0 lg:border-r">
                <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-cyan-200">
                    {language === 'es' ? 'Frontend y QA mindset' : 'Frontend and QA mindset'}
                  </span>
                  <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-violet-200">
                    {language === 'es' ? 'SCRUM y documentación técnica' : 'SCRUM and technical documentation'}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-50 font-mono text-left md:text-left">
                  <span className="about-typing inline-block">{aboutTitle}</span>
                </h2>

                <div className="max-w-3xl space-y-5">
                  <p className="leading-relaxed text-slate-200 text-lg">
                    {language === 'es'
                      ? 'Soy Ingeniero de Software con experiencia como desarrollador freelance, con foco en documentación técnica, análisis funcional y calidad de software dentro de equipos que trabajan con metodologías ágiles.'
                      : 'I am a Software Engineer with freelance development experience, focused on technical documentation, functional analysis, and software quality in agile teams.'}
                  </p>
                  <p className="leading-relaxed text-slate-300 text-lg">
                    {language === 'es'
                      ? 'Mi trabajo combina análisis de requerimientos, pruebas manuales y automatizadas, y una ejecución orientada a código limpio, trazabilidad y colaboración efectiva.'
                      : 'My work combines requirement analysis, manual and automated testing, and delivery focused on clean code, traceability, and effective collaboration.'}
                  </p>
                  <p className="leading-relaxed text-slate-300 text-lg">
                    {language === 'es'
                      ? 'Mi siguiente paso profesional está en la ingeniería cloud: estoy fortaleciendo Linux, fundamentos de infraestructura y principios de escalabilidad para diseñar soluciones más robustas.'
                      : 'My next professional step is cloud engineering: I am strengthening Linux, infrastructure fundamentals, and scalability principles to design more robust solutions.'}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">{language === 'es' ? 'Enfoque' : 'Focus'}</p>
                    <p className="text-sm text-slate-200">{language === 'es' ? 'Calidad, documentación y claridad técnica.' : 'Quality, documentation, and technical clarity.'}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">{language === 'es' ? 'Trabajo' : 'Work'}</p>
                    <p className="text-sm text-slate-200">{language === 'es' ? 'Requerimientos, pruebas y mejora continua.' : 'Requirements, testing, and continuous improvement.'}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">{language === 'es' ? 'Siguiente paso' : 'Next step'}</p>
                    <p className="text-sm text-slate-200">{language === 'es' ? 'Cloud computing e infraestructura escalable.' : 'Cloud computing and scalable infrastructure.'}</p>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-2xl border border-slate-700/60 bg-slate-900/55 backdrop-blur-md shadow-xl">
                  <svg className="w-8 h-8 text-blue-400 mb-2" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h8V14h-6c0-2.2 1.8-4 4-4V8zm12 0c-3.3 0-6 2.7-6 6v10h8V14h-6c0-2.2 1.8-4 4-4V8z"/>
                  </svg>
                  <p className="text-slate-100 italic text-lg leading-relaxed">
                    "You know you're brilliant, but maybe you'd like to understand what you did 2 weeks from now"
                  </p>
                  <p className="text-slate-400 text-sm mt-3 font-medium">
                    — Linus Torvalds
                  </p>
                </div>
              </div>

              <div className="slide-in-right p-8 md:p-10 lg:p-12 flex flex-col justify-center gap-6 bg-gradient-to-br from-slate-900/70 to-slate-950/90">
                <div className="mx-auto w-full max-w-[320px]">
                  <img
                    src="/images/perfil-sebastian.jpeg"
                    alt="foto de perfil"
                    className="w-full h-[320px] object-cover rounded-[1.75rem] border border-slate-700/60 shadow-2xl"
                  />
                </div>

                <div className="mx-auto w-full max-w-[320px] rounded-[1.75rem] border border-slate-700/60 bg-slate-900/70 p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400 mb-3">{language === 'es' ? 'Perfil profesional' : 'Professional profile'}</p>
                  <p className="text-slate-200 leading-relaxed">
                    {language === 'es'
                      ? 'Me interesa construir productos mantenibles, documentados y con criterios claros de calidad. Busco que cada entrega sea comprensible tanto para el equipo actual como para el futuro.'
                      : 'I am interested in building maintainable, well-documented products with clear quality criteria. I aim for each delivery to be understandable for both current and future teams.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;