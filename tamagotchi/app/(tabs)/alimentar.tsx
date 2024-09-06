import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { usePetsDatabase } from '@/db/usePetsDatabase';
import { MaterialIcons } from '@expo/vector-icons';

export default function AlimentarScreen() {
  const { id } = useLocalSearchParams();
  const { findById, updateFome } = usePetsDatabase();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const petData = await findById(id);
        setPet(petData);
      } catch (error) {
        console.log('Erro ao buscar pet:', error);
      }
    };

    loadPet();
  }, [id]);

  const alterarFome = async (valor) => {
    if (pet) {
      const novoStatusFome = Math.min(100, Math.max(0, pet.fome + valor)); // Limita a fome entre 0 e 100
      try {
        await updateFome(id, novoStatusFome);
        setPet((prevPet) => ({ ...prevPet, fome: novoStatusFome }));
      } catch (error) {
        console.log('Erro ao atualizar fome:', error);
      }
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
        <MaterialIcons name="fastfood" size={24} color="#ff6347" />
        <Text style={styles.text}>{pet.fome}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={() => alterarFome(10)}>
          <MaterialIcons name="fastfood" size={28} color="#39c234" />
          <Text style={styles.buttonText}>+10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={() => alterarFome(-10)}>
          <MaterialIcons name="fastfood" size={28} color="#b80920" />
          <Text style={styles.buttonText}>-10</Text>
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
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 30,
  },
  circleButton: {
    width: 70,
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
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
