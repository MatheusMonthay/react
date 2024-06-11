import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from 'axios';

const ChapterScreen = ({ route, navigation }) => {
  const { bookAbbrev, chapterNumber } = route.params;
  const [verses, setVerses] = useState([]);
  const [bookName, setBookName] = useState("");

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const response = await axios.get(`https://www.abibliadigital.com.br/api/verses/nvi/${bookAbbrev}/${chapterNumber}`);
        const { data } = response;
        setVerses(data.verses);
      } catch (error) {
        console.error('Error fetching verses:', error);
        setVerses([]);
      }
    };

    const fetchBookName = async () => {
      try {
        const response = await axios.get(`https://www.abibliadigital.com.br/api/books/${bookAbbrev}`);
        const { data } = response;
        setBookName(data.name);
      } catch (error) {
        console.error('Error fetching book name:', error);
        setBookName("");
      }
    };

    fetchVerses();
    fetchBookName();
  }, [bookAbbrev, chapterNumber]);

  const handlePreviousChapter = () => {
    const previousChapter = chapterNumber - 1;
    navigation.push("Chapter", { bookAbbrev, chapterNumber: previousChapter });
  };

  const handleNextChapter = () => {
    const nextChapter = chapterNumber + 1;
    navigation.push("Chapter", { bookAbbrev, chapterNumber: nextChapter });
  };

  const handleGoBack = () => {
    navigation.navigate("Books");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Versículos - {bookName} Capítulo {chapterNumber}</Text>
      <FlatList
        data={verses}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <View style={styles.verseItem}>
            <Text style={styles.verseNumber}>{item.number}</Text>
            <Text style={styles.verseText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.navigationButtons}>
        {chapterNumber > 1 && (
          <TouchableOpacity onPress={handlePreviousChapter} style={styles.button}>
            <Text style={styles.buttonText}>Capítulo Anterior</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleNextChapter} style={styles.button}>
          <Text style={styles.buttonText}>Próximo Capítulo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoBack} style={styles.button}>
          <Text style={styles.buttonText}>Voltar para Livros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  verseItem: {
    marginBottom: 10,
  },
  verseNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  verseText: {
    fontSize: 16,
    color: "#000",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    minWidth: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default ChapterScreen;
