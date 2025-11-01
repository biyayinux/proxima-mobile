export const formatDateFr = (dateString: string): string => {
  if (!dateString) return "Date inconnue";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Date invalide";
  }
};
