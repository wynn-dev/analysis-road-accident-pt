# Guião de Apresentação
## Análise da Sinistralidade Rodoviária em Portugal (1990–2023)

> **Duração estimada:** 20-25 minutos  
> **Público-alvo:** Alunos e professores do 12.º ano  
> **Nota:** Os textos entre [colchetes] são indicações para o apresentador.

---

## Diapositivo 1 — Título
**[Tempo: ~30 segundos]**

Bom dia/Boa tarde a todos.

O meu nome é [nome] e vou apresentar um estudo estatístico sobre a **sinistralidade rodoviária em Portugal**, mais concretamente sobre os peões atropelados e os acidentes de viação com vítimas.

Este trabalho analisa **34 anos de dados** — desde 1990 até 2023 — e foi realizado no âmbito da disciplina de Matemática A, utilizando técnicas de estatística descritiva, correlação e regressão linear.

[Avançar]

---

## Diapositivo 2 — Introdução e Objetivos
**[Tempo: ~1 minuto 30 segundos]**

Antes de entrar nos números, deixem-me explicar o que vamos analisar e **porquê este tema é relevante**.

**Primeiro ponto — O período:** Analisámos dados de 1990 a 2023, ou seja, 34 anos completos. Porquê 1990? Porque foi nessa altura que Portugal começou a recolher dados sistemáticos sobre sinistralidade, e também porque coincide com a nossa integração plena na União Europeia, que trouxe grandes mudanças nas infraestruturas e na legislação.

**Segundo ponto — As variáveis:** Em estatística, uma "variável" é simplesmente aquilo que estamos a medir. Neste caso, temos duas:
- A **variável X** representa o número de peões atropelados em cada ano — pessoas que foram atingidas por veículos enquanto caminhavam
- A **variável Y** representa o número total de acidentes de viação com vítimas — inclui todos os tipos de acidentes onde alguém ficou ferido ou morreu

**Terceiro ponto — Os métodos:** Utilizámos três tipos de análise:
- **Estatística descritiva** — para resumir os dados com médias, medianas e outras medidas
- **Correlação e regressão linear** — para perceber se existe uma relação matemática entre as duas variáveis
- **Análise de séries temporais** — para estudar como os valores evoluíram ao longo do tempo

**Quarto ponto — A fonte:** Todos os dados vêm da PORDATA, que os obtém da Autoridade Nacional de Segurança Rodoviária (ANSR). São, portanto, dados oficiais, verificados e fiáveis.

[Avançar]

---

## Diapositivo 3 — Estatística Descritiva
**[Tempo: ~3 minutos]**

Vamos agora olhar para os números que resumem os nossos dados. Isto chama-se **estatística descritiva** — são medidas que nos ajudam a descrever um conjunto de dados de forma simples, sem termos de olhar para cada um dos 34 valores individualmente.

### Peões Atropelados (X)

Começando pelos peões atropelados:

- A **média** é de aproximadamente **6 642 peões por ano**. O que é a média? É a soma de todos os valores dividida pelo número de anos. Se juntarmos todos os peões atropelados nestes 34 anos e dividirmos por 34, obtemos este valor. 

  **O que significa na prática?** São cerca de **17 a 18 peões atropelados por dia** em Portugal, em média. É como se, todos os dias, uma sala de aula inteira de pessoas fosse atropelada.

- A **mediana** é de cerca de **5 765**. A mediana é o valor que fica exatamente no meio quando ordenamos todos os dados do menor para o maior. Metade dos anos teve menos de 5 765 atropelamentos, e a outra metade teve mais.

  **Interpretação importante:** Como a mediana (5 765) é inferior à média (6 642), isso indica que temos alguns anos com valores muito altos que "puxam" a média para cima. De facto, os anos 90 tinham valores muito elevados que inflacionam a média.

- O **desvio padrão** é de aproximadamente **2 346**. O que significa isto? O desvio padrão mede o quanto os valores se afastam da média. Um desvio padrão alto significa que os dados estão muito espalhados; um desvio padrão baixo significa que estão concentrados perto da média.

  **Na prática:** Se os valores fossem todos parecidos (por exemplo, sempre entre 6 000 e 7 000), o desvio padrão seria pequeno. Mas como temos anos com 11 000 e anos com 3 700, o desvio é grande.

