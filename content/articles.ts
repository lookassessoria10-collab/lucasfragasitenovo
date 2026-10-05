/**
 * Conteúdos / artigos.
 * Os slugs foram mantidos iguais aos do site anterior (/conteudos/<slug>)
 * para preservar o histórico de SEO. Os textos foram reescritos de forma
 * resumida — revise e amplie antes de publicar.
 *
 * Para adicionar um artigo: inclua um objeto em `articles`. A página,
 * o sitemap e a listagem são gerados automaticamente.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type ArticleTopic = "Ombro" | "Cotovelo" | "Orientações";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  topic: ArticleTopic;
  /** ISO date (AAAA-MM-DD) */
  date: string;
  readingMinutes: number;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "quando-se-preocupar-com-a-dor-no-ombro",
    title: "Quando se preocupar com a dor no ombro",
    excerpt:
      "Nem toda dor no ombro é sinal de lesão, mas alguns sinais indicam que é hora de procurar uma avaliação especializada.",
    topic: "Ombro",
    date: "2025-09-09",
    readingMinutes: 4,
    body: [
      { type: "p", text: "A dor no ombro é uma das queixas mais frequentes no consultório de ortopedia. Muitas vezes ela surge depois de um esforço diferente, de uma noite mal dormida ou de uma rotina de treino mais intensa — e melhora em poucos dias. Em outras situações, porém, ela é o primeiro aviso de uma lesão que merece investigação." },
      { type: "h2", text: "Causas mais comuns" },
      { type: "ul", items: ["Tendinites e lesões do manguito rotador", "Bursite subacromial", "Capsulite adesiva (ombro congelado)", "Instabilidade e luxações", "Artrose e alterações degenerativas"] },
      { type: "h2", text: "Quando a dor merece atenção" },
      { type: "ul", items: ["Dor que persiste por mais de duas ou três semanas", "Dor noturna, que acorda ou impede de deitar sobre o ombro", "Perda de força para levantar o braço", "Sensação de que o ombro “sai do lugar”", "Dor que começou após queda ou trauma", "Rigidez progressiva, com dificuldade para pentear o cabelo ou alcançar as costas"] },
      { type: "h2", text: "Como é feito o diagnóstico" },
      { type: "p", text: "A avaliação começa pela conversa e pelo exame físico, com testes específicos para cada estrutura do ombro. Exames como ultrassonografia, radiografia ou ressonância magnética são solicitados quando ajudam a confirmar a suspeita clínica — e não como ponto de partida." },
      { type: "h2", text: "Tratamentos possíveis" },
      { type: "p", text: "A maior parte das condições do ombro é tratada sem cirurgia, com fisioterapia, fortalecimento, medicação e ajustes na rotina. A cirurgia é reservada para lesões estruturais importantes ou para casos que não respondem ao tratamento conservador." },
      { type: "p", text: "Se a dor está limitando o seu dia a dia, uma avaliação especializada ajuda a entender a causa e a escolher o melhor caminho." },
    ],
  },
  {
    slug: "lesoes-no-manguito-rotador-diagnostico-tratamento-e-prevencao",
    title: "Lesões do manguito rotador: diagnóstico, tratamento e prevenção",
    excerpt:
      "O manguito rotador é o conjunto de tendões que estabiliza o ombro. Entenda por que ele se lesiona e quais são as opções de tratamento.",
    topic: "Ombro",
    date: "2024-11-14",
    readingMinutes: 5,
    body: [
      { type: "p", text: "O manguito rotador é formado por quatro músculos — supraespinal, infraespinal, redondo menor e subescapular — cujos tendões envolvem a cabeça do úmero. Eles mantêm a articulação centrada e permitem elevar e girar o braço com controle." },
      { type: "h2", text: "Por que ele se lesiona" },
      { type: "p", text: "As lesões podem surgir por desgaste ao longo dos anos, por sobrecarga repetitiva (trabalho com os braços elevados, esportes de arremesso, musculação) ou por trauma, como uma queda sobre o braço. Com a idade, os tendões ficam menos resistentes, o que torna as lesões mais comuns após os 40 anos." },
      { type: "h2", text: "Sintomas" },
      { type: "ul", items: ["Dor na parte lateral do ombro, que pode irradiar para o braço", "Dor ao elevar o braço ou ao deitar sobre o lado afetado", "Perda de força em movimentos acima da cabeça", "Estalos ou sensação de atrito"] },
      { type: "h2", text: "Diagnóstico" },
      { type: "p", text: "O exame físico avalia força, mobilidade e dor em cada tendão. A ultrassonografia e a ressonância magnética ajudam a diferenciar uma tendinite de uma ruptura parcial ou completa e a medir o tamanho da lesão." },
      { type: "h2", text: "Tratamento" },
      { type: "p", text: "Tendinites e muitas rupturas parciais respondem bem ao tratamento conservador, com fisioterapia focada em fortalecimento e controle da dor. Rupturas completas, especialmente em pacientes ativos ou após trauma, podem ter indicação de reparo cirúrgico — geralmente por artroscopia." },
      { type: "h2", text: "Prevenção" },
      { type: "ul", items: ["Fortalecer a musculatura do ombro e da escápula", "Progredir cargas de treino de forma gradual", "Fazer pausas em atividades repetitivas com os braços elevados", "Não ignorar dores persistentes"] },
    ],
  },
  {
    slug: "ombro-congelado-capsulite-adesiva-diagnostico-tratamento-e-recuperacao",
    title: "Ombro congelado (capsulite adesiva): diagnóstico, tratamento e recuperação",
    excerpt:
      "Dor intensa seguida de rigidez progressiva: conheça as fases da capsulite adesiva e como é o tratamento.",
    topic: "Ombro",
    date: "2024-12-12",
    readingMinutes: 4,
    body: [
      { type: "p", text: "A capsulite adesiva, conhecida como ombro congelado, é uma inflamação da cápsula que envolve a articulação do ombro. Com o tempo, essa cápsula fica espessa e retraída, limitando o movimento em todas as direções." },
      { type: "h2", text: "Quem tem mais risco" },
      { type: "p", text: "É mais comum entre 40 e 60 anos, em mulheres, em pessoas com diabetes ou alterações da tireoide e após períodos de imobilização do braço. Em muitos casos, porém, não há uma causa evidente." },
      { type: "h2", text: "As fases" },
      { type: "ul", items: ["Fase dolorosa: dor intensa, inclusive em repouso e à noite", "Fase de rigidez: a dor diminui, mas o movimento fica muito limitado", "Fase de descongelamento: recuperação gradual da mobilidade"] },
      { type: "h2", text: "Diagnóstico" },
      { type: "p", text: "O diagnóstico é essencialmente clínico: há perda de movimento ativo e passivo, especialmente da rotação externa. Exames de imagem ajudam a excluir outras causas." },
      { type: "h2", text: "Tratamento" },
      { type: "p", text: "O tratamento combina controle da dor (medicação, infiltrações e bloqueios quando indicados) com fisioterapia para recuperar a amplitude de movimento. Procedimentos cirúrgicos ficam reservados para casos que não evoluem bem após um período adequado de tratamento." },
      { type: "p", text: "A recuperação costuma ser lenta, de meses, e o acompanhamento próximo faz diferença para manter o paciente confortável ao longo do processo." },
    ],
  },
  {
    slug: "instabilidade-do-ombro-o-que-e-como-diagnosticar-e-quais-os-tratamentos",
    title: "Instabilidade do ombro: o que é, como diagnosticar e quais os tratamentos",
    excerpt:
      "Quando o ombro “sai do lugar” com frequência, as estruturas que o mantêm estável podem estar lesionadas.",
    topic: "Ombro",
    date: "2025-08-08",
    readingMinutes: 4,
    body: [
      { type: "p", text: "O ombro é a articulação mais móvel do corpo — e, por isso, uma das menos estáveis. A cabeça do úmero se apoia em uma superfície rasa, a glenoide, e depende do labrum, da cápsula, dos ligamentos e dos músculos para se manter no lugar." },
      { type: "h2", text: "Como a instabilidade começa" },
      { type: "p", text: "Na maioria dos casos, ela surge após uma luxação traumática, comum em esportes de contato e quedas. A primeira luxação pode lesionar o labrum e os ligamentos, facilitando novos episódios. Algumas pessoas têm frouxidão natural das articulações e desenvolvem instabilidade sem trauma importante." },
      { type: "h2", text: "Sintomas" },
      { type: "ul", items: ["Sensação de que o ombro vai sair do lugar em certos movimentos", "Episódios de luxação ou subluxação", "Insegurança para arremessar, nadar ou levantar o braço", "Dor e fraqueza após os episódios"] },
      { type: "h2", text: "Diagnóstico" },
      { type: "p", text: "A história clínica e testes específicos do exame físico orientam o diagnóstico. A ressonância magnética e, em alguns casos, a tomografia avaliam lesões do labrum e perdas ósseas na glenoide ou no úmero." },
      { type: "h2", text: "Tratamento" },
      { type: "p", text: "A reabilitação com fortalecimento e controle muscular é a base do tratamento em muitos casos. Quando há episódios repetidos, lesões estruturais significativas ou alta demanda esportiva, a estabilização cirúrgica — geralmente por artroscopia — pode ser indicada." },
    ],
  },
  {
    slug: "tendinite-calcaria-do-ombro-diagnostico-tratamento-e-prevencao",
    title: "Tendinite calcária do ombro: diagnóstico e tratamento",
    excerpt:
      "Depósitos de cálcio nos tendões podem causar crises de dor intensa. Entenda a condição e as opções de tratamento.",
    topic: "Ombro",
    date: "2024-12-19",
    readingMinutes: 3,
    body: [
      { type: "p", text: "A tendinite calcária acontece quando se formam depósitos de cálcio dentro dos tendões do manguito rotador, principalmente no supraespinal. Ela é mais frequente entre 30 e 60 anos e nem sempre causa sintomas." },
      { type: "h2", text: "Sintomas" },
      { type: "p", text: "Quando a calcificação inflama, a dor pode ser súbita e muito intensa, limitando bastante o movimento. Fora das crises, pode haver dor ao elevar o braço e desconforto noturno." },
      { type: "h2", text: "Diagnóstico" },
      { type: "p", text: "A radiografia e a ultrassonografia mostram o depósito de cálcio, seu tamanho e sua fase, o que ajuda a definir o tratamento." },
      { type: "h2", text: "Tratamento" },
      { type: "ul", items: ["Controle da dor com medicação e fisioterapia", "Procedimentos guiados por imagem, quando indicados", "Cirurgia artroscópica para os casos que não respondem ao tratamento conservador"] },
      { type: "p", text: "Em muitos pacientes, o próprio organismo reabsorve a calcificação ao longo do tempo. O acompanhamento ajuda a atravessar as crises com conforto." },
    ],
  },
  {
    slug: "quanto-tempo-demora-para-melhorar-a-dor-no-ombro",
    title: "Quanto tempo demora para melhorar a dor no ombro?",
    excerpt:
      "O tempo de melhora depende da causa, do tratamento e da rotina de cada paciente. Veja o que influencia a recuperação.",
    topic: "Orientações",
    date: "2025-08-29",
    readingMinutes: 3,
    body: [
      { type: "p", text: "Essa é uma das perguntas mais comuns no consultório — e a resposta honesta é: depende. Condições diferentes têm tempos de recuperação muito diferentes, e duas pessoas com o mesmo diagnóstico podem evoluir de formas distintas." },
      { type: "h2", text: "Algumas referências gerais" },
      { type: "ul", items: ["Sobrecargas e tendinites leves costumam melhorar em semanas com ajuste de atividades e fisioterapia", "Tendinopatias crônicas do manguito podem levar alguns meses", "A capsulite adesiva tem evolução lenta, frequentemente de muitos meses", "Após reparos cirúrgicos, a reabilitação completa geralmente leva meses"] },
      { type: "h2", text: "O que influencia a melhora" },
      { type: "ul", items: ["Diagnóstico correto desde o início", "Adesão à fisioterapia e aos exercícios em casa", "Controle de fatores como diabetes, tabagismo e sono", "Retorno gradual — e não precipitado — às atividades"] },
      { type: "p", text: "Mais do que um prazo fixo, o importante é acompanhar a evolução e ajustar o tratamento quando a melhora não acontece como esperado." },
    ],
  },
  {
    slug: "cotovelo-de-tenista",
    title: "Cotovelo de tenista (epicondilite lateral)",
    excerpt:
      "Apesar do nome, a epicondilite lateral é muito mais comum em quem não joga tênis. Saiba por que ela acontece e como tratar.",
    topic: "Cotovelo",
    date: "2024-07-26",
    readingMinutes: 4,
    body: [
      { type: "p", text: "A epicondilite lateral é uma alteração dos tendões que se inserem na parte externa do cotovelo, no epicôndilo lateral. Esses tendões estendem o punho e os dedos e trabalham muito em atividades de preensão." },
      { type: "h2", text: "Causas e fatores de risco" },
      { type: "p", text: "O problema está ligado à sobrecarga repetitiva: uso de mouse e teclado, ferramentas, trabalhos manuais, musculação e esportes de raquete. É mais comum entre 35 e 55 anos." },
      { type: "h2", text: "Sintomas" },
      { type: "ul", items: ["Dor na parte externa do cotovelo, que pode descer pelo antebraço", "Dor ao segurar objetos, abrir potes ou apertar a mão", "Fraqueza na pegada", "Sensibilidade ao toque sobre o epicôndilo"] },
      { type: "h2", text: "Tratamento" },
      { type: "p", text: "A grande maioria dos casos é tratada sem cirurgia: ajuste das atividades, fisioterapia com exercícios específicos, órteses em alguns casos e medicação para controle da dor. Infiltrações podem ser consideradas em situações selecionadas." },
      { type: "p", text: "A cirurgia é uma exceção, indicada para quem mantém sintomas importantes após um período prolongado de tratamento conservador bem conduzido." },
    ],
  },
  {
    slug: "sindrome-do-tunel-cubital-compressao-do-nervo-ulnar-sintomas-tratamento-e-prevencao",
    title: "Síndrome do túnel cubital: compressão do nervo ulnar",
    excerpt:
      "Formigamento no dedo mínimo e no anelar pode ter origem no cotovelo. Entenda a síndrome do túnel cubital.",
    topic: "Cotovelo",
    date: "2025-01-02",
    readingMinutes: 4,
    body: [
      { type: "p", text: "O nervo ulnar passa por um canal estreito na parte interna do cotovelo, atrás do epicôndilo medial — o túnel cubital. É o mesmo ponto que, ao ser batido, causa o famoso “choque” no braço." },
      { type: "h2", text: "Por que o nervo é comprimido" },
      { type: "p", text: "Manter o cotovelo dobrado por longos períodos (ao usar o celular, dormir com o braço flexionado ou apoiar o cotovelo na mesa) aumenta a pressão sobre o nervo. Alterações anatômicas, cistos e sequelas de fraturas também podem contribuir." },
      { type: "h2", text: "Sintomas" },
      { type: "ul", items: ["Formigamento ou dormência no dedo mínimo e em parte do anelar", "Sintomas que pioram com o cotovelo dobrado ou à noite", "Perda de destreza e fraqueza na mão, em casos avançados"] },
      { type: "h2", text: "Diagnóstico e tratamento" },
      { type: "p", text: "O exame clínico é complementado pela eletroneuromiografia, que mostra o grau de comprometimento do nervo. Casos leves costumam melhorar com mudanças de hábitos e órteses noturnas. Quando há perda de força ou sintomas persistentes, a descompressão cirúrgica pode ser indicada." },
      { type: "h2", text: "Prevenção" },
      { type: "ul", items: ["Evitar apoiar o cotovelo em superfícies duras", "Fazer pausas ao usar o celular", "Evitar dormir com o cotovelo muito dobrado"] },
    ],
  },
  {
    slug: "bursite-do-cotovelo-diagnostico-tratamento-e-como-evitar-complicacoes",
    title: "Bursite do cotovelo: diagnóstico e tratamento",
    excerpt:
      "Um inchaço na ponta do cotovelo pode ser bursite do olécrano. Saiba quando é preciso procurar atendimento.",
    topic: "Cotovelo",
    date: "2024-12-05",
    readingMinutes: 3,
    body: [
      { type: "p", text: "A bursa do olécrano é uma pequena bolsa que fica entre a pele e o osso na ponta do cotovelo. Quando ela inflama, acumula líquido e forma um inchaço característico." },
      { type: "h2", text: "Causas" },
      { type: "ul", items: ["Apoio frequente do cotovelo em superfícies duras", "Trauma direto, como uma batida ou queda", "Infecção, geralmente após pequenos ferimentos na pele", "Doenças inflamatórias, como a gota"] },
      { type: "h2", text: "Quando procurar atendimento" },
      { type: "p", text: "Vermelhidão, calor local, dor intensa ou febre podem indicar infecção e pedem avaliação rápida. Inchaços que não reduzem com o tempo também devem ser avaliados." },
      { type: "h2", text: "Tratamento" },
      { type: "p", text: "Na maioria dos casos não infecciosos, o tratamento envolve proteção do cotovelo, compressão e medicação. A aspiração do líquido pode ser feita em situações selecionadas. Casos infecciosos exigem antibiótico e, às vezes, drenagem. A cirurgia é reservada para bursites recorrentes." },
    ],
  },
];

