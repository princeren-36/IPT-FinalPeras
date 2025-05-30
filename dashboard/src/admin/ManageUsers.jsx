import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import '../styles/Admin.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [userSnackbar, setUserSnackbar] = useState('');

  // Fetch users from backend on mount
  useEffect(() => {
    fetch('https://kantokusina.vercel.app/user/all')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  const onUserDelete = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(`https://kantokusina.vercel.app/user/${userId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      setUserSnackbar('User deleted!');
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      setUserSnackbar('Error: ' + err.message);
    }
  };

  return (
    <>
      <AdminNavbar tab={2} onTabChange={() => {}} onLogout={() => {}} />
      <div className="admin-root">
        <div className="admin-content">
          <h2 style={{ color: '#ffb347', marginBottom: '1.5rem' }}>Admin - Manage Users</h2>
          <table className="manage-products-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="manage-products-delete-btn"
                      onClick={() => onUserDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userSnackbar && (
            <div className="manage-products-alert" style={{ marginTop: '1rem' }}>{userSnackbar}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageUsers;
