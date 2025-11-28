import { useState, useEffect, useCallback } from 'react';
import { userAPI } from '../services/api';
import { useToast } from '../contexts/ToastContext';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Fetch all users
  const fetchUsers = useCallback(async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userAPI.getAll(page, limit);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Create user
  const createUser = useCallback(async (userData, currentPage, itemsPerPage) => {
    try {
      const newUser = await userAPI.create(userData);
      toast.success('User created successfully!');
      // Refetch current page to reflect the new user
      await fetchUsers(currentPage, itemsPerPage);
      return newUser;
    } catch (err) {
      toast.error(err.message || 'Failed to create user');
      throw err;
    }
  }, [toast, fetchUsers]);

  // Update user
  const updateUser = useCallback(async (id, userData, currentPage, itemsPerPage) => {
    try {
      const updatedUser = await userAPI.update(id, userData);
      toast.success('User updated successfully!');
      // Refetch current page to reflect the updated user
      await fetchUsers(currentPage, itemsPerPage);
      return updatedUser;
    } catch (err) {
      toast.error(err.message || 'Failed to update user');
      throw err;
    }
  }, [toast, fetchUsers]);

  // Delete user
  const deleteUser = useCallback(async (id, currentPage, itemsPerPage) => {
    try {
      await userAPI.delete(id);
      toast.success('User deleted successfully!');
      // Refetch current page (or previous page if current page becomes empty)
      const newTotalItems = pagination.totalItems - 1;
      const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);
      const pageToFetch = currentPage > newTotalPages ? Math.max(1, newTotalPages) : currentPage;
      await fetchUsers(pageToFetch, itemsPerPage);
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
      throw err;
    }
  }, [toast, fetchUsers, pagination.totalItems]);

  return {
    users,
    pagination,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    fetchUsers,
  };
}
