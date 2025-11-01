import { imageToBase64 } from '@/utils/convert-image-base64';
import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';

interface AddMagasinParams {
  nom: string;
  latitude: string;
  longitude: string;
  logo?: string | null;
}

export function useAddMagasin() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMagasin = async ({ nom, latitude, longitude, logo }: AddMagasinParams) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      setError('Utilisateur non chargé');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let base64Logo: string | null = null;
      if (logo) base64Logo = await imageToBase64(logo);

      const res = await fetch(`${process.env.EXPO_PUBLIC_MIDDLEWARE_URL}/api/magasins/user-add-magasin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          logo: base64Logo ? `data:image/jpeg;base64,${base64Logo}` : null,
          email: user.primaryEmailAddress.emailAddress,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur API');

      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addMagasin, loading, error };
}
