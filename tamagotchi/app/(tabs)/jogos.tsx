import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CardImagensButton } from '@/assets/CardButtonImages/CardImagens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '75%',
    alignItems: 'center',
    flexDirection: 'row', // Para alinhar ícone e texto lado a lado
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 13, // Espaçamento entre o ícone e o texto
  },
  icon: {
    width: 39,
    height: 55,
  },
});

export default function JogosScreen() {
  const router = useRouter();

  // Função para navegar para o jogo 1
  const handleSelectJogo1 = () => {
    router.push('/jogo1'); // Navega para a tela de Jogo 1
  };

  // Função para navegar para o jogo 2
  const handleSelectJogo2 = () => {
    router.push('/jogo2'); // Navega para a tela de Jogo 2
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Selecione um Jogo</Text>

      {/* Botão para o Jogo 1 */}
      <TouchableOpacity style={styles.button} onPress={handleSelectJogo1}>
        {/* Ícone para o Jogo 1 */}
        <Image source={CardImagensButton.DragaoBranco} style={styles.icon} />
        <Text style={styles.buttonText}>Jogo 1</Text>
      </TouchableOpacity>

      {/* Botão para o Jogo 2 */}
      <TouchableOpacity style={styles.button} onPress={handleSelectJogo2}>
        {/* Ícone para o Jogo 2 */}
        <Image source={CardImagensButton.MagoNegroCard} style={styles.icon} />
        <Text style={styles.buttonText}>Jogo 2</Text>
      </TouchableOpacity>
    </View>
  );
}
