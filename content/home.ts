/**
 * Textos da página inicial, na ordem da narrativa.
 * Cada `scene` liga o bloco de texto a um keyframe do modelo 3D
 * (ver content/scene-keyframes.ts). Para mudar um texto, edite aqui;
 * para mudar o que o 3D faz naquele trecho, edite o keyframe de mesmo id.
 *
 * Tom: direto, na linguagem do paciente, uma ideia por bloco.
 */

export const hero = {
  scene: "hero",
  eyebrow: "Ortopedista de ombro e cotovelo",
  title: { lead: "Dor no ombro", accent: "ou no cotovelo?" },
  lead: "Avaliação especializada para encontrar a causa da dor e definir o melhor tratamento para você.",
  primaryCta: "Agendar consulta",
  secondaryCta: "Entenda sua dor",
  keywords: ["Movimento", "Precisão", "Função"],
  scrollHint: "Role para explorar",
};

export type StoryStep = {
  scene: string;
  kicker?: string;
  title: string;
  text?: string;
  items?: { title: string; detail?: string }[];
  chips?: string[];
};

export const shoulder = {
  index: "01",
  label: "Ombro",
  steps: [
    {
      scene: "shoulder-raise",
      title: "Dói ao levantar o braço?",
      text: "Dor para pentear o cabelo, vestir uma blusa ou dormir de lado é um dos sinais mais comuns de problema no ombro.",
    },
  ] satisfies StoryStep[],
};

export const elbow = {
  index: "02",
  label: "Cotovelo",
  steps: [
    {
      scene: "elbow-flex",
      title: "Dói ao segurar objetos?",
      text: "Abrir um pote, digitar ou carregar uma sacola ficou desconfortável? Na consulta, vamos entender sua dor e como ela afeta sua rotina.",
    },
  ] satisfies StoryStep[],
};

export const care = {
  scene: "care",
  eyebrow: "Como posso ajudar",
  title: "Do diagnóstico ao retorno às atividades.",
  lead: "Cada tratamento é planejado para o seu caso.",
  items: [
    { title: "Diagnóstico preciso", text: "Consulta detalhada e exames só quando necessários." },
    { title: "Tratamento sem cirurgia", text: "Fisioterapia, medicação e infiltrações quando indicadas." },
    { title: "Cirurgia, quando indicada", text: "Técnicas minimamente invasivas, com planejamento individual." },
    { title: "Reabilitação", text: "Acompanhamento até a volta às suas atividades." },
  ],
};

export const surgery = {
  eyebrow: "Vou precisar operar?",
  title: "Nem toda dor precisa de cirurgia.",
  lead: "Na maior parte dos casos, o tratamento começa sem cirurgia. Ela só é indicada quando é a melhor opção para você.",
  origin: "Diagnóstico",
  paths: [
    {
      tag: "Caminho 1",
      title: "Tratamento conservador",
      text: "O ponto de partida na maioria dos casos.",
      items: ["Fisioterapia e fortalecimento", "Medicação e controle da dor", "Infiltrações, quando indicadas"],
    },
    {
      tag: "Caminho 2",
      title: "Cirurgia, quando indicada",
      text: "Para lesões que não melhoram ou que precisam de reparo.",
      items: ["Técnicas minimamente invasivas", "Reparo de tendões e ligamentos", "Reabilitação acompanhada"],
    },
  ],
  note: "Conteúdo informativo. Não substitui uma consulta médica.",
};

export const about = {
  eyebrow: "Sobre",
  title: "Dr. Lucas Fraga",
  subtitle: "Ortopedista e traumatologista com atuação em cirurgia do ombro e cotovelo.",
  paragraphs: [
    "Dedico minha prática ao ombro e ao cotovelo. Na consulta, explico com clareza o que está acontecendo e quais são as opções — para você decidir junto comigo.",
  ],
  timeline: [
    { when: "2010", title: "Graduação em Medicina", where: "Escola Bahiana de Medicina e Saúde Pública" },
    { when: "Residência", title: "Ortopedia e Traumatologia", where: "Hospital Santa Izabel · Salvador, BA" },
    { when: "Residência", title: "Cirurgia do Ombro e Cotovelo", where: "Hospital Santa Izabel · Salvador, BA" },
    { when: "Fellowship", title: "Cirurgia do Ombro e Cotovelo", where: "Tulane University · New Orleans, EUA" },
    { when: "Fellowship", title: "Cirurgia do Ombro e Cotovelo", where: "Cleveland Clinic · Cleveland, EUA" },
  ],
  memberships: [
    "Membro titular da Sociedade Brasileira de Cirurgia do Ombro e Cotovelo (SBCOC)",
    "Membro da Sociedade Latino-Americana de Cirurgia de Ombro e Cotovelo",
  ],
  quote: "Meu compromisso é que você saia da consulta entendendo o que tem e quais são as opções.",
};

export const contact = {
  eyebrow: "Locais de atendimento",
  title: "Atendimento em Salvador e região.",
  lead: "Escolha a cidade mais perto de você e agende pelo WhatsApp.",
};

export const articlesTeaser = {
  eyebrow: "Conteúdos",
  title: "Tire suas dúvidas.",
  lead: "Orientações sobre as dores mais comuns no ombro e no cotovelo.",
};

export const finalCta = {
  scene: "final",
  eyebrow: "Agende sua avaliação",
  title: "A dor está limitando sua rotina?",
  lead: "O primeiro passo é um diagnóstico correto.",
};
