import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, Pressable, TextInput, Image, StyleSheet } from 'react-native';
import { usePetsDatabase, Pet } from '../../db/usePetsDatabase';
import characterImagesAPI, { CharacterId } from '../../assets/characters/images';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 8,
    marginBottom: 16,
    color: '#000',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  imageCard: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
  },
  selectedImageCard: {
    borderColor: '#ED2124',
  },
  image: {
    width: 80, // Aumentado de 50 para 100
    height: 80, // Aumentado de 50 para 100
  },
  selectedImage: {
    width: 200, // Aumentado de 120 para 200
    height: 200, // Aumentado de 120 para 200
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#ED2124',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  petContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#282828',
  },
  petText: {
    color: '#000',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default function CreateCharacterScreen() {
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedImage, setSelectedImage] = useState<CharacterId | null>(null);

  const petsDatabase = usePetsDatabase();
  const router = useRouter();

  async function create() {
    try {
      if (!name) {
        return Alert.alert('Adicione um nome ao personagem');
      }
      if (selectedImage === null) {
        return Alert.alert('Selecione uma imagem');
      }

      const response = await petsDatabase.createPet({
        nome: name,
        character_id: selectedImage,
      });

      Alert.alert('Pet cadastrado com o ID: ' + response.insertedRowId);
      setName('');
      setSelectedImage(null);
      await list();
    } catch (error) {
      console.log('Erro ao criar pet:', error);
    }
  }

  async function list() {
    try {
      const response = await petsDatabase.findAll(search);
      setPets(response);
    } catch (error) {
      console.log('Erro ao listar pets:', error);
    }
  }

  useEffect(() => {
    list();
  }, [search]);

  const selectedImageSource =
    selectedImage !== null ? characterImagesAPI.getImageByCharacterAndState(selectedImage, 'muitofeliz') : null;

  return (
    <View style={styles.container}>
      {selectedImageSource && (
        <View style={styles.selectedImageContainer}>
          <Image source={selectedImageSource} style={styles.selectedImage} resizeMode="contain" />
        </View>
      )}

      <TextInput
        placeholder="Nome"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />

      <Text style={{ color: '#000', marginBottom: 10 }}>Escolha uma imagem:</Text>
      <View style={styles.imageContainer}>
        {Object.keys(characterImagesAPI.getAllCharacterImages()).map((key) => (
          <Pressable
            key={key}
            onPress={() => setSelectedImage(Number(key))}
            style={[styles.imageCard, selectedImage === Number(key) && styles.selectedImageCard]}
          >
            <Image
              source={characterImagesAPI.getImageByCharacterAndState(Number(key), 'muitofeliz')}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </View>

      <Pressable onPress={create} style={styles.addButton}>
        <Text style={styles.addButtonText}>Salvar Personagem</Text>
      </Pressable>

      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`${item.id.toString()}`)}>
            <View style={styles.petContainer}>
              {item.character_id && characterImagesAPI.getImageByCharacterAndState(item.character_id, 'muitofeliz') ? (
                <Image
                  source={characterImagesAPI.getImageByCharacterAndState(item.character_id, 'muitofeliz')}
                  style={{ width: 200, height: 200, marginBottom: 10, alignSelf: 'center' }} // Aumentado de 120 para 200
                  resizeMode="contain"
                />
              ) : (
                <Text style={{ color: '#FFF', textAlign: 'center' }}>No Image</Text>
              )}
              <Text style={styles.petText}>{item.nome}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
