import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './component/Home';
import Navbar from './component/Navbar';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';
import Register from './accout/Register';
import Login from './accout/Login';
import UserDashboard from './accout/UserDashboard';
import PostedJob from './employer/PostedJob';
import EditJob from './employer/EditJob';
import EmployerDashboard from './employer/EmployerDasboard';
import EmployerLogin from './employer/EmployerLogin';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminJobs from './admin/AdminJobs';
import ApplyJob from './pages/Applyjob';




function App() {
  const [employerJobs, setEmployerJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(saved);
  }, []);

  const handlePost = (job) => setEmployerJobs([...employerJobs, job]);

  const handleDelete = (id) => {
    setEmployerJobs(employerJobs.filter((j) => j.id !== id));
  };

  const handleUpdate = (updatedJob) => {
    setEmployerJobs((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
  };

  const handleApply = (jobId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user?.name || 'Unknown';

    const alreadyApplied = applications.some(
      (app) => app.jobId === jobId && app.applicantName === userName
    );

    if (alreadyApplied) {
      alert('You have already applied for this job.');
      return;
    }

    const newApp = {
      id: Date.now(),
      jobId: jobId,
      applicantName: userName,
      status: 'Submitted',
    };

    const updated = [...applications, newApp];
    setApplications(updated);
    localStorage.setItem('applications', JSON.stringify(updated));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails onApply={handleApply} />} />
        <Route path="/user/applications" element={<MyApplications applications={applications} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer"element={localStorage.getItem('role') === 'employer' ? <EmployerDashboard /> : <Navigate to="/employer/login" />}/>
        <Route path="/employer/post" element={localStorage.getItem('role') === 'employer' ? <PostedJob /> : <Navigate to="/employer/login" />}/>
        <Route path="/employer/edit/:id" element={localStorage.getItem('role') === 'employer' ? <EditJob /> : <Navigate to="/employer/login" />}/>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={isAdmin ? <AdminLayout /> : <Navigate to="/admin/login" />} />
        <Route path='/adminjob' element={<AdminJobs />} />
        <Route path="/apply/:id" element={<ApplyJob />} />



    



      </Routes>
    </Router>
  );
}

export default App;
