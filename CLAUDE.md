# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a REST API for user management built with Node.js and Express.js. The application uses **in-memory storage** (no database) and follows a layered architecture pattern with clear separation of concerns.

## Running the Application

```bash
# Install dependencies
npm install

# Start the server (runs on http://localhost:3000 by default)
npm start

# Change port if needed
PORT=4000 npm start
```

The API includes Swagger documentation available at `http://localhost:3000/api-docs` when the server is running.

## Architecture

The codebase follows a strict **layered architecture** with the following data flow:

```
Routes → Controllers → Services → Models
```

### Layer Responsibilities

1. **Routes** (`src/routes/`) - Define API endpoints and map them to controller methods
2. **Controllers** (`src/controllers/`) - Handle HTTP request/response, status codes, and error mapping
3. **Services** (`src/services/`) - Contain all business logic, validation, and orchestration
4. **Models** (`src/models/`) - Manage data storage and CRUD operations on the in-memory data structure

### Key Architectural Rules

- Controllers must NEVER contain business logic - only HTTP handling
- Services contain ALL validation logic (required fields, email format, duplicate checks)
- Models manage the in-memory `users` array and provide basic CRUD operations
- Error handling flows from Services → Controllers (Services throw errors, Controllers map them to HTTP status codes)

## In-Memory Storage

The `users` array in `src/models/userModel.js` is the single source of truth for all user data. It starts with 3 pre-populated users. All changes are lost when the server restarts.

### User Data Structure

```javascript
{
  id: number,           // Auto-incremented
  name: string,         // Required
  email: string,        // Required, validated format, must be unique
  createdAt: string     // ISO 8601 timestamp, auto-generated
}
```

## API Endpoints

- `GET /health` - Health check
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user (requires `name` and `email` in body)
- `PUT /users/:id` - Update user (optional `name` and/or `email` in body)
- `DELETE /users/:id` - Delete user

## Validation Logic

All validation is performed in the **Service layer** (`src/services/userService.js`):

- Email format validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Email uniqueness check (across all users)
- Required field validation (name and email for POST, at least one field for PUT)
- User existence check for GET/PUT/DELETE by ID

## Swagger Documentation

The API specification is defined in `src/swagger/swagger.yaml` (OpenAPI 3.0 format). The Swagger UI is served at `/api-docs` using the `swagger-ui-express` package and loads the YAML file at server startup.

When modifying endpoints, update both the route handlers and the Swagger YAML file to keep documentation in sync.

## Project Constraints

This project is intentionally kept simple:

- No database (in-memory storage only)
- No test files or test framework
- No additional middleware beyond `express.json()`
- No authentication or authorization
- No logging framework
- No environment configuration beyond PORT

These constraints are by design - do not add these features unless explicitly requested.
