import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch('/dp.json')
      .then(res => res.json())
      .then(response => {
        const jobs = response.data || [];
        const adminJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const allJobs = [...jobs, ...adminJobs];
        const foundJob = allJobs.find(j => j.id === parseInt(id));
        setJob(foundJob);
      });
  }, [id]);

  const handleApplyClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('Please login first to apply.');
      navigate('/login');
    } else {
      navigate(`/apply/${id}`);
    }
  };

  if (!job) {
    return <p className="text-center p-6 text-red-500">Job not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold">{job.title}</h2>
      <p className="text-gray-700">{job.company} — {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p className="mt-2 italic">{job.summary}</p>
      <p className="mt-4">{job.description}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleApplyClick}
          className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
        >
          Apply Now
        </button>
        <button
          onClick={() => navigate('/jobs')}
          className="px-6 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
        >
          Back to Jobs
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
