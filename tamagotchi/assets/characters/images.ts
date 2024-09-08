export type CharacterState = 'bem' | 'muitofeliz' | 'muitotriste' | 'ok' | 'triste' | 'critico' | 'morto';
export type CharacterId = 1 | 2 | 3 | 4 | 5;

const characterImages: Record<CharacterId, Record<CharacterState, any>> = {
  1: {
    bem: require('./arkana/bem.png'),
    muitofeliz: require('./arkana/muitofeliz.png'),
    muitotriste: require('./arkana/muitotriste.png'),
    ok: require('./arkana/ok.png'),
    triste: require('./arkana/triste.png'),
    critico: require('./arkana/critico.png'), 
    morto: require('./arkana/morto.png'), 
  },
  2: {
    bem: require('./ishizu/bem.png'),
    muitofeliz: require('./ishizu/muitofeliz.png'),
    muitotriste: require('./ishizu/muitotriste.png'),
    ok: require('./ishizu/ok.png'),
    triste: require('./ishizu/triste.png'),
    critico: require('./ishizu/critico.png'),
    morto: require('./ishizu/morto.png'),
  },
  3: {
    bem: require('./joey/bem.png'),
    muitofeliz: require('./joey/muitofeliz.png'),
    muitotriste: require('./joey/muitotriste.png'),
    ok: require('./joey/ok.png'),
    triste: require('./joey/triste.png'),
    critico: require('./joey/critico.png'),
    morto: require('./joey/morto.png'),
  },
  4: {
    bem: require('./kaiba/bem.png'),
    muitofeliz: require('./kaiba/muitofeliz.png'),
    muitotriste: require('./kaiba/muitotriste.png'),
    ok: require('./kaiba/ok.png'),
    triste: require('./kaiba/triste.png'),
    critico: require('./kaiba/critico.png'),
    morto: require('./kaiba/morto.png'),
  },
  5: {
    bem: require('./mako/bem.png'),
    muitofeliz: require('./mako/muitofeliz.png'),
    muitotriste: require('./mako/muitotriste.png'),
    ok: require('./mako/ok.png'),
    triste: require('./mako/triste.png'),
    critico: require('./mako/critico.png'),
    morto: require('./mako/morto.png'),
  },
};

export default {
  getAllCharacterImages: () => characterImages,

  getImagesByState: (state: CharacterState) => {
    return Object.values(characterImages).map(images => images[state]);
  },

  getImageByCharacterAndState: (characterId: CharacterId, state: CharacterState) => {
    return characterImages[characterId][state];
  },
};
