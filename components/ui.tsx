import type { AnchorHTMLAttributes, ReactNode } from 'react';

/** Chevron fino al estilo de los enlaces de Apple. */
export function Chevron({ className = '', direction = 'right' }: { className?: string; direction?: 'right' | 'left' | 'down' }) {
  const rotate = direction === 'left' ? 'rotate-180' : direction === 'down' ? 'rotate-90' : '';
  return (
    <svg viewBox="0 0 8 14" aria-hidden="true" className={`inline-block h-[0.72em] w-auto ${rotate} ${className}`}>
      <path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type PillProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; size?: 'sm' | 'lg' };

/** Botón píldora azul, la acción principal. */
export function PillLink({ children, className = '', size = 'lg', ...rest }: PillProps) {
  const sizing = size === 'lg' ? 'px-[22px] py-[11px] text-[17px]' : 'px-[11px] py-[3px] text-[12px]';
  return (
    <a
      {...rest}
      className={`inline-flex items-center justify-center rounded-full bg-action font-normal text-white transition-colors duration-200 hover:bg-action-hover active:bg-[#006edb] ${sizing} ${className}`}
    >
      {children}
    </a>
  );
}

/** Enlace de texto con chevron: la acción secundaria. */
export function ChevronLink({ children, className = '', ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a {...rest} className={`group inline-flex items-baseline gap-[0.3em] hover:underline ${className}`}>
      {children}
      <Chevron className="translate-y-[0.02em] transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}
