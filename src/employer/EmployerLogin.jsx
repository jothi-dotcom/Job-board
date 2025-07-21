import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'jothi15@gmail.com' && password === 'marijothi') {
      localStorage.setItem('role', 'employer');
      navigate('/employer');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Employer Login</h2>
        <input className="w-full border p-2 mb-3 rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border p-2 mb-3 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-green-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default EmployerLogin;
