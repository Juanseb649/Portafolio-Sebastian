# Portafolio Sebastián Ibarra

Portafolio personal con estilo de presentación keynote. Next.js (App Router), TypeScript y Tailwind CSS, listo para desplegar en Vercel.

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Estructura

```
app/
  layout.tsx        estructura global, fuente Geist, idioma
  page.tsx          une todas las secciones en orden
  globals.css       tokens de color y Tailwind
components/
  Navbar.tsx        1. Menú fijo, anclas, menú móvil, ES/EN
  Hero.tsx          2. Galaxia de Andrómeda interactiva + Descargar CV
  About.tsx         3. Sobre mí, como presentación de diapositivas
  Projects.tsx      4. Proyectos con captura y enlace
  Testimonials.tsx  5. Testimonios
  Experience.tsx    6. Experiencia laboral y académica
  Skills.tsx        ⭐ Adicional: especificaciones técnicas
  Contact.tsx       7. Contacto
  Footer.tsx        8. Pie de página
  LanguageProvider.tsx, ui.tsx
data/               contenido tipado (proyectos, testimonios, experiencia, specs, perfil)
types/              tipos compartidos
public/             CV, foto, imagen de la galaxia, capturas de proyectos
```

## Pendiente de completar

- `data/testimonials.ts`: los 3 testimonios son de ejemplo. Pon citas reales y cambia `placeholder` a `false`.
- `data/projects.ts`: agrega una captura de SATRAA en `public/images/projects/` y su ruta en `image`.
- `public/images/andromeda.webp` mide 728×399 px; una versión de mayor resolución se verá más nítida en pantallas grandes.
