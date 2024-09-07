import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Para obter os parâmetros da URL
import { usePetsDatabase, Pet } from '@/db/usePetsDatabase';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { MaterialIcons } from '@expo/vector-icons';

export default function AlimentarScreen() {
  const { id } = useLocalSearchParams(); // Obtem o ID passado como parâmetro
  const { findById, updateFome } = usePetsDatabase();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const petId = Number(id); // Converte o ID para número
        if (!isNaN(petId)) {
          const petData = await findById(petId);
          setPet(petData);
        } else {
          console.log('ID inválido');
        }
      } catch (error) {
        console.log('Erro ao buscar pet:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [id]);

  const alterarFome = async () => {
    if (pet) {
      const novoStatusFome = Math.min(100, pet.fome + 10); // Limita a fome a no máximo 100
      try {
        await updateFome(pet.id, novoStatusFome);
        setPet((prevPet) => (prevPet ? { ...prevPet, fome: novoStatusFome } : prevPet));
      } catch (error) {
        console.log('Erro ao atualizar fome:', error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Pet não encontrado.</Text>
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
        <MaterialIcons name="fastfood" size={24} color="#ff6347" />
        <Text style={styles.text}>{pet.fome}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={alterarFome}>
          <MaterialIcons name="fastfood" size={28} color="#39c234" />
          <Text style={styles.buttonText}>Alimentar +10</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    marginTop: 30,
  },
  circleButton: {
    width: 120,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
