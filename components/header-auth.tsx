import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface HeaderAuthProps {
  title?: string;
  subtitle?: string;
  imageSource?: any;
}

export default function HeaderAuth({
  subtitle = "Localiser le magasin le plus proche \net reconnaître les articles à partir d’images",
  imageSource,
}: HeaderAuthProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo-proxima.png")}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>{subtitle}</Text>
      {imageSource && <Image source={imageSource} style={styles.largeImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 15,
    resizeMode: "contain",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  largeImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
});
