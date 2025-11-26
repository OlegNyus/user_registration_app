import { useState } from 'react';
import PropTypes from 'prop-types';
import { highlightText } from '../utils/highlight';

// Helper function to get initials from name
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Helper to get avatar color based on user ID
function getAvatarColor(id) {
  const colors = [
    { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-600 dark:text-blue-300' },
    { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-600 dark:text-purple-300' },
    { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-600 dark:text-green-300' },
    { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-600 dark:text-yellow-300' },
    { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-600 dark:text-red-300' },
    { bg: 'bg-pink-100 dark:bg-pink-900', text: 'text-pink-600 dark:text-pink-300' },
  ];
  return colors[id % colors.length];
}

// Helper to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function UserTable({ users, searchTerm, onEdit, onDelete, onUpdate }) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Handle column sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Sort users
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField) return 0;

    let aVal, bVal;

    if (sortField === 'name') {
      aVal = a.name;
      bVal = b.name;
    } else if (sortField === 'email') {
      aVal = a.email;
      bVal = b.email;
    } else if (sortField === 'date') {
      aVal = a.createdAt;
      bVal = b.createdAt;
    }

    if (sortOrder === 'asc') {
      return aVal.localeCompare(bVal);
    } else {
      return bVal.localeCompare(aVal);
    }
  });

  // Inline editing handlers
  const handleDoubleClick = (userId, field, value) => {
    setEditingCell({ userId, field });
    setEditValue(value);
  };

  const handleSaveEdit = async (userId) => {
    if (!editingCell) return;

    const newValue = editValue.trim();
    const user = users.find(u => u.id === userId);

    if (newValue && newValue !== user[editingCell.field]) {
      try {
        const updateData = { [editingCell.field]: newValue };
        await onUpdate(userId, updateData);
      } catch (error) {
        // Error already handled by useUsers hook
      }
    }

    setEditingCell(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyDown = (e, userId) => {
    if (e.key === 'Enter') {
      handleSaveEdit(userId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Sort icon
  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
        </svg>
      );
    }

    if (sortOrder === 'asc') {
      return (
        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" data-test="user-list">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <tr>
            <th
              onClick={() => handleSort('name')}
              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors select-none"
              data-test="sort-header-name"
            >
              <div className="flex items-center gap-2">
                <span>User</span>
                <SortIcon field="name" />
              </div>
            </th>
            <th
              onClick={() => handleSort('email')}
              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors select-none"
              data-test="sort-header-email"
            >
              <div className="flex items-center gap-2">
                <span>Email</span>
                <SortIcon field="email" />
              </div>
            </th>
            <th
              onClick={() => handleSort('date')}
              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors select-none"
              data-test="sort-header-date"
            >
              <div className="flex items-center gap-2">
                <span>Created</span>
                <SortIcon field="date" />
              </div>
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedUsers.map((user) => {
            const initials = getInitials(user.name);
            const avatarColor = getAvatarColor(user.id);
            const isEditingName = editingCell?.userId === user.id && editingCell?.field === 'name';
            const isEditingEmail = editingCell?.userId === user.id && editingCell?.field === 'email';

            return (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" data-test={`user-row-${user.id}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${avatarColor.bg} rounded-full flex items-center justify-center mr-3`}>
                      <span className={`${avatarColor.text} font-semibold text-sm`}>{initials}</span>
                    </div>
                    <div>
                      {isEditingName ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleSaveEdit(user.id)}
                          onKeyDown={(e) => handleKeyDown(e, user.id)}
                          className="border-2 border-blue-500 rounded px-2 py-1 text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-700 outline-none"
                          data-test="inline-edit-field"
                          autoFocus
                        />
                      ) : (
                        <div
                          className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          data-test={`list-user-name-${user.id}`}
                          onDoubleClick={() => handleDoubleClick(user.id, 'name', user.name)}
                          title="Double-click to edit"
                        >
                          {highlightText(user.name, searchTerm)}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditingEmail ? (
                    <input
                      type="email"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSaveEdit(user.id)}
                      onKeyDown={(e) => handleKeyDown(e, user.id)}
                      className="border-2 border-blue-500 rounded px-2 py-1 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 outline-none"
                      data-test="inline-edit-field"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      data-test={`list-user-email-${user.id}`}
                      onDoubleClick={() => handleDoubleClick(user.id, 'email', user.email)}
                      title="Double-click to edit"
                    >
                      {highlightText(user.email, searchTerm)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400" data-test={`list-user-date-${user.id}`}>
                    {formatDate(user.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3"
                    data-test={`list-edit-btn-${user.id}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    data-test={`list-delete-btn-${user.id}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchTerm: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
