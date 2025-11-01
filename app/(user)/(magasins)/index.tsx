import { useMagasinsUser } from '@/hooks/magasins/magasins-user';
import { formatDateFr } from '@/utils/format-date';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const base64ToUri = (b64?: string | null) => (b64 ? `data:image/jpeg;base64,${b64}` : null);

export default function MagasinsIndex() {
  const router = useRouter();
  const query = useMagasinsUser();

  if (query.isLoading)
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 30 }} />;
  if (query.error)
    return <Text style={styles.error}>{query.error.message}</Text>;

  const { magasins = [], totalMagasins = 0, totalArticles = 0 } = query.data || {};

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text style={styles.stat}>{totalMagasins} Magasins</Text>
        <Text style={styles.stat}>{totalArticles} Articles</Text>
      </View>
      <Pressable style={styles.createBtn} onPress={() => router.push("/(user)/add-magasin")}>
        <Text style={styles.createText}>+ Créer un magasin</Text>
      </Pressable>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {magasins.map((m: any) => (
          <Pressable
            key={m.id}
            style={styles.card}
            onPress={() => router.push(`/(user)/(magasins)/${m.id}`)}
          >
            {m.logo ? (
              <Image source={{ uri: base64ToUri(m.logo)! }} style={styles.img} />
            ) : (
              <View style={[styles.img, styles.noLogo]}>
                <Text style={styles.noLogoTxt}>Aucun logo</Text>
              </View>
            )}
            <View style={styles.label}>
              <Text style={styles.name}>{m.nom}</Text>
              <Text style={styles.date}>{formatDateFr(m.dt || m.created_at)}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  stat: { fontWeight: 'bold', fontSize: 15 },
  createBtn: { backgroundColor: '#000', padding: 10, borderRadius: 8, marginBottom: 15 },
  createText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  card: {
    marginRight: 15,
    width: 150,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  img: { width: '100%', height: '100%' },
  noLogo: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' },
  noLogoTxt: { color: '#777', fontSize: 12 },
  label: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
  },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  date: { color: '#fff', fontSize: 11 },
});
