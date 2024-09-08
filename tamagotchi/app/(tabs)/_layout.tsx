import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon'; // Supondo que você tenha esse componente
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams(); // Captura o ID uma vez no layout

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="alimentar"
        options={{
          title: 'Alimentar',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
          ),
        }}
        // Passa o id como parâmetro para a rota
        initialParams={{ id }}
      />
      <Tabs.Screen
        name="dormir"
        options={{
          title: 'Dormir',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bed' : 'bed-outline'} color={color} />
          ),
        }}
        // Passa o id como parâmetro para a rota
        initialParams={{ id }}
      />
    </Tabs>
  );
}
