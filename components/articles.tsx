// components/Articles.tsx
import { formatNumber } from "@/utils/format-number";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Articles({ magasins }: { magasins: any[] }) {
  const base64ToUri = (b64?: string | null) =>
    b64 ? `data:image/jpeg;base64,${b64}` : null;

  return (
    <View>
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
                        uri: base64ToUri(art.magasin_logo) ?? art.magasin_logo,
                      }}
                      style={styles.storeLogo}
                    />
                  ) : (
                    <View style={[styles.storeLogo, styles.placeholderSmall]} />
                  )}
                </View>
              </View>
            );
          }),
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
  horizontalScroll: { marginTop: 10 },
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
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  userImage: { width: 25, height: 25, borderRadius: 20, marginRight: 6 },
  storeLogo: { width: 25, height: 25, borderRadius: 5 },
});
