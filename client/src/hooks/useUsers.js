import { useState, useEffect, useCallback } from 'react';
import { userAPI } from '../services/api';
import { useToast } from '../contexts/ToastContext';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Create user
  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await userAPI.create(userData);
      setUsers((prev) => [...prev, newUser]);
      toast.success('User created successfully!');
      return newUser;
    } catch (err) {
      toast.error(err.message || 'Failed to create user');
      throw err;
    }
  }, [toast]);

  // Update user
  const updateUser = useCallback(async (id, userData) => {
    try {
      const updatedUser = await userAPI.update(id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );
      toast.success('User updated successfully!');
      return updatedUser;
    } catch (err) {
      toast.error(err.message || 'Failed to update user');
      throw err;
    }
  }, [toast]);

  // Delete user
  const deleteUser = useCallback(async (id) => {
    try {
      await userAPI.delete(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success('User deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
      throw err;
    }
  }, [toast]);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
}
