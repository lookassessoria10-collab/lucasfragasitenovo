import type { ArticleTopic } from "@/content/articles";

/**
 * Capa generativa para artigos — sem banco de imagens.
 * Cada tema tem um motivo: ombro (esfera e encaixe), cotovelo (dobradiça),
 * orientações (onda de movimento). O slug varia levemente a composição.
 */
export function ArticleCover({ topic, seed, className = "" }: { topic: ArticleTopic; seed: string; className?: string }) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const r = (n: number) => ((h >> n) & 255) / 255;
  const id = `cv-${h.toString(36)}`;

  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1f3b" />
          <stop offset="1" stopColor="#061429" />
        </linearGradient>
        <linearGradient id={`${id}-ln`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00e5d3" />
          <stop offset="1" stopColor="#1a9bd7" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.65" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#0fa3c9" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0fa3c9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-bg)`} />
      <rect width="400" height="260" fill={`url(#${id}-glow)`} />
      <g stroke={`url(#${id}-ln)`} fill="none" strokeLinecap="round">
        {topic === "Ombro" && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={250 + r(2) * 30} cy={120} r={30 + i * 22} strokeOpacity={0.9 - i * 0.17} strokeWidth={i === 0 ? 2 : 1} />
            ))}
            <path d={`M ${150 + r(4) * 20} 40 A 95 95 0 0 0 ${150 + r(4) * 20} 200`} strokeWidth="2" strokeOpacity="0.8" />
            <path d={`M ${262 + r(2) * 30} 150 L ${300 + r(6) * 30} 290`} strokeWidth="2" strokeOpacity="0.7" />
          </>
        )}
        {topic === "Cotovelo" && (
          <>
            <path d={`M 120 ${-10} L ${235 + r(3) * 20} 130 L ${330 + r(5) * 30} ${30 + r(7) * 40}`} strokeWidth="2" />
            <path d={`M 135 ${-10} L ${248 + r(3) * 20} 140 L ${345 + r(5) * 30} ${45 + r(7) * 40}`} strokeWidth="1" strokeOpacity="0.5" />
            <circle cx={240 + r(3) * 20} cy="133" r="16" strokeWidth="1.5" />
            <circle cx={240 + r(3) * 20} cy="133" r="34" strokeOpacity="0.35" />
            <path d="M 196 180 A 60 60 0 0 0 290 170" strokeOpacity="0.5" strokeDasharray="2 5" />
          </>
        )}
        {topic === "Orientações" && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M -10 ${130 + i * 14} C 90 ${60 + i * 10 + r(2) * 30}, 200 ${200 - i * 8}, 410 ${100 + i * 16}`}
                strokeOpacity={0.9 - i * 0.2}
                strokeWidth={i === 0 ? 2 : 1}
              />
            ))}
          </>
        )}
      </g>
      <g fill="#ffffff" fillOpacity="0.14">
        {Array.from({ length: 6 }).map((_, i) =>
          Array.from({ length: 3 }).map((__, j) => <circle key={`${i}-${j}`} cx={28 + i * 14} cy={28 + j * 14} r="1.4" />),
        )}
      </g>
    </svg>
  );
}
