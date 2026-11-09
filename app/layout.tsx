import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageProvider';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Sebastián Ibarra · Ingeniero de Software',
  description:
    'Portafolio de Juan Sebastián Ibarra Salas: ingeniero de software que construye productos web y se adentra en DevOps y la nube.',
  openGraph: {
    title: 'Sebastián Ibarra · Ingeniero de Software',
    description: 'Software, DevOps y la nube.',
    images: ['/images/andromeda.webp'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#2c2c2f' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // El script de tema cambia data-theme antes de hidratar, por eso se silencia esa diferencia.
    <html lang="es" className={`${geist.variable} ${geistMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
