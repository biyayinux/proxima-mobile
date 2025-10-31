import { useRouter } from "expo-router";
import { LogIn } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proxima</Text>
      <Text style={styles.subtitle}>
        Localiser le magasin le plus proche {"\n"}et reconnaître les articles à
        partir d’images
      </Text>

      <View style={styles.imagesRow}>
        <Image source={require("@/assets/images/polo.png")} style={styles.image} />
        <Image source={require("@/assets/images/polo.png")} style={styles.image} />
        <Image source={require("@/assets/images/polo.png")} style={styles.image} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => router.push("/(user)")}
      >
        <LogIn color="black" size={20} />
        <Text style={styles.googleText}>Se connecter avec Google</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Si vous n’avez pas de compte, inscrivez-vous
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { textAlign: "center", fontSize: 16, marginBottom: 30 },
  imagesRow: { flexDirection: "row", marginBottom: 40 },
  image: { width: 60, height: 60, marginHorizontal: 8, borderRadius: 8 },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  googleText: { marginLeft: 10, fontWeight: "600" },
  footer: { color: "#4a90e2", fontSize: 12 },
});
