import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { usePetsDatabase } from '@/db/usePetsDatabase';
import { MaterialIcons } from '@expo/vector-icons';

export default function DormirScreen() {
  const { id } = useLocalSearchParams();
  const { findById, updateSono } = usePetsDatabase();
  const [pet, setPet] = useState(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Referência para o intervalo
  const [isSleeping, setIsSleeping] = useState(false);

  useEffect(() => {
    const loadPet = async () => {
      try {
        if (id) {
          const petData = await findById(id);
          if (petData) {
            setPet(petData);
          } else {
            Alert.alert('Erro', 'Pet não encontrado.');
          }
        } else {
          Alert.alert('Erro', 'ID do pet não fornecido.');
        }
      } catch (error) {
        console.log('Erro ao buscar pet:', error);
        Alert.alert('Erro', 'Erro ao carregar os dados do pet. Tente novamente mais tarde.');
      }
    };

    loadPet();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Limpa o intervalo ao desmontar o componente
      }
    };
  }, [id]);

  const alterarSono = async (valor) => {
    if (pet) {
      const novoStatusSono = Math.min(100, Math.max(0, pet.sono + valor)); // Limita o sono entre 0 e 100
      try {
        await updateSono(id, novoStatusSono);
        setPet((prevPet) => ({ ...prevPet, sono: novoStatusSono }));
      } catch (error) {
        console.log('Erro ao atualizar Sono:', error);
        Alert.alert('Erro', 'Erro ao atualizar o status de sono. Tente novamente.');
      }
    }
  };

  const startSleeping = () => {
    if (!isSleeping && pet && pet.sono < 100) {
      intervalRef.current = setInterval(() => alterarSono(1), 10000); // Incrementa o sono a cada 10 segundos
      setIsSleeping(true);
    }
  };

  const stopSleeping = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsSleeping(false);
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.circleButton, { backgroundColor: pet.sono >= 100 ? '#d3d3d3' : '#39c234' }]}
          onPressIn={startSleeping} // Inicia o incremento quando pressionado
          disabled={pet.sono >= 100 || isSleeping}
        >
          <MaterialIcons name="hotel" size={28} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.circleButton, { backgroundColor: !isSleeping ? '#d3d3d3' : '#b80920' }]}
          onPress={stopSleeping}
          disabled={!isSleeping}
        >
          <MaterialIcons name="pause" size={28} color="#ffffff" />
          <Text style={styles.buttonText}>Parar</Text>
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
    width: 120,
    height: 70,
    borderRadius: 35,
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
