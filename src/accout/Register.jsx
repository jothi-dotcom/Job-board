import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user)); 
    alert('Registered Successfully');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
