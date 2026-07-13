export const existeLaPalabra = async (palabra) => {
  const response = await fetch(
    `https://word-api-hmlg.vercel.app/api/validate?word=${encodeURIComponent(palabra)}`,
  );
  if (!response.ok) {
    throw new Error("Error al intentar validar la palabra");
  }
  const { exists } = await response.json();
  return exists;
};
