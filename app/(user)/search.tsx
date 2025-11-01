import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const articles = [
    { id: 1, name: "Polo bleu", price: "500 CDF", image: require("@/assets/images/polo.png") },
    { id: 2, name: "Chemise blanche", price: "10 USD", image: require("@/assets/images/polo.png") },
    { id: 3, name: "Casquette rouge", price: "8 USD", image: require("@/assets/images/polo.png") },
    { id: 4, name: "Pantalon noir", price: "15 USD", image: require("@/assets/images/polo.png") },
  ];

  // Filtrage en fonction de la recherche
  const filteredArticles = articles.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Recherche d’articles</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un article..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.articleRow}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <View key={article.id} style={styles.articleCard}>
              <Image source={article.image} style={styles.articleImage} />
              <Text style={styles.articleName}>{article.name}</Text>
              <Text style={styles.articlePrice}>{article.price}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResults}>Aucun article trouvé</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20, marginBottom: 10 },
  searchInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  articleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
  },
  articleCard: {
    width: "47%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  articleImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 5 },
  articleName: { fontWeight: "600" },
  articlePrice: { color: "#555" },
  noResults: { textAlign: "center", marginTop: 30, fontStyle: "italic", color: "#888" },
});
