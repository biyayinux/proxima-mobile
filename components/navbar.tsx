import { useRouter } from "expo-router";
import { Home, Search, Store } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/(user)/search")}
        activeOpacity={1}
      >
        <Search size={24} />
        <Text style={styles.label}>Recherche</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/(user)/home")}
        activeOpacity={1}
      >
        <Home size={24} />
        <Text style={styles.label}>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/(user)/(magasins)")}
        activeOpacity={1}
      >
        <Store size={24} />
        <Text style={styles.label}>Magasins</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 50,
    marginTop: -30,
  },
  navItem: {
    alignItems: "center",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
  },
});
