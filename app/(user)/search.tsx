import { useSearchArticles } from "@/hooks/search-articles";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import { formatNumber } from "@/utils/format-number";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  ImageIcon,
  Store,
  ShoppingCart,
  MoreHorizontal,
} from "lucide-react-native";

export default function SearchByImageScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const { mutateAsync, isPending, error } = useSearchArticles();

  // Choisir une image depuis la galerie
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.uri);

      try {
        const data = await mutateAsync(asset.base64!);
        const articlesTrouves = data?.data?.query_results || [];
        setArticles(articlesTrouves);

        if (articlesTrouves.length > 0 && articlesTrouves[0].store) {
          const { latitude, longitude } = articlesTrouves[0].store;
          setCoords({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          });
        }
      } catch (err) {
        console.error("Erreur recherche ", err);
      }
    }
  };

  // Ouvrir Google Maps avec l’itinéraire vers le magasin
  const openInGoogleMaps = async (store: {
    latitude: string;
    longitude: string;
  }) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Activez la localisation pour voir votre position",
      );
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const userLat = loc.coords.latitude;
    const userLng = loc.coords.longitude;

    const destinationLat = parseFloat(store.latitude);
    const destinationLng = parseFloat(store.longitude);

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erreur", "Impossible d’ouvrir Google Maps");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>Recherche par image</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <ImageIcon size={60} color="#999" />
        )}
      </TouchableOpacity>
      {isPending && (
        <ActivityIndicator
          style={{ marginTop: 15 }}
          size="large"
          color="#555"
        />
      )}
      {error && <Text style={{ color: "red" }}>{(error as any).message}</Text>}
      <Text style={styles.subtitle}>Résultat de la recherche</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {articles.map((art) => {
          const imageUri = art.photos?.[0]
            ? `data:image/jpeg;base64,${art.photos[0]}`
            : null;

          const storeLogo = art.store?.logo
            ? `data:image/jpeg;base64,${art.store.logo}`
            : null;
          return (
            <TouchableOpacity
              key={art.article_id}
              onPress={() => openInGoogleMaps(art.store)}
              activeOpacity={0.8}
            >
              <View style={styles.articleCard}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.articleImage}
                  />
                ) : (
                  <View
                    style={[styles.articleImage, { backgroundColor: "#ddd" }]}
                  />
                )}
                <Text style={styles.articleText}>
                  {art.article_name} {formatNumber(art.price)}{" "}
                  {art.devise ?? ""}
                </Text>
                {art.store && (
                  <View style={styles.storeInfo}>
                    {storeLogo ? (
                      <Image
                        source={{ uri: storeLogo }}
                        style={styles.storeLogo}
                      />
                    ) : (
                      <Store size={20} color="#777" />
                    )}
                    <Text style={styles.storeName}>{art.store.name}</Text>T
                  </View>
                )}
                <View style={styles.metricsRow}>
                  {art.similarity !== undefined && (
                    <Text style={styles.metricText}>
                      Similarité {(art.similarity * 100).toFixed(0)}%
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords?.latitude ?? -4.441931,
            longitude: coords?.longitude ?? 15.266293,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {coords && <Marker coordinate={coords} />}
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  subtitle: { fontSize: 16, fontWeight: "600", marginVertical: 10 },
  imagePicker: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  previewImage: { width: "100%", height: "100%", borderRadius: 10 },
  articleCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    width: 180,
  },
  articleImage: { width: 120, height: 100, borderRadius: 8 },
  articleText: { marginTop: 5, fontSize: 13, textAlign: "center" },
  storeInfo: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  storeLogo: { width: 20, height: 20, borderRadius: 10, marginRight: 5 },
  storeName: { fontSize: 12, fontWeight: "500" },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 5,
  },
  metricText: { fontSize: 12, color: "#555" },
  mapContainer: {
    borderRadius: 12,
    overflow: "hidden",
    height: 300,
    marginTop: 15,
  },
  map: { width: "100%", height: "100%" },
});
