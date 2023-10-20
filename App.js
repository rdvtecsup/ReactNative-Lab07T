import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Modal,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";
import axios from "axios";

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const isModalVisible = !!selectedPokemon;

  useEffect(() => {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=15";
    axios
      .get(apiUrl)
      .then((response) => {
        setPokemonData(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openModal = (pokemonName) => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSelectedPokemon(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={styles.header}>Lista de Pokémon</Text>
      <FlatList
        data={pokemonData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.pokemonCard}>
            <View style={styles.pokemonCardContent}>
              <View style={styles.pokemonItem}>
                <View style={styles.leftColumn}>
                  <Text style={styles.pokemonName}>{item.name}</Text>
                </View>
                <View style={styles.rightColumn}>
                  <Button
                    title="Ver detalles"
                    onPress={() => openModal(item.name)}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        {selectedPokemon && (
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedPokemon.sprites.front_default }}
              style={styles.pokemonImage}
            />
            <Text style={styles.pokemonName}>{selectedPokemon.name}</Text>
            <Text style={styles.pokemonType}>
              Type: {selectedPokemon.types[0].type.name}
            </Text>
            <Text style={styles.pokemonHeight}>
              Height: {selectedPokemon.height} decimetres
            </Text>
            <Text style={styles.pokemonWeight}>
              Weight: {selectedPokemon.weight} hectograms
            </Text>
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  pokemonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  pokemonName: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 8,
    textTransform: "uppercase",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {},
  pokemonType: {
    fontSize: 18,
    marginVertical: 4,
  },
  pokemonHeight: {
    fontSize: 18,
    marginVertical: 4,
  },
  pokemonWeight: {
    fontSize: 18,
    marginVertical: 4,
  },
  pokemonCard: {
    backgroundColor: "white",
    margin: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokemonCardContent: {
    padding: 16,
  },
});
