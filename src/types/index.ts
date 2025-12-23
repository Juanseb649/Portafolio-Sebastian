// Tipos para el portafolio

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  phone?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location?: string;
  avatar?: string;
}

