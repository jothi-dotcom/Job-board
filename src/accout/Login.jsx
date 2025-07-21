import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && input.email === savedUser.email && input.password === savedUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/user');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input name="email" type="email" placeholder="Email" onChange={e => setInput({ ...input, email: e.target.value })} className="w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" onChange={e => setInput({ ...input, password: e.target.value })} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
