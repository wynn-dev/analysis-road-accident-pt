import { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Scatter, BarChart, Bar, AreaChart, Area, ReferenceLine } from 'recharts';
import {
  anos, peoes, acidentes,
  estatPeoes, estatAcidentes,
  declive, ordenadaOrigem, r, r2,
  dadosPrincipais, dadosDispersaoComRegressao,
  desvioPadraoResiduos,
  reducaoPeoes, reducaoAcidentes
} from './data';

// Total number of slides
const TOTAL_SLIDES = 12;

// Calculate real-world context values
const peoesMediaDiaria1990 = Math.round(peoes[0]! / 365 * 10) / 10;
const peoesMediaDiaria2023 = Math.round(peoes[33]! / 365 * 10) / 10;
const vidasPoupadasAnuais = peoes[0]! - peoes[33]!;
const vidasPoupadasTotal = Math.round(peoes.slice(0, 34).reduce((acc, val, i) => {
  if (i === 0) return 0;
  const esperado = peoes[0]!; // Se mantivéssemos o nível de 1990
  return acc + Math.max(0, esperado - val);
}, 0));
const acidentesMediaDiaria1990 = Math.round(acidentes[0]! / 365);
const acidentesMediaDiaria2023 = Math.round(acidentes[33]! / 365);

// Slide components
const TitleSlide = () => (
  <div className="slide-content slide-center">
    <p className="slide-label">Estudo Estatístico</p>
    <h1 className="slide-title">Análise da Sinistralidade Rodoviária em Portugal</h1>
    <p className="slide-subtitle">Peões Atropelados e Acidentes de Viação</p>
    <p className="slide-subtitle">Portugal Continental, 1990–2023</p>
    <div className="slide-meta">
      <p>Projeto DAC · Matemática A · 12.º Ano</p>
    </div>
  </div>
);

const IntroSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Introdução e Objetivos</h2>
    <div className="slide-body">
      <div className="slide-list">
        <div className="slide-list-item">
          <span className="slide-bullet">1</span>
          <div>
            <strong>Período de análise:</strong> 1990 a 2023 (34 anos)
          </div>
        </div>
        <div className="slide-list-item">
          <span className="slide-bullet">2</span>
          <div>
            <strong>Variáveis estudadas:</strong>
            <ul>
              <li>X — Número de peões atropelados</li>
              <li>Y — Número total de acidentes de viação</li>
            </ul>
          </div>
        </div>
        <div className="slide-list-item">
          <span className="slide-bullet">3</span>
          <div>
            <strong>Métodos aplicados:</strong>
            <ul>
              <li>Estatística descritiva</li>
              <li>Correlação e regressão linear</li>
              <li>Análise de séries temporais</li>
            </ul>
          </div>
        </div>
        <div className="slide-list-item">
          <span className="slide-bullet">4</span>
          <div>
            <strong>Fonte:</strong> PORDATA / ANSR
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StatsSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Estatística Descritiva</h2>
    <div className="slide-body">
      <div className="stats-grid">
        <div className="stats-card">
          <h3>Peões Atropelados (X)</h3>
          <div className="stats-row">
            <span>Média</span>
            <span className="stats-value">{estatPeoes.media.toFixed(0)}</span>
          </div>
          <div className="stats-row">
            <span>Mediana</span>
            <span className="stats-value">{estatPeoes.mediana.toFixed(0)}</span>
          </div>
          <div className="stats-row">
            <span>Desvio padrão</span>
            <span className="stats-value">{estatPeoes.desvioPadrao.toFixed(0)}</span>
          </div>
          <div className="stats-row">
            <span>Mínimo / Máximo</span>
            <span className="stats-value">{estatPeoes.minimo.toLocaleString('pt-PT')} / {estatPeoes.maximo.toLocaleString('pt-PT')}</span>
          </div>
          <div className="stats-row highlight">
            <span>Coef. Variação</span>
            <span className="stats-value">{estatPeoes.coefVariacao.toFixed(1)}%</span>
          </div>
        </div>
        <div className="stats-card">
          <h3>Acidentes de Viação (Y)</h3>
          <div className="stats-row">
            <span>Média</span>
            <span className="stats-value">{estatAcidentes.media.toFixed(0)}</span>
          </div>
          <div className="stats-row">
            <span>Mediana</span>
            <span className="stats-value">{estatAcidentes.mediana.toFixed(0)}</span>
          </div>
          <div className="stats-row">
            <span>Desvio padrão</span>
            <span className="stats-value">{estatAcidentes.desvioPadrao.toFixed(0)}</span>
          </div>
          <div className="stats-row">
            <span>Mínimo / Máximo</span>
            <span className="stats-value">{estatAcidentes.minimo.toLocaleString('pt-PT')} / {estatAcidentes.maximo.toLocaleString('pt-PT')}</span>
          </div>
          <div className="stats-row highlight">
            <span>Coef. Variação</span>
            <span className="stats-value">{estatAcidentes.coefVariacao.toFixed(1)}%</span>
          </div>
        </div>
      </div>
      <p className="slide-note">
        A variável X apresenta maior dispersão relativa (CV = {estatPeoes.coefVariacao.toFixed(1)}%), 
        indicando maior heterogeneidade nos dados.
      </p>
    </div>
  </div>
);

const EvolutionSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Evolução Temporal (1990–2023)</h2>
    <div className="slide-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dadosPrincipais}>
          <CartesianGrid stroke="#e5e5e5" />
          <XAxis dataKey="ano" tick={{ fontSize: 12, fill: '#737373' }} />
          <YAxis tick={{ fontSize: 12, fill: '#737373' }} domain={[3000, 12000]} />
          <Tooltip />
          <Line type="monotone" dataKey="peoes" name="Peões atropelados" stroke="#171717" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="slide-note">
      Redução de <strong>{reducaoPeoes}%</strong> no período. Mínimo histórico em 2020 (pandemia COVID-19).
    </p>
  </div>
);

const VariationSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Taxa de Variação Anual</h2>
    <div className="slide-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dadosPrincipais}>
          <CartesianGrid stroke="#e5e5e5" />
          <XAxis dataKey="ano" tick={{ fontSize: 10, fill: '#737373' }} />
          <YAxis tick={{ fontSize: 12, fill: '#737373' }} />
          <Tooltip />
          <ReferenceLine y={0} stroke="#171717" />
          <Bar dataKey="variacao" name="Variação (%)" fill="#737373" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <p className="slide-note">
      Maior queda em 2020 (<strong>-24,3%</strong>). Recuperação em 2021 (+14,8%) e 2022 (+11,3%).
    </p>
  </div>
);

const MovingAverageSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Médias Móveis</h2>
    <div className="slide-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dadosPrincipais}>
          <CartesianGrid stroke="#e5e5e5" />
          <XAxis dataKey="ano" tick={{ fontSize: 12, fill: '#737373' }} />
          <YAxis tick={{ fontSize: 12, fill: '#737373' }} domain={[3000, 12000]} />
          <Tooltip />
          <Line type="monotone" dataKey="peoes" name="Dados originais" stroke="#d4d4d4" strokeWidth={1} dot={false} />
          <Line type="monotone" dataKey="mm3" name="MM (k=3)" stroke="#737373" strokeWidth={1.5} dot={false} connectNulls />
          <Line type="monotone" dataKey="mm5" name="MM (k=5)" stroke="#171717" strokeWidth={2.5} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="slide-note">
      A média móvel de ordem 5 evidencia a tendência decrescente, filtrando flutuações aleatórias.
    </p>
  </div>
);

const CorrelationRegressionSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Correlação e Regressão Linear</h2>
    <div className="slide-two-col">
      <div className="slide-chart-half">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dadosDispersaoComRegressao} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid stroke="#e5e5e5" />
            <XAxis type="number" dataKey="peoes" tick={{ fontSize: 10, fill: '#737373' }} domain={[3000, 12000]} />
            <YAxis type="number" tick={{ fontSize: 10, fill: '#737373' }} domain={[22000, 52000]} />
            <Tooltip 
              formatter={(value: number, name: string) => [
                value ? Math.round(value).toLocaleString('pt-PT') : '-',
                name === 'acidentes' ? 'Acidentes' : 'Previsto'
              ]}
              contentStyle={{ fontSize: 11 }}
            />
            <Line type="linear" dataKey="regressao" stroke="#dc2626" strokeWidth={2} dot={false} activeDot={false} />
            <Scatter name="Observações" dataKey="acidentes" fill="#262626" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="slide-stats-panel">
        <div className="big-stat compact">
          <span className="big-stat-label">Coeficiente r</span>
          <span className="big-stat-value">{r.toFixed(4)}</span>
        </div>
        <div className="big-stat compact">
          <span className="big-stat-label">R²</span>
          <span className="big-stat-value">{(r2 * 100).toFixed(1)}%</span>
        </div>
        <div className="equation-mini">
          <span className="equation-mini-label">Equação</span>
          <span className="equation-mini-value">ŷ = {declive.toFixed(2)}x + {Math.round(ordenadaOrigem).toLocaleString('pt-PT')}</span>
        </div>
        <p className="interpretation">
          Correlação <strong>muito forte</strong>
        </p>
      </div>
    </div>
    <p className="slide-note">
      Por cada peão adicional, +{declive.toFixed(2)} acidentes. Previsão para 5 000 peões: {Math.round(declive * 5000 + ordenadaOrigem).toLocaleString('pt-PT')} acidentes.
    </p>
  </div>
);

const ResidualsSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Análise de Resíduos</h2>
    <div className="slide-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dadosPrincipais}>
          <CartesianGrid stroke="#e5e5e5" />
          <XAxis dataKey="ano" tick={{ fontSize: 10, fill: '#737373' }} />
          <YAxis tick={{ fontSize: 12, fill: '#737373' }} />
          <Tooltip />
          <ReferenceLine y={0} stroke="#171717" strokeWidth={1} />
          <ReferenceLine y={desvioPadraoResiduos} stroke="#a3a3a3" strokeDasharray="4 4" />
          <ReferenceLine y={-desvioPadraoResiduos} stroke="#a3a3a3" strokeDasharray="4 4" />
          <Bar dataKey="residuo" name="Resíduo" fill="#737373" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <p className="slide-note">
      Resíduos distribuídos aleatoriamente em torno de zero — modelo linear adequado. σₑ = {desvioPadraoResiduos.toFixed(0)}
    </p>
  </div>
);

const ZScoreSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Valores Padronizados (Z-Score)</h2>
    <div className="slide-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dadosPrincipais}>
          <CartesianGrid stroke="#e5e5e5" />
          <XAxis dataKey="ano" tick={{ fontSize: 12, fill: '#737373' }} />
          <YAxis tick={{ fontSize: 12, fill: '#737373' }} domain={[-2.5, 2.5]} />
          <Tooltip />
          <ReferenceLine y={0} stroke="#a3a3a3" />
          <ReferenceLine y={2} stroke="#d4d4d4" strokeDasharray="4 4" />
          <ReferenceLine y={-2} stroke="#d4d4d4" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="zPeoes" name="Z (Peões)" stroke="#171717" strokeWidth={2} dot={{ r: 2 }} />
          <Line type="monotone" dataKey="zAcidentes" name="Z (Acidentes)" stroke="#a3a3a3" strokeWidth={2} dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="slide-note">
      Evolução paralela das variáveis padronizadas confirma a forte correlação. 2020 é outlier negativo.
    </p>
  </div>
);

const IndexSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Números-Índice (Base 1990 = 100)</h2>
    <div className="slide-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dadosPrincipais}>
          <CartesianGrid stroke="#e5e5e5" />
          <XAxis dataKey="ano" tick={{ fontSize: 12, fill: '#737373' }} />
          <YAxis tick={{ fontSize: 12, fill: '#737373' }} domain={[30, 110]} />
          <Tooltip />
          <ReferenceLine y={100} stroke="#a3a3a3" strokeDasharray="4 4" />
          <ReferenceLine y={50} stroke="#e5e5e5" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="indicePeoes" name="Índice Peões" stroke="#171717" strokeWidth={2} dot={{ r: 2 }} />
          <Line type="monotone" dataKey="indiceAcidentes" name="Índice Acidentes" stroke="#737373" strokeWidth={2} dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="slide-note">
      Em 2023: Peões = {dadosPrincipais[33]?.indicePeoes}% | Acidentes = {dadosPrincipais[33]?.indiceAcidentes}% do valor de 1990.
    </p>
  </div>
);

const ContextSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Contexto Histórico e Impacto Real</h2>
    <div className="slide-body">
      <div className="context-grid">
        <div className="context-section">
          <h3 className="context-title">📊 O que significam os números</h3>
          <div className="context-comparison">
            <div className="context-year">
              <span className="context-year-label">1990</span>
              <span className="context-big-number">{peoesMediaDiaria1990}</span>
              <span className="context-unit">peões/dia</span>
            </div>
            <div className="context-arrow">→</div>
            <div className="context-year">
              <span className="context-year-label">2023</span>
              <span className="context-big-number">{peoesMediaDiaria2023}</span>
              <span className="context-unit">peões/dia</span>
            </div>
          </div>
          <p className="context-note">
            Redução de <strong>{vidasPoupadasAnuais.toLocaleString('pt-PT')}</strong> atropelamentos/ano
          </p>
        </div>
        <div className="context-section">
          <h3 className="context-title">📅 Períodos históricos</h3>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-period">1990–1999</span>
              <span className="timeline-desc">Pré-EU: infraestrutura antiga, frota envelhecida</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-period">2000–2010</span>
              <span className="timeline-desc">Fundos europeus, carta por pontos (2005)</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-period">2011–2014</span>
              <span className="timeline-desc">Crise económica: menos tráfego</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-period">2020</span>
              <span className="timeline-desc">Pandemia COVID-19: confinamentos</span>
            </div>
          </div>
        </div>
      </div>
      <p className="slide-note">
        Em 1990, Portugal tinha uma das piores taxas de sinistralidade da Europa. Hoje está próximo da média europeia.
      </p>
    </div>
  </div>
);

const ConclusionsSlide = () => (
  <div className="slide-content">
    <h2 className="slide-heading">Conclusões</h2>
    <div className="conclusions-grid">
      <div className="conclusion-card">
        <div className="conclusion-icon">↓</div>
        <h3>Tendência Decrescente</h3>
        <p>Redução de {reducaoPeoes}% nos peões e {reducaoAcidentes}% nos acidentes em 34 anos.</p>
      </div>
      <div className="conclusion-card">
        <div className="conclusion-icon">↔</div>
        <h3>Correlação Muito Forte</h3>
        <p>r = {r.toFixed(3)} — {(r2 * 100).toFixed(1)}% da variabilidade explicada pelo modelo.</p>
      </div>
      <div className="conclusion-card">
        <div className="conclusion-icon">⚠</div>
        <h3>Impacto da Pandemia</h3>
        <p>2020 registou mínimos históricos devido às restrições de mobilidade.</p>
      </div>
      <div className="conclusion-card">
        <div className="conclusion-icon">✓</div>
        <h3>Políticas Eficazes</h3>
        <p>Melhoria contínua na segurança rodoviária ao longo de três décadas.</p>
      </div>
    </div>
  </div>
);

// Slide array
const slides = [
  TitleSlide,
  IntroSlide,
  StatsSlide,
  EvolutionSlide,
  VariationSlide,
  MovingAverageSlide,
  ContextSlide,
  CorrelationRegressionSlide,
  ResidualsSlide,
  ZScoreSlide,
  IndexSlide,
  ConclusionsSlide
];

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < TOTAL_SLIDES && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(TOTAL_SLIDES - 1);
          break;
        case 'Escape':
          window.location.href = '/';
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  const CurrentSlideComponent = slides[currentSlide]!;

  return (
    <div className="presentation">
      {/* Navigation areas */}
      <div className="nav-prev" onClick={prevSlide} title="Anterior (←)" />
      <div className="nav-next" onClick={nextSlide} title="Próximo (→)" />

      {/* Slide container */}
      <div className={`slide ${isTransitioning ? 'slide-transitioning' : ''}`}>
        <CurrentSlideComponent />
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }} 
        />
      </div>

      {/* Slide counter */}
      <div className="slide-counter">
        {currentSlide + 1} / {TOTAL_SLIDES}
      </div>

      {/* Navigation dots */}
      <div className="slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentSlide ? 'dot-active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Back to document link */}
      <a href="/" className="back-link" title="Voltar ao documento (Esc)">
        ← Documento
      </a>
    </div>
  );
}
