export function calculateAttributeDecay(lastUpdated: number, fome: number, sono: number, diversao: number): { fome: number; sono: number; diversao: number } {
    const currentTime = Math.floor(Date.now() / 1000); 
    const timeDiff = currentTime - lastUpdated; 

    const minutesElapsed = Math.floor(timeDiff / 60); 
    const decayAmount = minutesElapsed * 1; 

    return {
        fome: Math.max(0, fome - decayAmount), 
        sono: Math.max(0, sono - decayAmount),
        diversao: Math.max(0, diversao - decayAmount),
    };
}
