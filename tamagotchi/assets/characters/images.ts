const characterMap = {
    1: 'arkana',
    2: 'ishizu',
    3: 'joey',
    4: 'kaiba',
    5: 'mako',
  };
  
  const states = ['bem', 'muitofeliz', 'muitotriste', 'ok', 'triste', 'critico'];
  
  const generateCharacterImages = (characterMap: { [id: number]: string }, states: string[]) => {
    const images: { [id: number]: { [key: string]: any } } = {};
  
    Object.entries(characterMap).forEach(([id, character]) => {
      images[parseInt(id)] = {};
  
      states.forEach(state => {
        images[parseInt(id)][state] = require(`./${character}/${state}.png`);
      });
    });
  
    return images;
  };
  
  const characterImages = generateCharacterImages(characterMap, states);
  
  export default characterImages;
  