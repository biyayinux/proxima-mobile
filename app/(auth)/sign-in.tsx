import { useSignInWithGoogle } from "@/hooks/auth/sign-in";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const { onSignInWithGoogle, loading } = useSignInWithGoogle();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proxima</Text>
      <Text style={styles.subtitle}>
        Localiser le magasin le plus proche {"\n"}et reconnaître les articles à partir d’images
      </Text>
      <View style={styles.imagesRow}>
        <Image source={require("@/assets/images/polo.png")} style={styles.image} />
        <Image source={require("@/assets/images/polo.png")} style={styles.image} />
        <Image source={require("@/assets/images/polo.png")} style={styles.image} />
      </View>
      <TouchableOpacity
        style={[styles.googleButton, loading && { opacity: 0.6 }]}
        onPress={onSignInWithGoogle}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <>
            <Image source={require("@/assets/images/google-icon.png")} style={styles.googleLogo} />
            <Text style={styles.googleText}>Se connecter avec Google</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
        <Text style={styles.footer}>
          Si vous n’avez pas de compte, inscrivez-vous
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { textAlign: "center", fontSize: 16, marginBottom: 30 },
  imagesRow: { flexDirection: "row", marginBottom: 40 },
  image: { width: 60, height: 60, marginHorizontal: 8, borderRadius: 8 },
  googleButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#f2f2f2", padding: 12, borderRadius: 10, marginBottom: 20 },
  googleLogo: { width: 22, height: 22, marginRight: 10 },
  googleText: { fontWeight: "600" },
  footer: { color: "#2b93d1", fontSize: 14 },
});
