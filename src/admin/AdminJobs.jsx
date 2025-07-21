import { useEffect, useState } from 'react';

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    category: '',
    salary: '',
    description: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = jobs.filter((job) => job.id !== id);
    setJobs(updated);
    localStorage.setItem('jobs', JSON.stringify(updated));
  };

  const handleAddJob = () => {
    if (!newJob.title || !newJob.company || !newJob.location) return;

    const jobToAdd = { ...newJob, id: Date.now() };
    const updated = [...jobs, jobToAdd];
    setJobs(updated);
    localStorage.setItem('jobs', JSON.stringify(updated));
    setNewJob({ title: '', company: '', location: '', category: '', salary: '', description: '' });
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-5 text-center">Admin Job Listings</h1>

      <h2 className="text-xl font-semibold mb-3">Add New Job</h2>
      <div className="mb-6 flex flex-wrap gap-3">
        {['title', 'company', 'location', 'category', 'salary', 'description'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newJob[field]}
            onChange={(e) => setNewJob({ ...newJob, [field]: e.target.value })}
            className="border rounded-md p-2 w-72"
          />
        ))}
        <button
          onClick={handleAddJob}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded mt-2">Add Job</button>
      </div>

      <h2 className="text-xl font-semibold mb-3">All Job Listings</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-600">No job listings found.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-300 p-4 rounded-md shadow-sm"
            >
              <p><span className="font-bold">Title:</span> {job.title}</p>
              <p><span className="font-bold">Company:</span> {job.company}</p>
              <p><span className="font-bold">Location:</span> {job.location}</p>
              <p><span className="font-bold">Category:</span> {job.category}</p>
              <p><span className="font-bold">Salary:</span> {job.salary}</p>
              <p><span className="font-bold">Description:</span> {job.description}</p>
              <button
                onClick={() => handleDelete(job.id)}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminJobs;
