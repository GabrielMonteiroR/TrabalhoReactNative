import React, { createContext, useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
<<<<<<< HEAD
import { initializeDatabase } from '../../db/initializeDatabase';
=======
import { Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { initializeDatabase } from '../../db/initializeDatabase'; 
>>>>>>> 6670394d1f2e3fd1c4b8edd09ee63d4eb499cb1a


export const DatabaseContext = createContext<SQLite.SQLiteDatabase | null>(null); 


const database = SQLite.openDatabaseSync('pets.db');

export default function Layout() {
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeDatabase(database); 
      setIsDatabaseReady(true); 
    };
    initialize();
  }, []);

  if (!isDatabaseReady) {
    return <Text>Carregando o banco de dados...</Text>; 
  }

  return (
    <DatabaseContext.Provider value={database}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-variant" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="comida"
          options={{
            title: 'Comida',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="food" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="dormir"
          options={{
            title: 'Dormir',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="sleep" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="jogos"
          options={{
            title: 'Jogos',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="gamepad-variant" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="criarPet"
          options={{
            title: 'Criar Pet',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cat" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </DatabaseContext.Provider>
  );
}
