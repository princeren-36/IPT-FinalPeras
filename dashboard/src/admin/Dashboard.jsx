import React from 'react';
import AdminNavbar from './AdminNavbar';
import '../styles/Admin.css';

function Dashboard() {
  return (
    <>
      <AdminNavbar tab={0} onTabChange={() => {}} onLogout={() => {}} />
      <div className="admin-root">
        <div className="admin-content">
          <h2 style={{ color: '#ffb347', marginBottom: '1.5rem' }}>Welcome, Admin!</h2>
          <p style={{ color: '#fff' }}>Here you can manage users and products.</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
