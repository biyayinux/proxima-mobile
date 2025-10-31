import { ClerkProvider, useUser } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";

const queryClient = new QueryClient();

// Clé Clerk
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Création du tokenCache sécurisé
const tokenCache = {
  getToken: (key: string) => SecureStore.getItemAsync(key),
  saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  clearToken: (key: string) => SecureStore.deleteItemAsync(key),
};

function RootLayout() {
  const { isSignedIn } = useUser();

  if (isSignedIn === undefined) {

    // Attente du chargement de Clerk
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isSignedIn && (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      {isSignedIn && (
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function Layout() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
