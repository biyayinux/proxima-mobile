import { ClerkProvider, useUser } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";

const queryClient = new QueryClient();
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  getToken: (key: string) => SecureStore.getItemAsync(key),
  saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  clearToken: (key: string) => SecureStore.deleteItemAsync(key),
};

function RootLayout() {
  const { isSignedIn } = useUser();

  if (isSignedIn === undefined) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isSignedIn ? <Stack.Screen name="(user)" /> : <Stack.Screen name="(auth)" />}
    </Stack>
  );
}

export default function Layout() {
  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error("La clé publiable Clerk n'est pas définie");
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
