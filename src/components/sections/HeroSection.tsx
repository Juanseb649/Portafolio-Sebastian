import React from 'react';
type Language = 'es' | 'en';

interface HeroSectionProps {
  language: Language;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const getSocialMediaLogo = (name: string): string => {
    const logoMap: Record<string, string> ={
      LinkedIn: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
      GitHub: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
    };
    return logoMap[name];
  };
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          {language === 'es' ? 'Hola, soy ' : 'Hi, I am '}<span className="highlight">Sebastian Ibarra</span>
        </h1>
        <h2 className="hero-subtitle">
          {language === 'es'
            ? 'Te doy la bienvenida a mi portafolio, soy ingeniero en desarrollo de software'
            : 'Welcome to my portfolio. I am a software development engineer'}
        </h2>
        <p className="hero-description">
          {language === 'es'
            ? 'Apasionado por crear soluciones digitales escalables y mantenibles'
            : 'Passionate about building scalable and maintainable digital solutions'}
        </p>

        {/* 🔗 Redes sociales */}
        <div className="hero-socials">
          <a
            href="https://www.linkedin.com/in/juan-sebasti%C3%A1n-ibarra-47742320b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img
              src={getSocialMediaLogo('LinkedIn')}
              alt="LinkedIn"
              className="social-icon"
            />
          </a>

          <a
            href="https://github.com/JuanSebasIbarra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img
              src={getSocialMediaLogo('GitHub')}
              alt="GitHub"
              className="social-icon"
            />
          </a>
        </div>

        <div className="hero-buttons">
          <a 
            href="/CV_Juan_Sebastian_Ibarra_Salas.pdf" 
            download="CV_Juan_Sebastian_Ibarra_Salas.pdf"
            className="btn btn-primary"
          >
            {language === 'es' ? 'Descargar CV' : 'Download CV'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

