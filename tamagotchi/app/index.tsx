import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { usePetsDatabase, Pet } from '@/db/usePetsDatabase';
import { calculateAttributeDecay } from '@/services/calculateAttributeDecay';
import { calculateStatus } from '@/services/calculateStatus';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function IndexScreen() {
  const [pets, setPets] = useState<Pet[]>([]);
  const { findAll, updatePetAttributes } = usePetsDatabase();
  const router = useRouter();

  const loadPets = async () => {
    try {
      const petsFromDB = await findAll();
      const updatedPets = petsFromDB.map(async (pet) => {
        const { fome, sono, diversao } = calculateAttributeDecay(pet.lastUpdated, pet.fome, pet.sono, pet.diversao);
        const updatedPet = {
          ...pet,
          fome,
          sono,
          diversao,
        };

        if (fome !== pet.fome || sono !== pet.sono || diversao !== pet.diversao) {
          await updatePetAttributes(pet.id, fome, sono, diversao);
        }

        return updatedPet;
      });
      setPets(await Promise.all(updatedPets));
    } catch (error) {
      console.log('Erro ao carregar pets:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [])
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadPets();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {pets.map((pet) => {
          const statusGeral = calculateStatus(pet.fome + pet.sono + pet.diversao);

          return (
            <Pressable
              key={pet.id}
              style={styles.card}
              onPress={() => router.push({ pathname: '/(tabs)/dormir', params: { id: pet.id } })}
            >
              <Text style={styles.characterName}>{pet.nome}</Text>
              {pet.character_id && (
                <Image
                  source={characterImagesAPI.getImageByCharacterAndState(pet.character_id as CharacterId, statusGeral)}
                  style={styles.characterImage}
                  resizeMode="contain"
                />
              )}

              <View style={styles.statusContainer}>
                <View style={styles.statusItem}>
                  <MaterialIcons name="fastfood" size={28} color="#FF6347" />
                  <Text style={styles.statusText}>{pet.fome}</Text>
                </View>
                <View style={styles.statusItem}>
                  <Ionicons name="happy" size={28} color="#FFD700" />
                  <Text style={styles.statusText}>{pet.diversao}</Text>
                </View>
                <View style={styles.statusItem}>
                  <Ionicons name="bed" size={28} color="#4682B4" />
                  <Text style={styles.statusText}>{pet.sono}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <Pressable style={styles.addButton} onPress={() => router.push('/createPet')}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#120e0b',
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#1e1e2f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
    width: '100%',
  },
  characterImage: {
    width: 320,
    height: 360,
  },
  characterName: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  statusItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  statusText: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ED2124',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
