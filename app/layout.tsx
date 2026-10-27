import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageProvider';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Sebastián Ibarra · Ingeniero de Software',
  description:
    'Portafolio de Juan Sebastián Ibarra Salas: ingeniero de software enfocado en calidad, documentación técnica y la nube.',
  openGraph: {
    title: 'Sebastián Ibarra · Ingeniero de Software',
    description: 'Calidad, documentación técnica y la nube.',
    images: ['/images/andromeda.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} scroll-smooth`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
