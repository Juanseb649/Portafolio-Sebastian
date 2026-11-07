import type { ReactNode } from 'react';

/**
 * Ventanal de nave espacial: un marco octogonal de metal cepillado, con bisel interior y remaches,
 * a través del cual se ve la escena. Todo es CSS; el contenido va dentro del cristal.
 */

// Octógono con esquinas recortadas a una distancia fija, para que el chaflán no se deforme al cambiar de tamaño.
const octagon = (cut: number) =>
  `polygon(${cut}px 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, ${cut}px 100%, 0 calc(100% - ${cut}px), 0 ${cut}px)`;

// Remaches: en los chaflanes y a mitad de cada lado.
const RIVETS = [
  'left-[18px] top-[18px]',
  'right-[18px] top-[18px]',
  'left-[18px] bottom-[18px]',
  'right-[18px] bottom-[18px]',
  'left-1/2 top-[7px] -translate-x-1/2',
  'left-1/2 bottom-[7px] -translate-x-1/2',
  'top-1/2 left-[7px] -translate-y-1/2',
  'top-1/2 right-[7px] -translate-y-1/2',
];

export default function ShipViewport({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Marco exterior de metal cepillado. */}
      <div
        className="absolute inset-0 bg-[linear-gradient(140deg,#dfe4ea_0%,#8b95a1_18%,#3c434d_42%,#6f7884_58%,#c3cad3_74%,#4a515b_100%)]"
        style={{ clipPath: octagon(44) }}
      />
      {/* Bisel interior más oscuro, que hace de junta entre el marco y el cristal. */}
      <div
        className="absolute inset-[16px] bg-[linear-gradient(320deg,#a7b0bb_0%,#2a3038_35%,#151a20_65%,#7d8792_100%)]"
        style={{ clipPath: octagon(34) }}
      />

      {RIVETS.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute h-[7px] w-[7px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#f4f6f8,#7c8691_55%,#2b3139)] shadow-[0_1px_1px_rgba(0,0,0,0.6)] ${position}`}
        />
      ))}

      {/* Cristal: aquí se ve la escena, con sombra interior y un reflejo tenue. */}
      <div className="absolute inset-[22px] overflow-hidden bg-black" style={{ clipPath: octagon(30) }}>
        {children}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_18px_rgba(0,0,0,0.85)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_28%,transparent_42%)]"
        />
      </div>
    </div>
  );
}
