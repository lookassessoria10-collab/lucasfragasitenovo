/**
 * Textos da página inicial, na ordem da narrativa.
 * Cada `scene` liga o bloco de texto a um keyframe do modelo 3D
 * (ver content/scene-keyframes.ts). Para mudar um texto, edite aqui;
 * para mudar o que o 3D faz naquele trecho, edite o keyframe de mesmo id.
 */

export const hero = {
  scene: "hero",
  eyebrow: "Ortopedista de ombro e cotovelo em Salvador",
  title: { lead: "Movimento", accent: "com precisão." },
  lead: "Cuidado especializado para ombro e cotovelo — do diagnóstico à reabilitação, para você voltar a se movimentar com confiança.",
  primaryCta: "Agendar consulta",
  secondaryCta: "Explorar o movimento",
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
      scene: "shoulder-intro",
      title: "O ombro é a articulação mais móvel do corpo.",
      text: "Essa liberdade depende de tendões, músculos e ligamentos trabalhando em equilíbrio. Quando algo sai do lugar, o movimento é o primeiro a sentir.",
    },
    {
      scene: "shoulder-raise",
      kicker: "Sinais de alerta",
      title: "Quando o ombro pede atenção",
      items: [
        { title: "Dor ao levantar o braço", detail: "ou ao pentear o cabelo, vestir uma blusa, alcançar uma prateleira" },
        { title: "Perda de força", detail: "em tarefas simples do dia a dia" },
        { title: "Dor que piora à noite", detail: "e atrapalha o sono, principalmente ao deitar sobre o lado" },
        { title: "Estalos e sensação de instabilidade", detail: "como se o ombro “saísse do lugar”" },
        { title: "Dor após treino, esporte ou queda", detail: "que não melhora com repouso" },
      ],
    },
    {
      scene: "shoulder-reach",
      title: "Sintoma não é diagnóstico.",
      text: "Sobrecarga, inflamação, lesão de tendão, instabilidade e desgaste podem causar sinais parecidos. Uma avaliação cuidadosa diferencia cada situação e define o caminho certo para o seu caso.",
    },
  ] satisfies StoryStep[],
};

export const shoulderAnatomy = {
  label: "Por dentro do ombro",
  steps: [
    {
      scene: "anatomy-cuff",
      kicker: "Manguito rotador",
      title: "Quatro tendões que estabilizam e giram o braço.",
      text: "O manguito rotador mantém a cabeça do úmero centrada enquanto o braço se move. Tendinites, calcificações e rupturas desses tendões estão entre as causas mais comuns de dor no ombro.",
    },
    {
      scene: "anatomy-stability",
      kicker: "Estabilidade",
      title: "Um encaixe raso, protegido por partes moles.",
      text: "Labrum, cápsula e ligamentos aprofundam e reforçam a articulação. Depois de uma luxação, essas estruturas podem se lesionar — e o ombro fica instável.",
      chips: [
        "Lesões do manguito rotador",
        "Bursite",
        "Tendinite calcária",
        "Ombro congelado",
        "Instabilidade e luxação",
        "Lesão SLAP",
        "Artrose",
        "Fraturas",
      ],
    },
  ] satisfies StoryStep[],
};

export const transition = {
  scene: "transition",
  title: "Do ombro ao cotovelo, o braço funciona em cadeia.",
  text: "Uma limitação em uma articulação muda a forma como você usa a outra. Por isso a avaliação olha para o movimento completo — não só para o ponto que dói.",
};

export const elbow = {
  index: "02",
  label: "Cotovelo",
  steps: [
    {
      scene: "elbow-intro",
      title: "O cotovelo une força e precisão.",
      text: "Ele dobra, estende e gira o antebraço. É o cotovelo que leva a mão até onde você precisa — do copo de café à raquete.",
    },
    {
      scene: "elbow-flex",
      kicker: "Quando o cotovelo dói",
      title: "Sinais mais comuns",
      items: [
        { title: "Dor na parte externa ao segurar objetos", detail: "Epicondilite lateral, o “cotovelo de tenista”" },
        { title: "Dor na parte interna ao fazer força", detail: "Epicondilite medial" },
        { title: "Formigamento no 4º e 5º dedos", detail: "Compressão do nervo ulnar (túnel cubital)" },
        { title: "Inchaço na ponta do cotovelo", detail: "Bursite do olécrano" },
        { title: "Dor ou instabilidade após queda", detail: "Lesões ligamentares e fraturas" },
      ],
    },
    {
      scene: "elbow-detail",
      title: "Repetição e sobrecarga explicam boa parte dos casos.",
      text: "Na maioria das vezes, o tratamento começa sem cirurgia: ajuste de atividades, fisioterapia e acompanhamento próximo. Quanto antes o diagnóstico, mais simples costuma ser o caminho.",
    },
  ] satisfies StoryStep[],
};

