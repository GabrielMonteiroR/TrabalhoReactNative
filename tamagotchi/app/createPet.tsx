import React, { useState } from 'react';
import { View, Text, Alert, Pressable, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { usePetsDatabase } from '@/db/usePetsDatabase';

export default function CreatePet() {
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState<CharacterId | null>(null);
  const { createPet } = usePetsDatabase();
  const router = useRouter();

  async function create() {
    try {
      if (selectedImage === null) {
        return Alert.alert('Selecione uma imagem');
      }
      if (!name) {
        return Alert.alert('Adicione um nome ao personagem');
      }

      await createPet({
        nome: name,
        character_id: selectedImage,
      });

      Alert.alert('Pet cadastrado com sucesso!');
      setName('');
      setSelectedImage(null);

      router.back();
    } catch (error) {
      console.log('Erro ao criar pet:', error);
    }
  }

  const selectedImageSource =
    selectedImage !== null ? characterImagesAPI.getImageByCharacterAndState(selectedImage, 'muitofeliz') : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Novo Pet</Text>

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
        placeholderTextColor="#CCC"
      />

      <Text style={styles.imageSelectionText}>Selecione uma imagem:</Text>
      <View style={styles.imageContainer}>
        {Object.keys(characterImagesAPI.getAllCharacterImages()).map((key) => (
          <Pressable
            key={key}
            onPress={() => setSelectedImage(Number(key) as CharacterId)}
            style={[styles.imageCard, selectedImage === Number(key) && styles.selectedImageCard]}
          >
            <Image
              source={characterImagesAPI.getImageByCharacterAndState(Number(key) as CharacterId, 'muitofeliz')}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </View>

      <Pressable onPress={create} style={styles.addButton}>
        <Text style={styles.addButtonText}>Criar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e2f',
  },
  title: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    color: '#FFF',
    backgroundColor: '#2c2c3a',
  },
  imageSelectionText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
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
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 10,
  },
  selectedImageCard: {
    borderColor: '#ED2124',
  },
  image: {
    width: 80,
    height: 80,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
  },
  addButton: {
    backgroundColor: '#ED2124',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
