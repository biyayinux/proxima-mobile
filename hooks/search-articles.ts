import { useMutation } from "@tanstack/react-query";
import * as Location from "expo-location";

const BACKEND_URL = process.env.EXPO_PUBLIC_MIDDLEWARE_URL!;

// Fonction pour envoyer la photo + position à ton backend Node.js
async function searchArticles(photoBase64: string) {
  // Obtenir la position GPS
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission de localisation refusée");
  }

  const position = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = position.coords;

  // Envoi de la requête POST
  const res = await fetch(`${BACKEND_URL}/api/articles/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      photo: photoBase64,
      latitude,
      longitude,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Erreur lors de la recherche d'articles");
  }

  return await res.json();
}

// Hook React Query
export function useSearchArticles() {
  return useMutation({
    mutationFn: (photoBase64: string) => searchArticles(photoBase64),
  });
}
