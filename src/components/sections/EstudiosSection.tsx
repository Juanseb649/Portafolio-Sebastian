import React from "react";

type Study = {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string;
  image: string;
};

type Language = 'es' | 'en';

interface EstudiosSectionProps {
  language: Language;
}

const EstudiosSection: React.FC<EstudiosSectionProps> = ({ language }) => {
  const sectionTitle = language === 'es' ? 'Estudios y Certificados' : 'Education & Certificates';
  const studies = language === 'es' ? studiesEs : studiesEn;

  return (
    <section id="estudios" className="bg-transparent text-slate-100 py-20"> 
      <style>{`
        @keyframes studiesTyping {
          0%, 8% { width: 0; }
          42%, 70% { width: 23ch; }
          92%, 100% { width: 0; }
        }

        @keyframes blink {
          0%, 50% { border-color: #4f46e5; }
          50.01%, 100% { border-color: transparent; }
        }

        .studies-typing {
          display: inline-block;
          width: 0;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #4f46e5;
          padding-right: 6px;
          animation: studiesTyping 7s steps(23, end) infinite, blink 0.8s step-end infinite;
        }

        @media (max-width: 768px) {
          .studies-typing {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-50 font-mono text-left md:text-left">
          <span className="studies-typing inline-block">{sectionTitle}</span>
        </h2>

        <div className="space-y-12">
          {studies.map((study) => (
            <article
              key={study.id}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 pb-12 border-b border-slate-700/70 last:border-b-0 hover:bg-slate-900/30 transition-colors duration-300 rounded-2xl p-4"
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-40 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              />

              <div>
                <div className="flex items-center gap-3 text-sm text-slate-300 flex-wrap">
                  <span className="font-medium">{study.date}</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 font-medium">
                    {study.institution}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold text-slate-50 hover:text-indigo-300 transition-colors duration-200 cursor-pointer">
                  {study.title}
                </h3>

                <p className="mt-2 text-slate-300 leading-relaxed">
                  {study.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EstudiosSection;

const studiesEs: Study[] = [
  {
    id: 1,
    title: "Ingeniería de Software",
    institution: "Universidad Cooperativa de Colombia",
    date: "2024 - Actualidad",
    description:
      "Formación profesional en ingeniería de desarrollo de software.",
    image: "https://imgs.search.brave.com/eVwraWY64omVhKUqqoUt2_lE0B8vcbjJ36Hly84Kpy0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMXlq/am5weDBwNTNzOC5j/bG91ZGZyb250Lm5l/dC9zdHlsZXMvbG9n/by10aHVtYm5haWwv/czMvMTEyMDEzL3Vu/aXZlcnNpZGFkX2Nv/b3BlcmF0aXZhX2Rl/X2NvbG9tYmlhXzAu/cG5nP2l0b2s9ZllB/akRLNS0",
  },
  {
    id: 2,
    title: "Google Cloud Fundamentals",
    institution: "Google Cloud",
    date: "2025",
    description:
      "Curso introductorio a los servicios y herramientas de Google Cloud.",
    image: "https://imgs.search.brave.com/ooUX0WcWqSyy_n4JJkkkhJgIkufY3jBzG4UZimRVT4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3JlZGx5LmNv/bS9pbWFnZXMvNGRk/YThhZTQtOTllZS00/NzZjLWJjYTMtNmYw/YWRiYWI0MmZlL2lt/YWdlLnBuZw",
  },
  {
    id: 3,
    title: "EF SET English Certificate 54/100 (B2 Upper Intermediate)",
    institution: "EF Education First",
    date: "2025",
    description: "EF education first es una de las instituciones más reconocidas a nivel mundial en la enseñanza del idioma inglés. Obtuve una puntuación de 54/100, lo que me sitúa en el nivel B2 (Upper Intermediate) según el Marco Común Europeo de Referencia para las Lenguas (MCER). Este nivel indica que puedo comprender las ideas principales de textos complejos, interactuar con hablantes nativos con fluidez y producir textos claros y detallados sobre una amplia gama de temas.",
    image: "https://imgs.search.brave.com/yEYAqM9wUWFSd6ypjZlRH8LQPC7KXEnByymLx8WxF48/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzU1/MjhmMGY1ZTRiMDg5/ZjY4NzI4NTNiMi8x/NTAzNjcwMjgwMzYx/LVRFRUZWRTgyMEw4/SVNHUFgyUjBJL0Fu/ZGVycytOb3JkX0VG/X0JyYW5kK2lkZW50/aXR5XzEucG5n"
  },
];

const studiesEn: Study[] = [
  {
    id: 1,
    title: "Software Engineering",
    institution: "Universidad Cooperativa de Colombia",
    date: "2024 - Present",
    description: "Professional education in software development engineering.",
    image: "https://imgs.search.brave.com/eVwraWY64omVhKUqqoUt2_lE0B8vcbjJ36Hly84Kpy0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMXlq/am5weDBwNTNzOC5j/bG91ZGZyb250Lm5l/dC9zdHlsZXMvbG9n/by10aHVtYm5haWwv/czMvMTEyMDEzL3Vu/aXZlcnNpZGFkX2Nv/b3BlcmF0aXZhX2Rl/X2NvbG9tYmlhXzAu/cG5nP2l0b2s9ZllB/akRLNS0",
  },
  {
    id: 2,
    title: "Google Cloud Fundamentals",
    institution: "Google Cloud",
    date: "2025",
    description: "Introductory course on Google Cloud services and tools.",
    image: "https://imgs.search.brave.com/ooUX0WcWqSyy_n4JJkkkhJgIkufY3jBzG4UZimRVT4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3JlZGx5LmNv/bS9pbWFnZXMvNGRk/YThhZTQtOTllZS00/NzZjLWJjYTMtNmYw/YWRiYWI0MmZlL2lt/YWdlLnBuZw",
  },
  {
    id: 3,
    title: "EF SET English Certificate 54/100 (B2 Upper Intermediate)",
    institution: "EF Education First",
    date: "2025",
    description:
      "EF Education First is one of the most recognized institutions worldwide for English language education. I scored 54/100, which places me at B2 (Upper Intermediate) according to CEFR. This level means I can understand the main ideas of complex texts, interact with native speakers with fluency, and produce clear and detailed writing on a wide range of topics.",
    image: "https://imgs.search.brave.com/yEYAqM9wUWFSd6ypjZlRH8LQPC7KXEnByymLx8WxF48/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzU1/MjhmMGY1ZTRiMDg5/ZjY4NzI4NTNiMi8x/NTAzNjcwMjgwMzYx/LVRFRUZWRTgyMEw4/SVNHUFgyUjBJL0Fu/ZGVycytOb3JkX0VG/X0JyYW5kK2lkZW50/aXR5XzEucG5n",
  },
];