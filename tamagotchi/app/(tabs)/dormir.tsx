import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pet, usePetsDatabase } from '@/db/usePetsDatabase';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { MaterialIcons } from '@expo/vector-icons';

export default function DormirScreen() {
  const { id } = useLocalSearchParams();
  const { findById, updateSono } = usePetsDatabase();
  const [pet, setPet] = useState<Pet | null>(null);
  const router = useRouter(); // Inicialize o roteador

  useEffect(() => {
    const loadPet = async () => {
      try {
        const petId = Array.isArray(id) ? Number(id[0]) : Number(id);
        const petData = await findById(petId);
        setPet(petData);
      } catch (error) {
        console.log('Erro ao buscar pet:', error);
        Alert.alert('Erro', 'Erro ao carregar os dados do pet. Tente novamente mais tarde.');
      }
    };

    loadPet();
  }, [id]);

  const startSleeping = () => {
    if (pet) {
      Alert.alert('Dormindo...', 'O pet está dormindo por 5 segundos', [{ text: 'Ok' }]);
      setTimeout(async () => {
        const novoStatusSono = Math.min(100, pet.sono + 10); // Aumenta o sono em 10 e limita a 100
        try {
          await updateSono(pet.id, novoStatusSono);
          setPet((prevPet) => (prevPet ? { ...prevPet, sono: novoStatusSono } : prevPet));
          Alert.alert('Sucesso', 'O sono do pet aumentou!');
        } catch (error) {
          console.log('Erro ao atualizar sono:', error);
          Alert.alert('Erro', 'Erro ao atualizar o sono. Tente novamente.');
        }
      }, 5000); // Dorme por 5 segundos
    }
  };

  // Navegar para a aba de "Alimentar" com o ID do pet
  const irParaAlimentar = () => {
    if (pet) {
      router.push({
        pathname: '/(tabs)/alimentar',
        params: { id: pet.id }, // Passa o ID como parâmetro
      });
    }
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.characterName}>{pet.nome}</Text>
      {pet.character_id && (
        <Image
          source={characterImagesAPI.getImageByCharacterAndState(pet.character_id as CharacterId, 'muitofeliz')}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <View style={styles.statusItem}>
        <MaterialIcons name="bed" size={24} color="#4682b4" />
        <Text style={styles.text}>{pet.sono}</Text>
      </View>
      <TouchableOpacity style={styles.sleepButton} onPress={startSleeping}>
        <Text style={styles.buttonText}>Dormir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sleepButton: {
    width: 120,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4682b4',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  alimentarButton: {
    width: 120,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  characterName: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
