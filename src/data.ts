// === DADOS ORIGINAIS ===
export const anos = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
              2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
              2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
              2020, 2021, 2022, 2023];

export const peoes = [10898, 10630, 11369, 10379, 9830, 10088, 9517, 9294, 9052, 8457,
               7913, 7107, 6757, 6366, 6140, 5764, 5765, 5679, 5765, 5271,
               5116, 5000, 4420, 4047, 4182, 4404, 4604, 4696, 4827, 4902,
               3711, 4260, 4742, 4873];

export const acidentes = [47266, 49163, 48408, 45380, 44745, 46355, 46537, 47064, 44699, 44517,
                   44159, 42521, 42219, 41495, 38930, 37066, 35680, 35311, 33613, 35484,
                   35426, 32541, 29867, 30339, 30604, 31953, 32299, 34416, 34574, 35704,
                   24894, 31122, 33281, 33380];

export const n = anos.length;

// === FUNÇÕES ESTATÍSTICAS ===
export const soma = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);
export const media = (arr: number[]): number => soma(arr) / arr.length;
export const variancia = (arr: number[]): number => {
  const m = media(arr);
  return soma(arr.map(x => Math.pow(x - m, 2))) / arr.length;
};
export const desvioPadrao = (arr: number[]): number => Math.sqrt(variancia(arr));
export const mediana = (arr: number[]): number => {
  const ordenado = [...arr].sort((a, b) => a - b);
  const meio = Math.floor(ordenado.length / 2);
  return ordenado.length % 2 !== 0 ? ordenado[meio]! : (ordenado[meio - 1]! + ordenado[meio]!) / 2;
};
export const quartil = (arr: number[], q: number): number => {
  const ordenado = [...arr].sort((a, b) => a - b);
  const pos = (ordenado.length - 1) * q;
  const base = Math.floor(pos);
  const resto = pos - base;
  if (ordenado[base + 1] !== undefined) {
    return ordenado[base]! + resto * (ordenado[base + 1]! - ordenado[base]!);
  }
  return ordenado[base]!;
};

// === ESTATÍSTICAS DESCRITIVAS ===
export const estatPeoes = {
  media: media(peoes),
  mediana: mediana(peoes),
  desvioPadrao: desvioPadrao(peoes),
  variancia: variancia(peoes),
  minimo: Math.min(...peoes),
  maximo: Math.max(...peoes),
  amplitude: Math.max(...peoes) - Math.min(...peoes),
  q1: quartil(peoes, 0.25),
  q3: quartil(peoes, 0.75),
  coefVariacao: (desvioPadrao(peoes) / media(peoes)) * 100,
  iqr: 0
};
estatPeoes.iqr = estatPeoes.q3 - estatPeoes.q1;

export const estatAcidentes = {
  media: media(acidentes),
  mediana: mediana(acidentes),
  desvioPadrao: desvioPadrao(acidentes),
  variancia: variancia(acidentes),
  minimo: Math.min(...acidentes),
  maximo: Math.max(...acidentes),
  amplitude: Math.max(...acidentes) - Math.min(...acidentes),
  q1: quartil(acidentes, 0.25),
  q3: quartil(acidentes, 0.75),
  coefVariacao: (desvioPadrao(acidentes) / media(acidentes)) * 100,
  iqr: 0
};
estatAcidentes.iqr = estatAcidentes.q3 - estatAcidentes.q1;

// === REGRESSÃO LINEAR (Peões vs Acidentes) ===
const sumX = soma(peoes);
const sumY = soma(acidentes);
const sumXY = peoes.reduce((total, xi, i) => total + xi * acidentes[i]!, 0);
const sumX2 = soma(peoes.map(x => x * x));
const sumY2 = soma(acidentes.map(y => y * y));

export const declive = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
export const ordenadaOrigem = (sumY - declive * sumX) / n;

// Coeficiente de correlação de Pearson
export const r = (n * sumXY - sumX * sumY) / Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
export const r2 = r * r;

// === MÉDIAS MÓVEIS ===
export const mediaMovel3 = peoes.map((_, i) => {
  if (i < 2) return null;
  return Math.round((peoes[i]! + peoes[i - 1]! + peoes[i - 2]!) / 3);
});

export const mediaMovel5 = peoes.map((_, i) => {
  if (i < 4) return null;
  return Math.round((peoes[i]! + peoes[i - 1]! + peoes[i - 2]! + peoes[i - 3]! + peoes[i - 4]!) / 5);
});

// === VARIAÇÃO ANUAL ===
export const variacaoAnual = peoes.map((val, i) => {
  if (i === 0) return 0;
  return ((val - peoes[i - 1]!) / peoes[i - 1]!) * 100;
});

