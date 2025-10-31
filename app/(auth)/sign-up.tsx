import { isClerkAPIResponseError, useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  // Inscription via Google avec Clerk
  const onSignUpWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        console.log("Nouvelle session créée ", createdSessionId);
        await setActive!({ session: createdSessionId });
        router.replace("/(user)"); // Redirection après inscription réussie
      } else {
        console.log("Aucune session créée");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.log("Erreur Clerk ", error);
      } else {
        console.log("Erreur inattendue ", error);
      }
    }
  };

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
      <TouchableOpacity style={styles.googleButton} onPress={onSignUpWithGoogle}>
        <Image
          source={require("@/assets/images/google-icon.png")}
          style={styles.googleLogo}
        />
        <Text style={styles.googleText}>S’inscrire avec Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
        <Text style={styles.footer}>
          Si vous avez déjà un compte, connectez-vous
        </Text>
      </TouchableOpacity>
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
  googleLogo: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  googleText: { fontWeight: "600" },
  footer: { color: "#2b93d1", fontSize: 14 },
});
