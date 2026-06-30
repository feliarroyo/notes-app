# Notes App

- Single Page Web Application (SPA), frontend and backend are separate apps
- Backend app developed using Java + Spring Boot, provides REST API for communication with frontend
- Frontend app developed using React.

## Prerequisites

- **Docker Desktop** (24.0 or higher)
- **Bash or Zsh terminal** (to run run.sh)

## How to run

- To run the complete application environment (Backend + Frontend + Database), ensure **Docker Desktop** is running and execute the following command on Bash:
`./run.sh`
- Once the containers are built and started, navigate to: `http://localhost` to start the application.

## Functionality

The app has implemented the features expected in Phase 1 and 2 of the exercise. These include:

- CRUD operations on notes
- Archive/unarchive notes
- See active notes
- See archived notes
- Support for multiple tags per note.
- Filter notes by tags.

## Technologies

- Backend: Java 17 LTS, Spring Boot 4.1.0, Spring Data JPA, Hibernate, PostgreSQL.
- Frontend: React 19.x, Tailwind CSS 4.x, Vite 8.x.
- Database: PostgreSQL 15 (containerized via Docker).
- Containerization: Docker & Docker Compose.

## Architecture

- /backend/notes: Spring Boot project.
- /frontend: React SPA project.
- docker-compose.yml: Orchestration for the database, backend, and frontend.
- run.sh: Master automation script for Linux/macOS environments.

## Database Design

The application uses a Many-to-Many relationship between Notes and Tags, managed through a join table (note_tags), allowing for efficient query performance and data integrity.
