import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { User } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Header() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.log("Erreur", "Impossible de se déconnecter");
      console.error("Erreur Clerk ", err);
    }
  };

  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/images/logo-proxima.png")}
        style={styles.logo}
        resizeMode="contain"
      />
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
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 40,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});
