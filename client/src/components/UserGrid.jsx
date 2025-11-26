import PropTypes from 'prop-types';
import UserCard from './UserCard';

export default function UserGrid({ users, searchTerm, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-test="user-grid">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          searchTerm={searchTerm}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

UserGrid.propTypes = {
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
};
