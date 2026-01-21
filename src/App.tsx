import type { ReactNode } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Scatter, BarChart, Bar, AreaChart, Area, ReferenceLine } from 'recharts';
import {
  peoes, acidentes,
  estatPeoes, estatAcidentes,
  declive, ordenadaOrigem, r, r2,
  dadosPrincipais, dadosDispersaoComRegressao,
  histogramaPeoes, histogramaAcidentes,
  desvioPadraoResiduos,
  indicePeoes, indiceAcidentes,
  reducaoPeoes, reducaoAcidentes
} from './data';

// === COMPONENTES DE APRESENTAÇÃO ===
interface SeccaoProps {
  titulo: string;
  children: ReactNode;
}

const Seccao = ({ titulo, children }: SeccaoProps) => (
  <section className="mb-12">
    <h2 className="text-lg font-medium mb-4 pb-2 border-b border-neutral-200">{titulo}</h2>
    {children}
  </section>
);

const Paragrafo = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-neutral-700 leading-relaxed mb-4">{children}</p>
);

interface TabelaItem {
  label: string;
  valor: string;
}

const TabelaEstatisticas = ({ titulo, dados }: { titulo: string; dados: TabelaItem[] }) => (
  <div className="mb-6">
    <h3 className="text-sm font-medium mb-3 text-neutral-600">{titulo}</h3>
    <div className="border border-neutral-200">
      {dados.map((item, i) => (
        <div key={i} className={`flex justify-between px-4 py-2 text-sm ${i % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}`}>
          <span className="text-neutral-600">{item.label}</span>
          <span className="font-mono">{item.valor}</span>
        </div>
      ))}
    </div>
  </div>
);

const Formula = ({ children }: { children: ReactNode }) => (
  <div className="bg-neutral-50 border border-neutral-200 px-4 py-3 my-4 font-mono text-sm text-center">
    {children}
  </div>
);

const Grafico = ({ children, altura = 280 }: { children: ReactNode; altura?: number }) => (
  // eslint-disable-next-line react/forbid-dom-props
  <div className="my-6 border border-neutral-200 p-4 bg-white" style={{ height: altura }}>
    {children}
  </div>
);

