import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

async function fetchMagasinById(id: string, BACKEND_URL: string) {
  const res = await fetch(`${BACKEND_URL}/api/magasin/get-magasin-user/${id}`);
  
  if (!res.ok) throw new Error((await res.json()).error || 'Erreur serveur');
  return await res.json();
}

/**
 * Hook React Query pour récupérer un magasin spécifique + ses articles
 * @param id Identifiant du magasin
 */
export function useMagasinUser(id: string) {
  const { user } = useUser();
  const BACKEND_URL = process.env.EXPO_PUBLIC_MIDDLEWARE_URL!;
  const email = user?.primaryEmailAddress?.emailAddress;

  const query = useQuery({
    queryKey: ['magasin', id],
    queryFn: () => fetchMagasinById(id, BACKEND_URL),
    enabled: !!id && !!email,
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });

  // Rafraîchit la requête quand la page revient en focus
  useFocusEffect(useCallback(() => { query.refetch(); }, [query]));

  return query;
}
