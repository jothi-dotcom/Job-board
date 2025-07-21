import { useEffect, useState } from 'react';

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = applications.filter((app) => app.id !== id);
    setApplications(updated);
    localStorage.setItem('applications', JSON.stringify(updated));
  };

  const handleEdit = (id, currentStatus) => {
    setEditingId(id);
    setEditedStatus(currentStatus);
  };

  const handleSave = (id) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: editedStatus } : app
    );
    setApplications(updated);
    localStorage.setItem('applications', JSON.stringify(updated));
    setEditingId(null);
    setEditedStatus('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Job Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications found.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="border rounded p-4 shadow bg-white space-y-2">
              <p> <span className="font-semibold">Job ID:</span> {app.jobId}</p>
              <p> <span className="font-semibold">Applicant:</span> {app.applicantName}</p>
              <p> <span className="font-semibold">Status:</span>{' '}
                {editingId === app.id ? (
                  <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} className="border px-2 py-1 rounded">
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  <span className="text-green-700 font-medium">{app.status}</span>
                )}
              </p>

              <div className="space-x-2 mt-2">
                {editingId === app.id ? (
                  <button onClick={() => handleSave(app.id)}
                   className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"> Save </button>
                ) : (
                  <button onClick={() => handleEdit(app.id, app.status)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600" > Edit</button>
                )}
                <button onClick={() => handleDelete(app.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminApplications;
