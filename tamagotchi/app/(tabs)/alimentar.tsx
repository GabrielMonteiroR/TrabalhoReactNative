import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePetsDatabase, Pet } from '@/db/usePetsDatabase';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { calculateStatus } from '@/services/calculateStatus'; 
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function AlimentarScreen() {
  const { id } = useLocalSearchParams();
  const { findById, updateFome } = usePetsDatabase();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadPet = async () => {
    try {
      const petId = Number(id);
      if (!isNaN(petId)) {
        const petData = await findById(petId);
        setPet(petData);
      }
    } catch (error) {
      console.log('Erro ao buscar pet:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPet(); 

    const intervalId = setInterval(() => {
      loadPet(); 
    }, 1000);

    return () => clearInterval(intervalId);
  }, [id]);

  const alterarFome = async () => {
    if (pet) {
      const novoStatusFome = Math.min(100, pet.fome + 10);
      try {
        await updateFome(pet.id, novoStatusFome);
        await loadPet(); 
      } catch (error) {
        console.log('Erro ao atualizar fome:', error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pet não encontrado.</Text>
      </View>
    );
  }

  const statusGeral = calculateStatus(pet.fome + pet.sono + pet.diversao); 

  return (
    <View style={styles.container}>
      <Text style={styles.characterName}>{pet.nome}</Text>
      {pet.character_id && (
        <Image
          source={characterImagesAPI.getImageByCharacterAndState(pet.character_id as CharacterId, statusGeral)} 
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <View style={styles.statusItem}>
        <MaterialIcons name="fastfood" size={28} color="#FF6347" />
        <Text style={styles.text}>{pet.fome}</Text>
      </View>
      <TouchableOpacity style={styles.circleButton} onPress={alterarFome}>
        <Text style={styles.buttonText}>Comer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.gamesButton}
        onPress={() => router.push({ pathname: '/GamesScreen', params: { id: pet.id } })} 
      >
        <Ionicons name="game-controller" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2f',
  },
  image: {
    width: 350,
    height: 350,
  },
  text: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  circleButton: {
    width: 150,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statusItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
  },
  characterName: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: 'bold',
  },
  gamesButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#008CBA',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
