import { useAddArticle } from "@/hooks/articles/user-add-article";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddArticles() {
  const { addArticle, successMsg, error, loading } = useAddArticle();
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [devise, setDevise] = useState<"CDF" | "USD">("CDF");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled && res.assets?.length) setImage(res.assets[0].uri);
  };

  const handleSubmit = async () => {
    await addArticle({ nom, prix, devise, image } as any);
    setNom("");
    setPrix("");
    setImage(null);
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorMsg}>{error}</Text>}
      {successMsg && <Text style={styles.successMsg}>{successMsg}</Text>}
      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Image
          source={image ? { uri: image } : require("@/assets/images/polo.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nom de l'article"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Prix"
        keyboardType="numeric"
        value={prix}
        onChangeText={setPrix}
      />
      <View style={styles.deviseContainer}>
        {(["CDF", "USD"] as const).map((d) => (
          <Pressable
            key={d}
            style={[styles.deviseBtn, devise === d && styles.deviseSelected]}
            onPress={() => setDevise(d)}
          >
            <Text
              style={[styles.deviseText, devise === d && { color: "#fff" }]}
            >
              {d}
            </Text>
          </Pressable>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Ajout..." : "Ajouter"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  imageButton: { alignSelf: "center", marginBottom: 15 },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  deviseContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  deviseBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  deviseSelected: { backgroundColor: "#000" },
  deviseText: { color: "#000", fontWeight: "bold" },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  successMsg: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
    fontWeight: "600",
  },
  errorMsg: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginBottom: 15,
    fontWeight: "600",
  },
});
