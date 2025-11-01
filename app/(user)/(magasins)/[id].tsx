import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MagasinDetail() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          source={require("@/assets/images/polo.png")}
          style={styles.mapImage}
          resizeMode="contain"
        />
        <View style={styles.storeInfo}>
          <Image source={require("@/assets/images/polo.png")} style={styles.storeImage} />
          <Text>Magasin 1</Text>
          <Text>26 articles</Text>
        </View>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  mapImage: { width: "100%", height: 150, marginVertical: 20 },
  storeInfo: { alignItems: "center", marginBottom: 20 },
  storeImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 5 },
  articleRow: { flexDirection: "row", justifyContent: "space-between" },
  articleCard: {
    width: "45%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  articleImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 5 },
});
