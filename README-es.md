# 📊 Configuración de la Base de Datos

Este proyecto configura una conexión a una base de datos **PostgreSQL** utilizando **Sequelize**, un potente ORM para la interacción con bases de datos relacionales en **Node.js**. A continuación, se presenta una descripción general del proceso de configuración:

---

## 🚀 Flujo de Trabajo General

1. **Variables de Entorno**  
   Cargadas desde un archivo `.env`, que contiene detalles esenciales:
   - Credenciales de la base de datos: nombre, usuario, contraseña y host.
   - Entorno de ejecución: producción o desarrollo.

2. **Conexión a la Base de Datos**  
   Dependiendo del entorno, se establece una conexión con las siguientes distinciones:
   - **Producción**: Utiliza SSL para mayor seguridad.
   - **Desarrollo**: Configuración más simple y directa.

3. **Carga Dinámica de Modelos**  
   El código carga dinámicamente todos los archivos `.js` del directorio `models` (excluyendo el archivo principal), que definen los modelos de la base de datos. Estos se importan e integran en Sequelize, preparando la estructura de datos (tablas) para su uso.

4. **Relaciones entre Modelos**  
   Se definen relaciones entre los modelos, incluyendo:
   - Un **Usuario** puede tener muchos **Artículos** (uno a muchos).
   - Un **Artículo** puede tener muchos **Comentarios** o **Likes**.
   - Un **Usuario** puede emitir muchos **Votos**.  
   Estas relaciones configuran cómo se interconectan las tablas de la base de datos.

5. **Exportación**  
   Finalmente, tanto los modelos como la conexión a la base de datos se exportan, haciéndolos accesibles para su uso en otras partes del proyecto.

---

## 📝 Resumen

En resumen, esta configuración configura de manera flexible la conexión a una base de datos PostgreSQL, carga dinámicamente modelos, define las relaciones entre ellos y exporta todo para un uso más amplio dentro del proyecto.

---

# 🌐 Rutas

## `rutas/index.js`
Este archivo es el punto de entrada para las rutas del proyecto. Aquí se definen las rutas principales y se configuran los middlewares necesarios.

- **Importaciones**: Se importan los routers específicos para usuarios, artículos, comentarios, etiquetas, votos y likes.
- **Middleware de registro de solicitudes**: Cada solicitud a las rutas se registra en la consola.
- **Configuración de rutas**: Se utilizan los routers importados para definir rutas específicas para cada recurso.

## `rutas/article.js`
Define las rutas relacionadas con los artículos.

