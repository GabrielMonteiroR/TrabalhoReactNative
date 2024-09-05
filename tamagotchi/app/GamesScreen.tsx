import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

export default function GamesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta é a tela de jogos</Text>
    </View>
  );
}
