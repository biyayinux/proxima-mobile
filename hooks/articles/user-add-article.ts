import { imageToBase64 } from "@/utils/convert-image-base64";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

interface AddArticleParams {
  nom: string;
  prix: string;
  devise: "CDF" | "USD";
  image?: string | null;
}

export function useAddArticle() {
  const { user } = useUser();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const BACKEND_URL = process.env.EXPO_PUBLIC_MIDDLEWARE_URL ?? "";

  const addArticle = async ({ nom, prix, devise, image }: AddArticleParams) => {
    if (!id) return setError("ID du magasin manquant");
    if (!user?.primaryEmailAddress?.emailAddress)
      return setError("Utilisateur non connecté");
    if (!nom || !prix) return setError("Veuillez remplir tous les champs");

    setLoading(true);
    setError(null);
    setSuccessMsg("");

    try {
      const base64Image = image ? await imageToBase64(image) : null;

      const res = await fetch(`${BACKEND_URL}/api/articles/user-add-article`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_magasin: id,
          nom,
          prix: parseFloat(prix),
          devise,
          photos: base64Image ? [base64Image] : [],
          email: user.primaryEmailAddress.emailAddress,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l’ajout");

      setSuccessMsg(`Article ${nom} ajouté avec succès`);
      return data;
    } catch (err: any) {
      console.error("Erreur ajout article ", err);
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return { addArticle, loading, error, successMsg };
}
