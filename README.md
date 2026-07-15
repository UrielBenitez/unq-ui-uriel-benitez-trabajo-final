# Palabras Encadenadas

**Trabajo Final Integrador - Construcción de Interfaces UNQ**  
**Benitez Uriel Ignacio — 1° Cuatrimestre 2026**

Juego de palabras encadenadas desarrollado en React. El objetivo es formar la cadena más larga posible: cada nueva palabra debe comenzar con la última letra de la palabra anterior. No se pueden repetir palabras y deben ser válidas en español. Hay 15 segundos por palabra y el puntaje se calcula según la longitud de cada palabra.

## Tecnologías utilizadas

- **React 19** — Librería principal de interfaces
- **Vite 8** — Herramienta de build y dev server
- **React Router DOM 7** — Navegación entre pantallas
- **Tabler Icons** — Iconografía de la interfaz
- **Google Fonts (Fredoka + Inter)** — Tipografías del proyecto
- **API de validación (cátedra)** — [https://word-api-hmlg.vercel.app](https://word-api-hmlg.vercel.app)

---

## Requisitos

- Node.js v18 o superior
- npm (incluido con Node.js)

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/UrielBenitez/unq-ui-uriel-benitez-trabajo-final.git

# Entrar al directorio del proyecto
cd unq-ui-uriel-benitez-trabajo-final/TFI

# Instalar dependencias
npm install
```

---

## Ejecución local

### Modo desarrollo

Levanta un servidor con recarga en caliente (HMR):

```bash
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

### Build de producción

Genera los archivos optimizados en la carpeta `dist/`:

```bash
npm run build
```

Para previsualizar el build localmente:

```bash
npm run preview
```

---

## Scripts disponibles

| Comando           | Descripción                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo con Vite |
| `npm run build`   | Genera los archivos para producción       |
| `npm run preview` | Previsualiza el build de producción       |
| `npm run lint`    | Ejecuta ESLint sobre el código            |

---

## Estructura del proyecto

```
TFI/
├── index.html               # Archivo de entrada HTML
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
├── eslint.config.js         # Configuración de ESLint
├── public/                  # Archivos estáticos (favicon, SVG)
├── dist/                    # Build de producción
└── src/
    ├── main.jsx             # Punto de entrada de React
    ├── App.jsx              # Componente raíz con rutas
    ├── App.css              # Estilos globales
    ├── index.css            # Estilos base / reset
    ├── assets/              # Recursos (imágenes)
    ├── context/
    │   └── GameContext.jsx   # Estado global del juego
    ├── components/
    │   ├── Menu.jsx          # Pantalla de inicio
    │   ├── Juego.jsx         # Pantalla de juego
    │   ├── JuegoInformacion.jsx  # Info durante la partida
    │   ├── ModalFin.jsx      # Modal al terminar el tiempo
    │   ├── Leaderboard.jsx   # Tabla de puntajes (top 10)
    │   ├── ListadoInverso.jsx # Lista de palabras encadenadas
    │   └── NoEncontrado.jsx  # Página 404
    ├── services/
    │   ├── palabras.service.js      # Validación contra API
    │   └── leaderboard.service.js   # Persistencia en localStorage
    └── utils/
        └── utils.js          # Funciones auxiliares (colores)
```

---

## API de validación de palabras

La aplicación valida que las palabras ingresadas existan en español consultando la API REST provista por la cátedra:

```
GET https://word-api-hmlg.vercel.app/api/validate?word={palabra}
```

Ejemplo de respuesta:

```json
{ "exists": true }
```

Si la palabra no existe o la API responde con error, el juego muestra un mensaje y rechaza la jugada.

---

## Funcionamiento del juego

1. Desde el menú principal se presiona **Jugar**.
2. Se debe ingresar una palabra que comience con la última letra de la palabra anterior.
3. Cada palabra se valida contra la API de la cátedra.
4. No se pueden repetir palabras dentro de una misma partida.
5. Hay 15 segundos por palabra; si el tiempo llega a cero, la partida termina.
6. Cada letra suma 1 punto (ej: "hola" suma 4 puntos).
7. Al finalizar, el puntaje se guarda automáticamente en el leaderboard local (top 10).
8. Se puede volver a jugar o consultar las estadísticas desde el menú.

---

## Licencia

Proyecto académico sin fines comerciales — UNQ 2026