- O **mínimo** foi **3 711** peões (2020 — pandemia) e o **máximo** foi **11 369** (1992 — antes das grandes reformas rodoviárias).

  **Contexto real:** Em 1992, eram atropelados **31 peões por dia**. Em 2020, esse número baixou para **10 por dia**. Uma redução de 3 para 1.

- O **coeficiente de variação** é de **34,3%**. Este calcula-se dividindo o desvio padrão pela média e multiplicando por 100. Quanto maior, mais heterogéneos são os dados. Com 34,3%, podemos dizer que há **muita variação** nos atropelamentos ao longo dos anos — os valores mudaram significativamente.

### Acidentes de Viação (Y)

Passando aos acidentes de viação:

- A **média** é de aproximadamente **38 265 acidentes por ano** — ou seja, **cerca de 105 acidentes com vítimas por dia** em Portugal.

- A **mediana** é de cerca de **36 593**, ligeiramente inferior à média.

- O **desvio padrão** é de **6 528**. Parece maior que o dos peões (2 346), mas não podemos comparar diretamente porque as escalas são diferentes.

- O **mínimo** foi **24 894** em 2020 (68 acidentes/dia), e o **máximo** foi **49 163** em 1991 (135 acidentes/dia).

- O **coeficiente de variação** é de apenas **17,1%**.

### Comparação Crucial

[Apontar para a nota no fundo do slide]

Reparem que o coeficiente de variação dos peões (34,3%) é **o dobro** do coeficiente dos acidentes (17,1%). O que significa isto?

Os atropelamentos de peões variaram **muito mais** ao longo destes 34 anos do que os acidentes em geral. Isto sugere que as **políticas específicas de proteção de peões** (passadeiras elevadas, semáforos para peões, zonas 30, campanhas de sensibilização) foram **particularmente eficazes**.

[Avançar]

---

## Diapositivo 4 — Evolução Temporal
**[Tempo: ~2 minutos]**

Este gráfico mostra a evolução do número de peões atropelados ao longo dos 34 anos estudados. É aqui que a história começa a ganhar forma.

[Apontar para o início do gráfico]

**Anos 90 — A década negra:**
Em **1990**, Portugal era um dos países com **pior segurança rodoviária da Europa**. Tínhamos quase **11 000** peões atropelados por ano — cerca de **30 por dia**. As estradas eram más, os carros não tinham sistemas de segurança modernos, não havia radares, e a cultura de respeito pelos peões era fraca.

O pico foi em **1992**, com **11 369** atropelamentos. Nessa altura, atravessar uma passadeira em Portugal era uma lotaria.

[Apontar para a descida gradual]

**Anos 2000 — O início da mudança:**
A partir de 2000, vemos uma descida consistente. O que mudou?
- **1999:** Instalação dos primeiros radares de velocidade
- **2005:** Introdução da carta de condução por pontos — se cometeres infrações, perdes pontos e podes perder a carta
- **2000-2010:** Milhares de milhões de euros da União Europeia investidos em autoestradas e vias rápidas
- Carros novos com airbags e ABS tornaram-se a norma

[Apontar para 2011-2014]

**2011-2014 — Efeito da crise económica:**
Curiosamente, durante a crise económica (Troika), os atropelamentos desceram ainda mais. Porquê? Menos pessoas tinham dinheiro para gasolina, houve menos deslocações, menos carros nas ruas.

[Apontar para 2020]

**2020 — O ano da pandemia:**
Aqui temos o ponto mais baixo: apenas **3 711** atropelamentos (10 por dia). A pandemia de COVID-19 obrigou Portugal ao confinamento. Ruas vazias = menos atropelamentos. Este é um **valor atípico** — não reflete a tendência normal.

**2023:** Estabilizámos nos **4 873** atropelamentos (13 por dia).

**Resultado global:** Redução de **55,3%** em 34 anos. Passámos de 30 para 13 peões atropelados por dia.

[Avançar]

---

## Diapositivo 5 — Taxa de Variação Anual
**[Tempo: ~2 minutos]**

