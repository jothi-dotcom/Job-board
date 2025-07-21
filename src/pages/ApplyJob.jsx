import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    applicantName: '',
    qualification: '',
    email: '',
    resume: '',
    status: 'Applied'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apps = JSON.parse(localStorage.getItem('applications')) || [];
    apps.push({ id: Date.now(), jobId: id, ...form });
    localStorage.setItem('applications', JSON.stringify(apps));
    alert('Application submitted successfully!');
    navigate('/myapplications');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Apply for Job ID: {id}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="applicantName" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="qualification" placeholder="Qualification" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="resume" placeholder="Resume Link" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplyJob;
