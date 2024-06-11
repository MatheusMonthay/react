import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from 'axios';

const BookScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://www.abibliadigital.com.br/api/books");
        const { data } = response;
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const handleChapterPress = (bookAbbrev) => {
    navigation.navigate("Chapter", {
      bookAbbrev,
      chapterNumber: 1,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.abbrev.pt}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleChapterPress(item.abbrev.pt)}
            style={styles.item}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});


export default BookScreen;
