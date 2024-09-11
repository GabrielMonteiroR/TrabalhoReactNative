import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { usePetsDatabase } from '@/db/usePetsDatabase';
import { calculateStatus } from '@/services/calculateStatus';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { Ionicons } from '@expo/vector-icons';

export default function GameScreen() {
  const [pet, setPet] = useState<any>(null);
  const { findById } = usePetsDatabase();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const loadPet = async () => {
      if (id) {
        const petData = await findById(Number(id));
        setPet(petData);
      }
    };

    const intervalId = setInterval(loadPet, 1000);
    return () => clearInterval(intervalId);
  }, [id]);

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  const statusGeral = calculateStatus(pet.fome + pet.sono + pet.diversao);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pet.nome}</Text>
      <Image
        source={characterImagesAPI.getImageByCharacterAndState(pet.character_id as CharacterId, statusGeral)}
        style={styles.image}
      />
      <View style={styles.statusContainer}>
        <Ionicons name="happy" size={28} color="#FFD700" />
        <Text style={styles.statusText}>{pet.diversao}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: '/QuizCarta', params: { id: pet.id } })}
      >
        <Text style={styles.buttonText}>Quiz das Cartas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: '/AdivinheOPersonagem', params: { id: pet.id } })}
      >
        <Text style={styles.buttonText}>Adivinhe o Personagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 16, color: '#FFF' },
  image: { width: 300, height: 300, marginBottom: 20 },
  statusContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  statusText: { fontSize: 24, color: '#FFD700', marginLeft: 10 },
  button: { backgroundColor: '#1E90FF', padding: 15, borderRadius: 10, marginVertical: 10 },
  buttonText: { color: '#FFF', fontSize: 18 },
  text: { color: '#FFF' },
});
