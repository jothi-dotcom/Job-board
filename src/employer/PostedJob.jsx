import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostJob({ onPost }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    category: '',
    salary: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { ...form, id: Date.now() };
    const existingJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
    const updatedJobs = [...existingJobs, newJob];
    localStorage.setItem('postedJobs', JSON.stringify(updatedJobs));
    if (onPost) onPost(newJob);
    navigate('/employer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['title', 'company', 'location', 'category', 'salary', 'description'].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="capitalize mb-1 font-semibold">{field}</label>
              <input
                name={field}
                placeholder={`Enter ${field}`}
                value={form[field]}
                onChange={handleChange}
                required
                className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded" >Post Job </button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
