import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EmployerDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
    setJobs(savedJobs);
  }, []);

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('postedJobs', JSON.stringify(updatedJobs));
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/employer/login');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold">Employer Jobs</h2>
        <div className="flex gap-3">
          <Link to="/employer/post" className="bg-blue-600 text-white px-4 py-2 rounded">Post Job</Link>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job.id} className="border rounded-lg shadow-md p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
                <p className="text-gray-700 mb-1"><strong>Location:</strong> {job.location}</p>
                <p className="text-gray-700 mb-1"><strong>Category:</strong> {job.category}</p>
                <p className="text-gray-700 mb-2"><strong>Salary:</strong> {job.salary}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <Link to={`/employer/edit/${job.id}`} className="flex-1 bg-blue-600 text-white text-center py-2 rounded">Edit</Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded">  Delete </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;
