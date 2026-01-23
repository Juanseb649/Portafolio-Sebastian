import React from 'react';

const Navbar: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#inicio" className="nav-logo" onClick={(e) => handleScroll(e, 'inicio')}>
          Sebastian Ibarra
        </a>
        <ul className="nav-menu">
          <li>
            <a href="#inicio" onClick={(e) => handleScroll(e, 'inicio')}>
              Inicio
            </a>
          </li>
          <li>
            <a href="#sobre-mi" onClick={(e) => handleScroll(e, 'sobre-mi')}>
              Sobre mí
            </a>
          </li>
          <li>
            <a href="#estudios" onClick={(e) => handleScroll(e, 'estudios')}>
              Estudios
            </a>
          </li>
          <li>
            <a href="#proyectos" onClick={(e) => handleScroll(e, 'proyectos')}>
              Proyectos
            </a>
          </li>
          <li>
            <a href="#habilidades" onClick={(e) => handleScroll(e, 'habilidades')}>
              Habilidades
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

