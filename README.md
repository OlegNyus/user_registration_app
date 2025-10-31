# User Registration App

## Description

This is a REST API for user management built with JavaScript and Express.js. It provides CRUD (Create, Read, Update, Delete) operations for managing users. The API uses in-memory storage, meaning no database is required - all data is stored in memory during runtime.

## Installation

1. Make sure you have Node.js installed (version 14 or higher recommended)

2. Install dependencies:
```bash
npm install
```

This will install the following packages:
- `express` - Web framework
- `swagger-ui-express` - Swagger UI for API documentation
- `swagger-jsdoc` - JSDoc annotations for Swagger
- `yamljs` - YAML parser for Swagger documentation

## How to Run

Start the server using:
```bash
npm start
```

The server will start on `http://localhost:3000` by default. You can change the port by setting the `PORT` environment variable:

```bash
PORT=4000 npm start
```

## Rules

1. The API supports standard REST operations for user management
2. All user data is stored in memory (no database)
3. The API follows a layered architecture:
   - **Routes** - Define API endpoints
   - **Controllers** - Handle HTTP requests and responses
   - **Services** - Contain business logic
   - **Models** - Manage data storage
4. The API includes Swagger documentation accessible at `/api-docs`
5. User data includes: `id`, `name`, `email`, and `createdAt` fields
6. The API starts with 3 pre-populated users

## Data Already Existent

The API comes pre-loaded with 3 users:

1. **User ID: 1**
   - Name: John Doe
   - Email: john.doe@example.com
   - Created At: 2024-01-15T00:00:00.000Z

2. **User ID: 2**
   - Name: Jane Smith
   - Email: jane.smith@example.com
   - Created At: 2024-01-16T00:00:00.000Z

3. **User ID: 3**
   - Name: Bob Johnson
   - Email: bob.johnson@example.com
   - Created At: 2024-01-17T00:00:00.000Z

## How to Use the Rest API

### Base URL
All endpoints are available at: `http://localhost:3000`

### API Endpoints

#### 1. Health Check
Check if the API is running:
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:00:00.000Z"
}
```

#### 2. Get All Users
Retrieve all users:
```bash
curl http://localhost:3000/users
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-15T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "createdAt": "2024-01-16T00:00:00.000Z"
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "createdAt": "2024-01-17T00:00:00.000Z"
  }
]
```

#### 3. Get User by ID
Retrieve a specific user by ID:
```bash
curl http://localhost:3000/users/1
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2024-01-15T00:00:00.000Z"
}
```

#### 4. Create User
Create a new user:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Brown",
    "email": "alice.brown@example.com"
  }'
```

**Response:**
```json
{
  "id": 4,
  "name": "Alice Brown",
  "email": "alice.brown@example.com",
  "createdAt": "2024-01-20T10:00:00.000Z"
}
```

#### 5. Update User
Update an existing user by ID:
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com"
  }'
```

**Response:**
```json
{
  "id": 1,
  "name": "John Updated",
  "email": "john.updated@example.com",
  "createdAt": "2024-01-15T00:00:00.000Z"
}
```

#### 6. Delete User
Delete a user by ID:
```bash
curl -X DELETE http://localhost:3000/users/1
```

**Response:**
```json
{
  "message": "User deleted successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-15T00:00:00.000Z"
  }
}
```

### Swagger Documentation

You can view the interactive API documentation by navigating to:
```
http://localhost:3000/api-docs
```

This provides a user-friendly interface to test all endpoints directly from your browser.

### Error Responses

The API returns appropriate error codes:

- **400 Bad Request** - Invalid input (missing required fields, invalid email format, duplicate email)
- **404 Not Found** - User not found
- **500 Internal Server Error** - Server error

Example error response:
```json
{
  "error": "Email already exists"
}
```
