import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

async function fetchMagArtAlea(BACKEND_URL: string) {
  const res = await fetch(`${BACKEND_URL}/api/get-mag-art-alea`);
  if (!res.ok) throw new Error((await res.json()).error || 'Erreur serveur');
  return await res.json();
}

export function useMagArtAlea() {
  const BACKEND_URL = process.env.EXPO_PUBLIC_MIDDLEWARE_URL!;

  const query = useQuery({
    queryKey: ['mag-art-alea'],
    queryFn: () => fetchMagArtAlea(BACKEND_URL),
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });

  useFocusEffect(
    useCallback(() => {
      query.refetch();
    }, [query])
  );

  return query;
}
