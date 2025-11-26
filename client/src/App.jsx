import { useState, useMemo } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import { useDarkMode } from './hooks/useDarkMode';
import { useUsers } from './hooks/useUsers';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import UserGrid from './components/UserGrid';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import DeleteModal from './components/DeleteModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import ToastContainer from './components/ToastContainer';

function AppContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { users, loading, createUser, updateUser, deleteUser } = useUsers();

  // View mode state
  const [viewMode, setViewMode] = useState('grid');

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;

    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
    );
  }, [users, searchTerm]);

  // Handlers for modals
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  // CRUD operations
  const handleCreateUser = async (userData) => {
    await createUser(userData);
  };

  const handleUpdateUser = async (userData) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, userData);
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
    }
  };

  // Inline update for table
  const handleInlineUpdate = async (userId, userData) => {
    await updateUser(userId, userData);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header */}
      <Header onAddUser={handleOpenCreateModal} onToggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <Toolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          userCount={filteredUsers.length}
        />

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Empty State */}
        {!loading && users.length === 0 && <EmptyState onAddUser={handleOpenCreateModal} />}

        {/* User Views */}
        {!loading && users.length > 0 && (
          <>
            {viewMode === 'grid' && (
              <UserGrid
                users={filteredUsers}
                searchTerm={searchTerm}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            )}

            {viewMode === 'list' && (
              <UserTable
                users={filteredUsers}
                searchTerm={searchTerm}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
                onUpdate={handleInlineUpdate}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <UserForm
        isOpen={isCreateModalOpen}
        mode="create"
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateUser}
      />

      <UserForm
        isOpen={isEditModalOpen}
        mode="edit"
        user={selectedUser}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateUser}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        user={selectedUser}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