Este gráfico mostra algo diferente — mostra a **variação percentual** de um ano para o outro. Cada barra responde à pergunta: "Comparando com o ano anterior, subimos ou descemos? E quanto?"

[Explicar o conceito]

- Se a barra está **acima de zero** (positiva), significa que houve **mais** atropelamentos que no ano anterior
- Se a barra está **abaixo de zero** (negativa), significa que houve **menos** atropelamentos

[Apontar para padrões]

**Padrão geral:** A maioria das barras está abaixo de zero — ano após ano, os atropelamentos foram diminuindo. Mas nem todos os anos foram de descida.

**Anos problemáticos (barras positivas):**
- **1992 (+7%):** Pico histórico, antes de qualquer política séria de segurança rodoviária
- **2015-2017:** Recuperação económica pós-Troika — mais carros na estrada, mais mobilidade
- **2021 (+14,8%) e 2022 (+11,3%):** Fim dos confinamentos — a vida voltou às ruas

[Apontar para 2020]

**O caso extremo — 2020 (-24,3%):**
Num único ano, os atropelamentos caíram quase **um quarto**. Nunca na história de Portugal houve uma variação tão grande. O primeiro confinamento (março-maio 2020) e o segundo (janeiro-fevereiro 2021) esvaziaram as ruas.

**O que isto nos ensina:** A sinistralidade está diretamente ligada à quantidade de pessoas e veículos em circulação. Quando há menos tráfego, há menos acidentes — parece óbvio, mas os dados confirmam-no de forma dramática.

[Apontar para 2021-2022]

**Recuperação pós-pandémica:**
Em 2021 e 2022, os atropelamentos subiram porque as pessoas voltaram às ruas. Mas **não voltámos aos níveis de 2019**. Algo mudou — talvez novos hábitos de teletrabalho, menos deslocações, ou simplesmente a continuação da tendência de longo prazo.

[Avançar]

---

## Diapositivo 6 — Médias Móveis
**[Tempo: ~1 minuto 30 segundos]**

Agora vou mostrar-vos uma técnica muito útil chamada **média móvel**. Esta técnica ajuda-nos a ver a "floresta" quando há muitas "árvores" a distrair-nos.

[Explicar o conceito com linguagem simples]

Imaginem que querem ver a tendência das vossas notas ao longo do ano, mas sem que um teste muito mau ou muito bom distorça a análise. O que podem fazer é calcular a média das últimas 3 ou 5 notas, e ir atualizando essa média. Isto "suaviza" os altos e baixos e mostra se estão realmente a melhorar ou piorar.

É exatamente isso que estamos a fazer aqui:
- A **linha cinzenta clara** são os dados originais, com todas as oscilações anuais
- A **linha cinzenta média** é a média móvel de ordem 3 — em cada ponto, calculamos a média desse ano com os 2 anos anteriores
- A **linha preta** é a média móvel de ordem 5 — média dos últimos 5 anos

[Apontar para as linhas]

Vejam como a linha preta é muito mais "lisa" que os dados originais. Esta linha mostra claramente que, apesar de algumas oscilações pontuais, a tendência geral é **consistentemente descendente**.

**Utilidade prática:** Se fôssemos o Ministério da Administração Interna e quiséssemos avaliar se as políticas de segurança rodoviária estão a funcionar, não olharíamos para as variações de ano para ano (que podem ser aleatórias). Olharíamos para a média móvel, que mostra a tendência real.

Mesmo a anomalia de 2020 (pandemia) é "absorvida" pela média móvel, confirmando que foi um evento excecional e não uma mudança estrutural.

[Avançar]

---

## Diapositivo 7 — Contexto Histórico e Impacto Real
**[Tempo: ~3 minutos]**

[Este é um dos slides mais importantes — transforma números abstratos em realidade]

Até agora falámos de médias, variações e tendências. Mas o que significam estes números **na vida real**? Vamos traduzir a estatística em impacto humano.

### O que significam os números

[Apontar para a comparação 1990 vs 2023]

**Em 1990:** Eram atropelados **29,9 peões por dia** em Portugal. Isto significa que, todos os dias, uma turma inteira de alunos era atropelada. Alguns morriam, outros ficavam com lesões para toda a vida.

