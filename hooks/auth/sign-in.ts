import { useClerk, useSSO, useUser } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useSignInWithGoogle() {
  const { startSSOFlow } = useSSO();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const MIDDLEWARE_URL = process.env.EXPO_PUBLIC_MIDDLEWARE_URL;

  // Fonction pour lancer la connexion Google
  const onSignInWithGoogle = async () => {
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

  // Dès que l'utilisateur est chargé, envoyer au middleware
  useEffect(() => {
    const sendUserToMiddleware = async () => {
      if (!isLoaded || !signedIn || !user) return;

      const email = user.emailAddresses?.[0]?.emailAddress;
      if (!email) {
        console.log("Email manquant");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${MIDDLEWARE_URL}/api/users/sign-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log("Réponse middleware ", data);

        if (response.ok && data.status === "found") {
          router.replace("/(user)/home"); // Redirection vers page user
        } else if (data.status === "not_found") {
          // Utilisateur non trouvé, supprimer session Clerk et rediriger vers sign-up
          try {
            await signOut();
            console.log("Session Clerk supprimée pour nouvel utilisateur");
          } catch (err) {
            console.log("Impossible de supprimer la session Clerk ", err);
          }
          router.replace("/(auth)/sign-up");
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

  return { onSignInWithGoogle, loading };
}