export const care = {
  scene: "care",
  eyebrow: "Como posso ajudar",
  title: "Do primeiro sintoma ao retorno às atividades.",
  lead: "Cada caso começa com escuta e exame cuidadosos. A partir daí, o plano é construído com você — e ajustado a cada etapa.",
  items: [
    {
      title: "Avaliação especializada",
      text: "Consulta sem pressa, exame físico direcionado e exames de imagem quando necessários para chegar a um diagnóstico preciso.",
    },
    {
      title: "Tratamento conservador",
      text: "Medicação, fisioterapia, fortalecimento e ajustes de rotina. Infiltrações e bloqueios quando há indicação clínica.",
    },
    {
      title: "Acompanhamento ortopédico",
      text: "Reavaliações periódicas para acompanhar a resposta ao tratamento e ajustar o plano quando preciso.",
    },
    {
      title: "Cirurgia quando indicada",
      text: "Procedimentos artroscópicos e abertos de ombro e cotovelo, com indicação criteriosa e planejamento individual.",
    },
    {
      title: "Reabilitação e retorno funcional",
      text: "Orientação próxima no pós-tratamento, em conjunto com a fisioterapia, até a retomada segura das atividades.",
    },
  ],
};

export const surgery = {
  eyebrow: "Vou precisar operar?",
  title: "Nem toda dor no ombro ou no cotovelo significa cirurgia.",
  lead: "A decisão começa com um diagnóstico correto e é sempre tomada em conjunto, com informação clara sobre cada caminho.",
  origin: "Diagnóstico correto",
  paths: [
    {
      tag: "Caminho 1",
      title: "Tratamento conservador",
      text: "É o ponto de partida para a maior parte das condições do ombro e do cotovelo.",
      items: [
        "Fisioterapia e fortalecimento",
        "Medicação e controle da dor",
        "Infiltrações e procedimentos guiados",
        "Ajustes de rotina, treino e postura",
      ],
    },
    {
      tag: "Caminho 2",
      title: "Cirurgia, quando indicada",
      text: "Considerada quando há lesão estrutural importante ou quando o tratamento conservador não traz a melhora esperada.",
      items: [
        "Técnicas artroscópicas, minimamente invasivas",
        "Reparo de tendões e ligamentos",
        "Estabilização do ombro",
        "Reabilitação planejada e acompanhada",
      ],
    },
  ],
  note: "Cada caso é único. As informações deste site têm caráter educativo e não substituem uma consulta médica.",
};

export const about = {
  eyebrow: "Sobre",
  title: "Dr. Lucas Fraga",
  subtitle: "Ortopedista e traumatologista com atuação em cirurgia do ombro e cotovelo.",
  paragraphs: [
    "Sou médico ortopedista e dedico minha prática ao ombro e ao cotovelo. Acredito que um bom tratamento começa com tempo para ouvir, examinar com atenção e explicar com clareza.",
    "Meu objetivo é que cada paciente entenda o que está acontecendo, conheça as opções possíveis e participe das decisões sobre o próprio tratamento.",
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
  quote: "Quero que você saia da consulta entendendo o seu diagnóstico e sabendo quais são os caminhos possíveis.",
};

export const contact = {
  eyebrow: "Locais de atendimento",
  title: "Atendimento em Salvador e região.",
  lead: "Consultas e procedimentos em quatro cidades da Bahia. Escolha o local mais conveniente e fale com a equipe para agendar.",
};

export const articlesTeaser = {
  eyebrow: "Conteúdos",
  title: "Informação clara para decidir melhor.",
  lead: "Orientações sobre as condições mais comuns do ombro e do cotovelo.",
};

export const finalCta = {
  scene: "final",
  eyebrow: "Movimento é qualidade de vida",
  title: "Cuidar do movimento é cuidar da sua qualidade de vida.",
  lead: "Se a dor no ombro ou no cotovelo está limitando sua rotina, uma avaliação especializada é o primeiro passo.",
};
