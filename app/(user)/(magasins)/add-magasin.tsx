import { MapPin } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddMagasin() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require("@/assets/images/polo.png")} style={styles.imagePlaceholder} />
        <TextInput placeholder="Nom du magasin" style={styles.input} />
        <TouchableOpacity style={styles.locationButton}>
          <MapPin size={18} color="#000" />
          <Text style={{ marginLeft: 6 }}>Récupérer la position actuelle du magasin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton}>
          <Text style={{ fontWeight: "600" }}>Créer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#e6e6e6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});
