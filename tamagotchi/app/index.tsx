import React, { useState, useCallback } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import characterImagesAPI, { CharacterId } from '@/assets/characters/images';
import { usePetsDatabase, Pet } from '@/db/usePetsDatabase';
import { calculateAttributeDecay } from '@/services/calculateAttributeDecay'; 
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function IndexScreen() {
    const [pets, setPets] = useState<Pet[]>([]);
    const { findAll } = usePetsDatabase();
    const router = useRouter();

    const loadPets = async () => {
        try {
            const petsFromDB = await findAll(); 
            const updatedPets = petsFromDB.map(pet => {
                const { fome, sono, diversao } = calculateAttributeDecay(pet.lastUpdated); 
                return {
                    ...pet,
                    fome,
                    sono,
                    diversao,
                };
            });
            setPets(updatedPets);
        } catch (error) {
            console.log('Erro ao carregar pets:', error);
        }
    };

    // Use o useFocusEffect para garantir que os pets sejam recarregados quando a tela voltar ao foco
    useFocusEffect(
        useCallback(() => {
            loadPets();
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {pets.map((pet) => (
                    <Pressable 
                        key={pet.id} 
                        style={styles.card}
                        onPress={() => router.push({ pathname: '/(tabs)/alimentar', params: { id: pet.id } })}
                    >
                        <Text style={styles.characterName}>{pet.nome}</Text>
                        {pet.character_id && (
                            <Image
                                source={characterImagesAPI.getImageByCharacterAndState(pet.character_id as CharacterId, 'muitofeliz')}
                                style={styles.characterImage}
                                resizeMode="contain"
                            />
                        )}
                        
                        <View style={styles.statusContainer}>
                            <View style={styles.statusItem}>
                                <MaterialIcons name="fastfood" size={24} color="#ff6347" />
                                <Text style={styles.statusText}>{pet.fome}</Text>
                            </View>
                            <View style={styles.statusItem}>
                                <Ionicons name="happy" size={24} color="#ffd700" />
                                <Text style={styles.statusText}>{pet.diversao}</Text>
                            </View>
                            <View style={styles.statusItem}>
                                <Ionicons name="bed" size={24} color="#4682b4" />
                                <Text style={styles.statusText}>{pet.sono}</Text>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>

            <Pressable style={styles.addButton} onPress={() => router.push('/createPet')}>
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>

            <Pressable style={styles.gamesButton} onPress={() => router.push('/GamesScreen')}>
                <Ionicons name="game-controller" size={30} color="#FFF" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F0F8FF',
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 14,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
    },
    characterImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 10,
    },
    characterName: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 10,
    },
    statusItem: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    statusText: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
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
        zIndex: 10,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 30,
    },
    gamesButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#008CBA',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});
