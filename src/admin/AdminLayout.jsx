import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminApplications from './AdminApplications';
import AdminJobs from './AdminJobs';

function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('role');
    navigate('/admin/login');
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-3">
          <Link to="/admin/dashboard"className="hover:bg-gray-700 rounded px-3 py-2">Dashboard</Link>
          <Link to="/admin/users"className="hover:bg-gray-700 rounded px-3 py-2"> Users</Link>
          <Link to="/admin/applications"className="hover:bg-gray-700 rounded px-3 py-2">Applications</Link>
          <Link to="/admin/jobs"className="hover:bg-gray-700 rounded px-3 py-2">Jobs</Link>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-3 py-2">Logout</button>
        </nav>
      </div>
      
      <div className="flex-1 p-8 bg-gray-100">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="jobs" element={<AdminJobs />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
