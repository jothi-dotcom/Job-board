import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
      <p className="mt-2 text-gray-600">You can view and manage your job applications here.</p>
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Logout</button>
    </div>
  );
}

export default UserDashboard;
