# 📊 Database Configuration

This project configures a connection to a **PostgreSQL** database using **Sequelize**, a powerful ORM for interacting with relational databases in **Node.js**. Below is an overview of the configuration process:

---

## 🚀 General Workflow

1. **Environment Variables**  
   Loaded from a `.env` file, which contains essential details:
   - Database credentials: name, user, password, and host.
   - Execution environment: production or development.

2. **Database Connection**  
   Depending on the environment, a connection is established with the following distinctions:
   - **Production**: Uses SSL for increased security.
   - **Development**: Simpler and more straightforward configuration.

3. **Dynamic Model Loading**  
   The code dynamically loads all `.js` files from the `models` directory (excluding the main file), which define the database models. These are imported and integrated into Sequelize, preparing the data structure (tables) for use.

4. **Model Relationships**  
   Relationships between models are defined, including:
   - A **User** can have many **Articles** (one-to-many).
   - An **Article** can have many **Comments** or **Likes**.
   - A **User** can cast many **Votes**.  
   These relationships configure how the database tables interconnect.

5. **Exporting**  
   Finally, both the models and the database connection are exported, making them accessible for use in other parts of the project.

---

## 📝 Summary

In summary, this configuration flexibly sets up a connection to a PostgreSQL database, dynamically loads models, defines relationships between them, and exports everything for broader use within the project.

---

# 🌐 Routes

## `routes/index.js`
This file serves as the entry point for the project’s routes. Here, the main routes and the necessary middleware are configured.

- **Imports**: Specific routers for users, articles, comments, tags, votes, and likes are imported.
- **Request Logging Middleware**: Each request to the routes is logged to the console.
- **Route Configuration**: The imported routers are used to define specific routes for each resource.

## `routes/article.js`
Defines routes related to articles.

- **GET /**: Retrieves all articles.
- **POST /**: Creates a new article.

## `routes/tag.js`
Defines routes related to tags.

- **GET /**: Retrieves all tags.
- **POST /**: Creates a new tag.

## `routes/user.js`
Defines routes related to users.

- **GET /**: Retrieves all users.
- **POST /**: Creates a new user.

---

# 🛠️ Handlers

Handlers are responsible for processing requests and responses for each specific action.

## `handlers/createTag.js`
Handles the creation of new tags.

- **Input**: `{ tag_name, userId }`
- **Output**: Returns the newly created tag or an error if the tag already exists.

## `handlers/getAllTags.js`
Handles the retrieval of all tags.

- **Output**: Returns all tags or an error if no tags are available.

## `handlers/createUser.js`
Handles the creation of new users.

- **Input**: `{ name, email, password, profilePic, role }`
- **Output**: Returns the newly created user or an error if the user already exists.

## `handlers/getAllUsers.js`
Handles the retrieval of all users.

- **Output**: Returns all users or a message if no users are available.

## `handlers/createArticle.js`
Handles the creation of new articles.

- **Input**: `{ title, byline, content, tags, authorId, status, imageUrl }`
- **Output**: Returns the newly created article or an error if an article with the same title already exists.

## `handlers/getAllArticles.js`
Handles the retrieval of all articles.

- **Output**: Returns all articles or an error if no articles are available.

---

# 🧩 Controllers

Controllers contain the business logic and interaction with the database.

## `controllers/createTag.js`
Creates a new tag in the database.

- **Validations**: Checks that the tag name does not contain special characters and that the user has appropriate permissions.

## `controllers/getAllTags.js`
Retrieves all tags from the database.

## `controllers/createUser.js`
Creates a new user in the database, checking if the user already exists.

## `controllers/getAllUsers.js`
Retrieves all users from the database.

## `controllers/createArticle.js`
Creates a new article in the database.

- **Validations**: Checks if the article title already exists.

## `controllers/getAllArticles.js`
Retrieves all articles from the database.

---

# 🏗️ Models

### 🧑‍💻 **User Model**

This model defines the structure for registered users on the news website.

| **Field**            | **Type**        | **Details**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `user_id`            | Integer         | Primary key, auto-incremental, unique identifier for each user.                          |
| `name`               | String          | Cannot be null.                                                                          |
| `email`              | String          | Unique field. Will have format validation in future versions.                             |
| `password`           | String          | Custom validation ensures at least 6 characters, including a number and a letter.       |
| `profile_pic`        | String (optional)| Stores the URL of the user’s profile picture (hosted on Firebase).                      |
| `registration_date`  | Date            | Automatically generated upon registration.                                               |
| `role`               | Enum            | Roles: `administrator`, `editor`, `user`, `viewer`. Default: `user`.                     |
| `status`             | Enum            | Status: `active`, `suspended`, `deleted`. Default: `active`.                            |

Additional options:  
- `timestamps: false`: Disables automatic `createdAt` and `updatedAt` columns.

---

### 📰 **Article Model**

Defines the structure for published articles.

| **Field**            | **Type**        | **Details**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `article_id`         | Integer         | Primary key, auto-incremental, unique identifier for each article.                        |
| `title`              | String          | Title of the article (max. 200 characters).                                             |
| `byline`             | String          | Brief description under the title.                                                       |
| `content`            | Text            | Complete content of the article, capable of handling lengthy text.                       |
| `image`              | String          | Stores the URL of the article's image (hosted on Firebase).                             |
| `publication_date`   | DateTime        | Automatically generated upon publication.                                                |
| `status`             | Enum            | Status: `draft`, `published`, `archived`, `deleted`.                                     |
| `tags`               | Array           | Allows tagging for specific searches.                                                    |

Additional options:  
- `timestamps: false`

---

### 💬 **Comment Model**

Stores user comments on articles.

| **Field**            | **Type**        | **Details**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `comment_id`         | Integer         | Primary key, auto-incremental.                                                          |
| `content`            | String          | Text of the comment (max. 500 characters).                                               |
| `user`               | String          | Name of the user who made the comment.                                                  |
| `user_id`            | Integer         | Foreign key linking the comment to a specific user.                                      |

Additional options:  
- `timestamps: false`

---

### 👍 **Like Model**

Defines the structure for tracking "likes" that users give to articles.

| **Field**            | **Type**        | **Details**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `like_id`            | Integer         | Primary key, auto-incremental, unique identifier for each "like".                        |
| `user_id`            | Integer         | Foreign key linking the like to a user.                                                  |
| `article_id`         | Integer         | Foreign key linking the like to an article.                                              |

Additional behavior:  
- A user can only give one "like" per article.

---

### 🗳️ **Vote Model**

Stores votes for and against that users give to articles.

| **Field**            | **Type**        | **Details**                                                                                |
|----------------------|-----------------|--------------------------------------------------------------------------------------------|
| `vote_id`            | Integer         | Primary key, auto-incremental.                                                          |
| `user_id`            | Integer         | Foreign key linking the vote to a user.                                                  |
| `article_id`         | Integer         | Foreign key linking the vote to an article.                                              |
| `vote_type`          | Enum            | `upvote` or `downvote`.                                                                  |

---

# 🚦 Middleware

Middleware functions execute during the lifecycle of a request, allowing for validation and error handling.

## Authentication Middleware
- **Functionality**: Checks that the user is authenticated to access certain routes.

---
