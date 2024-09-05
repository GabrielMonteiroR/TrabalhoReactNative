import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DormirScreen() {
  const { id } = useLocalSearchParams(); 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dormir com o pet: {id}</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
});