// === VALORES PADRONIZADOS (Z-SCORE) ===
export const zScorePeoes = peoes.map(x => (x - estatPeoes.media) / estatPeoes.desvioPadrao);
export const zScoreAcidentes = acidentes.map(y => (y - estatAcidentes.media) / estatAcidentes.desvioPadrao);

// === NÚMEROS-ÍNDICE (Base 1990 = 100) ===
export const indicePeoes = peoes.map(x => (x / peoes[0]!) * 100);
export const indiceAcidentes = acidentes.map(y => (y / acidentes[0]!) * 100);

// === RESÍDUOS ===
export const residuos = peoes.map((x, i) => {
  const valorPrevisto = declive * x + ordenadaOrigem;
  return acidentes[i]! - valorPrevisto;
});
export const desvioPadraoResiduos = desvioPadrao(residuos);

// === CORRELAÇÃO MÓVEL (janela de 10 anos) ===
export const correlacaoMovel = anos.map((_, i) => {
  if (i < 9) return null;
  const xSlice = peoes.slice(i - 9, i + 1);
  const ySlice = acidentes.slice(i - 9, i + 1);
  const n2 = 10;
  const sx = soma(xSlice);
  const sy = soma(ySlice);
  const sxy = xSlice.reduce((t, x, j) => t + x * ySlice[j]!, 0);
  const sx2 = soma(xSlice.map(x => x * x));
  const sy2 = soma(ySlice.map(y => y * y));
  return (n2 * sxy - sx * sy) / Math.sqrt((n2 * sx2 - sx * sx) * (n2 * sy2 - sy * sy));
});

// === PREPARAÇÃO DOS DADOS PARA GRÁFICOS ===
export const dadosPrincipais = anos.map((ano, i) => ({
  ano,
  peoes: peoes[i]!,
  acidentes: acidentes[i]!,
  mm3: mediaMovel3[i],
  mm5: mediaMovel5[i],
  variacao: Math.round(variacaoAnual[i]! * 10) / 10,
  zPeoes: Math.round(zScorePeoes[i]! * 100) / 100,
  zAcidentes: Math.round(zScoreAcidentes[i]! * 100) / 100,
  indicePeoes: Math.round(indicePeoes[i]! * 10) / 10,
  indiceAcidentes: Math.round(indiceAcidentes[i]! * 10) / 10,
  residuo: Math.round(residuos[i]!),
  corrMovel: correlacaoMovel[i] ? Math.round(correlacaoMovel[i]! * 1000) / 1000 : null
}));

export const dadosDispersao = peoes.map((x, i) => ({
  peoes: x,
  acidentes: acidentes[i]!,
  ano: anos[i]!,
  regressao: declive * x + ordenadaOrigem  // Add regression value for each point
}));

// Dados para a reta de regressão (endpoints for line drawing)
// Include actual min/max peões values for accurate line
const minPeoes = Math.min(...peoes);
const maxPeoes = Math.max(...peoes);
export const retaRegressao = [
  { peoes: minPeoes - 500, regressao: declive * (minPeoes - 500) + ordenadaOrigem, acidentes: null },
  { peoes: maxPeoes + 500, regressao: declive * (maxPeoes + 500) + ordenadaOrigem, acidentes: null }
];

// Combined data for scatter plot with regression line
export const dadosDispersaoComRegressao = [
  ...dadosDispersao.sort((a, b) => a.peoes - b.peoes)
];

// === HISTOGRAMAS ===
export const criarHistograma = (arr: number[], numClasses: number) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const larguraClasse = (max - min) / numClasses;
  const classes: { classe: string; frequencia: number }[] = [];
  for (let i = 0; i < numClasses; i++) {
    const limInf = min + i * larguraClasse;
    const limSup = min + (i + 1) * larguraClasse;
    const freq = arr.filter(x => x >= limInf && (i === numClasses - 1 ? x <= limSup : x < limSup)).length;
    classes.push({
      classe: `${Math.round(limInf / 1000)}k-${Math.round(limSup / 1000)}k`,
      frequencia: freq
    });
  }
  return classes;
};

export const histogramaPeoes = criarHistograma(peoes, 6);
export const histogramaAcidentes = criarHistograma(acidentes, 6);

// === VALORES CALCULADOS PARA APRESENTAÇÃO ===
export const reducaoPeoes = ((1 - peoes[33]! / peoes[0]!) * 100).toFixed(1);
export const reducaoAcidentes = ((1 - acidentes[33]! / acidentes[0]!) * 100).toFixed(1);
