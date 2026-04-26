import React, { useEffect, useState } from 'react';

type Language = 'es' | 'en';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, onToggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const menuItems = [
    { id: 'inicio', label: language === 'es' ? 'Inicio' : 'Home' },
    { id: 'sobre-mi', label: language === 'es' ? 'Sobre mí' : 'About Me' },
    { id: 'estudios', label: language === 'es' ? 'Estudios y Certificados' : 'Education & Certificates' },
    { id: 'proyectos', label: language === 'es' ? 'Proyectos' : 'Projects' },
    { id: 'habilidades', label: language === 'es' ? 'Habilidades' : 'Skills' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <button
            type="button"
            className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
            aria-label="Abrir menú"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <a href="#inicio" className="nav-logo" onClick={(e) => handleScroll(e, 'inicio')}>
            Sebastian Ibarra
          </a>
        </div>

        <button
          type="button"
          className="nav-language-toggle"
          aria-label={language === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'}
          onClick={onToggleLanguage}
        >
          <span className="language-icon" aria-hidden="true">🌐</span>
          <span>{language === 'es' ? 'ES' : 'EN'}</span>
        </button>
      </div>

      <div
        className={`nav-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside className={`nav-drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="nav-drawer-header">
          <p className="nav-drawer-title">{language === 'es' ? 'Navegación' : 'Navigation'}</p>
          <button
            type="button"
            className="nav-drawer-close"
            aria-label={language === 'es' ? 'Cerrar menú' : 'Close menu'}
            onClick={() => setIsOpen(false)}
          >
            <span />
            <span />
          </button>
        </div>

        <ul className="nav-menu" role="menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="nav-menu-link" onClick={(e) => handleScroll(e, item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;

