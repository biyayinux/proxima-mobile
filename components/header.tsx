import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { User } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header({ title }: { title: string }) {
  const { user } = useUser(); // Récupère les infos de l'utilisateur connecté
  const { signOut } = useClerk();
  const router = useRouter();

  // Fonction de déconnexion
  const handleSignOut = async () => {
    try {
      await signOut(); // Déconnecte l’utilisateur
      router.replace("/(auth)/sign-in"); // Redirige vers la page de connexion
    } catch (err) {
      console.log("Erreur", "Impossible de se déconnecter");
      console.error("Erreur Clerk ", err);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {user ? (
        <TouchableOpacity onPress={handleSignOut}>
          {user.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
            />
          ) : (
            <User size={26} />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
          <User size={26} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});