**Em 2023:** São atropelados **13,4 peões por dia**. Ainda é muito — é quase uma pessoa a cada duas horas — mas é menos de metade do que era.

**A diferença:** São mais **6 025 pessoas por ano** que não são atropeladas hoje comparando com 1990. São famílias que não recebem telefonemas do hospital, crianças que chegam a casa da escola, idosos que atravessam a rua em segurança.

### Períodos históricos que explicam os dados

[Apontar para a linha temporal]

Os números que vimos não existem no vazio — refletem a história de Portugal:

**1990–1999 — A era pré-reformas:**
Portugal tinha acabado de entrar na União Europeia (1986). As estradas eram maioritariamente nacionais de duas vias, com pouca iluminação e poucas passadeiras seguras. Os carros não tinham airbags nem ABS. Não havia radares. A cultura rodoviária era de "cada um por si". Resultado: 10 000+ peões atropelados por ano.

**2000–2010 — A década das grandes obras:**
Os fundos europeus (FEDER, Fundo de Coesão) permitiram construir autoestradas em todo o país, separando o tráfego de alta velocidade das zonas urbanas. Em 2005, entrou em vigor a **carta por pontos** — pela primeira vez, os condutores podiam perder a carta se cometessem infrações repetidas. Resultado: descida consistente dos números.

**2011–2014 — A crise económica:**
A intervenção da Troika (FMI, BCE, Comissão Europeia) trouxe austeridade. Menos dinheiro = menos combustível = menos viagens = menos acidentes. Um "efeito colateral positivo" de uma situação difícil.

**2015–2019 — Recuperação económica:**
Com a economia a melhorar, mais pessoas voltaram a conduzir. Os números estabilizaram ou subiram ligeiramente.

**2020 — A pandemia COVID-19:**
O primeiro confinamento (18 de março) esvaziou as ruas. Pela primeira vez na história moderna, os portugueses ficaram em casa semanas a fio. Resultado: mínimo histórico de atropelamentos.

**2021–2023 — O "novo normal":**
Os números subiram com o fim das restrições, mas estabilizaram **abaixo** dos níveis pré-pandemia. O teletrabalho veio para ficar em muitas profissões, reduzindo as deslocações.

### Portugal no contexto europeu

[Pausa para impacto]

Em 1990, Portugal tinha uma das **piores taxas de sinistralidade da Europa** — estava ao nível de países com muito menos desenvolvimento.

Hoje, Portugal está **próximo da média europeia**. Ainda não somos a Suécia ou a Holanda (os países mais seguros), mas já não somos uma exceção negativa.

Esta transformação é um dos maiores sucessos de política pública em Portugal nas últimas décadas, mas raramente é celebrada porque é feita de pequenas melhorias, ano após ano.

[Avançar]

---

## Diapositivo 8 — Correlação Linear
**[Tempo: ~2 minutos]**

Agora vamos investigar: será que existe uma **relação matemática** entre o número de peões atropelados e o número total de acidentes?

[Apontar para o gráfico de dispersão]

Este gráfico chama-se **diagrama de dispersão**. Cada ponto representa um ano. No eixo horizontal (X) temos o número de peões atropelados nesse ano, e no eixo vertical (Y) temos o número de acidentes.

**Como interpretar:** Se os pontos formarem uma nuvem sem forma definida, não há relação. Se formarem uma linha, há uma relação forte.

Claramente, os pontos formam uma **linha diagonal ascendente** — quando há mais peões atropelados, também há mais acidentes em geral. A **linha vermelha** é a reta que melhor se ajusta a estes pontos (calculada pelo método dos mínimos quadrados).

[Apontar para os valores à direita]

**O coeficiente de correlação (r) é 0,9243**

O que significa este número? O coeficiente de correlação varia entre -1 e +1:
- **+1** = correlação perfeita positiva (quando X sobe, Y sobe sempre na mesma proporção)
- **-1** = correlação perfeita negativa (quando X sobe, Y desce sempre)
- **0** = nenhuma correlação linear

Com **r = 0,92**, temos uma **correlação muito forte positiva**. Na escala científica:
- 0,00 a 0,19: muito fraca
- 0,20 a 0,39: fraca
- 0,40 a 0,69: moderada
- 0,70 a 0,89: forte
- **0,90 a 1,00: muito forte** ← Estamos aqui!

