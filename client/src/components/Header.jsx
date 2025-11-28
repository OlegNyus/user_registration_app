import PropTypes from 'prop-types';

export default function Header({ onAddUser, onToggleDarkMode }) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors" data-test="app-header">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white" data-test="app-title">
              User Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your users with ease
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              data-test="dark-mode-toggle"
              title="Toggle dark mode"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>
            {/* Add User Button */}
            <button
              onClick={onAddUser}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              data-test="add-user-btn"
            >
              + Add User
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
};
