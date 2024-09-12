export const cardNames: { [key: number]: string } = {
  1: 'Pequena Maga Negra',
  2: 'Dragão Alado de Rá',
  3: 'Dragão Branco de Olhos Azuis',
  4: 'Dragão Negro de Olhos Vermelhos',
  5: 'Exodia, o Proibido',
  6: 'Pescador Lendário',
  7: 'Gandora o Dragão da Destruição',
  8: 'Mago Negro - Arkana',
  9: 'Obelisco, o Atormentador',
  10: 'Mago do Tempo',
  11: 'Guerreiro da Espada de Chama Dourada',
  12: 'Supremo Dragão Branco de Olhos Azuis',
  13: 'Jinzo',
  14: 'Soldado do Lustro Negro',
  15: 'Slifer, o Dragão do Céu',
  16: 'Dragão Milenar',
  17: 'Dragão Brilhante de Olhos Azuis',
  18: 'Mago Negro - Yugi',
  19: 'Lava Golem',
  20: 'Mago Negro do Chaos',
};

export const quizQuestions = [
  { id: 1, imageId: 1 },
  { id: 2, imageId: 2 },
  { id: 3, imageId: 3 },
  { id: 4, imageId: 4 },
  { id: 5, imageId: 5 },
  { id: 6, imageId: 6 },
  { id: 7, imageId: 7 },
  { id: 8, imageId: 8 },
  { id: 9, imageId: 9 },
  { id: 10, imageId: 10 },
  { id: 11, imageId: 11 },
  { id: 12, imageId: 12 },
  { id: 13, imageId: 13 },
  { id: 14, imageId: 14 },
  { id: 15, imageId: 15 },
  { id: 16, imageId: 16 },
  { id: 17, imageId: 17 },
  { id: 18, imageId: 18 },
  { id: 19, imageId: 19 },
  { id: 20, imageId: 20 },
];

export const getRandomOptions = (correctId: number): number[] => {
  const allIds = Object.keys(cardNames).map(Number);
  const randomIds: number[] = [];

  while (randomIds.length < 3) {
    const randomId = allIds[Math.floor(Math.random() * allIds.length)];
    if (randomId !== correctId && !randomIds.includes(randomId)) {
      randomIds.push(randomId);
    }
  }

  randomIds.push(correctId);
  return randomIds.sort(() => Math.random() - 0.5);
};
