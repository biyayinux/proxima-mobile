import { useMagasinUser } from "@/hooks/magasins/id-magasin-user";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const base64ToUri = (b64?: string | null) => (b64 ? `data:image/jpeg;base64,${b64}` : null);

export default function MagasinDetail() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useMagasinUser(id as string);

  if (isLoading || error)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        {error && <Text>Erreur de chargement du magasin</Text>}
      </View>
    );

  const magasin = data?.magasin;
  const articles = data?.articles || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: magasin?.latitude || 0,
          longitude: magasin?.longitude || 0,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {magasin && (
          <Marker
            coordinate={{
              latitude: magasin.latitude,
              longitude: magasin.longitude,
            }}
            title={magasin.nom}
          />
        )}
      </MapView>
      <View style={styles.storeInfo}>
        <Image
          source={
            base64ToUri(magasin?.logo)
              ? { uri: base64ToUri(magasin.logo)! }
              : require("@/assets/images/polo.png")
          }
          style={styles.storeImage}
        />
        <Text style={styles.storeName}>{magasin?.nom}</Text>
        <Text style={styles.articleCount}>{articles.length} articles</Text>
      </View>
      {articles.length > 0 ? (
        <View style={styles.articlesRow}>
          {articles.map((a: any) => (
            <View key={a.id} style={styles.articleCard}>
              <Image
                source={
                  base64ToUri(a.image?.[0])
                    ? { uri: base64ToUri(a.image[0])! }
                    : require("@/assets/images/polo.png")
                }
                style={styles.articleImage}
              />
              <Text style={styles.articleTitle}>{a.nom}</Text>
              <Text style={styles.articlePrice}>
                {a.prix} {a.devise}
              </Text>
              <Text style={styles.articleDate}>{a.dt}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noArticles}>
          <Image
            source={require("@/assets/images/polo.png")}
            style={styles.noArticlesImage}
            resizeMode="contain"
          />
          <Text style={styles.noArticlesText}>Aucun article disponible</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  map: { height: 180, margin: 20, borderRadius: 10 },
  storeInfo: { alignItems: "center", marginBottom: 20 },
  storeImage: { width: 80, height: 80, borderRadius: 10, marginBottom: 5 },
  storeName: { fontSize: 16, fontWeight: "600" },
  articleCount: { fontSize: 14, color: "#555" },
  articlesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  articleCard: {
    width: "47%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  articleImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 5 },
  articleTitle: { fontWeight: "500", textAlign: "center" },
  articlePrice: { color: "#333" },
  articleDate: { fontSize: 12, color: "#888" },
  noArticles: { alignItems: "center", marginTop: 40 },
  noArticlesImage: { width: 140, height: 140, opacity: 0.7, marginBottom: 8 },
  noArticlesText: { fontSize: 14, color: "#777" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
