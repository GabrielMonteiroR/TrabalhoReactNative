import React from 'react';
import { Text, View, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import characterImagesAPI, { CharacterId } from '../../assets/characters/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  characterImage: {
    width: 150, // Largura da imagem
    height: 150, // Altura da imagem
    marginBottom: 10,
  },
  characterName: {
    fontSize: 18,
    color: '#000',
  },
});

export default function IndexScreen() {
  const router = useRouter();

  const characterIds: CharacterId[] = [1, 2, 3, 4, 5];

  return (
    <ScrollView style={styles.container}>
      {characterIds.map((id) => (
        <Pressable
          key={id}
        >
          <View style={styles.characterContainer}>
            <Image
              source={characterImagesAPI.getImageByCharacterAndState(id, 'muitofeliz')}
              style={styles.characterImage}
              resizeMode="contain"
            />
            <Text style={styles.characterName}>Personagem {id}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