**O coeficiente de determinação (R²) é 0,8543**

Este obtém-se elevando r ao quadrado (0,9243² = 0,8543).

**Interpretação crucial:** R² = 90,4% significa que **90,4% da variação nos acidentes totais pode ser explicada pela variação nos atropelamentos de peões**.

**Na prática:** Se soubermos quantos peões foram atropelados num ano, conseguimos prever com boa precisão quantos acidentes totais houve. Porquê? Porque os atropelamentos são uma fração dos acidentes, e as mesmas condições que aumentam uns (mais tráfego, piores condições, menos fiscalização) tendem a aumentar os outros.

[Avançar]

---

## Diapositivo 9 — Regressão Linear
**[Tempo: ~2 minutos]**

Agora que sabemos que existe uma relação forte, podemos criar uma **equação** que descreve essa relação. Chama-se **equação de regressão linear** e permite-nos fazer previsões.

[Apontar para a equação]

A equação é: **ŷ = 2,6332x + 20 775**

[Explicar cada parte]

Vamos descodificar, símbolo a símbolo:
- **ŷ** (lê-se "y chapéu") é o valor **previsto** de acidentes — não o valor real observado, mas a nossa melhor estimativa
- **x** é o número de peões atropelados (o dado que conhecemos)
- **2,6332** é o **declive** — diz-nos quanto muda y quando x aumenta 1 unidade
- **20 775** é a **ordenada na origem** — o valor onde a reta cruza o eixo vertical

**O que significa o declive de 2,59?**

Significa que, estatisticamente, **por cada peão atropelado adicional, esperamos ter mais 2,59 acidentes totais**.

[Importante — clarificar]

**Atenção:** Isto **NÃO significa** que um atropelamento causa 2,59 outros acidentes. Correlação não é causalidade! O que esta relação nos diz é que os atropelamentos e os acidentes totais **andam juntos** — quando as condições aumentam um, tendem a aumentar o outro também.

**E a ordenada na origem de 20 775?**

Matematicamente, seria o número de acidentes se houvesse zero peões atropelados. Mas isto não tem significado prático — nunca vamos ter zero atropelamentos. É apenas um parâmetro necessário para definir a reta.

[Apontar para o exemplo]

**Exemplo prático:** Se num ano tivermos 5 000 peões atropelados, quantos acidentes totais podemos esperar?
- ŷ = 2,59 × 5 000 + 20 775 = **33 941 acidentes**

**Utilidade real:** Este tipo de modelo pode ajudar a:
- Planear recursos hospitalares e de emergência
- Avaliar o impacto potencial de políticas de segurança rodoviária
- Definir metas realistas para redução da sinistralidade

[Avançar]

---

## Diapositivo 10 — Análise de Resíduos
**[Tempo: ~1 minuto 30 segundos]**

Criámos uma equação, mas será que ela é **boa**? Será que podemos confiar nas suas previsões? Para avaliar isso, analisamos os **resíduos**.

[Explicar o conceito]

O que é um resíduo? É a diferença entre o valor **real** que observámos e o valor **previsto** pela nossa equação.

> **Resíduo = Valor Real − Valor Previsto**

- Se a previsão for perfeita, o resíduo é zero
- Se subestimámos (previsão menor que a realidade), o resíduo é positivo
- Se sobrestimámos (previsão maior que a realidade), o resíduo é negativo

[Apontar para o gráfico]

Este gráfico mostra os resíduos para cada ano. A linha preta horizontal no meio é o zero — previsão perfeita. As linhas tracejadas marcam ±1 desvio padrão.

**O que procuramos num bom modelo?**

Queremos que os resíduos estejam distribuídos **aleatoriamente** em torno de zero, sem padrões visíveis. Se víssemos, por exemplo:
- Todos os resíduos positivos no início e negativos no fim → a relação não é realmente linear
- Resíduos cada vez maiores ao longo do tempo → a variabilidade está a mudar

[Apontar para a distribuição]

Olhando para o gráfico, os resíduos parecem **bem distribuídos** — alguns acima, alguns abaixo, sem padrão óbvio. Isto é um bom sinal!

