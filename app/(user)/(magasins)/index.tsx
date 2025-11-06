import { useMagasinsUser } from "@/hooks/magasins/magasins-user";
import { formatDateFr } from "@/utils/format-date";
import { formatNumber } from "@/utils/format-number";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const base64ToUri = (b64?: string | null) =>
  b64 ? `data:image/jpeg;base64,${b64}` : null;

// Composant Skeleton Loader
const LoaderSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View
          style={[
            styles.skeletonBox,
            { width: 120, height: 20, marginBottom: 5 },
          ]}
        />
        <View style={[styles.skeletonBox, { width: 100, height: 20 }]} />
      </View>
      <View style={styles.middleContainer}>
        <View
          style={[
            styles.skeletonBox,
            { width: 200, height: 45, borderRadius: 8 },
          ]}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={[styles.card, { backgroundColor: "#eee" }]}>
            <View style={[styles.img, { backgroundColor: "#ddd" }]} />
            <View style={styles.label}>
              <View
                style={[
                  styles.skeletonBox,
                  { width: 100, height: 15, marginBottom: 5 },
                ]}
              />
              <View style={[styles.skeletonBox, { width: 70, height: 12 }]} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default function MagasinsIndex() {
  const router = useRouter();
  const query = useMagasinsUser();

  if (query.isLoading) return <LoaderSkeleton />;

  if (query.error)
    return <Text style={styles.error}>{query.error.message}</Text>;

  const {
    magasins = [],
    totalMagasins = 0,
    totalArticles = 0,
  } = query.data || {};

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>
          {formatNumber(totalMagasins)}{" "}
          {totalMagasins > 1 ? "Magasins" : "Magasin"}
        </Text>
        <Text style={styles.stat}>
          {formatNumber(totalArticles)}{" "}
          {totalArticles > 1 ? "Articles" : "Article"}
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <TouchableOpacity
          style={styles.createBtn}
          activeOpacity={1}
          onPress={() => router.push("/(user)/add-magasin")}
        >
          <Text style={styles.createText}>Créer un magasin</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {magasins.map((m: any) => (
          <TouchableOpacity
            key={m.id}
            style={styles.card}
            activeOpacity={1}
            onPress={() => router.push(`/(user)/(magasins)/${m.id}`)}
          >
            {m.logo ? (
              <Image
                source={{ uri: base64ToUri(m.logo)! }}
                style={styles.img}
              />
            ) : (
              <View style={[styles.img, styles.noLogo]}>
                <Text style={styles.noLogoTxt}>Aucun logo</Text>
              </View>
            )}
            <View style={styles.label}>
              <Text style={styles.name}>{m.nom}</Text>
              <Text style={styles.date}>
                {formatDateFr(m.dt || m.created_at)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },

  statsContainer: {
    marginBottom: 20,
  },
  stat: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },

  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createBtn: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
  },
  createText: { color: "#fff", fontWeight: "bold", textAlign: "center" },

  card: {
    marginRight: 15,
    width: 150,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  img: { width: "100%", height: "100%" },
  noLogo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  noLogoTxt: { color: "#777", fontSize: 12 },
  label: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
  },
  name: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  date: { color: "#fff", fontSize: 11 },
  error: { color: "red", textAlign: "center", marginTop: 20 },

  skeletonBox: {
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
});
