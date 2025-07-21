import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'jothi') {
      localStorage.setItem('role', 'admin');
      navigate('/admin/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 w-full rounded mb-4" />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full" >Login as Admin </button>
      </div>
    </div>
  );
}

export default AdminLogin;
