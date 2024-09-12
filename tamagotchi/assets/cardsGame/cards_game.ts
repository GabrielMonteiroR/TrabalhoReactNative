const cardImagens = {
  1: require('./magaNegra/magaNegra.png'),
  2: require('./dragaoAladodeRa/dragaoAladodeRa.png'),
  3: require('./dragaoBranco/dragaoBranco.png'),
  4: require('./dragaoNegro/dragaoNegro.png'),
  5: require('./Exodia/Exodia.png'),
  6: require('./Fisherman/fisherman.png'),
  7: require('./Gandora/gandora.png'),
  8: require('./magoNegroArkana/magoNegroArkana.png'),
  9: require('./Obelisco/Obelisco.png'),
  10: require('./magoTempo/magoTempo.png'),
  11: require('./guerreiroEspada/guerreiroEspada.png'),
  12: require('./supremoDragaoBranco/supremoDragaoBranco.png'),
  13: require('./Jinzo/Jinzo.png'),
  14: require('./lustreNegro/lustreNegro.png'),
  15: require('./Slifer/Slifer.png'),
  16: require('./dragaoMilenar/dragaoMilenar.png'),
  17: require('./dragaoBrilhante/dragaoBrilhante.png'),
  18: require('./magoNegroYugi/magoNegroYugi.png'),
  19: require('./lavaGolem/lavaGolem.png'),
  20: require('./MagoNegroChaos/MagoNegroChaos.png'),
};

export default {
  getCardImage: (id) => {
    return cardImagens[id] || null; // Retorna null para IDs inválidos
  },
};
