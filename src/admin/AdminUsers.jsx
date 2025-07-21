import { useEffect, useState } from 'react';

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dummyUsers = [
      { id: 1, name: 'Alice', role: 'user' },
      { id: 2, name: 'Bob', role: 'employer' },
      { id: 3, name: 'Charlie', role: 'user' },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleDelete = (id) => {
    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin - User Accounts</h1>

      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="border border-gray-300 p-4 rounded shadow-sm bg-white"
            >
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Role:</span> {user.role}
              </p>
              <button
                onClick={() => handleDelete(user.id)}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">  Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
