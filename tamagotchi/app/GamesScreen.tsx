import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 

export default function GamesScreen() {
  const { id } = useLocalSearchParams(); 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta é a tela de jogos</Text>
      {id ? (
        <Text style={styles.text}>ID do pet: {String(id)}</Text>
      ) : (
        <Text style={styles.text}>Nenhum ID encontrado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  text: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
});
