export type CharacterState = 'bem' | 'muitofeliz' | 'muitotriste' | 'ok' | 'triste' | 'critico' | 'morto';
export type CharacterId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
  6: {
    bem: require('./yugi/bem.png'),
    muitofeliz: require('./yugi/muitofeliz.png'),
    muitotriste: require('./yugi/muitotriste.png'),
    ok: require('./yugi/ok.png'),
    triste: require('./yugi/triste.png'),
    critico: require('./yugi/critico.png'),
    morto: require('./yugi/morto.png'),
  },
  7: {
    bem: require('./yamiYugi/bem.png'),
    muitofeliz: require('./yamiYugi/muitofeliz.png'),
    muitotriste: require('./yamiYugi/muitotriste.png'),
    ok: require('./yamiYugi/ok.png'),
    triste: require('./yamiYugi/triste.png'),
    critico: require('./yamiYugi/critico.png'),
    morto: require('./yamiYugi/morto.png'),
  },
  8: {
    bem: require('./marik/bem.png'),
    muitofeliz: require('./marik/muitofeliz.png'),
    muitotriste: require('./marik/muitotriste.png'),
    ok: require('./marik/ok.png'),
    triste: require('./marik/triste.png'),
    critico: require('./marik/critico.png'),
    morto: require('./marik/morto.png'),
  },
  9: {
    bem: require('./tea/bem.png'),
    muitofeliz: require('./tea/muitofeliz.png'),
    muitotriste: require('./tea/muitotriste.png'),
    ok: require('./tea/ok.png'),
    triste: require('./tea/triste.png'),
    critico: require('./tea/critico.png'),
    morto: require('./tea/morto.png'),
  },
};

export default {
  getAllCharacterImages: () => characterImages,

  getImagesByState: (state: CharacterState) => {
    return Object.values(characterImages).map((images) => images[state]);
  },

  getImageByCharacterAndState: (characterId: CharacterId, state: CharacterState) => {
    return characterImages[characterId][state];
  },
};
