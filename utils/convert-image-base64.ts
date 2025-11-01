import * as ImageManipulator from 'expo-image-manipulator';

/**
 * Convertit une image locale en Base64 (JPEG)
 * @param uri L'URI de l'image
 * @param maxBytes Taille max en octets (défaut 5 MB)
 * @returns Promise<string> Base64 (sans préfixe data:image/...)
 */
export const imageToBase64 = async (uri: string, maxBytes = 5 * 1024 * 1024): Promise<string> => {
  if (!uri) throw new Error('URI de l’image vide ou invalide');

  const result = await ImageManipulator.manipulateAsync(uri, [], {
    compress: 0.8,
    format: ImageManipulator.SaveFormat.JPEG,
    base64: true,
  });

  if (!result.base64) throw new Error('Impossible de générer le Base64');

  // Vérifie la taille approximative
  const approxBytes = Math.ceil((result.base64.length * 3) / 4);
  if (approxBytes > maxBytes) {
    throw new Error(`Image trop volumineuse (${Math.round(approxBytes / 1024)} KB). Max ${Math.round(maxBytes / 1024)} KB.`);
  }

  return result.base64;
};
