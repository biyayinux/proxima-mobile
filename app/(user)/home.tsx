import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function UserHome() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Nos articles</Text>
      <View style={styles.articleRow}>
        <View style={styles.articleCard}>
          <Image source={require("@/assets/images/polo.png")} style={styles.articleImage} />
          <Text>Article 1</Text>
          <Text>500 CDF</Text>
        </View>
        <View style={styles.articleCard}>
          <Image source={require("@/assets/images/polo.png")} style={styles.articleImage} />
          <Text>Article 2</Text>
          <Text>10 USD</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Les magasins les plus proches de toi</Text>
      <View style={styles.storeCard}>
        <Image source={require("@/assets/images/polo.png")} style={styles.storeImage} />
        <Text>Magasin 1</Text>
        <Text>26 articles</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
  articleRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  articleCard: {
    width: "45%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  articleImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 5 },
  storeCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  storeImage: { width: 100, height: 100, marginBottom: 8 },
});