O **desvio padrão dos resíduos** é de aproximadamente **2 490**. O que significa? Em média, a nossa previsão difere do valor real por cerca de 2 500 acidentes. Num universo de 30 000-40 000 acidentes, este é um erro de cerca de 6-8% — razoável para um modelo simples.

[Avançar]

---

## Diapositivo 11 — Valores Padronizados (Z-Score)
**[Tempo: ~2 minutos]**

Este gráfico mostra algo chamado **Z-Score** ou **valor padronizado**. Parece complicado, mas é uma ferramenta muito útil e vou explicá-la passo a passo.

[Identificar o problema]

**O problema:** Queremos comparar a evolução dos peões atropelados com a evolução dos acidentes totais. Mas os números são muito diferentes — uns andam nos 5 000-10 000, outros nos 30 000-50 000. Se os pusermos no mesmo gráfico com escalas normais, não conseguimos ver padrões.

**A solução — padronização:**

Transformamos ambas as variáveis para uma escala comum. O Z-Score mede **quantos desvios padrão** um valor está acima ou abaixo da média.

**Fórmula:** Z = (valor − média) ÷ desvio padrão

- **Z = 0** → o valor é exatamente igual à média (comportamento "normal")
- **Z = +1** → o valor está 1 desvio padrão acima da média (um pouco alto)
- **Z = -1** → o valor está 1 desvio padrão abaixo da média (um pouco baixo)
- **|Z| > 2** → o valor é considerado **atípico** (outlier) — fora do esperado

[Apontar para o gráfico]

A **linha preta** são os peões padronizados. A **linha cinzenta** são os acidentes padronizados.

**Observação crucial:** Reparem como as duas linhas seguem **quase o mesmo trajeto**! Ambas começam acima de zero (valores acima da média nos anos 90) e ambas descem para valores negativos (abaixo da média nos anos recentes).

Esta evolução **paralela** confirma visualmente a forte correlação que calculámos (r = 0,92).

[Apontar para 2020]

**O caso de 2020:**
Vejam como ambas as linhas têm o ponto mais baixo em 2020, com Z-scores de quase **-2**. Em estatística, |Z| > 2 indica um **outlier** — um valor tão extremo que provavelmente resulta de circunstâncias excecionais. E sabemos que foi exatamente isso: a pandemia.

**Interpretação real:** Em 2020, os atropelamentos estavam **quase 2 desvios padrão abaixo da média histórica**. Isto é estatisticamente muito raro (aconteceria por acaso em menos de 5% dos anos).

[Avançar]

---

## Diapositivo 12 — Números-Índice
**[Tempo: ~2 minutos]**

Esta é a última ferramenta de análise — os **números-índice**. É uma forma muito intuitiva de visualizar a evolução ao longo do tempo.

[Explicar o conceito]

A ideia é simples: escolhemos um ano como **referência** — neste caso, 1990 — e dizemos que esse ano tem o índice **100**. Todos os outros anos são expressos como percentagem desse valor de referência.

**Exemplo concreto:**
- Em 1990 tínhamos 10 898 peões atropelados → índice = **100** (por definição)
- Em 2000 tínhamos 7 913 peões atropelados
- Índice de 2000 = (7 913 ÷ 10 898) × 100 = **72,6**

O que significa índice 72,6? Que em 2000 os atropelamentos eram **72,6% do que eram em 1990**. Ou seja, reduziram cerca de 27%.

[Apontar para o gráfico]

A **linha preta** são os peões, a **linha cinzenta** são os acidentes. A linha tracejada horizontal a 100 marca o nível de referência (1990), e a linha tracejada a 50 marca metade desse valor.

**Observação principal:** Ambas as linhas descem abaixo de 100, mas a dos peões desce **muito mais**.

**Em 2023:**
- Índice dos peões: **44,7** → menos de metade do valor de 1990
- Índice dos acidentes: **70,6** → cerca de 70% do valor de 1990

**O que isto revela?**

Os atropelamentos de peões reduziram-se **muito mais** (−55%) do que os acidentes em geral (−29%). Isto não é coincidência. Reflete políticas específicas focadas na proteção dos peões:
- **Passadeiras elevadas** que obrigam os carros a abrandar
- **Semáforos de peões** com tempos adequados
- **Zonas 30** nos centros urbanos
- **Lombas redutoras** de velocidade
- **Campanhas** de sensibilização ("Dê prioridade aos peões")

