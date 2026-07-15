export function calcularColorTiempo(tiempoRestante, tiempoTotal = 15) {
  const porcentaje = Math.max(0, Math.min(1, tiempoRestante / tiempoTotal));

  const verde = [46, 125, 50];
  const naranja = [230, 149, 60];
  const rojo = [211, 47, 47];

  let colorInicio, colorFin, t;

  if (porcentaje > 0.5) {
    t = (porcentaje - 0.5) * 2;
    colorInicio = naranja;
    colorFin = verde;
  } else {
    t = porcentaje * 2;
    colorInicio = rojo;
    colorFin = naranja;
  }

  const r = Math.round(colorInicio[0] + (colorFin[0] - colorInicio[0]) * t);
  const g = Math.round(colorInicio[1] + (colorFin[1] - colorInicio[1]) * t);
  const b = Math.round(colorInicio[2] + (colorFin[2] - colorInicio[2]) * t);

  return `rgb(${r}, ${g}, ${b})`;
}
