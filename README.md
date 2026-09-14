# Wikia Vanilla

Project for a simple wiki editor with a React frontend and FastAPI backend.

## Project structure

- backend/: FastAPI application, database configuration, models, and Alembic migrations
- frontend/: React + Vite frontend application
- docker-compose.yml: PostgreSQL service for local development
- README.md: project documentation

## Technologies used

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- python-dotenv

### Frontend

- React
- Vite
- JavaScript

### Local development tools

- Docker Compose
- npm
- pip

## Requirements

Before running the project, make sure you have:

- Python 3.10 or newer
- Node.js 18 or newer
- npm
- Docker Desktop or Docker Engine
- Git

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd wikia-vanilla
```

### 2. Set up the backend

Go to the backend folder and create a virtual environment:

```bash
cd backend
python -m venv .venv
```

Activate it:

On Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

On macOS/Linux:

```bash
source .venv/bin/activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Create a .env file in the backend directory:

```env
DATABASE_URL=postgresql://appuser:apppassword@localhost:5432/appdb
```

### 3. Start the database

From the project root:

```bash
docker compose up -d
```

This starts the PostgreSQL database defined in docker-compose.yml.

### 4. Run the backend

From the backend folder:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

- http://localhost:8000/health
- http://localhost:8000/db-check

### 5. Run the frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

- http://localhost:5173

## Database notes

The project currently uses PostgreSQL and SQLAlchemy models. Alembic is included for migrations and database versioning.

## Development notes

This is still an early MVP. The current architecture is intentionally simple:

- FastAPI handles backend routes
- SQLAlchemy manages database access
- React handles the interface
- PostgreSQL stores app data
- Docker simplifies local database setup

As the project grows, it will likely need more structure around routes, services, models, and editor-specific logic.

## Basic usage

1. Start PostgreSQL with Docker.
2. Start the backend.
3. Start the frontend.
4. Open the app in the browser and begin using the editor.

## License

This project does not currently include a license file. Add one before distributing or publishing the project.
