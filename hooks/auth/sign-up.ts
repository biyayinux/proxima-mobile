import { useClerk, useSSO, useUser } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useSignUpWithGoogle() {
  const { startSSOFlow } = useSSO();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const MIDDLEWARE_URL = process.env.EXPO_PUBLIC_MIDDLEWARE_URL;

  // Lancer l'inscription via Google
  const onSignUpWithGoogle = async () => {
    setLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (!createdSessionId) {
        console.log("Aucune session créée");
        setLoading(false);
        return;
      }

      await setActive!({ session: createdSessionId });
      setSignedIn(true);
    } catch (err) {
      console.log("Erreur Clerk ", err);
      setLoading(false);
    }
  };

  // Envoi des infos utilisateur (avec photo) au middleware
  useEffect(() => {
    const sendUserToMiddleware = async () => {
      if (!isLoaded || !signedIn || !user) return;

      const email = user.emailAddresses?.[0]?.emailAddress;
      const noms = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      const url_image = user.imageUrl || null; // Photo de profil Google

      if (!email || !noms) {
        console.log("Email ou nom manquant");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${MIDDLEWARE_URL}/api/users/sign-up`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, noms, url_image }), // On envoie aussi l'image
        });

        const data = await response.json();
        console.log("Réponse middleware:", data);

        if (response.ok && (data.status === "created" || data.status === "updated")) {
          router.replace("/(user)");
        } else {
          console.log("Erreur API middleware ", data);
        }
      } catch (err) {
        console.log("Erreur réseau ", err);
      } finally {
        setLoading(false);
      }
    };

    sendUserToMiddleware();
  }, [isLoaded, signedIn, user]);

  return { onSignUpWithGoogle, loading };
}
