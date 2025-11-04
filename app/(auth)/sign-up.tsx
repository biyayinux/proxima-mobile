import { useSignUpWithGoogle } from "@/hooks/auth/sign-up";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import HeaderAuth from "@/components/header-auth";

export default function SignUpScreen() {
  const router = useRouter();
  const { onSignUpWithGoogle, loading } = useSignUpWithGoogle();

  return (
    <View style={styles.container}>
      <HeaderAuth imageSource={require("@/assets/images/famille.png")} />
      <TouchableOpacity
        style={[styles.googleButton, loading && { opacity: 0.6 }]}
        onPress={onSignUpWithGoogle}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.googleText}>Inscription...</Text>
        ) : (
          <>
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={styles.googleLogo}
            />
            <Text style={styles.googleText}>S’inscrire avec Google</Text>
          </>
        )}
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
