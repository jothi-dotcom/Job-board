import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch('/dp.json')
      .then(res => res.json())
      .then(response => {
        const jobs = response.data || [];
        const adminJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setAllJobs([...jobs, ...adminJobs]);
      });
  };

  const handleSearch = () => {
    fetch('/dp.json')
      .then(res => res.json())
      .then(response => {
        const jobs = response.data || [];
        const adminJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const mergedJobs = [...jobs, ...adminJobs];

        const filtered = mergedJobs.filter(job => {
          const keyword = searchTerm.toLowerCase();
          const keywordMatch = job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.location.toLowerCase().includes(keyword);

          const categoryMatch = categoryFilter ? job.category === categoryFilter : true;
          return keywordMatch && categoryMatch;
        });

        setAllJobs(filtered);
      });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Search Jobs</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        <input
          type="text"
          placeholder="Search jobs, companies, or locations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg border shadow-sm"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-3 rounded-lg border shadow-sm w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Data">Data</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="AI/ML">AI/ML</option>
          <option value="QA">QA</option>
          <option value="Management">Management</option>
          <option value="Marketing">Marketing</option>
          <option value="Internship">Internship</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Search
        </button>
      </div>

      {allJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-6">
          {allJobs.map((job) => (
            <li key={job.id} className="border p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.company} — {job.location}</p>
              <p className="text-sm text-gray-500 mb-2">Category: {job.category}</p>
              <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:underline font-medium">View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Jobs;