export function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* CABEÇALHO */}
        <header className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Estudo Estatístico</p>
          <h1 className="text-2xl font-light mb-2">Análise da Sinistralidade Rodoviária em Portugal</h1>
          <p className="text-sm text-neutral-500">Peões Atropelados e Acidentes de Viação</p>
          <p className="text-sm text-neutral-500">Portugal Continental, 1990–2023</p>
          <div className="flex gap-3 mt-4">
            <a href="/presentation" className="inline-block px-4 py-2 text-sm border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 transition-colors">
              Ver Apresentação →
            </a>
            <a href="/script" className="inline-block px-4 py-2 text-sm border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 transition-colors">
              Guião do Apresentador →
            </a>
          </div>
        </header>

        {/* 1. INTRODUÇÃO */}
        <Seccao titulo="1. Introdução">
          <Paragrafo>
            O presente estudo tem como objetivo realizar uma análise estatística aprofundada da evolução 
            da sinistralidade rodoviária em Portugal Continental, no período compreendido entre 1990 e 2023. 
            Foram consideradas duas variáveis quantitativas: o número de peões atropelados (variável X) e o 
            número total de acidentes de viação com vítimas (variável Y).
          </Paragrafo>
          <Paragrafo>
            A análise contempla o cálculo de medidas de tendência central e de dispersão, a determinação 
            do coeficiente de correlação linear de Pearson, a obtenção da reta de regressão linear pelo 
            método dos mínimos quadrados, e diversas técnicas de análise de séries temporais, incluindo 
            médias móveis, números-índice e valores padronizados.
          </Paragrafo>
          <Paragrafo>
            Os dados utilizados foram obtidos através do portal PORDATA, com informação proveniente da 
            Autoridade Nacional de Segurança Rodoviária (ANSR). A amostra é constituída por n = 34 
            observações anuais.
          </Paragrafo>
        </Seccao>

        {/* 2. ESTATÍSTICA DESCRITIVA */}
        <Seccao titulo="2. Estatística Descritiva">
          <Paragrafo>
            As medidas de estatística descritiva permitem resumir e caracterizar o conjunto de dados. 
            Distinguem-se as medidas de tendência central (média, mediana) e as medidas de dispersão 
            (desvio padrão, variância, amplitude e amplitude interquartil).
          </Paragrafo>

          <div className="grid grid-cols-2 gap-6">
            <TabelaEstatisticas
              titulo="Variável X: Peões Atropelados"
              dados={[
                { label: 'Média aritmética', valor: estatPeoes.media.toFixed(2) },
                { label: 'Mediana', valor: estatPeoes.mediana.toFixed(2) },
                { label: 'Desvio padrão', valor: estatPeoes.desvioPadrao.toFixed(2) },
                { label: 'Variância', valor: estatPeoes.variancia.toFixed(2) },
                { label: 'Mínimo', valor: estatPeoes.minimo.toLocaleString('pt-PT') },
                { label: 'Máximo', valor: estatPeoes.maximo.toLocaleString('pt-PT') },
                { label: 'Amplitude', valor: estatPeoes.amplitude.toLocaleString('pt-PT') },
                { label: 'Quartil Q1 (25%)', valor: estatPeoes.q1.toFixed(2) },
                { label: 'Quartil Q3 (75%)', valor: estatPeoes.q3.toFixed(2) },
                { label: 'Amplitude interquartil', valor: estatPeoes.iqr.toFixed(2) },
                { label: 'Coef. de variação', valor: estatPeoes.coefVariacao.toFixed(2) + '%' }
              ]}
            />
            <TabelaEstatisticas
              titulo="Variável Y: Acidentes de Viação"
              dados={[
                { label: 'Média aritmética', valor: estatAcidentes.media.toFixed(2) },
                { label: 'Mediana', valor: estatAcidentes.mediana.toFixed(2) },
                { label: 'Desvio padrão', valor: estatAcidentes.desvioPadrao.toFixed(2) },
                { label: 'Variância', valor: estatAcidentes.variancia.toFixed(2) },
                { label: 'Mínimo', valor: estatAcidentes.minimo.toLocaleString('pt-PT') },
                { label: 'Máximo', valor: estatAcidentes.maximo.toLocaleString('pt-PT') },
                { label: 'Amplitude', valor: estatAcidentes.amplitude.toLocaleString('pt-PT') },
                { label: 'Quartil Q1 (25%)', valor: estatAcidentes.q1.toFixed(2) },
                { label: 'Quartil Q3 (75%)', valor: estatAcidentes.q3.toFixed(2) },
                { label: 'Amplitude interquartil', valor: estatAcidentes.iqr.toFixed(2) },
                { label: 'Coef. de variação', valor: estatAcidentes.coefVariacao.toFixed(2) + '%' }
              ]}
            />
          </div>

          <Paragrafo>
            O coeficiente de variação (CV) permite comparar a dispersão relativa entre as duas variáveis. 
            Com CV = {estatPeoes.coefVariacao.toFixed(2)}% para os peões atropelados e CV = {estatAcidentes.coefVariacao.toFixed(2)}% 
            para os acidentes, verifica-se que a variável X apresenta maior dispersão relativa, indicando 
            maior heterogeneidade nos dados ao longo do período analisado.
          </Paragrafo>

          <h3 className="text-sm font-medium mb-3 text-neutral-600 mt-8">Distribuição de frequências</h3>
          <Paragrafo>
            Os histogramas seguintes apresentam a distribuição de frequências absolutas para cada variável, 
            permitindo visualizar a forma da distribuição dos dados.
          </Paragrafo>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Peões Atropelados</p>
              <Grafico altura={200}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={histogramaPeoes}>
                    <CartesianGrid stroke="#e5e5e5" />
                    <XAxis dataKey="classe" tick={{ fontSize: 9, fill: '#737373' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#737373' }} />
                    <Tooltip />
                    <Bar dataKey="frequencia" fill="#525252" />
                  </BarChart>
                </ResponsiveContainer>
              </Grafico>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Acidentes de Viação</p>
              <Grafico altura={200}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={histogramaAcidentes}>
                    <CartesianGrid stroke="#e5e5e5" />
                    <XAxis dataKey="classe" tick={{ fontSize: 9, fill: '#737373' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#737373' }} />
                    <Tooltip />
                    <Bar dataKey="frequencia" fill="#737373" />
                  </BarChart>
                </ResponsiveContainer>
              </Grafico>
            </div>
          </div>
        </Seccao>

        {/* 3. EVOLUÇÃO TEMPORAL */}
        <Seccao titulo="3. Evolução Temporal">
          <Paragrafo>
            A análise da evolução temporal das variáveis permite identificar tendências e padrões ao 
            longo do período estudado. O gráfico seguinte apresenta a evolução do número de peões 
            atropelados entre 1990 e 2023.
          </Paragrafo>

          <Grafico altura={300}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosPrincipais}>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="ano" tick={{ fontSize: 10, fill: '#737373' }} />
                <YAxis tick={{ fontSize: 10, fill: '#737373' }} domain={[3000, 12000]} />
                <Tooltip />
                <Line type="monotone" dataKey="peoes" name="Peões atropelados" stroke="#171717" strokeWidth={1.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </Grafico>

          <Paragrafo>
            Observa-se uma tendência decrescente acentuada ao longo do período. O valor máximo registou-se 
            em 1992 (11 369 peões atropelados) e o valor mínimo em 2020 (3 711), ano marcado pelas 
            restrições de mobilidade devido à pandemia de COVID-19. Entre 1990 e 2023, verificou-se uma 
            redução de {reducaoPeoes}% no número de peões atropelados.
          </Paragrafo>

          <h3 className="text-sm font-medium mb-3 text-neutral-600 mt-8">Taxa de variação anual</h3>
          <Paragrafo>
            A taxa de variação anual, expressa em percentagem, quantifica a alteração relativa entre anos 
            consecutivos. Valores negativos indicam decréscimo e valores positivos indicam acréscimo.
          </Paragrafo>

          <Grafico altura={250}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosPrincipais}>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="ano" tick={{ fontSize: 9, fill: '#737373' }} />
                <YAxis tick={{ fontSize: 10, fill: '#737373' }} />
                <Tooltip />
                <ReferenceLine y={0} stroke="#171717" />
                <Bar dataKey="variacao" name="Variação anual (%)" fill="#737373" />
              </BarChart>
            </ResponsiveContainer>
          </Grafico>

          <Paragrafo>
            A maior redução anual ocorreu em 2020 (-24,3%), refletindo o impacto das medidas de confinamento. 
            Os anos de 2021 e 2022 registaram aumentos (+14,8% e +11,3%, respetivamente), correspondendo 
            à recuperação pós-pandémica.
          </Paragrafo>
        </Seccao>

        {/* 4. MÉDIAS MÓVEIS */}
        <Seccao titulo="4. Médias Móveis">
          <Paragrafo>
            As médias móveis são uma técnica de suavização que permite filtrar flutuações aleatórias e 
            evidenciar a tendência subjacente dos dados. Calculam-se através da média aritmética de um 
            número fixo de observações consecutivas (janela).
          </Paragrafo>

          <Formula>
            MM(k)ₜ = (Xₜ + Xₜ₋₁ + ... + Xₜ₋ₖ₊₁) / k
          </Formula>

          <Paragrafo>
            Foram calculadas médias móveis de ordem 3 (MM-3) e de ordem 5 (MM-5). Uma janela maior produz 
            maior suavização, mas implica a perda de mais observações no início da série.
          </Paragrafo>

          <Grafico altura={300}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosPrincipais}>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="ano" tick={{ fontSize: 10, fill: '#737373' }} />
                <YAxis tick={{ fontSize: 10, fill: '#737373' }} domain={[3000, 12000]} />
                <Tooltip />
                <Line type="monotone" dataKey="peoes" name="Dados originais" stroke="#d4d4d4" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="mm3" name="Média móvel (k=3)" stroke="#737373" strokeWidth={1.5} dot={false} connectNulls />
                <Line type="monotone" dataKey="mm5" name="Média móvel (k=5)" stroke="#171717" strokeWidth={2} dot={false} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </Grafico>

          <Paragrafo>
            A média móvel de ordem 5 evidencia claramente a tendência decrescente, eliminando as oscilações 
            de curto prazo. Note-se que a anomalia de 2020 é atenuada, mas ainda visível, confirmando que 
            não se trata de uma flutuação aleatória, mas de um evento extraordinário.
          </Paragrafo>
        </Seccao>

        {/* 5. CORRELAÇÃO E REGRESSÃO LINEAR */}
        <Seccao titulo="5. Correlação e Regressão Linear">
          <Paragrafo>
            O coeficiente de correlação linear de Pearson (r) mede a intensidade e o sentido da relação 
            linear entre duas variáveis quantitativas. O seu valor varia entre -1 e +1, onde valores 
            próximos de |1| indicam correlação forte e valores próximos de 0 indicam ausência de correlação linear.
          </Paragrafo>

          <Formula>
            r = [n·ΣXY - (ΣX)(ΣY)] / √[(n·ΣX² - (ΣX)²)(n·ΣY² - (ΣY)²)]
          </Formula>

          <div className="bg-neutral-50 border border-neutral-200 p-4 my-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-500">Coeficiente de correlação (r)</p>
                <p className="text-2xl font-light mt-1">{r.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-neutral-500">Coeficiente de determinação (R²)</p>
                <p className="text-2xl font-light mt-1">{r2.toFixed(4)}</p>
              </div>
            </div>
          </div>

          <Paragrafo>
            O valor obtido de r = {r.toFixed(4)} indica uma <strong>correlação linear positiva muito forte</strong> entre 
            as duas variáveis. De acordo com a escala de interpretação convencional, valores de |r| superiores 
            a 0,90 correspondem a correlação muito forte.
          </Paragrafo>

          <TabelaEstatisticas
            titulo="Escala de interpretação do coeficiente de correlação"
            dados={[
              { label: '0,00 a 0,19', valor: 'Correlação muito fraca' },
              { label: '0,20 a 0,39', valor: 'Correlação fraca' },
              { label: '0,40 a 0,69', valor: 'Correlação moderada' },
              { label: '0,70 a 0,89', valor: 'Correlação forte' },
              { label: '0,90 a 1,00', valor: 'Correlação muito forte ✓' }
            ]}
          />

          <Paragrafo>
            O coeficiente de determinação R² = {r2.toFixed(4)} indica que <strong>{(r2 * 100).toFixed(1)}%</strong> da 
            variabilidade observada no número de acidentes pode ser explicada pela variação no número de 
            peões atropelados, assumindo uma relação linear entre as variáveis.
          </Paragrafo>

          <h3 className="text-sm font-medium mb-3 text-neutral-600 mt-8">Diagrama de dispersão e reta de regressão</h3>
          <Paragrafo>
            O diagrama de dispersão permite visualizar a relação entre as duas variáveis. Cada ponto 
            representa um par ordenado (peões, acidentes) correspondente a um ano. A reta de regressão 
            (a vermelho) é determinada pelo método dos mínimos quadrados.
          </Paragrafo>

          <Grafico altura={340}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart 
                data={dadosDispersaoComRegressao}
                margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
              >
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis 
                  type="number" 
                  dataKey="peoes" 
                  name="Peões" 
                  tick={{ fontSize: 10, fill: '#737373' }}
                  domain={[3000, 12000]}
                  tickCount={10}
                  label={{ value: 'Peões atropelados (X)', position: 'bottom', offset: 20, fontSize: 11, fill: '#525252' }}
                />
                <YAxis 
                  type="number" 
                  tick={{ fontSize: 10, fill: '#737373' }}
                  domain={[22000, 52000]}
                  tickCount={8}
                  label={{ value: 'Acidentes (Y)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: '#525252' }}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    value ? Math.round(value).toLocaleString('pt-PT') : '-', 
                    name === 'acidentes' ? 'Acidentes (real)' : name === 'regressao' ? 'Previsto (regressão)' : 'Peões'
                  ]}
                  labelFormatter={(_, payload) => {
                    const item = payload?.[0]?.payload;
                    return item?.ano ? `Ano: ${item.ano}` : '';
                  }}
                  contentStyle={{ fontSize: 12 }}
                />
                <Line 
                  type="linear" 
                  dataKey="regressao" 
                  name="Reta de regressão" 
                  stroke="#dc2626" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={false}
                  legendType="line"
                />
                <Scatter 
                  name="Observações" 
                  dataKey="acidentes" 
                  fill="#262626" 
                  shape="circle"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Grafico>

          <h3 className="text-sm font-medium mb-3 text-neutral-600 mt-8">Equação da reta de regressão</h3>
          <Paragrafo>
            A regressão linear permite estabelecer uma equação que relaciona as duas variáveis, possibilitando 
            a previsão do valor de Y (acidentes) a partir de X (peões atropelados):
          </Paragrafo>

          <Formula>
            ŷ = {declive.toFixed(4)}x + {ordenadaOrigem.toFixed(2)}
          </Formula>

          <div className="bg-neutral-50 border border-neutral-200 p-4 my-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-500">Declive (m)</p>
                <p className="text-xl font-light font-mono mt-1">{declive.toFixed(4)}</p>
                <p className="text-xs text-neutral-400 mt-1">Por cada peão adicional, +{declive.toFixed(2)} acidentes</p>
              </div>
              <div>
                <p className="text-neutral-500">Ordenada na origem (b)</p>
                <p className="text-xl font-light font-mono mt-1">{ordenadaOrigem.toFixed(2)}</p>
                <p className="text-xs text-neutral-400 mt-1">Valor teórico quando X = 0</p>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-medium mb-3 text-neutral-600 mt-6">Exemplo de previsão</h3>
          <Paragrafo>
            Utilizando a equação de regressão, é possível estimar o número de acidentes para um dado número 
            de peões atropelados. Por exemplo, para X = 5 000 peões:
          </Paragrafo>
          <Formula>
            ŷ = {declive.toFixed(4)} × 5000 + {ordenadaOrigem.toFixed(2)} = {Math.round(declive * 5000 + ordenadaOrigem).toLocaleString('pt-PT')} acidentes
          </Formula>

          <Paragrafo>
            A disposição dos pontos no diagrama de dispersão evidencia a forte relação linear positiva: quando 
            o número de peões atropelados aumenta, o número de acidentes também tende a aumentar. A nuvem de 
            pontos apresenta forma aproximadamente alongada na direção da reta de regressão, confirmando a 
            adequação do modelo linear.
          </Paragrafo>
        </Seccao>

        {/* 6. ANÁLISE DE RESÍDUOS */}
        <Seccao titulo="6. Análise de Resíduos">
          <Paragrafo>
            Os resíduos representam as diferenças entre os valores observados e os valores previstos pelo 
            modelo de regressão. A análise dos resíduos permite avaliar a qualidade do ajustamento e 
            verificar os pressupostos do modelo.
          </Paragrafo>

          <Formula>
            eᵢ = yᵢ - ŷᵢ = yᵢ - (mx_i + b)
          </Formula>

          <Grafico altura={280}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosPrincipais}>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="ano" tick={{ fontSize: 9, fill: '#737373' }} />
                <YAxis tick={{ fontSize: 10, fill: '#737373' }} />
                <Tooltip />
                <ReferenceLine y={0} stroke="#171717" strokeWidth={1} />
                <ReferenceLine y={desvioPadraoResiduos} stroke="#a3a3a3" strokeDasharray="4 4" />
                <ReferenceLine y={-desvioPadraoResiduos} stroke="#a3a3a3" strokeDasharray="4 4" />
                <ReferenceLine y={2 * desvioPadraoResiduos} stroke="#d4d4d4" strokeDasharray="4 4" />
                <ReferenceLine y={-2 * desvioPadraoResiduos} stroke="#d4d4d4" strokeDasharray="4 4" />
                <Bar dataKey="residuo" name="Resíduo" fill="#737373" />
              </BarChart>
            </ResponsiveContainer>
          </Grafico>

          <Paragrafo>
            O desvio padrão dos resíduos é σₑ = {desvioPadraoResiduos.toFixed(2)}. As linhas tracejadas 
            representam ±1σ e ±2σ. Num modelo bem ajustado, espera-se que aproximadamente 68% dos resíduos 
            estejam dentro de ±1σ e 95% dentro de ±2σ. Resíduos fora destes limites podem indicar 
            observações atípicas (outliers).
          </Paragrafo>

          <Paragrafo>
            A distribuição dos resíduos aparenta ser aleatória em torno de zero, sem padrões sistemáticos 
            evidentes, o que sugere que o modelo linear é adequado para descrever a relação entre as variáveis.
          </Paragrafo>
        </Seccao>

        {/* 7. VALORES PADRONIZADOS */}
        <Seccao titulo="7. Valores Padronizados (Z-Score)">
          <Paragrafo>
            A padronização transforma os dados originais em valores adimensionais com média zero e desvio 
            padrão unitário. Esta transformação permite comparar diretamente variáveis com diferentes 
            unidades e escalas de medição.
          </Paragrafo>

          <Formula>
            Z = (X - μ) / σ
          </Formula>

          <Paragrafo>
            Após a padronização, valores de Z próximos de zero indicam observações próximas da média, 
            enquanto valores superiores a |2| indicam observações potencialmente atípicas.
          </Paragrafo>

          <Grafico altura={300}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosPrincipais}>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="ano" tick={{ fontSize: 10, fill: '#737373' }} />
                <YAxis tick={{ fontSize: 10, fill: '#737373' }} domain={[-2.5, 2.5]} />
                <Tooltip />
                <ReferenceLine y={0} stroke="#a3a3a3" />
                <ReferenceLine y={1} stroke="#e5e5e5" />
                <ReferenceLine y={-1} stroke="#e5e5e5" />
                <ReferenceLine y={2} stroke="#d4d4d4" strokeDasharray="4 4" />
                <ReferenceLine y={-2} stroke="#d4d4d4" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="zPeoes" name="Z (Peões)" stroke="#171717" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="zAcidentes" name="Z (Acidentes)" stroke="#a3a3a3" strokeWidth={1.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </Grafico>

          <Paragrafo>
            Verifica-se que ambas as variáveis seguem uma evolução semelhante quando padronizadas, 
            confirmando a forte correlação positiva. O ano de 2020 apresenta o valor Z mais negativo 
            para ambas as variáveis, confirmando a sua natureza atípica.
          </Paragrafo>
        </Seccao>

        {/* 8. NÚMEROS-ÍNDICE */}
        <Seccao titulo="8. Números-Índice">
          <Paragrafo>
            Os números-índice expressam os valores de uma série temporal como proporção de um valor base, 
            tipicamente multiplicado por 100. Neste estudo, utilizou-se o ano de 1990 como período base 
            (índice = 100).
          </Paragrafo>

          <Formula>
            Índiceₜ = (Xₜ / X₁₉₉₀) × 100
          </Formula>

          <Grafico altura={300}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosPrincipais}>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="ano" tick={{ fontSize: 10, fill: '#737373' }} />
                <YAxis tick={{ fontSize: 10, fill: '#737373' }} domain={[30, 110]} />
                <Tooltip />
                <ReferenceLine y={100} stroke="#a3a3a3" strokeDasharray="4 4" />
                <ReferenceLine y={50} stroke="#e5e5e5" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="indicePeoes" name="Índice (Peões)" stroke="#171717" strokeWidth={1.5} dot={{ r: 1.5 }} />
                <Line type="monotone" dataKey="indiceAcidentes" name="Índice (Acidentes)" stroke="#737373" strokeWidth={1.5} dot={{ r: 1.5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Grafico>

          <Paragrafo>
            Em 2023, o índice dos peões atropelados é {indicePeoes[33]!.toFixed(1)}, o que significa que o 
            número de peões atropelados corresponde a apenas {indicePeoes[33]!.toFixed(1)}% do valor 
            registado em 1990. Relativamente aos acidentes, o índice é {indiceAcidentes[33]!.toFixed(1)}, 
            correspondendo a uma redução de {(100 - indiceAcidentes[33]!).toFixed(1)} pontos percentuais 
            face ao ano base.
          </Paragrafo>
        </Seccao>

        {/* 9. CORRELAÇÃO MÓVEL */}
        <Seccao titulo="9. Correlação Móvel">
          <Paragrafo>
            A correlação móvel permite analisar a evolução do coeficiente de correlação ao longo do tempo, 
            utilizando uma janela deslizante. Neste estudo, utilizou-se uma janela de 10 anos.
          </Paragrafo>

          <Grafico altura={280}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosPrincipais}>
                <CartesianGrid stroke="#e5e5e5" />
                <XAxis dataKey="ano" tick={{ fontSize: 10, fill: '#737373' }} />
                <YAxis domain={[0.7, 1]} tick={{ fontSize: 10, fill: '#737373' }} />
                <Tooltip />
                <ReferenceLine y={0.9} stroke="#a3a3a3" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="corrMovel" name="Correlação móvel (k=10)" stroke="#171717" fill="#e5e5e5" connectNulls />
              </AreaChart>
            </ResponsiveContainer>
          </Grafico>

          <Paragrafo>
            A correlação móvel mantém-se consistentemente acima de 0,90 ao longo de todo o período, 
            indicando que a relação forte entre as variáveis é estável no tempo e não se deve a um 
            período específico.
          </Paragrafo>
        </Seccao>

        {/* 10. CONCLUSÕES */}
        <Seccao titulo="10. Conclusões">
          <Paragrafo>
            O presente estudo permitiu realizar uma análise estatística abrangente da sinistralidade 
            rodoviária em Portugal Continental no período 1990–2023. As principais conclusões são:
          </Paragrafo>

          <div className="space-y-4 my-6 text-sm">
            <div className="border-l-2 border-neutral-300 pl-4">
              <p className="font-medium">Tendência decrescente</p>
              <p className="text-neutral-600 mt-1">
                Ambas as variáveis apresentam uma tendência decrescente acentuada ao longo do período, 
                com reduções de {reducaoPeoes}% nos peões atropelados 
                e {reducaoAcidentes}% nos acidentes de viação.
              </p>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4">
              <p className="font-medium">Correlação muito forte</p>
              <p className="text-neutral-600 mt-1">
                O coeficiente de correlação r = {r.toFixed(4)} indica uma relação linear positiva muito 
                forte entre as variáveis, sendo que {(r2 * 100).toFixed(2)}% da variabilidade dos 
                acidentes é explicada pelo modelo.
              </p>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4">
              <p className="font-medium">Impacto da pandemia</p>
              <p className="text-neutral-600 mt-1">
                O ano de 2020 apresenta valores mínimos históricos em ambas as variáveis, refletindo 
                o impacto das medidas restritivas de mobilidade associadas à pandemia de COVID-19.
              </p>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4">
              <p className="font-medium">Eficácia das políticas</p>
              <p className="text-neutral-600 mt-1">
                A redução consistente ao longo de três décadas sugere a eficácia das políticas de 
                segurança rodoviária implementadas em Portugal, incluindo melhorias nas infraestruturas, 
                nos veículos e na fiscalização.
              </p>
            </div>
          </div>
        </Seccao>

        {/* RODAPÉ */}
        <footer className="mt-16 pt-8 border-t border-neutral-200 text-center">
          <p className="text-xs text-neutral-400">
            Fonte dos dados: PORDATA / Autoridade Nacional de Segurança Rodoviária
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Projeto DAC · Matemática A · 12.º Ano
          </p>
        </footer>
      </div>
    </div>
  );
}
