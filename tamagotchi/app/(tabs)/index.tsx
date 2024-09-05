import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import characterImagesAPI from '../../assets/characters/images';
import { useDatabase } from '@/hooks/useDatabase';
import { Pet } from '@/db/usePetsDatabase';

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
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 18,
    color: '#000',
  },
});

export default function IndexScreen() {
  const [pets, setPets] = useState<Pet[]>([]); // Estado para armazenar os personagens do banco de dados
  const router = useRouter();
  const { findAll } = useDatabase(); // Hook personalizado para acessar o banco de dados

  // Função para carregar os personagens do banco de dados
  const loadPets = async () => {
    try {
      const petsFromDB = await findAll(); // Recupera todos os pets do banco de dados
      setPets(petsFromDB); // Atualiza o estado com os pets recuperados
    } catch (error) {
      console.log('Erro ao carregar pets:', error);
    }
  };

  // Atualiza a listagem de pets sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Exibir os personagens carregados do banco de dados */}
      {pets.map((pet) => (
        <View key={pet.id} style={styles.characterContainer}>
          {pet.character_id && (
            <Image
              source={characterImagesAPI.getImageByCharacterAndState(pet.character_id, 'muitofeliz')}
              style={styles.characterImage}
              resizeMode="contain"
            />
          )}
          <Text style={styles.characterName}>{pet.nome}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
