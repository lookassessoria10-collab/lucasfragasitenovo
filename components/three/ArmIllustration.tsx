/**
 * Ilustração vetorial do membro superior no mesmo idioma visual do 3D.
 * Usada como pôster enquanto o WebGL carrega e como fallback quando
 * o dispositivo não suporta (ou não deve rodar) a cena 3D.
 */
export function ArmIllustration({ className = "" }: { className?: string }) {
  const bone = "url(#arm-bone)";
  return (
    <svg
      viewBox="0 0 600 1000"
      className={className}
      fill="none"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="arm-bone" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7DF3E8" />
          <stop offset="1" stopColor="#1A9BD7" />
        </linearGradient>
        <filter id="arm-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* costelas (contexto) */}
      <g stroke="#3FB8D9" strokeOpacity="0.18" strokeWidth="5" strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M ${40 + i * 6} ${220 + i * 62} Q ${150 + i * 10} ${200 + i * 66} ${215 - i * 4} ${262 + i * 70}`} />
        ))}
      </g>

      <g filter="url(#arm-glow)" stroke={bone} strokeLinecap="round" strokeLinejoin="round">
        {/* clavícula */}
        <path d="M 120 175 C 190 160 250 178 330 158" strokeWidth="3" />
        {/* escápula */}
        <path d="M 318 190 L 255 182 Q 200 178 190 196 L 222 420 Q 240 430 252 400 L 300 262 Z" strokeWidth="2" strokeOpacity="0.55" />
        {/* cabeça do úmero */}
        <circle cx="352" cy="214" r="44" strokeWidth="3" />
        {/* úmero */}
        <path d="M 372 252 C 380 340 392 460 404 560" strokeWidth="3" />
        <path d="M 340 254 C 352 350 366 470 376 562" strokeWidth="3" />
        {/* cotovelo */}
        <path d="M 360 566 Q 392 590 426 562" strokeWidth="3" />
        {/* rádio e ulna */}
        <path d="M 410 586 C 432 680 452 760 476 842" strokeWidth="3" />
        <path d="M 378 590 C 392 690 410 770 436 852" strokeWidth="3" />
        {/* mão */}
        <path d="M 432 860 L 424 940 M 452 862 L 450 948 M 470 858 L 478 940 M 486 848 L 506 914" strokeWidth="2.5" strokeOpacity="0.8" />
      </g>

      {/* tendões do manguito */}
      <g stroke="#2FA8E8" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round">
        <path d="M 230 205 Q 300 196 380 186" />
        <path d="M 236 300 Q 300 260 372 232" />
      </g>
    </svg>
  );
}
