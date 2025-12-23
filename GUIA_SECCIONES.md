# 📚 Guía: Cómo Funcionan las Secciones del Portafolio

## 🏗️ Estructura de Carpetas

```
src/
├── components/
│   ├── sections/          # Secciones principales del portafolio
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ContactSection.tsx
│   ├── navbar.tsx         # Barra de navegación
│   └── footer.tsx          # Pie de página
├── pages/
│   └── index.tsx          # Página principal (orquesta todas las secciones)
├── styles/
│   └── globals.css         # Estilos globales
└── types/
    └── index.ts            # Tipos TypeScript
```

## 📖 Explicación de Cada Sección

### 1. **HeroSection** (Sección Hero/Inicio)
**Ubicación:** `src/components/sections/HeroSection.tsx`

**¿Qué hace?**
- Es la primera sección que ve el visitante
- Presenta tu nombre, título profesional y una breve descripción
- Tiene botones de llamada a la acción (CTA)

**Cómo personalizarla:**
```tsx
// Cambia estos valores en HeroSection.tsx
<h1>Hola, soy <span className="highlight">TU NOMBRE</span></h1>
<h2>TU TÍTULO PROFESIONAL</h2>
<p>TU DESCRIPCIÓN PERSONAL</p>
```

### 2. **AboutSection** (Sobre Mí)
**Ubicación:** `src/components/sections/AboutSection.tsx`

**¿Qué hace?**
- Cuenta tu historia profesional
- Explica tu experiencia y enfoque
- Muestra highlights importantes

**Cómo personalizarla:**
- Edita el texto dentro de los `<p>` tags
- Modifica los `highlight-item` con tu información

### 3. **ProjectsSection** (Proyectos)
**Ubicación:** `src/components/sections/ProjectsSection.tsx`

**¿Qué hace?**
- Muestra tus proyectos en un grid
- Cada proyecto tiene título, descripción, tecnologías y enlaces

**Cómo personalizarla:**
```tsx
// Reemplaza el array 'projects' con tus proyectos reales
const projects: Project[] = [
  {
    id: '1',
    title: 'Nombre de tu proyecto',
    description: 'Descripción detallada',
    technologies: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/tu-usuario/tu-repo',
    liveUrl: 'https://tu-proyecto.com', // Opcional
  },
  // Agrega más proyectos...
];
```

### 4. **SkillsSection** (Habilidades)
**Ubicación:** `src/components/sections/SkillsSection.tsx`

**¿Qué hace?**
- Muestra tus habilidades técnicas
- Cada skill tiene un nivel (principiante, intermedio, avanzado)
- Muestra barras de progreso visuales

**Cómo personalizarla:**
```tsx
// Modifica el array 'skills' con tus habilidades
const skills: Skill[] = [
  { name: 'React', level: 'advanced', category: 'frontend' },
  { name: 'TypeScript', level: 'intermediate', category: 'frontend' },
  // Agrega más habilidades...
];
```

**Niveles disponibles:**
- `'beginner'` - Principiante (barra al 40%)
- `'intermediate'` - Intermedio (barra al 70%)
- `'advanced'` - Avanzado (barra al 100%)

### 5. **ContactSection** (Contacto)
**Ubicación:** `src/components/sections/ContactSection.tsx`

**¿Qué hace?**
- Muestra tu información de contacto
- Tiene un formulario funcional (actualmente solo muestra alert)

**Cómo personalizarla:**
```tsx
// Actualiza tus datos de contacto
<div className="contact-item">
  <strong>Email:</strong>
  <a href="mailto:TU-EMAIL@ejemplo.com">TU-EMAIL@ejemplo.com</a>
</div>
```

**Para conectar el formulario:**
- Opción 1: Usar EmailJS (gratis, fácil de configurar)
- Opción 2: Crear un backend propio
- Opción 3: Usar servicios como Formspree

## 🔗 Cómo Funciona la Navegación

El `Navbar` tiene enlaces que hacen scroll suave a cada sección usando los IDs:

- `#inicio` → HeroSection
- `#sobre-mi` → AboutSection
- `#proyectos` → ProjectsSection
- `#habilidades` → SkillsSection
- `#contacto` → ContactSection

**Importante:** Cada sección debe tener el `id` correspondiente en el elemento `<section>`.

## 🎨 Personalización de Estilos

Los estilos están en `src/styles/globals.css`. Puedes modificar:

- **Colores:** Cambia las variables CSS en `:root`
- **Fuentes:** Modifica `font-family` en `body`
- **Espaciados:** Ajusta `padding` y `margin` en las secciones
- **Responsive:** Los media queries están al final del archivo

## 📝 Flujo de Trabajo Recomendado

1. **Personaliza el contenido:**
   - Edita cada sección con tu información real
   - Agrega tus proyectos y habilidades

2. **Ajusta los estilos:**
   - Cambia colores y fuentes según tu preferencia
   - Ajusta espaciados si es necesario

3. **Conecta el formulario:**
   - Configura EmailJS o tu solución preferida
   - Prueba que funcione correctamente

4. **Agrega imágenes (opcional):**
   - Crea carpeta `src/assets/images/`
   - Agrega imágenes de proyectos o avatar
   - Importa y usa en los componentes

5. **Optimiza:**
   - Agrega meta tags en `index.html`
   - Optimiza imágenes
   - Prueba en diferentes dispositivos

## 🚀 Próximos Pasos

- [ ] Reemplazar contenido de ejemplo con tu información real
- [ ] Agregar imágenes a los proyectos
- [ ] Configurar el formulario de contacto
- [ ] Agregar animaciones (opcional: Framer Motion)
- [ ] Implementar tema oscuro/claro (opcional)
- [ ] Agregar más secciones si lo necesitas

## 💡 Tips

- **Mantén el código organizado:** Cada sección en su propio archivo
- **Usa TypeScript:** Los tipos están definidos en `src/types/index.ts`
- **Responsive first:** Los estilos ya están preparados para móviles
- **Reutiliza componentes:** Si algo se repite, créalo como componente

