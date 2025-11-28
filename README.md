# User Registration App

## Description

A full-stack user management application with a REST API backend and modern React frontend. The application provides CRUD (Create, Read, Update, Delete) operations for managing users through both API endpoints and an interactive web interface. All data is stored in-memory, meaning no database is required.

## Tech Stack

### Backend
- Node.js + Express.js
- In-memory data storage
- CORS enabled
- Swagger/OpenAPI documentation

### Frontend
- React 19
- Vite (build tool)
- Tailwind CSS
- Custom hooks for state management
- Context API for global state

## Installation

1. Make sure you have Node.js installed (version 14 or higher recommended)

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

## How to Run

### Option 1: Run Both Servers Separately

**Terminal 1 - Start the backend server:**
```bash
npm start
```
Backend will run on `http://localhost:3000`

**Terminal 2 - Start the frontend dev server:**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

### Option 2: Change Backend Port

If you need to run the backend on a different port:
```bash
PORT=4000 npm start
```
Don't forget to update `client/.env` with the new backend URL.

### Accessing the Application

- **Frontend UI**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs

## Features

### Frontend UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes (persisted in localStorage)
- **Two View Modes**:
  - **Grid View**: Card-based layout with user avatars
  - **List View**: Table layout with sortable columns
- **Search**: Real-time search by name or email with highlighted results
- **Sorting**: Click column headers to sort by name, email, or creation date (ascending/descending)
- **Inline Editing**: Double-click name or email cells in list view to edit directly
- **Toast Notifications**: Success and error messages for all operations
- **Loading States**: Skeleton loaders while fetching data
- **Empty State**: Friendly message when no users exist
- **Animations**: Smooth transitions for cards, modals, and toasts
- **All elements tagged with `data-test` attributes for automated testing**

### Backend API Architecture

1. All user data is stored in memory (no database)
2. Layered architecture:
   - **Routes** - Define API endpoints
   - **Controllers** - Handle HTTP requests and responses
   - **Services** - Contain business logic and validation
   - **Models** - Manage data storage
3. CORS enabled for frontend communication
4. Swagger documentation accessible at `/api-docs`
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

## How to Use the Application

### Using the Frontend UI

The easiest way to interact with the application is through the web interface at http://localhost:5173

**Basic Operations:**

1. **View Users**: Users are displayed automatically when you open the app
   - Toggle between Grid and List view using the view mode buttons
   - Use the search bar to filter users by name or email

2. **Add a New User**:
   - Click the "+ Add User" button in the top right
   - Fill in the name and email fields
   - Click "Add User" to create

3. **Edit a User**:
   - **In Grid View**: Click the "Edit" button on any user card
   - **In List View**:
     - Click the "Edit" button, OR
     - Double-click the name or email cell to edit inline
     - Press Enter to save, Escape to cancel inline edits

4. **Delete a User**:
   - Click the "Delete" button on any user
   - Confirm the deletion in the modal

5. **Toggle Dark Mode**: Click the moon/sun icon in the top right corner

6. **Sort Users** (List View only): Click any column header to sort by that field

### Using the REST API

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

## Project Structure

```
user_registration_app/
├── server.js                 # Backend entry point
├── package.json              # Backend dependencies
├── src/                      # Backend source code
│   ├── routes/              # API route definitions
│   ├── controllers/         # Request handlers
│   ├── services/            # Business logic
│   ├── models/              # Data models
│   └── swagger/             # API documentation
│
└── client/                   # Frontend application
    ├── package.json         # Frontend dependencies
    ├── .env                 # Environment variables (API URL)
    ├── index.html          # HTML entry point
    ├── vite.config.js      # Vite configuration
    ├── tailwind.config.js  # Tailwind CSS configuration
    └── src/
        ├── App.jsx                    # Main application component
        ├── main.jsx                   # React entry point
        ├── index.css                  # Global styles and animations
        ├── components/                # React components
        │   ├── Header.jsx
        │   ├── Toolbar.jsx
        │   ├── UserGrid.jsx
        │   ├── UserTable.jsx
        │   ├── UserCard.jsx
        │   ├── UserForm.jsx
        │   ├── DeleteModal.jsx
        │   ├── LoadingSkeleton.jsx
        │   ├── EmptyState.jsx
        │   └── ToastContainer.jsx
        ├── contexts/                  # React contexts
        │   └── ToastContext.jsx
        ├── hooks/                     # Custom React hooks
        │   ├── useDarkMode.js
        │   └── useUsers.js
        ├── services/                  # API service layer
        │   └── api.js
        └── utils/                     # Utility functions
            └── highlight.jsx
```

## Development Notes

- The backend uses in-memory storage, so all data is lost when the server restarts
- The frontend uses Vite's HMR (Hot Module Replacement) for fast development
- CORS is enabled on the backend to allow frontend requests
- All form inputs are validated on both frontend and backend
- Toast notifications provide user feedback for all operations
- Dark mode preference is persisted in browser localStorage

## Future Enhancements

Potential features for future development:
- Persistent storage (database integration)
- User authentication and authorization
- Frontend pagination controls for large user lists
- Export users to CSV/JSON
- Import users from file
- User profile pictures
- Advanced filtering options
- Unit and integration tests
