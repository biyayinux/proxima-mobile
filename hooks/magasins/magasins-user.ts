import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

async function fetchMagasins(email: string, BACKEND_URL: string) {
  const res = await fetch(`${BACKEND_URL}/api/magasins/get-magasins-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Erreur serveur');
  return await res.json();
}

export function useMagasinsUser() {
  const { user } = useUser();
  const BACKEND_URL = process.env.EXPO_PUBLIC_MIDDLEWARE_URL!;
  const email = user?.primaryEmailAddress?.emailAddress;

  const query = useQuery({
    queryKey: ['magasins', email],
    queryFn: () => fetchMagasins(email!, BACKEND_URL),
    enabled: !!email,
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });

  // Rafraîchit uniquement quand la page revient en focus
  useFocusEffect(useCallback(() => { query.refetch(); }, [query]));

  return query;
}
 