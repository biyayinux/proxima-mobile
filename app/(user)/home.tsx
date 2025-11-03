import { useMagArtAlea } from "@/hooks/magasin-article-alea";
import { formatNumber } from "@/utils/format-number";
import { MapPin } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function UserHome() {
  const { data, isLoading, error } = useMagArtAlea();
  const base64ToUri = (b64?: string | null) => b64 ? `data:image/jpeg;base64,${b64}` : null;

  if (isLoading) return <Text style={styles.loading}>Chargement...</Text>;
  if (error) return <Text style={styles.error}>Erreur de chargement</Text>;

  const magasins = data?.data || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Nos articles</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {magasins.map((mag: any) =>
          (mag.articles || []).map((art: any) => {
            const imageUri =
              Array.isArray(art.image) && art.image.length > 0
                ? base64ToUri(art.image[0])
                : base64ToUri(art.magasin_logo) || null;
            return (
              <View style={styles.articleCard} key={`${mag.id}-${art.id}`}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.articleImage}
                  />
                ) : (
                  <View style={[styles.articleImage, styles.placeholder]} />
                )}
                <Text style={styles.articleName}>{art.nom ?? " "}</Text>
                <Text style={styles.articlePrice}>
                  {formatNumber(art.prix) ?? " "} {art.devise ?? " "}
                </Text>
                <View style={styles.userRow}>
                  {art.user_image ? (
                    <Image
                      source={{ uri: art.user_image }}
                      style={styles.userImage}
                    />
                  ) : (
                    <View style={[styles.userImage, styles.placeholderSmall]} />
                  )}
                  {art.magasin_logo ? (
                    <Image
                      source={{
                        uri:
                          base64ToUri(art.magasin_logo) ?? art.magasin_logo,
                      }}
                      style={styles.storeLogo}
                    />
                  ) : (
                    <View style={[styles.storeLogo, styles.placeholderSmall]} />
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
      <Text style={styles.sectionTitle}>Nos magasins</Text>
      {magasins.map((mag: any) => {
        const lon = parseFloat(mag.longitude);
        const lat = parseFloat(mag.latitude);
        const coords = !isNaN(lon) && !isNaN(lat) ? `(${lon.toFixed(3)}, ${lat.toFixed(3)})` : "Position inconnue";
        return (
          <View style={styles.storeCard} key={mag.id}>
            {mag.logo ? (
              <Image
                source={{ uri: base64ToUri(mag.logo) ?? mag.logo }}
                style={styles.storeImage}
              />
            ) : (
              <View style={[styles.storeImage, styles.placeholder]} />
            )}
            <Text style={styles.storeName}>{mag.nom ?? " "}</Text>
            <Text>{formatNumber(mag.total_articles) ?? 0}{" "}{mag.total_articles <= 1 ? "article" : "articles"}</Text>
            <View style={styles.userRow}>
              {mag.user_image ? (
                <Image
                  source={{ uri: mag.user_image }}
                  style={styles.userImage}
                />
              ) : (
                <View style={[styles.userImage, styles.placeholderSmall]} />
              )}
              <MapPin size={25} color="gray" />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
  loading: { marginTop: 50, textAlign: "center" },
  error: { color: "red", marginTop: 50, textAlign: "center" },
  horizontalScroll: {
    marginTop: 10,
  },
  articleCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    width: 160,
  },
  articleImage: { width: 120, height: 120, borderRadius: 8 },
  placeholder: { backgroundColor: "#ddd" },
  placeholderSmall: { backgroundColor: "#ccc" },

  articleName: { fontWeight: "600", marginTop: 5, textAlign: "center" },
  articlePrice: { color: "#555", textAlign: "center" },
  storeCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  storeImage: { width: 100, height: 100, marginBottom: 8, borderRadius: 10 },
  storeName: { fontWeight: "bold", fontSize: 16 },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  userImage: { width: 25, height: 25, borderRadius: 20, marginRight: 6 },
  storeLogo: { width: 25, height: 25, borderRadius: 5 },
  coordText: { marginLeft: 6, color: "#555" },
});
