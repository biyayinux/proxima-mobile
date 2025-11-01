import { useAddMagasin } from '@/hooks/magasins/user-add-magasin';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddMagasinPage() {
  const { addMagasin, loading, error } = useAddMagasin();
  const router = useRouter();

  const [nom, setNom] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [positionRetrieved, setPositionRetrieved] = useState(false);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.length) setLogo(result.assets[0].uri);
  };

  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    const loc = await Location.getCurrentPositionAsync({});
    setLatitude(loc.coords.latitude.toString());
    setLongitude(loc.coords.longitude.toString());
    setPositionRetrieved(true);
  };

  const handleAddMagasin = async () => {
    if (!nom || !latitude || !longitude) return;
    const data = await addMagasin({ nom, latitude, longitude, logo });
    if (data?.id) router.push(`/(user)/(magasins)/${data.id}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoButton} onPress={handlePickImage}>
        <Image
          source={logo ? { uri: logo } : require('@/assets/images/polo.png')}
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Nom du magasin"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleGetLocation}>
        <Text style={styles.buttonText}>
          {positionRetrieved ? 'Position récupérée' : 'Récupérer position'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleAddMagasin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Création...' : 'Créer le magasin'}</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  logoButton: { alignSelf: 'center', marginBottom: 15 },
  logoImage: { width: 100, height: 100, borderRadius: 10, borderWidth: 1, borderColor: '#000' },
  input: { borderWidth: 1, borderColor: '#000', padding: 10, borderRadius: 8, marginBottom: 15, color: '#000' },
  button: { backgroundColor: '#000', padding: 12, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
});
