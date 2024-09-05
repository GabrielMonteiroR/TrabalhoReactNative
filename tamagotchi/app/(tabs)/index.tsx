import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import characterImagesAPI, { CharacterId } from '../../assets/characters/images';
import { useDatabase } from '@/hooks/useDatabase';
import { Pet } from '@/db/usePetsDatabase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  characterImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  characterName: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  characterStatus: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
  },
});

export default function IndexScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const { findAll } = useDatabase(); 


  const loadPets = async () => {
    try {
      const petsFromDB = await findAll(); 
      setPets(petsFromDB); 
    } catch (error) {
      console.log('Erro ao carregar pets:', error);
    }
  };


  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [])
  );

  const calculateStatus = (status: number) => {
    if (status === 0) {
      return 'morto';
    } else if (status >= 1 && status <= 50) {
      return 'crítico';
    } else if (status >= 51 && status <= 100) {
      return 'muito triste';
    } else if (status >= 101 && status <= 150) {
      return 'triste';
    } else if (status >= 151 && status <= 200) {
      return 'ok';
    } else if (status >= 201 && status <= 250) {
      return 'bem';
    } else if (status >= 251 && status <= 300) {
      return 'muito bem';
    } else {
      return 'desconhecido'; 
    };

  }
  return (
    <ScrollView style={styles.container}>
      {pets.map((pet) => (
        <View key={pet.id} style={styles.card}>
          <Text style={styles.characterName}>{pet.nome}</Text>
          {pet.character_id && (
            <Image
              source={characterImagesAPI.getImageByCharacterAndState(pet.character_id as CharacterId, 'muitofeliz')}
              style={styles.characterImage}
              resizeMode="contain"
            />
          )}
          <Text style={styles.characterStatus}>Status: {calculateStatus(pet.status)}</Text>
          <Text style={styles.characterStatus}>Fome: {pet.fome}</Text>
          <Text style={styles.characterStatus}>Humor: {pet.diversao}</Text>
          <Text style={styles.characterStatus}>Energia: {pet.sono}</Text>

          {/* Botão de excluir */}
          <Button title="Excluir" color="#ff4d4d" />
        </View>
      ))}
    </ScrollView>
  );
}
