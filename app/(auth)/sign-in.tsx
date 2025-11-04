import { useSignInWithGoogle } from "@/hooks/auth/sign-in";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import HeaderAuth from "@/components/header-auth";

export default function SignInScreen() {
  const router = useRouter();
  const { onSignInWithGoogle, loading } = useSignInWithGoogle();

  return (
    <View style={styles.container}>
      <HeaderAuth imageSource={require("@/assets/images/famille.png")} />
      <TouchableOpacity
        style={[styles.googleButton, loading && { opacity: 0.6 }]}
        onPress={onSignInWithGoogle}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.googleText}>Connexion...</Text>
        ) : (
          <>
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={styles.googleLogo}
            />
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    color: "#2b93d1",
    fontSize: 14,
    textAlign: "center",
  },
});
