import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import cardImages from '../assets/cardsGame/cards_game'; // Ajuste o caminho correto

const RespostasQuiz = () => {
  const route = useRoute(); // Use o hook para obter os parâmetros
  const navigation = useNavigation();
  const { wrongAnswers = [], correctAnswers = [], totalQuestions = 0, score = 0 } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        Seu score: {score}/{totalQuestions}
      </Text>

      <ScrollView>
        <Text style={styles.sectionTitle}>Respostas Erradas</Text>
        {wrongAnswers.map((item, index) => (
          <View key={index} style={styles.answerContainer}>
            <Image source={cardImages.getCardImage(item.imageId)} style={styles.cardImage} />
            <View style={styles.textContainer}>
              <Icon
                name={item.clickedId === item.correctId ? 'check-circle' : 'cancel'}
                size={24}
                color={item.clickedId === item.correctId ? '#4CAF50' : '#f44336'}
                style={styles.icon}
              />
              <View style={styles.textBlock}>
                <Text style={styles.text}>
                  Resposta clicada:
                </Text>
                <Text style={styles.wrongAnswer}>
                  {item.clickedAnswer}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Icon
                name='check-circle'
                size={24}
                color='#4CAF50'
                style={styles.icon}
              />
              <View style={styles.textBlock}>
                <Text style={styles.text}>
                  Resposta correta:
                </Text>
                <Text style={styles.correctAnswer}>
                  {item.correctAnswer}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Respostas Corretas</Text>
        {correctAnswers.map((item) => (
          <View key={item.id} style={styles.answerContainer}>
            <Image source={cardImages.getCardImage(item.id)} style={styles.cardImage} />
            <View style={styles.textContainer}>
              <Icon
                name='check-circle'
                size={24}
                color='#4CAF50'
                style={styles.icon}
              />
              <View style={styles.textBlock}>
                <Text style={styles.text}>
                  Resposta correta:
                </Text>
                <Text style={styles.correctAnswer}>
                  {item.answer}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('QuizCarta')}
      >
        <Text style={styles.buttonText}>Voltar ao Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  answerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cardImage: {
    width: 150,
    height: 250,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  textBlock: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  text: {
    fontSize: 12.5,
  },
  wrongAnswer: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  correctAnswer: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RespostasQuiz;
