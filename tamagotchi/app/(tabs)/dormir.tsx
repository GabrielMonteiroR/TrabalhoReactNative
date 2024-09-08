import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pet, usePetsDatabase } from '@/db/usePetsDatabase';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { calculateStatus } from '@/services/calculateStatus'; // Importação da função calculateStatus
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function DormirScreen() {
  const { id } = useLocalSearchParams();
  const { findById, updateSono } = usePetsDatabase();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isSleeping, setIsSleeping] = useState(false); // Controle para desabilitar o botão
  const router = useRouter();

  useEffect(() => {
    const loadPet = async () => {
      try {
        const petId = Number(id);
        const petData = await findById(petId);
        setPet(petData);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar os dados do pet.');
      }
    };
    loadPet();
  }, [id]);

  const startSleeping = () => {
    if (pet && !isSleeping) { // Verifica se o pet está definido e não está dormindo
      setIsSleeping(true); // Desabilita o botão
      Alert.alert('Dormindo...', 'O pet está dormindo por 5 segundos');
      setTimeout(async () => {
        const novoStatusSono = Math.min(100, pet.sono + 10);
        try {
          await updateSono(pet.id, novoStatusSono);
          const novoStatus = calculateStatus(novoStatusSono + pet.fome + pet.diversao); // Recalcula o status geral com base em todos os atributos

          setPet((prevPet) => (prevPet ? { ...prevPet, sono: novoStatusSono, status: novoStatusSono + pet.fome + pet.diversao } : prevPet));
          Alert.alert('Sucesso', 'O sono do pet aumentou!');
        } catch (error) {
          Alert.alert('Erro', 'Erro ao atualizar o sono.');
        } finally {
          setIsSleeping(false); // Habilita o botão novamente após 5 segundos
        }
      }, 5000);
    }
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const statusGeral = calculateStatus(pet.fome + pet.sono + pet.diversao); // Calcula o status geral

  return (
    <View style={styles.container}>
      <Text style={styles.characterName}>{pet.nome}</Text>
      {pet.character_id && (
        <Image
          source={characterImagesAPI.getImageByCharacterAndState(pet.character_id as CharacterId, statusGeral)} // Usa o status geral para escolher a imagem
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <View style={styles.statusItem}>
        <MaterialIcons name="bed" size={28} color="#4682b4" />
        <Text style={styles.text}>{pet.sono}</Text>
      </View>

      {/* Botão de Dormir - Desabilitado enquanto dormindo */}
      <TouchableOpacity
        style={[styles.sleepButton, isSleeping && styles.disabledButton]}
        onPress={startSleeping}
        disabled={isSleeping} // Desabilita o clique quando isSleeping é true
      >
        <Text style={styles.buttonText}>
          {isSleeping ? 'Dormindo...' : 'Dormir'}
        </Text>
      </TouchableOpacity>

      {/* Botão de controle para a tela de jogos */}
      <TouchableOpacity
        style={styles.gamesButton}
        onPress={() => router.push({ pathname: '/GamesScreen', params: { id: pet.id } })} // Passa o ID do pet como parâmetro
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
    padding: 20,
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
  },
  sleepButton: {
    width: 150,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4682b4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  disabledButton: {
    backgroundColor: '#7a8b99', // Cor para quando o botão estiver desabilitado
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
