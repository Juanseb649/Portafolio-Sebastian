import React from "react";

type Study = {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string;
  image: string;
};

const EstudiosSection: React.FC = () => {
  return (
    <section id="Estudios" className="bg-zinc-0 text-black py-20"> 
      <style>{`
        @keyframes studiesTyping {
          0%, 5% { content: "E"; }
          5%, 10% { content: "Es"; }
          10%, 15% { content: "Est"; }
          15%, 20% { content: "Estu"; }
          20%, 25% { content: "Estud"; }
          25%, 30% { content: "Estudi"; }
          30%, 35% { content: "Estudio"; }
          35%, 40% { content: "Estudios"; }
          40%, 42% { content: "Estudios "; }
          42%, 44% { content: "Estudios y"; }
          44%, 46% { content: "Estudios y "; }
          46%, 48% { content: "Estudios y C"; }
          48%, 50% { content: "Estudios y Ce"; }
          50%, 52% { content: "Estudios y Cer"; }
          52%, 54% { content: "Estudios y Cert"; }
          54%, 56% { content: "Estudios y Certi"; }
          56%, 58% { content: "Estudios y Certif"; }
          58%, 60% { content: "Estudios y Certifi"; }
          60%, 62% { content: "Estudios y Certific"; }
          62%, 64% { content: "Estudios y Certifica"; }
          64%, 66% { content: "Estudios y Certificad"; }
          66%, 68% { content: "Estudios y Certificado"; }
          68%, 70% { content: "Estudios y Certificados"; }
          70%, 85% { content: "Estudios y Certificados"; }
          /* Borrado rápido */
          85%, 86% { content: "Estudios y Certificado"; }
          86%, 87% { content: "Estudios y Certificad"; }
          87%, 88% { content: "Estudios y Certifica"; }
          88%, 89% { content: "Estudios y Certific"; }
          89%, 90% { content: "Estudios y Certifi"; }
          90%, 91% { content: "Estudios y Certif"; }
          91%, 92% { content: "Estudios y Certi"; }
          92%, 93% { content: "Estudios y Cert"; }
          93%, 94% { content: "Estudios y Cer"; }
          94%, 95% { content: "Estudios y Ce"; }
          95%, 96% { content: "Estudios y C"; }
          96%, 97% { content: "Estudios y "; }
          97%, 98% { content: "Estudios y"; }
          98%, 99% { content: "Estudios "; }
          99%, 100% { content: "Estudios"; }
          100% { content: "E"; }
        }

        @keyframes blink {
          0%, 50% { border-color: #4f46e5; }
          50.01%, 100% { border-color: transparent; }
        }

        .studies-typing::after {
          content: "E";
          border-right: 3px solid #4f46e5;
          padding-right: 6px;
          animation: studiesTyping 6s steps(1) infinite, blink 0.8s step-end infinite;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .studies-typing {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-14">
          <span className="studies-typing inline-block"></span>
        </h2>

        <div className="space-y-12">
          {studies.map((study) => (
            <article
              key={study.id}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 pb-12 border-b border-zinc-300 last:border-b-0 hover:bg-zinc-50 transition-colors duration-300 rounded-lg p-4"
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-40 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              />

              <div>
                <div className="flex items-center gap-3 text-sm text-zinc-600 flex-wrap">
                  <span className="font-medium">{study.date}</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                    {study.institution}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold hover:text-indigo-600 transition-colors duration-200 cursor-pointer">
                  {study.title}
                </h3>

                <p className="mt-2 text-zinc-600 leading-relaxed">
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

const studies: Study[] = [
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