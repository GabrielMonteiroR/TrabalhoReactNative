import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, StyleSheet, Text, ScrollView } from 'react-native';
import CardImages from '@/assets/cardsGame/cards_game';
import { ImageSourcePropType } from 'react-native';
import { usePetsDatabase, Pet } from '@/db/usePetsDatabase'; // Importando o hook
import { calculateStatus } from '@/services/calculateStatus';
import { useLocalSearchParams } from 'expo-router';

interface Card {
  id: string;
  name: string;
  img: ImageSourcePropType;
  flipped: boolean;
  matched: boolean;
}

const generateInitialCards = () => {
  const ids = Array.from({ length: 9 }, (_, i) => i + 2);
  const cards = ids.flatMap((id) => [
    { id: `${id}-1`, name: `Card ${id}`, img: CardImages.getCardImage(id), flipped: false, matched: false },
    { id: `${id}-2`, name: `Card ${id}`, img: CardImages.getCardImage(id), flipped: false, matched: false },
  ]);
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const { id } = useLocalSearchParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [score, setScore] = useState(0);
  const [pet, setPet] = useState<Pet | null>(null); 

  const { updateDiversao, findById } = usePetsDatabase(); 

  useEffect(() => {
    setCards(generateInitialCards());
  }, []);

  useEffect(() => {

    const loadPet = async () => {
      try {
        const petId = Number(id);
        const petFromDB = await findById(petId);
        setPet(petFromDB);
      } catch (error) {
        console.log('Erro ao carregar pet:', error);
      }
    };
    loadPet();
  }, [findById, id]);

  useEffect(() => {
    const alterarDiversao = async () => {
      if (pet) {
        let aumentoDiversao = 0;
        if (score >= 501) {
          aumentoDiversao = 30;
        } else if (score <= 500) {
          aumentoDiversao = 15;
        }

        if (aumentoDiversao > 0) {
          const novoStatusDiversao = Math.min(100, pet.diversao + aumentoDiversao);
          try {
            await updateDiversao(pet.id, novoStatusDiversao);
            const novoStatus = calculateStatus(novoStatusDiversao + pet.sono + pet.fome);

            setPet((prevPet) =>
              prevPet
                ? { ...prevPet, diversao: novoStatusDiversao, status: novoStatusDiversao + pet.sono + pet.fome }
                : prevPet
            );
          } catch (error) {
            console.log('Erro ao atualizar diversao:', error);
          }
        }
      }
    };

    alterarDiversao();
  }, [score, pet, updateDiversao]);

  const handleCardPress = (card: Card) => {
    if (card.flipped || selectedCards.length === 2 || selectedCards.includes(card)) return;

    const newCards = cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c));
    setCards(newCards);
    setSelectedCards([...selectedCards, card]);

    if (selectedCards.length === 1) {
      const [firstCard] = selectedCards;

      if (firstCard.name === card.name) {
        setMatches(matches + 1);
        setScore(score + 100);
        setSelectedCards([]);
        setCards(newCards.map((c) => (c.id === card.id ? { ...c, matched: true } : c)));
      } else {
        setTimeout(() => {
          setCards(newCards.map((c) => (c.id === card.id || c.id === firstCard.id ? { ...c, flipped: false } : c)));
          setSelectedCards([]);
          setScore((prevScore) => Math.max(prevScore - 10, 0)); 
        }, 1500);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <ScrollView contentContainerStyle={styles.board}>
        {cards.map((card) => (
          <Pressable key={card.id} onPress={() => handleCardPress(card)} style={styles.card}>
            {card.flipped || card.matched ? (
              <Image source={card.img} style={styles.cardImage} />
            ) : (
              <Image source={require('@/assets/cardsGame/cardParaBaixo/CardParaBaixo.jpg')} style={styles.cardImage} />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: 100,
    height: 150,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
});

export default MemoryGame;
