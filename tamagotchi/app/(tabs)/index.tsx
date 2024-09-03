import React from 'react';
import { Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import characterImagesAPI, { CharacterId } from '../../assets/characters/images';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

export default function IndexScreen() {
  const router = useRouter();

  const characterIds: CharacterId[] = [1, 2, 3, 4, 5];

  // Testando a função getAllCharacterImages
  const allImages = characterImagesAPI.getAllCharacterImages();

  // Testando a função getImagesByState para o estado 'muitofeliz'
  const muitofelizImages = characterImagesAPI.getImagesByState('muitofeliz');

  // Testando a função getImageByCharacterAndState para o personagem 1 e estado 'muitofeliz'
  const arkanaMuitofelizImage = characterImagesAPI.getImageByCharacterAndState(1, 'muitofeliz');

  return (
    <ScrollView>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela Inicial</Text>

      {/* Testando getAllCharacterImages */}
      <Text>Testando getAllCharacterImages:</Text>
      {characterIds.map((id) => (
        <Image
          key={`allImages-${id}`}
          source={allImages[id]['muitofeliz']}
          style={{ width: 50, height: 50, margin: 5 }}
        />
      ))}

      {/* Testando getImagesByState */}
      <Text>Testando getImagesByState para 'muitofeliz':</Text>
      {muitofelizImages.map((image, index) => (
        <Image
          key={`muitofeliz-${index}`}
          source={image}
          style={{ width: 50, height: 50, margin: 5 }}
        />
      ))}

      {/* Testando getImageByCharacterAndState */}
      <Text>Testando getImageByCharacterAndState para personagem 1 e estado 'muitofeliz':</Text>
      <Image
        source={arkanaMuitofelizImage}
        style={{ width: 100, height: 100, margin: 10 }}
      />
    </View>
    </ScrollView>
  );
}
