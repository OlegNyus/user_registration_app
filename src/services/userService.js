const userModel = require('../models/userModel');

// Get all users (with optional pagination)
function getAllUsers(page = 1, limit = 10) {
  const allUsers = userModel.getAllUsers();

  // If limit is -1 or 0, return all users without pagination
  if (limit <= 0) {
    return {
      users: allUsers,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: allUsers.length,
        itemsPerPage: allUsers.length,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  }

  const totalItems = allUsers.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = allUsers.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    }
  };
}

// Get user by ID
function getUserById(id) {
  const user = userModel.getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

// Create a new user
function createUser(data) {
  // Validate required fields
  if (!data.name || !data.email) {
    throw new Error('Name and email are required');
  }

  // Check for duplicate email
  const existingUser = userModel.getAllUsers().find(u => u.email === data.email);
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Validate email format (simple validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Invalid email format');
  }

  return userModel.createUser({
    name: data.name.trim(),
    email: data.email.trim()
  });
}

// Update user by ID
function updateUser(id, data) {
  // Check if user exists
  const existingUser = userModel.getUserById(id);
  if (!existingUser) {
    throw new Error('User not found');
  }

  // Validate email if provided
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format');
    }

    // Check for duplicate email (excluding current user)
    const duplicateUser = userModel.getAllUsers().find(u => u.email === data.email && u.id !== parseInt(id));
    if (duplicateUser) {
      throw new Error('Email already exists');
    }
  }

  // Prepare update data
  const updateData = {};
  if (data.name !== undefined) {
    updateData.name = data.name.trim();
  }
  if (data.email !== undefined) {
    updateData.email = data.email.trim();
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error('No fields to update');
  }

  return userModel.updateUser(id, updateData);
}

// Delete user by ID
function deleteUser(id) {
  const user = userModel.getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return userModel.deleteUser(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

