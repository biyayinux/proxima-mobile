import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import * as Location from "expo-location";

async function fetchMagArtAlea(BACKEND_URL: string) {
  // Demande de permission de localisation
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission de localisation refusée");
  }

  // Récupérer la position actuelle
  const position = await Location.getCurrentPositionAsync({});
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Envoyer la position au backend
  const res = await fetch(`${BACKEND_URL}/api/get-magasins-articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latitude, longitude }),
  });

  if (!res.ok) throw new Error((await res.json()).error || "Erreur serveur");
  return await res.json();
}

export function useMagArtAlea() {
  const BACKEND_URL = process.env.EXPO_PUBLIC_MIDDLEWARE_URL!;

  const query = useQuery({
    queryKey: ["mag-art-alea"],
    queryFn: () => fetchMagArtAlea(BACKEND_URL),
    staleTime: 1000 * 60 * 60 * 24, // 24 heures
  });

  useFocusEffect(
    useCallback(() => {
      query.refetch();
    }, [query]),
  );

  return query;
}