/**
 * Slugs de artigos do site anterior que ainda não foram migrados.
 * Quem acessar esses endereços é redirecionado (308) para /conteudos.
 */
export const legacyArticleSlugs = [
  "a-rotina-inimiga-descubra-como-habitos-comuns-podem-sabotar-a-saude-do-seu-ombro-e-cotovelo",
  "artroscopia-do-ombro-o-que-e-e-como-funciona-o-tratamento-minimamente-invasivo",
  "cisto-sinovial",
  "clavicula-quebrada",
  "corrida-e-lesoes-no-cotovelo-e-ombro-causas-e-prevencao",
  "crossfit-e-lesoes-no-ombro-como-prevenir-e-tratar",
  "desvendando-as-causas-ocultas-dos-problemas-no-ombro-e-cotovelo",
  "dor-no-braco-direito",
  "dor-no-braco-esquerdo",
  "dor-no-ombro",
  "epicondilite-cotovelo-de-tenista-causas-e-tratamentos",
  "epicondilite-tratamento",
  "estresse-postura-e-saude-do-ombro-e-cotovelo",
  "evite-cirurgias-como-o-fortalecimento-muscular-pode-proteger-suas-articulacoes",
  "lesao-slap-no-ombro-diagnostico-tratamento-e-recuperacao-para-atletas",
  "lesoes-no-ombro-como-identificar-e-quando-procurar-um-ortopedista",
  "luxacao-do-ombro-o-que-fazer-e-como-tratar",
  "luxacao-recorrente-do-ombro-causas-sintomas-e-quando-e-hora-de-operar",
  "tecnicas-regenerativas-alternativas-modernas-para-tratar-dor-no-ombro-e-cotovelo",
  "tendinite-no-ombro-tratamentos-modernos-para-alivio-rapido",
  "tratamento-regenerativo-para-dores-no-ombro-uma-alternativa-minimamente-invasiva",
];

export function sortedArticles() {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );
}
