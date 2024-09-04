import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, Pressable, Modal, TextInput, Image, StyleSheet } from 'react-native';
import { usePetsDatabase, Pet } from '../../db/usePetsDatabase';
import characterImagesAPI, { CharacterId } from '../../assets/characters/images';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  // Estilos simplificados para clareza
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
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFF',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#171717',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 8,
    marginBottom: 16,
    color: '#FFF',
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
    width: 50,
    height: 50,
  },
  selectedImage: {
    width: 120,
    height: 120,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default function Index() {
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedImage, setSelectedImage] = useState<CharacterId | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const petsDatabase = usePetsDatabase();
  const router = useRouter();

  async function create() {
    try {
      if (!name) {
        return Alert.alert('Nome é obrigatório');
      }
      if (selectedImage === null) {
        return Alert.alert('Selecione uma imagem');
      }

      const response = await petsDatabase.createPet({
        nome: name,
        character_id: selectedImage,
      });
      Alert.alert('Pet cadastrado com o ID: ' + response.insertedRowId);
      setModalVisible(false);
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
    <View style={{ flex: 1, backgroundColor: '#F0F8FF', padding: 32 }}>
      <TextInput
        placeholder="Pesquisar"
        onChangeText={setSearch}
        value={search}
        style={{
          borderWidth: 1,
          borderColor: '#333',
          padding: 8,
          marginBottom: 16,
          color: '#000',
        }}
      />
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`${item.id.toString()}`)}>
            <View
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: '#333',
                marginBottom: 15,
                borderRadius: 10,
                backgroundColor: '#282828',
              }}
            >
              {item.character_id && characterImagesAPI.getImageByCharacterAndState(item.character_id, 'muitofeliz') ? (
                <Image
                  source={characterImagesAPI.getImageByCharacterAndState(item.character_id, 'muitofeliz')}
                  style={{ width: 120, height: 120, marginBottom: 10, alignSelf: 'center' }}
                  resizeMode="contain"
                />
              ) : (
                <Text style={{ color: '#FFF', textAlign: 'center' }}>No Image</Text>
              )}
              <Text style={{ color: '#FFF', fontSize: 18, marginBottom: 10 }}>{item.nome}</Text>
            </View>
          </Pressable>
        )}
      />
      <Pressable onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            {selectedImageSource && (
              <View style={styles.selectedImageContainer}>
                <Image source={selectedImageSource} style={styles.selectedImage} resizeMode="contain" />
              </View>
            )}
            <TextInput placeholder="Nome" onChangeText={setName} value={name} style={styles.input} />
            <Text style={{ color: '#FFF', marginBottom: 10 }}>Escolha uma imagem:</Text>
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
            <Button title="Criar" onPress={create} color="#ED2124" />
            <Button title="Fechar" onPress={() => setModalVisible(false)} color="#ED2124" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
