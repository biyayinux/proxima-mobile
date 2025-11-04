import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type MagasinProps = {
  magasins: any[];
};

const base64ToUri = (b64?: string | null) =>
  b64 ? `data:image/jpeg;base64,${b64}` : null;

export default function Magasin({ magasins }: MagasinProps) {
  return (
    <>
      {magasins.map((mag: any) => (
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
          <View style={styles.userRow}>
            {mag.user_image ? (
              <Image
                source={{ uri: mag.user_image }}
                style={styles.userImage}
              />
            ) : (
              <View style={[styles.userImage, styles.placeholderSmall]} />
            )}
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  storeCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  storeImage: { width: 100, height: 100, marginBottom: 8, borderRadius: 10 },
  storeName: { fontWeight: "bold", fontSize: 16 },
  userRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  userImage: { width: 25, height: 25, borderRadius: 20, marginRight: 6 },
  placeholder: { backgroundColor: "#ddd" },
  placeholderSmall: { backgroundColor: "#ccc" },
});
