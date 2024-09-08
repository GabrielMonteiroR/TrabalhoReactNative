import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    width: '90%',
    marginBottom: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonDescription: {
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonImage1: {
    width: 180,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1E90FF',
    marginBottom: 10,
  },
  buttonImage2: {
    width: 100,
    height: 130,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1E90FF',
    marginBottom: 10,
  },
});

export default function JogosScreen() {
  const router = useRouter();

  const handleSelectJogo1 = () => {
    router.push('/JogoDaMemoria');
  };

  const handleSelectJogo2 = () => {
    router.push('/CriacaodeCartas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um Jogo</Text>

      <View style={styles.buttonContainer}>
        <Image
          source={{ uri: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2022/02/17/intro-1576000152.jpg' }}
          style={styles.buttonImage1}
        />
        <Text style={styles.buttonDescription}>Jogo da Memória</Text>
        <TouchableOpacity style={styles.button} onPress={handleSelectJogo1}>
          <Text style={styles.buttonText}>Selecionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/ea/df/ea/eadfea63ba18cd263e295d9fc5c38634.jpg' }}
          style={styles.buttonImage2}
        />
        <Text style={styles.buttonDescription}>Criação de Cartas</Text>
        <TouchableOpacity style={styles.button} onPress={handleSelectJogo2}>
          <Text style={styles.buttonText}>Selecionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
