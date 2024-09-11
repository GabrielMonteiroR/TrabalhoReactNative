import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Certifique-se de que este hook é do react-navigation
import cardImages from '../assets/cardsGame/cards_game'; // Ajuste o caminho correto

const cardNames = {
  1: 'Pequena Maga Negra',
  2: 'Dragão Alado de Ra',
  3: 'Dragão Branco de Olhos Azuis',
  4: 'Dragão Negro de Olhos Vermelhos',
  5: 'Exodia',
  6: 'Pescador Lendário',
  7: 'Gandora',
  8: 'Mago Negro',
  9: 'Obelisco, o Atormentador',
  10: 'Mago do Tempo',
  11: 'Guerreiro da Espada de Chama Dourada',
  12: 'Supremo Dragão Branco de Olhos Azuis',
  13: 'Jinzo',
  14: 'Soldado do Lustro Negro',
  15: 'Slifer, o Dragão do Céu',
};

const getRandomOptions = (correctId) => {
  const allIds = Object.keys(cardNames).map(Number);
  const shuffled = allIds.filter((id) => id !== correctId).sort(() => 0.5 - Math.random());
  const randomOptions = shuffled.slice(0, 3); // Seleciona 3 opções aleatórias
  randomOptions.push(correctId); // Adiciona a opção correta
  return randomOptions.sort(() => 0.5 - Math.random()); // Embaralha as opções
};

const Quiz = () => {
  const navigation = useNavigation(); // Use o hook de navegação aqui
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]); // Adicionado para armazenar respostas corretas

  const quizQuestions = [
    { id: 1, imageId: 1 },
    { id: 2, imageId: 2 },
    { id: 3, imageId: 3 },
    { id: 4, imageId: 4 },
    { id: 5, imageId: 5 },
    { id: 6, imageId: 6 },
    { id: 7, imageId: 7 },
    { id: 8, imageId: 8 },
    { id: 9, imageId: 9 },
    { id: 10, imageId: 10 },
    { id: 11, imageId: 11 },
    { id: 12, imageId: 12 },
    { id: 13, imageId: 13 },
    { id: 14, imageId: 14 },
    { id: 15, imageId: 15 },
  ];

  const [options, setOptions] = useState(getRandomOptions(quizQuestions[0].id));

  const handleAnswer = (id) => {
    const currentQuestionId = quizQuestions[currentQuestion].id;
    const currentImageId = quizQuestions[currentQuestion].imageId;

    const clickedAnswer = cardNames[id];
    const correctAnswer = cardNames[currentQuestionId];

    if (id === currentQuestionId) {
      setScore(score + 1);
      setCorrectAnswers((prevCorrectAnswers) => [
        ...prevCorrectAnswers,
        {
          id: currentQuestionId,
          answer: correctAnswer,
        },
      ]);
    } else {
      setWrongAnswers((prevWrongAnswers) => [
        ...prevWrongAnswers,
        {
          clickedId: id,
          correctId: currentQuestionId,
          imageId: currentImageId,
          clickedAnswer, // Resposta clicada
          correctAnswer, // Resposta correta
        },
      ]);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setOptions(getRandomOptions(quizQuestions[nextQuestion].id));
    } else {
      setIsQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsQuizFinished(false);
    setWrongAnswers([]); // Limpar respostas erradas ao reiniciar
    setCorrectAnswers([]); // Limpar respostas corretas ao reiniciar
    setOptions(getRandomOptions(quizQuestions[0].id));
  };

  if (isQuizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>
          Seu score: {score}/{quizQuestions.length}
        </Text>
        <TouchableOpacity style={styles.button} onPress={restartQuiz}>
          <Text style={styles.buttonText}>Reiniciar Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('RespostasQuiz', {
              score,
              totalQuestions: quizQuestions.length,
              wrongAnswers,
              correctAnswers, // Enviar respostas corretas para a tela de resultados
            })
          }
        >
          <Text style={styles.buttonText}>Ver Resultados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GamesScreen')}>
          <Text style={styles.buttonText}>Voltar a tela de Seleção de Jogos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual é essa carta?</Text>
      <Image source={cardImages.getCardImage(quizQuestions[currentQuestion].imageId)} style={styles.cardImage} />

      <View style={styles.buttonsContainer}>
        {options.map((id) => (
          <TouchableOpacity key={id} style={styles.button} onPress={() => handleAnswer(id)}>
            <Text style={styles.buttonText}>{cardNames[id]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.questionText}>
        Pergunta {currentQuestion + 1} de {quizQuestions.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardImage: {
    width: 200,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  buttonsContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  questionText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
});

export default Quiz;
