import { serviceCities } from "@/content/locations";

/**
 * Mapa ilustrativo (não cartográfico) das cidades atendidas,
 * projetado a partir das coordenadas aproximadas de cada município.
 */
export function ServiceMap() {
  const W = 400;
  const H = 300;
  const pad = 56;
  const lons = serviceCities.map((c) => c.coords.lon);
  const lats = serviceCities.map((c) => c.coords.lat);
  const [minLon, maxLon] = [Math.min(...lons), Math.max(...lons)];
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)];
  const scale = Math.min((W - pad * 2) / (maxLon - minLon), (H - pad * 2) / (maxLat - minLat));
  const ox = (W - (maxLon - minLon) * scale) / 2;
  const oy = (H - (maxLat - minLat) * scale) / 2;
  const project = (lon: number, lat: number) => [ox + (lon - minLon) * scale, oy + (maxLat - lat) * scale] as const;

  const points = serviceCities.map((c) => ({ city: c.city, xy: project(c.coords.lon, c.coords.lat) }));
  const hub = points.find((p) => p.city === "Salvador") ?? points[0];

  return (
    <figure className="frame relative overflow-hidden bg-navy-850/60">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <svg viewBox={`0 0 ${W} ${H}`} className="relative block w-full" role="img" aria-labelledby="map-title">
        <title id="map-title">Mapa ilustrativo: Salvador, Feira de Santana, Camaçari e Candeias</title>
        {/* litoral estilizado */}
        <path
          d={`M ${hub.xy[0] - 30} ${H} C ${hub.xy[0] + 10} ${hub.xy[1] + 40}, ${hub.xy[0] + 60} ${hub.xy[1] - 20}, ${W} ${hub.xy[1] - 160}`}
          stroke="#1a9bd7"
          strokeOpacity="0.35"
          strokeDasharray="2 6"
          fill="none"
        />
        {points
          .filter((p) => p !== hub)
          .map((p) => {
            const mx = (hub.xy[0] + p.xy[0]) / 2;
            const my = Math.min(hub.xy[1], p.xy[1]) - 28;
            return (
              <path
                key={p.city}
                d={`M ${hub.xy[0]} ${hub.xy[1]} Q ${mx} ${my} ${p.xy[0]} ${p.xy[1]}`}
                stroke="#00e5d3"
                strokeOpacity="0.45"
                strokeWidth="1"
                fill="none"
              />
            );
          })}
        <circle cx={hub.xy[0]} cy={hub.xy[1]} r="16" fill="#00e5d3" fillOpacity="0.08" stroke="#00e5d3" strokeOpacity="0.3" />
        {points.map((p) => {
          // rótulos à esquerda para cidades a oeste do polo (evita sobreposição com vizinhas)
          const right = p.xy[0] >= hub.xy[0] || p.xy[0] < W * 0.3;
          return (
            <g key={p.city}>
              <circle cx={p.xy[0]} cy={p.xy[1]} r="4.5" fill="#00e5d3" />
              <circle cx={p.xy[0]} cy={p.xy[1]} r="9" fill="none" stroke="#00e5d3" strokeOpacity="0.4" />
              <text
                x={p.xy[0] + (right ? 16 : -16)}
                y={p.xy[1] + 4}
                textAnchor={right ? "start" : "end"}
                className="fill-white font-display text-[12px] font-semibold"
              >
                {p.city}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="relative border-t border-white/8 px-5 py-3 text-xs text-on-dark">
        Salvador e região · Bahia
      </figcaption>
    </figure>
  );
}
