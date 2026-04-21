# Gestor de Canciones

Aplicacion web full-stack para administrar una lista personal de canciones. Permite agregar, visualizar, editar y eliminar canciones con detalles como titulo, artista y genero.

## Caracteristicas

- Agregar nuevas canciones con titulo, artista y genero opcional
- Visualizar todas las canciones en un diseño de tarjetas responsivo
- Editar la informacion de canciones existentes
- Eliminar canciones con confirmacion previa
- Notificaciones visuales para cada accion realizada

## Tecnologias utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5
- Fetch API para consumo de endpoints

### Backend
- Node.js
- Express.js
- REST API con endpoints para operaciones CRUD

### Base de datos
- MySQL
- Desplegada en Railway

## Estructura del proyecto

El proyecto esta organizado en dos carpetas principales:

- `backend/` - Contiene la API desarrollada con Node.js y Express
- `frontend/` - Contiene la interfaz de usuario con HTML, CSS y JavaScript

## Endpoints de la API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/songs` | Obtiene todas las canciones |
| GET | `/api/songs/:id` | Obtiene una cancion por su ID |
| POST | `/api/songs` | Crea una nueva cancion |
| PUT | `/api/songs/:id` | Actualiza una cancion existente |
| DELETE | `/api/songs/:id` | Elimina una cancion |

## Despliegue

- **Frontend**: Desplegado en Vercel
- **Backend**: Desplegado en Render
- **Base de datos**: Alojada en Railway
