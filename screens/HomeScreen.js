import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const handleNavigateToBooks = () => {
    navigation.navigate("Books");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo a BibliaApp!</Text>
      <Text style={styles.message}>Escolha um livro pra iniciar seu devocional.</Text>
      <Button
        title="Ver Livros"
        onPress={handleNavigateToBooks}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});


export default HomeScreen;
