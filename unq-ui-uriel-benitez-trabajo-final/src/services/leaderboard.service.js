const STORAGE_KEY = "leaderboard";
const MAX_ENTRIES = 10;

export function guardarPuntaje(puntaje, cantidadPalabras) {
  const puntajes = obtenerPuntajes();
  const entrada = { puntaje, palabras: cantidadPalabras, fecha: new Date().toISOString() };
  puntajes.push(entrada);
  puntajes.sort((a, b) => b.puntaje - a.puntaje);
  const top10 = puntajes.slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
}

export function obtenerPuntajes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
