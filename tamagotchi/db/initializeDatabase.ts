import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    try {
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS pets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                fome INTEGER NOT NULL DEFAULT 100,
                sono INTEGER NOT NULL DEFAULT 100,
                diversao INTEGER NOT NULL DEFAULT 100,
                status INTEGER,  
                character_id INTEGER NOT NULL
            );
        `);

        await database.execAsync(`
            CREATE TRIGGER IF NOT EXISTS calcular_status_no_insert
            AFTER INSERT ON pets
            FOR EACH ROW
            BEGIN
                UPDATE pets
                SET status = NEW.fome + NEW.sono + NEW.diversao
                WHERE id = NEW.id;
            END;
        `);

        await database.execAsync(`
            CREATE TRIGGER IF NOT EXISTS calcular_status_no_update
            AFTER UPDATE OF fome, sono, diversao ON pets
            FOR EACH ROW
            BEGIN
                UPDATE pets
                SET status = NEW.fome + NEW.sono + NEW.diversao
                WHERE id = NEW.id;
            END;
        `);
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
    }
}