- **GET /**: Recupera todos los artículos.
- **POST /**: Crea un nuevo artículo.

## `rutas/tag.js`
Define las rutas relacionadas con las etiquetas.

- **GET /**: Recupera todas las etiquetas.
- **POST /**: Crea una nueva etiqueta.

## `rutas/user.js`
Define las rutas relacionadas con los usuarios.

- **GET /**: Recupera todos los usuarios.
- **POST /**: Crea un nuevo usuario.

---

# 🛠️ Handlers

Los handlers se encargan de procesar las solicitudes y respuestas para cada acción específica.

## `handlers/createTag.js`
Maneja la creación de nuevas etiquetas.

- **Entrada**: `{ tag_name, userId }`
- **Salida**: Retorna la nueva etiqueta creada o un error si la etiqueta ya existe.

## `handlers/getAllTags.js`
Maneja la recuperación de todas las etiquetas.

- **Salida**: Retorna todas las etiquetas o un error si no hay etiquetas disponibles.

## `handlers/createUser.js`
Maneja la creación de nuevos usuarios.

- **Entrada**: `{ name, email, password, profilePic, role }`
- **Salida**: Retorna el nuevo usuario creado o un error si el usuario ya existe.

## `handlers/getAllUsers.js`
Maneja la recuperación de todos los usuarios.

- **Salida**: Retorna todos los usuarios o un mensaje si no hay usuarios disponibles.

## `handlers/createArticle.js`
Maneja la creación de nuevos artículos.

- **Entrada**: `{ title, byline, content, tags, authorId, status, imageUrl }`
- **Salida**: Retorna el nuevo artículo creado o un error si ya existe un artículo con el mismo título.

## `handlers/getAllArticles.js`
Maneja la recuperación de todos los artículos.

- **Salida**: Retorna todos los artículos o un error si no hay artículos disponibles.

---

# 🧩 Controladores

Los controladores contienen la lógica del negocio y la interacción con la base de datos.

## `controllers/createTag.js`
Crea una nueva etiqueta en la base de datos.

- **Validaciones**: Verifica que el nombre de la etiqueta no contenga caracteres especiales y que el usuario tenga permisos adecuados.

## `controllers/getAllTags.js`
Recupera todas las etiquetas de la base de datos.

## `controllers/createUser.js`
Crea un nuevo usuario en la base de datos, verificando si el usuario ya existe.

## `controllers/getAllUsers.js`
Recupera todos los usuarios de la base de datos.

## `controllers/createArticle.js`
Crea un nuevo artículo en la base de datos.

- **Validaciones**: Verifica si el título del artículo ya existe.

## `controllers/getAllArticles.js`
Recupera todos los artículos de la base de datos.

---

# 🏗️ Modelos

### 🧑‍💻 **Modelo de Usuario**

Este modelo define la estructura para los usuarios registrados en el sitio web de noticias.

| **Campo**            | **Tipo**        | **Detalles**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `user_id`            | Entero          | Clave primaria, autoincremental, identificador único para cada usuario.                    |
| `name`               | Cadena          | No puede ser nulo.                                                                          |
| `email`              | Cadena          | Campo único. Tendrá validación de formato en futuras versiones.                             |
| `password`           | Cadena          | Validación personalizada asegura al menos 6 caracteres, incluyendo un número y una letra.   |
| `profile_pic`        | Cadena (opcional)| Almacena la URL de la imagen de perfil del usuario (alojada en Firebase).                   |
| `registration_date`  | Fecha           | Generada automáticamente al crear el registro.                                             |
| `role`               | Enum            | Roles: `administrator`, `editor`, `user`, `viewer`. Por defecto: `user`.                    |
| `status`             | Enum            | Estado: `active`, `suspended`, `deleted`. Por defecto: `active`.                           |

Opciones adicionales:  
- `timestamps: false`: Desactiva las columnas automáticas `createdAt` y `updatedAt`.

---

### 📰 **Modelo de Artículo**

Define la estructura para los artículos publicados.

| **Campo**            | **Tipo**        | **Detalles**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `article_id`         | Entero          | Clave primaria, autoincremental, identificador único para cada artículo.                    |
| `title`              | Cadena          | Título del artículo (máx. 200 caracteres).                                                |
| `byline`             | Cadena          | Breve descripción debajo del título.                                                       |
| `content`            | Texto           | Contenido completo del artículo, capaz de manejar texto extenso.                          |
| `image`              | Cadena          | Almacena la URL de la imagen del artículo (alojada en Firebase).                           |
| `publication_date`   | FechaHora       | Generada automáticamente al publicar.                                                      |
| `status`             | Enum            | Estado: `draft`, `published`, `archived`, `deleted`.                                       |
| `tags`               | Array           | Permite etiquetar para búsquedas específicas.                                              |

Opciones adicionales:  
- `timestamps: false`

---

### 💬 **Modelo de Comentario**

Almacena comentarios de usuarios sobre artículos.

| **Campo**            | **Tipo**        | **Detalles**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `comment_id`         | Entero          | Clave primaria, autoincremental.                                                          |
| `content`            | Cadena          | Texto del comentario (máx. 500 caracteres).                                               |
| `user`               | Cadena          | Nombre del usuario que realizó el comentario.                                             |
| `user_id`            | Entero          | Clave foránea que vincula el comentario a un usuario específico.                          |

Opciones adicionales:  
- `timestamps: false`

---

### 👍 **Modelo de Like**

Define la estructura para rastrear "likes" que los usuarios dan a los artículos.

| **Campo**            | **Tipo**        | **Detalles**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `like_id`            | Entero          | Clave primaria, autoincremental, identificador único para cada "like".                    |
| `user_id`            | Entero          | Clave foránea que vincula el like a un usuario.                                          |
| `article_id`         | Entero          | Clave foránea que vincula el like a un artículo.                                          |

Comportamiento adicional:  
- Un usuario solo puede dar un "like" por artículo.

---

### 🗳️ **Modelo de Voto**

Almacena votos a favor y en contra que los usuarios dan a los artículos.

| **Campo**            | **Tipo**        | **Detalles**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `vote_id`            | Entero          | Clave primaria, autoincremental.                                                          |
| `user_id`            | Entero          | Clave foránea que vincula el voto a un usuario.                                          |
| `article_id`         | Entero          | Clave foránea que vincula el voto a un artículo.                                          |
| `vote_type`          | Enum            | `upvote` o `downvote`.                                                                    |

---

# 🚦 Middleware

Los middlewares son funciones que se ejecutan durante el ciclo de vida de una solicitud, permitiendo la validación y el manejo de errores.

## Middleware de Autenticación
- **Funcionalidad**: Verifica que el usuario esté autenticado para acceder a ciertas rutas.

---
