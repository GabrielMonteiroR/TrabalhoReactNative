import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { usePetsDatabase } from '@/db/usePetsDatabase';
import cardImages from '../assets/cardsGame/cards_game';
import { getRandomOptions, cardNames, quizQuestions } from '@/services/cardService';

export default function Quiz() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { findById, updateDiversao } = usePetsDatabase();
  const [pet, setPet] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const totalScore = 20;

  const [options, setOptions] = useState<number[]>(getRandomOptions(quizQuestions[0].id));

  const loadPet = async () => {
    if (id) {
      const petData = await findById(Number(id));
      setPet(petData);
    }
  };

  useEffect(() => {
    loadPet();
  }, [id]);

  const handleAnswer = async (id: number) => {
    const currentQuestionId = quizQuestions[currentQuestion].id;

    if (id === currentQuestionId) {
      if (pet) {
        setScore(score + 1);
      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setOptions(getRandomOptions(quizQuestions[nextQuestion].id));
    } else {
      await updateDiversao(pet.id, Math.min(100, pet.diversao + 30));
      setIsQuizFinished(true);
    }
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando pet...</Text>
      </View>
    );
  }

  if (isQuizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>
          Sua Pontuação: {score} / {totalScore}
        </Text>

        <Text style={styles.resultText}>Fim do quiz!</Text>
        <Text style={styles.bonusText}>+30 de diversão</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual é essa carta?</Text>
      <Image source={cardImages.getCardImage(quizQuestions[currentQuestion].imageId)} style={styles.cardImage} />

      <View style={styles.buttonsContainer}>
        {options.map((id) => (
          <TouchableOpacity key={id} style={styles.redButton} onPress={() => handleAnswer(id)}>
            <Text style={styles.buttonText}>{cardNames[id]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e2f',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
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
  redButton: {
    backgroundColor: '#ED2124',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  resultText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#FFD700',
  },
  scoreText: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  text: {
    color: '#FFF',
  },
  bonusText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#00FF00', // Um verde chamativo
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
    marginBottom: 50,
  },
});
