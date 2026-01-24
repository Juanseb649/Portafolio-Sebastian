import React from "react";

type Study = {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string;
  image: string;
};

const studies: Study[] = [
  {
    id: 1,
    title: "Ingeniería de Software",
    institution: "Universidad Cooperativa de Colombia",
    date: "2021 - Actualidad",
    description:
      "Formación en desarrollo de software, bases de datos, ingeniería de requisitos, pruebas de software y metodologías ágiles.",
    image: "/images/study-1.jpg",
  },
  {
    id: 2,
    title: "Curso de QA y Pruebas de Software",
    institution: "Platzi",
    date: "2023",
    description:
      "Pruebas manuales, documentación técnica, casos de prueba y control de calidad del software.",
    image: "/images/study-2.jpg",
  },
];

const EstudiosSection: React.FC = () => {
  return (
    <section id="Estudios" className="bg-zinc-950 text-white py-20">
      <style>{`
        @keyframes studiesTyping {
          0%, 5% { content: "E"; }
          5%, 10% { content: "Es"; }
          10%, 15% { content: "Estu"; }
          15%, 20% { content: "Estudi"; }
          20%, 25% { content: "Estudio"; }
          25%, 30% { content: "Estudios"; }
          30%, 35% { content: "Estudios y"; }
          35%, 40% { content: "Estudios y Ce"; }
          40%, 45% { content: "Estudios y Cer"; }
          45%, 50% { content: "Estudios y Cert"; }
          50%, 55% { content: "Estudios y Certi"; }
          55%, 60% { content: "Estudios y Certif"; }
          60%, 65% { content: "Estudios y Certifi"; }
          65%, 70% { content: "Estudios y Certific"; }
          70%, 75% { content: "Estudios y Certificac"; }
          75%, 80% { content: "Estudios y Certificaci"; }
          80%, 85% { content: "Estudios y Certificacio"; }
          85%, 90% { content: "Estudios y Certificacion"; }
          90%, 100% { content: "Estudios y Certificaciones"; }
        }

        @keyframes blink {
          0%, 50% { border-color: white; }
          50.01%, 100% { border-color: transparent; }
        }

        .studies-typing::after {
          content: "E";
          border-right: 3px solid white;
          padding-right: 6px;
          animation: studiesTyping 4s steps(1) infinite, blink 0.8s infinite;
          white-space: nowrap;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold font-mono mb-14">
          <span className="studies-typing"></span>
        </h2>

        <div className="space-y-12">
          {studies.map((study) => (
            <article
              key={study.id}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 pb-12 border-b border-zinc-800"
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-40 object-cover rounded-xl"
              />

              <div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <span>{study.date}</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    {study.institution}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold hover:text-indigo-400 transition">
                  {study.title}
                </h3>

                <p className="mt-3 text-zinc-400 leading-relaxed">
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
