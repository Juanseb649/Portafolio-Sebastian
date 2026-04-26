import React, { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import Navbar from '../components/navbar';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import EstudiosSection from '../components/sections/EstudiosSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';

type Language = 'es' | 'en';

const cliLines = [
  'npm install dependencies',
  'git commit -m "update"',
  'docker build -t app .',
  'kubectl apply -f deploy.yml',
  'python manage.py migrate',
  'git add .',
  'cargo run --release',
  'pnpm lint && pnpm build',
  'npx tsc --noEmit',
  'git checkout feature/portfolio-ui',
  'npm run deploy',
  'vercel --prod',
  'tail -f logs/frontend.log',
  'ssh ubuntu@cloud-instance',
  'docker compose up -d',
  'git push origin main',
];

const githubMarks = ['github-1', 'github-2', 'github-3', 'github-4', 'github-5'];

const Home: React.FC = () => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <div className="page-shell">
      <div className="page-cli-bg" aria-hidden="true">
        {cliLines.map((line, index) => (
          <div key={line} className={`cli-line cli-line-${index + 1}`}>
            {line}
          </div>
        ))}
        {githubMarks.map((markClass) => (
          <Github key={markClass} className={`cli-github ${markClass}`} strokeWidth={1.75} />
        ))}
      </div>
      <Navbar language={language} onToggleLanguage={toggleLanguage} />
      <main className="page-content">
        <HeroSection language={language} />
        <AboutSection language={language} />
        <EstudiosSection language={language} />
        <ProjectsSection language={language} />
        <SkillsSection language={language} />
      </main>
    </div>
  );
};

export default Home;

