import { CharacterState } from "@/assets/characters/images";

export function calculateStatus(status: number): CharacterState {
    if (status === 0) {
        return 'morto';
    } else if (status >= 1 && status <= 50) {
        return 'critico';
    } else if (status >= 51 && status <= 100) {
        return 'muitotriste'; 
    } else if (status >= 101 && status <= 150) {
        return 'triste';
    } else if (status >= 151 && status <= 200) {
        return 'ok';
    } else if (status >= 201 && status <= 250) {
        return 'bem';
    } else if (status >= 251 && status <= 300) {
        return 'muitofeliz'; 
    } else {
        return 'morto'; 
    }
}
