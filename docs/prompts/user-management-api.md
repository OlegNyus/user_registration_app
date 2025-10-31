Creating the Rest API

1. Goal
Create a Rest API for user management using Javascript and Express to allow CRUD operations (Create, Read, Update, Delete) on users.

2. Context
2.1. The API should support standard REST operations for user management: creating new users, retrieving users, updating existing users, and deleting users.

3. Rules
3.1. This API should have the following endpoints: a) POST /users - Create user, b) GET /users - Get all users, c) GET /users/:id - Get user by ID, d) PUT /users/:id - Update user, e) DELETE /users/:id - Delete user, and f) GET /health - Health check endpoint.
3.2. This API should have a clear organization with Routes, Middleware, Controller, Service, and Model under the src folder.
3.3. The API should manage user data with fields: id, name, email, and createdAt.
3.4. The API should have a Swagger endpoint that loads a Swagger yaml file.
3.5. Everything should run on memory, no databases will be created.
3.6. The API models should start with 3 pre-populated users.
3.7. A README.md should be created to document the project and it should includes: Description, Installation, How to Run, Rules, Data Already Existent, and How to Use the Rest API.
3.8. You should stick to what I am asking you, don't add additional components (e.g., test automation)
3.9. Keep it simple.