Portugal fez um investimento deliberado na proteção dos utilizadores mais vulneráveis da estrada — e os números mostram que resultou.

[Avançar]

---

## Diapositivo 13 — Conclusões
**[Tempo: ~2 minutos]**

Chegamos às conclusões do nosso estudo. Vou resumir os quatro pontos principais.

[Apontar para cada cartão enquanto fala]

**Primeira conclusão — Tendência Decrescente Consistente**

Ao longo de 34 anos, registámos:
- Redução de **55,3%** nos peões atropelados (de 30 para 13 por dia)
- Redução de **29,4%** nos acidentes totais

Esta não foi uma melhoria pontual — foi uma tendência **consistente**, ano após ano, visível nas médias móveis. Portugal transformou-se de um dos países mais perigosos da Europa para um país com segurança rodoviária próxima da média europeia.

**Segunda conclusão — Correlação Muito Forte**

O coeficiente de correlação de **r = 0,951** mostra que existe uma relação muito forte entre atropelamentos e acidentes totais. O modelo de regressão linear explica **90,4%** da variabilidade dos dados.

**Significado prático:** As mesmas condições que aumentam os atropelamentos (mais tráfego, piores condições, menos fiscalização) também aumentam os acidentes em geral. Políticas que reduzam um tipo de sinistralidade tendem a reduzir o outro também.

**Terceira conclusão — O Impacto da Pandemia**

O ano de 2020 foi verdadeiramente **atípico** (outlier estatístico). O confinamento reduziu drasticamente a circulação de pessoas e veículos, resultando em mínimos históricos.

**O que aprendemos:** A sinistralidade está diretamente ligada ao volume de tráfego. Este "experimento natural" involuntário mostrou que, se realmente quiséssemos eliminar os acidentes, teríamos de eliminar o tráfego — mas isso não é viável. A solução tem de ser **tráfego mais seguro**, não menos tráfego.

**Quarta conclusão — Eficácia das Políticas Públicas**

A melhoria ao longo de três décadas **não foi acidental**. Resultou de:
- Investimento em infraestruturas (autoestradas, iluminação, passadeiras)
- Legislação mais rigorosa (carta por pontos, limites de álcool)
- Tecnologia (radares, veículos mais seguros)
- Fiscalização (mais polícia de trânsito)
- Educação (campanhas de sensibilização, escolas de condução melhores)

Este é um caso de sucesso de política pública baseada em evidências. Os dados orientaram as decisões, e as decisões produziram resultados mensuráveis.

---

## Encerramento
**[Tempo: ~30 segundos]**

Em resumo, este estudo mostra que Portugal fez **progressos notáveis** na redução da sinistralidade rodoviária, especialmente na proteção dos peões. Os números são claros: passámos de 30 peões atropelados por dia para 13.

No entanto, **13 pessoas por dia** ainda são 13 famílias afetadas. Ainda há trabalho a fazer.

A estatística, como vimos, é uma ferramenta poderosa. Permite-nos analisar dados complexos, identificar tendências, quantificar relações e avaliar o impacto de políticas. Mas por trás de cada número há uma pessoa — e é isso que dá urgência a este tipo de análise.

Obrigado pela vossa atenção. Estou disponível para responder a perguntas.

---

## Anexo: Notas para o Apresentador

### Termos-chave e definições simples:

| Termo | Definição Simples | Analogia |
|-------|-------------------|----------|
| **Média** | Soma de todos os valores ÷ número de valores | A "nota média" da turma |
| **Mediana** | O valor do meio quando ordenamos os dados | O aluno que fica no meio da fila |
| **Desvio padrão** | Quanto os valores se afastam da média | Se todos têm notas parecidas, é baixo |
| **Coef. variação** | Desvio padrão ÷ média × 100 | Permite comparar dispersões de escalas diferentes |
| **Correlação (r)** | Mede se duas variáveis andam juntas (−1 a +1) | Como a relação entre horas de estudo e notas |
| **R²** | Percentagem da variação explicada pelo modelo | Quanto do resultado conseguimos prever |
| **Regressão** | Equação que descreve a relação | A "receita" para prever Y a partir de X |
| **Resíduo** | Diferença entre valor real e previsto | O "erro" da nossa previsão |
| **Z-Score** | Quantos desvios padrão um valor está da média | Se Z > 2 ou Z < −2, é atípico |
| **Número-índice** | Valor expresso como % de uma referência | Se era 100 e agora é 50, reduziu metade |
| **Média móvel** | Média dos últimos k valores | "Suaviza" oscilações para ver a tendência |

