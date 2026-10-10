# Task Manager API

REST API for a task management application built with Node.js, Express, TypeScript and PostgreSQL.

## 🚀 Live

API URL: `https://task-manager-api-production-d8e6.up.railway.app`

## 🛠 Tech Stack

- **Node.js** + **Express** — HTTP server and routing
- **TypeScript** — static typing
- **PostgreSQL** — relational database
- **JWT** — authentication
- **bcrypt** — password hashing
- **Railway** — cloud deployment

## 📋 Features

- User registration and login with JWT authentication
- Create, list, update and delete tasks
- Filter tasks by status (pending, in_progress, done)
- Passwords hashed with bcrypt
- Auto-run database migrations on startup

## 🔐 Authentication

All task routes require a Bearer token in the Authorization header:

Authorization: Bearer <your_token_here>


## 📡 Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Create a new user |
| POST | `/auth/login` | Login and receive JWT token |

### Tasks
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/tasks` | List all tasks (optional `?status=` filter) |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## ⚙️ Running locally

```bash
# Install dependencies
npm install

# Start PostgreSQL with Docker
docker-compose up -d

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Environment variables

```env
PORT=3333
JWT_SECRET=your_secret_here
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=taskmanager
```

## 🗂 Project structure

src/
├── config/
│ ├── database.ts # PostgreSQL connection
│ └── migrations.ts # Auto-run table creation
├── controllers/
│ ├── authController.ts
│ └── tasksController.ts
├── middlewares/
│ └── authMiddleware.ts
├── routes/
│ ├── authRoutes.ts
│ └── tasksRoutes.ts
└── server.ts