import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useMagArtAlea } from "@/hooks/all/magasin-article";
import Magasin from "@/components/magasins";
import Articles from "@/components/articles";

export default function UserHome() {
  const { data, isLoading, error } = useMagArtAlea();
  const magasins = data?.data || [];

  // Loader simple
  const Loader = () => (
    <ScrollView style={styles.container}>
      <View style={styles.sectionTitle} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <View key={idx} style={styles.articleCard}>
            <View style={[styles.articleImage, styles.placeholder]} />
            <View style={[styles.articleName, styles.placeholder]} />
            <View style={[styles.articlePrice, styles.placeholder]} />
            <View style={styles.userRow}>
              <View style={[styles.userImage, styles.placeholderSmall]} />
              <View style={[styles.storeLogo, styles.placeholderSmall]} />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.sectionTitle, { marginTop: 20 }]} />
      {Array.from({ length: 3 }).map((_, idx) => (
        <View key={idx} style={styles.storeCard}>
          <View style={[styles.storeImage, styles.placeholder]} />
          <View style={[styles.storeName, styles.placeholder]} />
          <View style={styles.userRow}>
            <View style={[styles.userImage, styles.placeholderSmall]} />
          </View>
        </View>
      ))}
    </ScrollView>
  );

  if (isLoading) return <Loader />;
  if (error) return <Text style={styles.error}>Erreur de chargement</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitleText}>
        Les articles les plus proches de toi
      </Text>
      <Articles magasins={magasins} />
      <Text style={styles.sectionTitleText}>
        Les magasins les plus proches de toi
      </Text>
      <Magasin magasins={magasins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    width: 180,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  sectionTitleText: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
  articleCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    width: 160,
  },
  articleImage: { width: 120, height: 120, borderRadius: 8 },
  articleName: { width: 100, height: 14, marginTop: 5, borderRadius: 4 },
  articlePrice: { width: 60, height: 12, marginTop: 3, borderRadius: 4 },
  userRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  userImage: { width: 25, height: 25, borderRadius: 20, marginRight: 6 },
  storeLogo: { width: 25, height: 25, borderRadius: 5 },
  storeCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  storeImage: { width: 100, height: 100, marginBottom: 8, borderRadius: 10 },
  storeName: { width: 120, height: 18, borderRadius: 6, marginBottom: 6 },
  placeholder: { backgroundColor: "#ddd" },
  placeholderSmall: { backgroundColor: "#ccc" },
  error: { color: "red", marginTop: 50, textAlign: "center" },
});
