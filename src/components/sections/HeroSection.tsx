import React from 'react';
const HeroSection: React.FC = () => {
  const getSocialMediaLogo = (name: string): string => {
    const logoMap: Record<string, string> ={
      LinkedIn: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
      GitHub: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
    };
    return logoMap[name];
  };
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-cli-bg">
        <div className="cli-line">npm install dependencies</div>
        <div className="cli-line">git commit -m "update"</div>
        <div className="cli-line">docker build -t app .</div>
        <div className="cli-line">kubectl apply -f deploy.yml</div>
        <div className="cli-line">python manage.py migrate</div>
        <div className="cli-line">git add .</div>
        <div className="cli-line">cargo run --release</div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          Hola, soy <span className="highlight">Sebastian Ibarra</span>
        </h1>
        <h2 className="hero-subtitle"> Te doy la bienvenida a mi portafolio, soy ingeniero en desarrollo de Software</h2>
        <p className="hero-description">
          Apasionado por crear soluciones digitales escalables y mantenibles 
        </p>

        {/* 🔗 Redes sociales */}
        <div className="hero-socials">
          <a
            href="https://www.linkedin.com/in/juan-sebastian-ibarra-47742320b/"
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
            href="https://github.com/Juanseb649"
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
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

