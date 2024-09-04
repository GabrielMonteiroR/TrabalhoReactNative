import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { initializeDatabase } from '../../db/initializeDatabase'; 

const database = SQLite.openDatabaseSync('pets.db');

export default function Layout() {

  useEffect(() => {
    initializeDatabase(database);
  }, []);

  return (
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
  );
}
