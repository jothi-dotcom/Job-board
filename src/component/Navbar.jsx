import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="p-4 flex justify-between items-center bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Job Board</h1>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      <div className={`flex-col md:flex md:flex-row md:space-x-4 ${menuOpen ? 'flex' : 'hidden'} md:block`}>
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/user/applications">My Applications</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        <Link to="/employer">Employer</Link>
        <Link to="/admin/login">Admin</Link>

      </div>
    </nav>
  );
}

export default Navbar;
