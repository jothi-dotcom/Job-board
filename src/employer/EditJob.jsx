import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    category: '',
    salary: '',
    description: ''
  });

  useEffect(() => {
    const postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
    const job = postedJobs.find(j => j.id === parseInt(id));
    if (job) {
      setForm(job);
    } else {
      alert('Job not found');
      navigate('/employer');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
    const updatedJobs = postedJobs.map(j => j.id === parseInt(id) ? form : j);

    localStorage.setItem('postedJobs', JSON.stringify(updatedJobs));

    alert('Job updated successfully!');
    navigate('/employer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['title', 'company', 'location', 'category', 'salary', 'description'].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="capitalize mb-1 font-medium">{field}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"> Update Job</button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
