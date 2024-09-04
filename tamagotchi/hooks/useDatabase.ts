import { useContext } from 'react';
import { DatabaseContext } from '../app/(tabs)/_layout'; 
import { usePetsDatabase } from '../db/usePetsDatabase'; 


export function useDatabase() {
  const database = useContext(DatabaseContext);

  if (!database) {
    throw new Error('Banco de dados não está disponível');
  }

  return usePetsDatabase(database);
}
