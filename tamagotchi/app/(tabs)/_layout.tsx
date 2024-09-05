import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="alimentar"
        options={{
          title: 'Alimentar',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dormir"
        options={{
          title: 'Dormir',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bed' : 'bed-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
