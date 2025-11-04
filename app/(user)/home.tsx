import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useMagArtAlea } from "@/hooks/all/magasin-article";
import Magasin from "@/components/magasins";
import Articles from "@/components/articles";

export default function UserHome() {
  const { data, isLoading, error } = useMagArtAlea();

  if (isLoading) return <Text style={styles.loading}>Chargement...</Text>;
  if (error) return <Text style={styles.error}>Erreur de chargement</Text>;

  const magasins = data?.data || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>
        Les articles les plus proches de toi
      </Text>
      <Articles magasins={magasins} />
      <Text style={styles.sectionTitle}>
        Les magasins les plus proches de toi
      </Text>
      <Magasin magasins={magasins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
  loading: { marginTop: 50, textAlign: "center" },
  error: { color: "red", marginTop: 50, textAlign: "center" },
});
