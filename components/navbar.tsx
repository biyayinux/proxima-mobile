import { Home, Search, Store } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Search size={24} />
        <Text style={styles.label}>Recherche</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Home size={24} />
        <Text style={styles.label}>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Store size={24} />
        <Text style={styles.label}>Magasin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 60,   // Un peu moins de padding pour remonter
    marginTop: -10         // Remonte la navbar un peu vers le haut
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
