import { useSQLiteContext } from "expo-sqlite";

export type Pet = {
    id: number;
    nome: string;
    fome: number;
    sono: number;
    diversao: number;
    status: number;
    character_id: number;
    lastUpdated: number;
};

export function usePetsDatabase() {
    const database = useSQLiteContext();

    async function createPet(data: Omit<Pet, 'id' | 'fome' | 'sono' | 'diversao' | 'status' | 'lastUpdated'>) {
        const currentTime = Math.floor(Date.now() / 1000); // Obtém o timestamp atual em segundos

        const statement = await database.prepareAsync(`
            INSERT INTO pets (nome, fome, sono, diversao, status, character_id, lastUpdated) 
            VALUES ($nome, 100, 100, 100, 300, $character_id, $lastUpdated);    
        `);
        try {
            const result = await statement.executeAsync({
                $nome: data.nome,
                $character_id: data.character_id,
                $lastUpdated: currentTime, // Atribui o timestamp atual
            });

            return result.lastInsertRowId.toLocaleString();
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function findAll() {
        try {
            const query = `SELECT * FROM pets;`;
            return await database.getAllAsync<Pet>(query);
        } catch (error) {
            throw error;
        }
    }

    async function findById(id: number) {
        try {
            const query = `SELECT * FROM pets WHERE id = ?;`;
            return await database.getFirstAsync<Pet>(query, id);
        } catch (error) {
            throw error;
        }
    }

    async function findByName(search: string) {
        try {
            const query = `SELECT * FROM pets WHERE nome LIKE ?;`;
            return await database.getAllAsync<Pet>(query, `%${search}%`);
        } catch (error) {
            throw error;
        }
    }

    async function updateFome(id: number, fome: number) {
        const currentTime = Math.floor(Date.now() / 1000); // Timestamp atual
        
        const statement = await database.prepareAsync(`
            UPDATE pets SET fome = $fome, lastUpdated = $lastUpdated WHERE id = $id;
        `);
        try {
            await statement.executeAsync({
                $fome: fome,
                $lastUpdated: currentTime,
                $id: id
            });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    

    async function updateDiversao(id: number, diversao: number) {
        const currentTime = Math.floor(Date.now() / 1000); // Timestamp atual
        
        const statement = await database.prepareAsync(`
            UPDATE pets SET diversao = $diversao, lastUpdated = $lastUpdated WHERE id = $id;
        `);
        try {
            await statement.executeAsync({
                $diversao: diversao,
                $lastUpdated: currentTime,
                $id: id
            });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    

    async function updateSono(id: number, sono: number) {
        const currentTime = Math.floor(Date.now() / 1000); // Timestamp atual
        
        const statement = await database.prepareAsync(`
            UPDATE pets SET sono = $sono, lastUpdated = $lastUpdated WHERE id = $id;
        `);
        try {
            await statement.executeAsync({
                $sono: sono,
                $lastUpdated: currentTime,
                $id: id
            });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    

    async function updatePetAttributes(petId: number, fome: number, sono: number, diversao: number) {
        const currentTime = Math.floor(Date.now() / 1000); 
        
        const statement = await database.prepareAsync(`
            UPDATE pets 
            SET fome = $fome, sono = $sono, diversao = $diversao, lastUpdated = $lastUpdated
            WHERE id = $id;
        `);
        
        try {
            await statement.executeAsync({
                $fome: fome,
                $sono: sono,
                $diversao: diversao,
                $lastUpdated: currentTime,
                $id: petId
            });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    
    

    return { createPet, findAll, findById, findByName, updateFome, updateDiversao, updateSono,updatePetAttributes };
}
