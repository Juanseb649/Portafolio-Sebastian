import React from 'react';

const HeroSection: React.FC = () => {
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
        <div className="hero-buttons">
          <a href="#proyectos" className="btn btn-primary">
            Descargar CV
          </a>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

