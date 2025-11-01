import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MagasinsIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.stats}>12 Magasins{"\n"}360 Articles</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/(user)/add-magasin")}
        >
          <Text style={styles.createText}>Créer un magasin</Text>
        </TouchableOpacity>
        <View style={styles.storeCard}>
          <Text style={styles.storeTitle}>Magasin 1</Text>
          <Image source={require("@/assets/images/polo.png")} style={styles.storeImage} />
          <View style={styles.storeFooter}>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => router.push("/(user)/(magasins)/1")}
            >
              <Text>Voir +</Text>
            </TouchableOpacity>
            <Text>26 articles</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  stats: { fontSize: 16, marginVertical: 10 },
  createButton: {
    alignSelf: "flex-end",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 15,
  },
  createText: { fontWeight: "500" },
  storeCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  storeTitle: { fontWeight: "bold", marginBottom: 8 },
  storeImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  storeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#e6e6e6",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
