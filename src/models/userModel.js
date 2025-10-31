// In-memory storage for users
let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    createdAt: new Date('2024-01-16').toISOString()
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    createdAt: new Date('2024-01-17').toISOString()
  }
];

// Get all users
function getAllUsers() {
  return users;
}

// Get user by ID
function getUserById(id) {
  return users.find(user => user.id === parseInt(id));
}

// Create a new user
function createUser(user) {
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: user.name,
    email: user.email,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
}

// Update user by ID
function updateUser(id, userData) {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = {
    ...users[userIndex],
    name: userData.name || users[userIndex].name,
    email: userData.email || users[userIndex].email
  };
  
  return users[userIndex];
}

// Delete user by ID
function deleteUser(id) {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return null;
  }
  
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  return deletedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

