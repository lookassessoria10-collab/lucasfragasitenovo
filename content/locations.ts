/**
 * Locais de atendimento.
 * Fonte: página "Locais de Atendimento" do site anterior (apenas nomes das instituições).
 * Endereços completos ainda não foram confirmados: preencha `address` quando validar
 * e o card passa a exibi-lo. Enquanto vazio, o link "Ver no mapa" usa a busca do Google Maps.
 */
export type Clinic = {
  name: string;
  detail?: string;
  /** Endereço completo confirmado. */
  address?: string;
  /** Link de agendamento específico do local (opcional). */
  bookingUrl?: string;
};

export type ServiceCity = {
  city: string;
  state: "BA";
  /** Coordenadas aproximadas do município — usadas apenas no mapa ilustrativo. */
  coords: { lat: number; lon: number };
  clinics: Clinic[];
};

export const serviceCities: ServiceCity[] = [
  {
    city: "Salvador",
    state: "BA",
    coords: { lat: -12.97, lon: -38.5 },
    clinics: [
      { name: "Hospital Santa Izabel", detail: "Santa Casa da Bahia" },
      { name: "Clínica Vida" },
      { name: "CORTE", detail: "Ortopedia e Traumatologia" },
    ],
  },
  {
    city: "Feira de Santana",
    state: "BA",
    coords: { lat: -12.27, lon: -38.97 },
    clinics: [
      { name: "Santa Emília Ortopedia" },
      { name: "HTO", detail: "Hospital Geral" },
      { name: "Artrus", detail: "Ortopedia e Traumatologia" },
    ],
  },
  {
    city: "Camaçari",
    state: "BA",
    coords: { lat: -12.7, lon: -38.32 },
    clinics: [{ name: "Hospital Santa Helena", detail: "Hospital · Clínica · Laboratório" }],
  },
  {
    city: "Candeias",
    state: "BA",
    coords: { lat: -12.67, lon: -38.55 },
    clinics: [{ name: "Hospital da Clima", detail: "Clínica Maria Albano" }],
  },
];

export function mapsSearchHref(clinic: Clinic, city: ServiceCity) {
  const query = clinic.address ?? `${clinic.name} ${city.city} ${city.state}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
