import { SQLiteDatabase } from 'expo-sqlite';

export type Pet = {
    id: number;
    nome: string;
    fome: number;
    sono: number;
    diversao: number;
    status: number;
    character_id: number;
}

export function usePetsDatabase(database: SQLiteDatabase) {

    async function createPet(data: Omit<Pet, 'id' | 'fome' | 'sono' | 'diversao' | 'status'>) {
        const query = await database.prepareAsync(`
            INSERT INTO pets (nome, fome, sono, diversao, status, character_id) 
            VALUES ($nome, 100, 100, 100, 300, $character_id);    
        `);
        try {
            const insert = await query.executeAsync({
                $nome: data.nome,
                $character_id: data.character_id
            });

            return insert.lastInsertRowId.toLocaleString();
        } catch (error) {
            throw error;
        } finally {
            await query.finalizeAsync();
        }
    }

    async function findAll() {
        try {
            return await database.getAllAsync<Pet>(`SELECT * FROM pets;`);

        } catch (error) {
            throw error;
        }
    }

    async function findById(id: number) {
        try {
            return await database.getFirstAsync<Pet>(`SELECT * FROM pets WHERE id = ?;`, id);
        } catch (error) {
            throw error;
        }
    }

    async function findByName(search: string) {
        try {
            return await database.getAllAsync<Pet>(`SELECT * FROM pets WHERE nome LIKE ?;`, `%${search}%`);
        } catch (error) {
            throw error;
        }
    }
    return { createPet, findAll, findById, findByName };
}


