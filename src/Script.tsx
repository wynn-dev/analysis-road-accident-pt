import { useState, useEffect, useRef, useCallback } from 'react';

// Content item types - discriminated union for type safety
type TextContentItem = {
  type: 'speak' | 'heading' | 'bullet' | 'highlight' | 'warning' | 'action';
  text: string;
};

type DataContentItem = {
  type: 'data';
  label: string;
  value: string;
  note?: string;
};

type ContentItem = TextContentItem | DataContentItem;

type ScriptSection = {
  id: number;
  slide: number | null;
  title: string;
  time: string;
  important?: boolean;
  content: ContentItem[];
};

// Script content organized by slides
const scriptContent: ScriptSection[] = [
  {
    id: 0,
    slide: 1,
    title: "Título",
    time: "~30 seg",
    content: [
      { type: "speak", text: "Bom dia/Boa tarde a todos." },
      { type: "speak", text: "O meu nome é [nome] e vou apresentar um estudo estatístico sobre a sinistralidade rodoviária em Portugal, mais concretamente sobre os peões atropelados e os acidentes de viação com vítimas." },
      { type: "speak", text: "Este trabalho analisa 34 anos de dados — desde 1990 até 2023 — e foi realizado no âmbito da disciplina de Matemática A, utilizando técnicas de estatística descritiva, correlação e regressão linear." },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 1,
    slide: 2,
    title: "Introdução e Objetivos",
    time: "~1 min 30 seg",
    content: [
      { type: "speak", text: "Antes de entrar nos números, deixem-me explicar o que vamos analisar e porquê este tema é relevante." },
      { type: "heading", text: "Primeiro ponto — O período" },
      { type: "speak", text: "Analisámos dados de 1990 a 2023, ou seja, 34 anos completos. Porquê 1990? Porque foi nessa altura que Portugal começou a recolher dados sistemáticos sobre sinistralidade, e também porque coincide com a nossa integração plena na União Europeia, que trouxe grandes mudanças nas infraestruturas e na legislação." },
      { type: "heading", text: "Segundo ponto — As variáveis" },
      { type: "speak", text: "Em estatística, uma \"variável\" é simplesmente aquilo que estamos a medir. Neste caso, temos duas:" },
      { type: "bullet", text: "A variável X representa o número de peões atropelados em cada ano" },
      { type: "bullet", text: "A variável Y representa o número total de acidentes de viação com vítimas" },
      { type: "heading", text: "Terceiro ponto — Os métodos" },
      { type: "bullet", text: "Estatística descritiva — para resumir os dados" },
      { type: "bullet", text: "Correlação e regressão linear — para perceber a relação entre variáveis" },
      { type: "bullet", text: "Análise de séries temporais — para estudar a evolução" },
      { type: "heading", text: "Quarto ponto — A fonte" },
      { type: "speak", text: "Todos os dados vêm da PORDATA, obtidos da Autoridade Nacional de Segurança Rodoviária. São dados oficiais e fiáveis." },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 2,
    slide: 3,
    title: "Estatística Descritiva",
    time: "~3 min",
    content: [
      { type: "speak", text: "Vamos olhar para os números que resumem os nossos dados. Isto chama-se estatística descritiva." },
      { type: "heading", text: "Peões Atropelados (X)" },
      { type: "data", label: "Média", value: "6 642 peões/ano", note: "≈ 18 peões/dia — uma turma inteira diariamente" },
      { type: "data", label: "Mediana", value: "5 765", note: "Inferior à média → anos 90 tinham valores muito altos" },
      { type: "data", label: "Desvio padrão", value: "2 346", note: "Grande variação ao longo dos anos" },
      { type: "data", label: "Mínimo", value: "3 711 (2020)", note: "Pandemia" },
      { type: "data", label: "Máximo", value: "11 369 (1992)", note: "31 peões/dia!" },
      { type: "data", label: "Coef. variação", value: "34,3%", note: "Muita heterogeneidade" },
      { type: "heading", text: "Acidentes de Viação (Y)" },
      { type: "data", label: "Média", value: "38 177/ano", note: "≈ 105 acidentes/dia" },
      { type: "data", label: "Coef. variação", value: "17,1%", note: "Metade do CV dos peões" },
      { type: "highlight", text: "O CV dos peões (34,3%) é o DOBRO dos acidentes (17,1%). Os atropelamentos variaram muito mais — as políticas de proteção de peões foram particularmente eficazes." },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 3,
    slide: 4,
    title: "Evolução Temporal",
    time: "~2 min",
    content: [
      { type: "speak", text: "Este gráfico mostra a evolução dos peões atropelados ao longo de 34 anos." },
      { type: "heading", text: "Anos 90 — A década negra" },
      { type: "speak", text: "Em 1990, Portugal era um dos países com pior segurança rodoviária da Europa. Quase 11 000 peões atropelados por ano — cerca de 30 por dia. As estradas eram más, os carros sem sistemas de segurança modernos, não havia radares." },
      { type: "data", label: "Pico", value: "1992: 11 369", note: "31 peões/dia" },
      { type: "heading", text: "Anos 2000 — O início da mudança" },
      { type: "bullet", text: "1999: Primeiros radares de velocidade" },
      { type: "bullet", text: "2005: Carta de condução por pontos" },
      { type: "bullet", text: "2000-2010: Milhares de milhões € da UE em autoestradas" },
      { type: "heading", text: "2011-2014 — Crise económica" },
      { type: "speak", text: "Menos dinheiro para gasolina = menos deslocações = menos atropelamentos." },
      { type: "heading", text: "2020 — Pandemia" },
      { type: "data", label: "Mínimo histórico", value: "3 711", note: "10 peões/dia — ruas vazias" },
      { type: "highlight", text: "Redução total: 55,3% — de 30 para 13 peões/dia" },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 4,
    slide: 5,
    title: "Taxa de Variação Anual",
    time: "~2 min",
    content: [
      { type: "speak", text: "Este gráfico mostra a variação percentual de ano para ano. Cada barra responde: comparando com o ano anterior, subimos ou descemos?" },
      { type: "bullet", text: "Barra acima de zero = mais atropelamentos que no ano anterior" },
      { type: "bullet", text: "Barra abaixo de zero = menos atropelamentos" },
      { type: "speak", text: "A maioria das barras está abaixo de zero — ano após ano, os atropelamentos foram diminuindo." },
      { type: "heading", text: "Anos problemáticos (barras positivas)" },
      { type: "bullet", text: "1992: +7% — pico histórico" },
      { type: "bullet", text: "2015-2017: Recuperação económica pós-Troika" },
      { type: "bullet", text: "2021-2022: Fim dos confinamentos" },
      { type: "heading", text: "O caso extremo — 2020" },
      { type: "data", label: "Variação", value: "-24,3%", note: "Queda de quase 1/4 num único ano!" },
      { type: "speak", text: "O primeiro confinamento (março-maio 2020) esvaziou as ruas. A sinistralidade está diretamente ligada ao volume de tráfego." },
      { type: "heading", text: "Recuperação 2021-2022" },
      { type: "speak", text: "Os atropelamentos subiram (+14,8% e +11,3%), mas NÃO voltámos aos níveis de 2019. Teletrabalho veio para ficar." },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 5,
    slide: 6,
    title: "Médias Móveis",
    time: "~1 min 30 seg",
    content: [
      { type: "speak", text: "Agora vou mostrar-vos uma técnica chamada média móvel. Ajuda a ver a \"floresta\" quando há muitas \"árvores\"." },
      { type: "heading", text: "O conceito (analogia)" },
      { type: "speak", text: "Imaginem que querem ver a tendência das vossas notas, sem que um teste muito mau distorça a análise. Calculam a média dos últimos 3 ou 5 testes e vão atualizando. Isto \"suaviza\" os altos e baixos." },
      { type: "heading", text: "No gráfico" },
      { type: "bullet", text: "Linha cinzenta clara: dados originais (com todas as oscilações)" },
      { type: "bullet", text: "Linha cinzenta média: média móvel de ordem 3" },
      { type: "bullet", text: "Linha preta: média móvel de ordem 5 (mais \"lisa\")" },
      { type: "highlight", text: "A linha preta mostra claramente a tendência CONSISTENTEMENTE DESCENDENTE, apesar das oscilações anuais." },
      { type: "speak", text: "Se fôssemos o Ministério e quiséssemos avaliar se as políticas funcionam, olharíamos para a média móvel, não para variações anuais." },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 6,
    slide: 7,
    title: "Contexto Histórico e Impacto Real",
    time: "~3 min",
    important: true,
    content: [
      { type: "speak", text: "Este é um dos slides mais importantes — vamos traduzir números em impacto humano." },
      { type: "heading", text: "O que significam os números" },
      { type: "data", label: "1990", value: "29,9 peões/dia", note: "Uma turma inteira atropelada todos os dias" },
      { type: "data", label: "2023", value: "13,4 peões/dia", note: "Ainda é quase 1 pessoa a cada 2 horas" },
      { type: "highlight", text: "Diferença: 6 025 pessoas/ano que NÃO são atropeladas. São famílias que não recebem telefonemas do hospital." },
      { type: "heading", text: "Períodos históricos" },
      { type: "bullet", text: "1990–1999: Era pré-reformas — estradas más, carros inseguros, sem radares" },
      { type: "bullet", text: "2000–2010: Fundos europeus, autoestradas, carta por pontos (2005)" },
      { type: "bullet", text: "2011–2014: Crise/Troika — menos tráfego" },
      { type: "bullet", text: "2020: Pandemia — confinamentos, mínimos históricos" },
      { type: "bullet", text: "2021–2023: \"Novo normal\" — teletrabalho, níveis abaixo de 2019" },
      { type: "heading", text: "Portugal no contexto europeu" },
      { type: "speak", text: "Em 1990, Portugal tinha uma das PIORES taxas de sinistralidade da Europa. Hoje está próximo da média europeia. Esta transformação é um dos maiores sucessos de política pública das últimas décadas." },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 7,
    slide: 8,
    title: "Correlação e Regressão Linear",
    time: "~3 min",
    important: true,
    content: [
      { type: "speak", text: "Será que existe uma relação matemática entre peões atropelados e acidentes totais?" },
      { type: "heading", text: "O diagrama de dispersão" },
      { type: "speak", text: "Cada ponto é um ano. Eixo X = peões, Eixo Y = acidentes. Se os pontos formarem uma linha, há relação forte." },
      { type: "speak", text: "Claramente, formam uma linha diagonal ascendente. A linha vermelha é a reta de regressão." },
      { type: "heading", text: "O coeficiente de correlação (r)" },
      { type: "data", label: "r", value: "0,9510", note: "Correlação MUITO FORTE positiva" },
      { type: "speak", text: "O coeficiente varia entre -1 e +1. Com r = 0,95, estamos no topo da escala (0,90-1,00 = muito forte)." },
      { type: "heading", text: "O coeficiente de determinação (R²)" },
      { type: "data", label: "R²", value: "90,4%", note: "% da variação explicada" },
      { type: "highlight", text: "90,4% da variação nos acidentes pode ser explicada pela variação nos atropelamentos de peões." },
      { type: "heading", text: "A equação de regressão" },
      { type: "data", label: "Equação", value: "ŷ = 2,63x + 20 775", note: "" },
      { type: "bullet", text: "ŷ = valor PREVISTO de acidentes" },
      { type: "bullet", text: "2,63 = declive (por cada peão adicional, +2,63 acidentes)" },
      { type: "bullet", text: "20 775 = ordenada na origem (valor teórico)" },
      { type: "warning", text: "ATENÇÃO: Correlação ≠ causalidade! As mesmas condições que aumentam atropelamentos também aumentam acidentes." },
      { type: "heading", text: "Exemplo prático" },
      { type: "data", label: "Para 5 000 peões", value: "ŷ = 2,63 × 5000 + 20775 = 33 941 acidentes", note: "" },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 8,
    slide: 9,
    title: "Análise de Resíduos",
    time: "~1 min 30 seg",
    content: [
      { type: "speak", text: "A equação é boa? Podemos confiar nas previsões? Para avaliar, analisamos os resíduos." },
      { type: "heading", text: "O que é um resíduo?" },
      { type: "data", label: "Fórmula", value: "Resíduo = Valor Real − Valor Previsto", note: "" },
      { type: "bullet", text: "Resíduo = 0 → previsão perfeita" },
      { type: "bullet", text: "Resíduo > 0 → subestimámos" },
      { type: "bullet", text: "Resíduo < 0 → sobrestimámos" },
      { type: "heading", text: "O que procuramos?" },
      { type: "speak", text: "Resíduos distribuídos ALEATORIAMENTE em torno de zero, sem padrões. Se houvesse um padrão (ex: todos positivos no início, negativos no fim), a relação não seria realmente linear." },
      { type: "speak", text: "No gráfico, os resíduos estão bem distribuídos — bom sinal!" },
      { type: "data", label: "Desvio padrão dos resíduos", value: "≈ 2 490", note: "Erro típico de ~6-8% — razoável" },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 9,
    slide: 10,
    title: "Valores Padronizados (Z-Score)",
    time: "~2 min",
    content: [
      { type: "speak", text: "Este gráfico usa Z-Score ou valor padronizado. Parece complicado, mas é muito útil." },
      { type: "heading", text: "O problema" },
      { type: "speak", text: "Queremos comparar peões (5 000-10 000) com acidentes (30 000-50 000). Escalas diferentes — como comparar?" },
      { type: "heading", text: "A solução — padronização" },
      { type: "data", label: "Fórmula", value: "Z = (valor − média) ÷ desvio padrão", note: "" },
      { type: "bullet", text: "Z = 0 → exatamente na média" },
      { type: "bullet", text: "Z = +1 → 1 desvio padrão acima" },
      { type: "bullet", text: "|Z| > 2 → valor ATÍPICO (outlier)" },
      { type: "heading", text: "No gráfico" },
      { type: "speak", text: "Linha preta = peões. Linha cinzenta = acidentes. Reparem como seguem QUASE O MESMO TRAJETO!" },
      { type: "highlight", text: "Evolução paralela confirma visualmente a forte correlação (r = 0,92)." },
      { type: "heading", text: "O caso de 2020" },
      { type: "speak", text: "Ambas as linhas têm o ponto mais baixo em 2020, com Z-score quase -2. Em estatística, |Z| > 2 indica outlier — estatisticamente raro (<5% por acaso)." },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 10,
    slide: 11,
    title: "Números-Índice",
    time: "~2 min",
    content: [
      { type: "speak", text: "Última ferramenta — números-índice. Forma muito intuitiva de visualizar a evolução." },
      { type: "heading", text: "O conceito" },
      { type: "speak", text: "Escolhemos 1990 como referência (índice = 100). Todos os outros anos são expressos como percentagem de 1990." },
      { type: "heading", text: "Exemplo" },
      { type: "bullet", text: "1990: 10 898 peões → índice = 100" },
      { type: "bullet", text: "2000: 7 913 peões → índice = (7913 ÷ 10898) × 100 = 72,6" },
      { type: "speak", text: "Índice 72,6 significa que em 2000 os atropelamentos eram 72,6% do que eram em 1990." },
      { type: "heading", text: "Em 2023" },
      { type: "data", label: "Índice peões", value: "44,7", note: "Menos de METADE de 1990" },
      { type: "data", label: "Índice acidentes", value: "70,6", note: "Cerca de 70% de 1990" },
      { type: "highlight", text: "Atropelamentos reduziram MUITO MAIS (-55%) que acidentes em geral (-29%). Políticas específicas de proteção de peões foram particularmente eficazes." },
      { type: "action", text: "Avançar" }
    ]
  },
  {
    id: 11,
    slide: 12,
    title: "Conclusões",
    time: "~2 min",
    important: true,
    content: [
      { type: "speak", text: "Chegamos às conclusões. Quatro pontos principais:" },
      { type: "heading", text: "1. Tendência Decrescente Consistente" },
      { type: "bullet", text: "Redução de 55,3% nos peões (de 30 para 13/dia)" },
      { type: "bullet", text: "Redução de 29,4% nos acidentes totais" },
      { type: "speak", text: "Portugal transformou-se de um dos países mais perigosos da Europa para próximo da média europeia." },
      { type: "heading", text: "2. Correlação Muito Forte" },
      { type: "data", label: "r", value: "0,924", note: "R² = 85,4% da variabilidade explicada" },
      { type: "speak", text: "Políticas que reduzam um tipo de sinistralidade tendem a reduzir o outro." },
      { type: "heading", text: "3. Impacto da Pandemia" },
      { type: "speak", text: "2020 foi outlier estatístico. Mostra que sinistralidade está ligada ao volume de tráfego. Solução: tráfego mais SEGURO, não menos tráfego." },
      { type: "heading", text: "4. Eficácia das Políticas Públicas" },
      { type: "speak", text: "Não foi acidental: infraestruturas, legislação, tecnologia, fiscalização, educação. Caso de sucesso de política pública baseada em evidências." },
      { type: "action", text: "Avançar para encerramento" }
    ]
  },
  {
    id: 12,
    slide: null,
    title: "Encerramento",
    time: "~30 seg",
    content: [
      { type: "speak", text: "Em resumo, Portugal fez progressos notáveis na redução da sinistralidade rodoviária. Passámos de 30 peões atropelados por dia para 13." },
      { type: "speak", text: "No entanto, 13 pessoas por dia ainda são 13 famílias afetadas. Ainda há trabalho a fazer." },
      { type: "speak", text: "A estatística é uma ferramenta poderosa para analisar dados e avaliar políticas. Mas por trás de cada número há uma pessoa — e é isso que dá urgência a este tipo de análise." },
      { type: "highlight", text: "Obrigado pela vossa atenção. Estou disponível para responder a perguntas." }
    ]
  }
];

// Quick reference data for bottom panel
const quickRef = {
  stats: [
    { label: "Média peões", value: "6 642/ano" },
    { label: "r", value: "0,9510" },
    { label: "R²", value: "90,4%" },
    { label: "Redução", value: "55,3%" }
  ]
};

export function Script() {
  const [currentSection, setCurrentSection] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [darkMode, setDarkMode] = useState(true);
  const [autoScroll, setAutoScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto scroll
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (autoScroll && contentRef.current) {
      interval = setInterval(() => {
        contentRef.current?.scrollBy({ top: 1, behavior: 'auto' });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [autoScroll]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault();
          goToSection(Math.min(currentSection + 1, scriptContent.length - 1));
          break;
        case 'ArrowUp':
        case 'k':
          e.preventDefault();
          goToSection(Math.max(currentSection - 1, 0));
          break;
        case ' ':
          e.preventDefault();
          setIsTimerRunning(t => !t);
          break;
        case 'a':
          setAutoScroll(a => !a);
          break;
        case '+':
        case '=':
          setFontSize(s => Math.min(s + 2, 32));
          break;
        case '-':
          setFontSize(s => Math.max(s - 2, 12));
          break;
        case 'd':
          setDarkMode(d => !d);
          break;
        case 'n':
          setShowNav(n => !n);
          break;
        case 'Escape':
          setShowNav(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  const goToSection = useCallback((index: number) => {
    setCurrentSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Stable ref callback factory for section refs
  const setSectionRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Track current section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const scrollTop = contentRef.current.scrollTop;
      const viewportHeight = contentRef.current.clientHeight;
      
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const ref = sectionRefs.current[i];
        if (ref && ref.offsetTop <= scrollTop + viewportHeight / 3) {
          setCurrentSection(i);
          break;
        }
      }
    };

    const container = contentRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = (item: ContentItem, idx: number) => {
    switch (item.type) {
      case 'speak':
        return (
          <p key={idx} className="script-speak" style={{ fontSize }}>
            {item.text}
          </p>
        );
      case 'heading':
        return (
          <h3 key={idx} className="script-subheading" style={{ fontSize: fontSize * 0.9 }}>
            {item.text}
          </h3>
        );
      case 'bullet':
        return (
          <p key={idx} className="script-bullet" style={{ fontSize: fontSize * 0.95 }}>
            <span className="bullet-dot">•</span>
            {item.text}
          </p>
        );
      case 'data':
        return (
          <div key={idx} className="script-data" style={{ fontSize: fontSize * 0.9 }}>
            <span className="data-label">{item.label}:</span>
            <span className="data-value">{item.value}</span>
            {item.note && <span className="data-note">{item.note}</span>}
          </div>
        );
      case 'highlight':
        return (
          <div key={idx} className="script-highlight" style={{ fontSize }}>
            {item.text}
          </div>
        );
      case 'warning':
        return (
          <div key={idx} className="script-warning" style={{ fontSize: fontSize * 0.9 }}>
            {item.text}
          </div>
        );
      case 'action':
        return (
          <div key={idx} className="script-action" style={{ fontSize: fontSize * 0.85 }}>
            → {item.text}
          </div>
        );
    }
  };

  return (
    <div className={`script-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <header className="script-header">
        <div className="header-left">
          <span className="slide-indicator">
            {scriptContent[currentSection]?.slide 
              ? `Slide ${scriptContent[currentSection].slide}/13` 
              : 'Fim'}
          </span>
          <span className="section-time">{scriptContent[currentSection]?.time}</span>
        </div>
        <div className="header-center">
          <button
            className={`timer-btn ${isTimerRunning ? 'running' : ''}`}
            onClick={() => setIsTimerRunning(t => !t)}
            role="timer"
            aria-label={`Temporizador: ${formatTime(elapsedTime)}. ${isTimerRunning ? 'Clique para pausar' : 'Clique para iniciar'}`}
          >
            {formatTime(elapsedTime)}
          </button>
        </div>
        <div className="header-right">
          <button
            className="nav-toggle"
            onClick={() => setShowNav(n => !n)}
            aria-label="Abrir menu de navegação"
            aria-expanded={showNav}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div
        className="script-progress"
        role="progressbar"
        aria-valuenow={currentSection + 1}
        aria-valuemin={1}
        aria-valuemax={scriptContent.length}
        aria-label={`Progresso: secção ${currentSection + 1} de ${scriptContent.length}`}
      >
        <div
          className="progress-fill"
          style={{ width: `${((currentSection + 1) / scriptContent.length) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <main className="script-main" ref={contentRef}>
        {scriptContent.map((section, sectionIdx) => (
          <div
            key={section.id}
            ref={setSectionRef(sectionIdx)}
            className={`script-section ${sectionIdx === currentSection ? 'active' : ''} ${section.important ? 'important' : ''}`}
          >
            <div className="section-header">
              <h2 className="section-title" style={{ fontSize: fontSize * 1.2 }}>
                {section.slide && <span className="section-slide">#{section.slide}</span>}
                {section.title}
              </h2>
            </div>
            <div className="section-content">
              {section.content.map((item, idx) => renderContent(item, idx))}
            </div>
          </div>
        ))}
        <div className="script-end">
          <p>Fim do guião</p>
          <a href="/presentation" className="back-to-pres">Ver Apresentação →</a>
        </div>
      </main>

      {/* Quick reference bar */}
      <div className="quick-ref">
        {quickRef.stats.map((stat, i) => (
          <div key={i} className="quick-stat">
            <span className="quick-label">{stat.label}</span>
            <span className="quick-value">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Navigation panel */}
      {showNav && (
        <div
          className="nav-panel"
          onClick={() => setShowNav(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Painel de navegação"
        >
          <div className="nav-content" onClick={e => e.stopPropagation()}>
            <div className="nav-header">
              <h3>Navegação</h3>
              <button
                className="nav-close"
                onClick={() => setShowNav(false)}
                aria-label="Fechar menu de navegação"
              >
                ✕
              </button>
            </div>
            <div className="nav-sections">
              {scriptContent.map((section, idx) => (
                <button
                  key={section.id}
                  className={`nav-item ${idx === currentSection ? 'active' : ''} ${section.important ? 'important' : ''}`}
                  onClick={() => { goToSection(idx); setShowNav(false); }}
                >
                  {section.slide && <span className="nav-slide">#{section.slide}</span>}
                  <span className="nav-title">{section.title}</span>
                  <span className="nav-time">{section.time}</span>
                </button>
              ))}
            </div>
            <div className="nav-controls">
              <div className="control-group">
                <label>Tamanho</label>
                <div className="control-btns">
                  <button onClick={() => setFontSize(s => Math.max(s - 2, 12))}>A−</button>
                  <span>{fontSize}</span>
                  <button onClick={() => setFontSize(s => Math.min(s + 2, 32))}>A+</button>
                </div>
              </div>
              <div className="control-group">
                <label>Tema</label>
                <button 
                  className={`toggle-btn ${darkMode ? 'on' : ''}`}
                  onClick={() => setDarkMode(d => !d)}
                >
                  {darkMode ? '🌙 Escuro' : '☀️ Claro'}
                </button>
              </div>
              <div className="control-group">
                <label>Auto-scroll</label>
                <button 
                  className={`toggle-btn ${autoScroll ? 'on' : ''}`}
                  onClick={() => setAutoScroll(a => !a)}
                >
                  {autoScroll ? '▶ Ativo' : '⏸ Parado'}
                </button>
              </div>
              <div className="control-group">
                <label>Temporizador</label>
                <div className="control-btns">
                  <button onClick={() => setIsTimerRunning(t => !t)}>
                    {isTimerRunning ? '⏸' : '▶'}
                  </button>
                  <button onClick={() => setElapsedTime(0)}>⟲</button>
                </div>
              </div>
            </div>
            <div className="nav-shortcuts">
              <p><kbd>↑↓</kbd> Navegar <kbd>Space</kbd> Timer <kbd>+−</kbd> Tamanho <kbd>d</kbd> Tema</p>
            </div>
            <a href="/" className="nav-back">← Voltar ao documento</a>
          </div>
        </div>
      )}

      {/* Floating nav buttons for touch */}
      <div className="touch-nav" role="navigation" aria-label="Navegação por secções">
        <button
          className="touch-prev"
          onClick={() => goToSection(Math.max(currentSection - 1, 0))}
          disabled={currentSection === 0}
          aria-label="Secção anterior"
        >
          ↑
        </button>
        <button
          className="touch-next"
          onClick={() => goToSection(Math.min(currentSection + 1, scriptContent.length - 1))}
          disabled={currentSection === scriptContent.length - 1}
          aria-label="Próxima secção"
        >
          ↓
        </button>
      </div>
    </div>
  );
}
