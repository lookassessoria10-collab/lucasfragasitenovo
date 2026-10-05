/**
 * Dados institucionais centralizados.
 * Tudo que é contato, registro profissional ou link externo vive aqui —
 * altere neste arquivo e o site inteiro (header, rodapé, SEO, CTAs) acompanha.
 */
export const site = {
  url: "https://drlucasfraga.com.br",
  name: "Dr. Lucas Fraga",
  role: "Ortopedista e Traumatologista",
  focus: "Cirurgia do Ombro e Cotovelo",
  tagline: "Traumatologia · Ortopedia · Cirurgia de Ombro e Cotovelo",
  crm: "CREMEB 22.124",
  /**
   * Registro de Qualificação de Especialista (RQE).
   * A Resolução CFM nº 2.336/2023 pede o RQE quando a especialidade é anunciada.
   * Preencha (ex.: "RQE 12.345") para exibi-lo automaticamente no rodapé e no "Sobre".
   */
  rqe: "",
  cnpj: "47.133.865/0001-90",
  phone: { display: "(71) 98260-8047", href: "tel:+5571982608047", e164: "+55-71-98260-8047" },
  whatsapp: {
    number: "5571982608047",
    message: "Olá! Acessei o site e gostaria de agendar uma consulta com o Dr. Lucas Fraga.",
  },
  email: "falecom@drlucasfraga.com.br",
  instagram: { handle: "@lucasfragacunha", url: "https://www.instagram.com/lucasfragacunha/" },
  /** Aplicativo do consultório. Deixe vazio para ocultar o link. */
  app: {
    android: "https://play.google.com/store/apps/details?id=br.com.lucas.fraga.app",
    ios: "",
  },
  /** Convênios citados no site anterior — confirmar disponibilidade por local antes de publicar. */
  insurance: [
    "Bradesco Saúde",
    "SulAmérica",
    "Mediservice",
    "GEAP",
    "Postal Saúde",
    "Saúde Petrobras",
    "CASSI",
    "ASFEB",
  ],
} as const;

export function whatsappHref(message: string = site.whatsapp.message) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const navigation = [
  { label: "Início", href: "/#inicio", id: "inicio" },
  { label: "Ombro", href: "/#ombro", id: "ombro" },
  { label: "Cotovelo", href: "/#cotovelo", id: "cotovelo" },
  { label: "Tratamentos", href: "/#tratamentos", id: "tratamentos" },
  { label: "Sobre", href: "/#sobre", id: "sobre" },
  { label: "Conteúdos", href: "/#conteudos", id: "conteudos" },
  { label: "Contato", href: "/#contato", id: "contato" },
] as const;
