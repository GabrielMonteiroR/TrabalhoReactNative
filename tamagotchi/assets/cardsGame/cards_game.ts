const cardParaBaixo = require('./cardParaBaixo/CardParaBaixo.jpg');

const cardImagens = {
  2: require('./dragaoAladodeRa/dragaoAladodeRa.jpg'),
  3: require('./dragaoBranco/dragaoBranco.jpg'),
  4: require('./dragaoNegro/dragaoNegro.jpg'),
  5: require('./Exodia/exodia.jpg'),
  6: require('./Fisherman/fisherman.jpg'),
  7: require('./Gandora/gandora.png'),
  8: require('./magoNegro/magoNegro.jpg'),
  9: require('./Obelisco/Obelisco.jpg'),
  10: require('./Slifer/Slifer.jpg'),
};

export default {
  getCardImage: (id) => {
    if (id === 1) {
      return cardParaBaixo;
    }
    return cardImagens[id] || null; // Retorna null para IDs inválidos
  },
};
