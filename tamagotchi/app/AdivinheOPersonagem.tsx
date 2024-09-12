import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { usePetsDatabase } from '@/db/usePetsDatabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';

const characters = [
  { id: 1, name: 'Arkana' },
  { id: 2, name: 'Ishizu' },
  { id: 3, name: 'Joey' },
  { id: 4, name: 'Kaiba' },
  { id: 5, name: 'Mako' },
  { id: 6, name: 'Yugi' },
];

export default function AdivinheOPersonagem() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<{ left: CharacterId; right: CharacterId }>({
    left: 1 as CharacterId,
    right: 2 as CharacterId,
  });
  const { id } = useLocalSearchParams();
  const { findById, updateDiversao } = usePetsDatabase();
  const [pet, setPet] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const randomizeCharacters = () => {
      const first = (Math.floor(Math.random() * 5) + 1) as CharacterId;
      let second: CharacterId;
      do {
        second = (Math.floor(Math.random() * 5) + 1) as CharacterId;
      } while (second === first);

      setSelectedCharacters({ left: first, right: second });
    };

    randomizeCharacters();
    Accelerometer.setUpdateInterval(1000);
    setSubscription(Accelerometer.addListener(({ x, y }) => setData({ x, y, z: 0 })));
    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    if (id) {
      const loadPet = async () => {
        const petData = await findById(Number(id));
        setPet(petData);
      };
      loadPet();
    }
  }, [id]);

  useEffect(() => {
    if (data.x > 0.5) {
      checkAnswer(selectedCharacters.left);
    } else if (data.x < -0.5) {
      checkAnswer(selectedCharacters.right);
    }
  }, [data]);

  const checkAnswer = async (chosenCharacter: CharacterId) => {
    if (chosenCharacter === selectedCharacters.left) {
      Alert.alert('Acertou!', 'Você escolheu o personagem correto!');
      if (pet) {
        await updateDiversao(pet.id, Math.min(100, pet.diversao + 10));
      }
      router.back();
    } else {
      Alert.alert('Errou!', 'Personagem incorreto!');
    }
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando pet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adivinhe o Personagem</Text>
      <Image
        source={characterImagesAPI.getImageByCharacterAndState(selectedCharacters.left as CharacterId, 'muitofeliz')}
        style={styles.image}
      />
      <View style={styles.answerContainer}>
        <Text style={styles.answerLeft}>{characters.find((c) => c.id === selectedCharacters.left)?.name}</Text>
        <Text style={styles.answerRight}>{characters.find((c) => c.id === selectedCharacters.right)?.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f' },
  title: { fontSize: 24, marginBottom: 16, color: '#FFF' },
  image: { width: 300, height: 300, marginBottom: 20 },
  answerContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 40 },
  answerLeft: { fontSize: 18, color: '#FFF', textAlign: 'left' },
  answerRight: { fontSize: 18, color: '#FFF', textAlign: 'right' },
  text: { color: '#FFF' },
});