### Perguntas frequentes e respostas preparadas:

**P: Porquê correlação não significa causa?**

R: Duas coisas podem estar correlacionadas sem que uma cause a outra. Exemplo clássico: as vendas de gelados e os afogamentos estão correlacionados — ambos sobem no verão. Mas comer gelado não causa afogamentos! O **calor** é a causa comum de ambos. No nosso caso, os atropelamentos não "causam" acidentes — ambos são causados pelas mesmas condições (tráfego, clima, fiscalização).

**P: Porquê usar a mediana se já temos a média?**

R: A média é sensível a valores extremos. Se tivermos 10 pessoas com salários de 1 000€ e uma pessoa com 1 000 000€, a média seria 91 818€ — que não representa ninguém. A mediana seria 1 000€ — muito mais realista. Por isso, quando há outliers (como 2020), a mediana dá uma ideia melhor do valor "típico".

**P: O modelo pode prever o futuro?**

R: Pode fazer previsões, mas com cautela. As previsões são fiáveis **dentro do intervalo de dados observados** (interpolação). Prever para valores muito diferentes (extrapolação) é arriscado — assumimos que a relação se mantém, mas pode não se manter. Por exemplo, se os atropelamentos caíssem para 1 000, o modelo provavelmente já não funcionaria bem.

**P: Porquê 2020 é considerado outlier e não apenas um ano diferente?**

R: Em estatística, definimos outlier como valores com |Z-Score| > 2, o que acontece por acaso em menos de 5% das observações. O Z-Score de 2020 foi quase −2, indicando que é **estatisticamente improvável** sem uma causa externa. E sabemos qual foi a causa: a pandemia. Isto distingue um outlier (evento excecional) de variação normal.

**P: Quantas vidas é que realmente se salvaram?**

R: Se tivéssemos mantido o nível de 1990 (10 898 atropelamentos/ano) durante 34 anos, teríamos tido ~370 000 atropelamentos. Na realidade, tivemos ~218 000. Isso são ~152 000 atropelamentos "evitados". Não sabemos quantos seriam fatais, mas se assumirmos a taxa de mortalidade típica (~5%), são cerca de **7 500 vidas salvas** ao longo de três décadas.

---

### Dados de referência rápida:

| Ano | Peões | Acidentes | Peões/dia | Nota |
|-----|-------|-----------|-----------|------|
| 1990 | 10 898 | 47 266 | 29,9 | Ano base |
| 1992 | 11 369 | 48 408 | 31,1 | Pico histórico |
| 2000 | 7 913 | 44 159 | 21,7 | Virada do século |
| 2005 | 5 764 | 37 066 | 15,8 | Carta por pontos |
| 2010 | 5 116 | 35 426 | 14,0 | Fim da década |
| 2014 | 4 182 | 30 604 | 11,5 | Fim da Troika |
| 2019 | 4 902 | 35 704 | 13,4 | Pré-pandemia |
| 2020 | 3 711 | 24 894 | 10,2 | Pandemia (mínimo) |
| 2023 | 4 873 | 33 380 | 13,4 | Dados mais recentes |

| Estatística | Peões | Acidentes |
|-------------|-------|-----------|
| Média | 6 642 | 38 265 |
| Mediana | 5 765 | 36 593 |
| Desvio padrão | 2 346 | 6 528 |
| Coef. variação | 34,3% | 17,1% |
| Mínimo | 3 711 (2020) | 24 894 (2020) |
| Máximo | 11 369 (1992) | 49 163 (1991) |
| Correlação r | 0,9243 | |
| R² | 85,43% | |
| Declive | 2,6332 | |
| Ordenada | 20 775 | |
