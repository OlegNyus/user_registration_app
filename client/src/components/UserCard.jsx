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

export default function UserCard({ user, searchTerm, onEdit, onDelete }) {
  const initials = getInitials(user.name);
  const avatarColor = getAvatarColor(user.id);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow card-enter" data-test={`user-card-${user.id}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white" data-test={`user-name-${user.id}`}>
            {highlightText(user.name, searchTerm)}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1" data-test={`user-email-${user.id}`}>
            {highlightText(user.email, searchTerm)}
          </p>
        </div>
        <div className={`w-10 h-10 ${avatarColor.bg} rounded-full flex items-center justify-center`}>
          <span className={`${avatarColor.text} font-semibold`}>{initials}</span>
        </div>
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500 mb-4" data-test={`user-created-${user.id}`}>
        Created: {formatDate(user.createdAt)}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(user)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
          data-test={`edit-user-btn-${user.id}`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user)}
          className="flex-1 px-4 py-2 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
          data-test={`delete-user-btn-${user.id}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  searchTerm: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
