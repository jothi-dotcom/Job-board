import React, { useEffect, useState } from 'react';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedApp, setEditedApp] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(stored);
  }, []);

  const updateLocalStorage = (updatedApps) => {
    localStorage.setItem('applications', JSON.stringify(updatedApps));
  };

  const handleDelete = (id) => {
    const updated = applications.filter((app) => app.id !== id);
    setApplications(updated);
    updateLocalStorage(updated);
  };

  const handleEdit = (app) => {
    setEditingId(app.id);
    setEditedApp({ ...app });
  };

  const handleSave = () => {
    const updated = applications.map((app) =>
      app.id === editingId ? editedApp : app
    );
    setApplications(updated);
    updateLocalStorage(updated);
    setEditingId(null);
  };

  return (
    <div className="p-4 max-w-md md:max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">My Job Applications</h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-700 ">You haven't applied for any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border rounded-lg shadow p-4 space-y-2 bg-white ">


              <div className="font-semibold text-lg">
                Job ID:
                {editingId === app.id ? (
                  <input
                    type="text"
                    value={editedApp.jobId}
                    onChange={(e) => setEditedApp({ ...editedApp, jobId: e.target.value })}
                    className="border p-1 rounded ml-2 "
                  />
                ) : (
                  <span className="ml-2">{app.jobId}</span>
                )}
              </div>


              <div>
                Applicant:
                {editingId === app.id ? (
                  <input
                    type="text"
                    value={editedApp.applicantName}
                    onChange={(e) => setEditedApp({ ...editedApp, applicantName: e.target.value })}
                    className="border p-1 rounded ml-2 dark:bg-gray-700" />
                ) : (
                  <span className="ml-2">{app.applicantName}</span>
                )}
              </div>


              <div>
                Status:
                <span className="ml-2 text-green-700 dark:text-green-400 font-semibold">{app.status}</span>
              </div>


              <div className="flex flex-wrap gap-2 mt-3">
                {editingId === app.id ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded">Save</button>
                ) : (
                  <button
                    onClick={() => handleEdit(app)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"> Edit</button>
                )}
                <button
                  onClick={() => handleDelete(app.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
