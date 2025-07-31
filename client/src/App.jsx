import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import UserPrivateRoute from './routes/UserPrivateRoute';
import AdminPrivateRoute from './routes/AdminPrivareRoute';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AddServiceDetails from './pages/AddServiceDetails';
import Payment from './pages/Payment';
import ForgotPassword from './pages/ForgotPassword';
import DirectService from './pages/DirectService';
import UserDashboard from './pages/userDashboard';

import EmployeeLogin from './pages/admin/EmployeeLogin';
import AdminLogin from './pages/admin/AdminLogin';
import LeadsManagment from './pages/admin/LeadsManagment';
import ServiceProcessingPage from './pages/admin/ServiceProcessingPage';
import Roles from './pages/admin/Roles';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';
import AddLeads from './pages/admin/AddLeads';
import ImportLeads from './pages/admin/ImportLeads';
import Customers from './pages/admin/Customers';
import Payroll from './pages/admin/Payroll';
import NewPayroll from './pages/admin/NewPayroll';
import Account from './pages/admin/Account';
import AuthRedirectHandler from './components/AuthRedirectHandler';
import ConvertedService from './pages/admin/ConvertedService';
import NewEmployee from './pages/admin/NewEmployee';
import ManualService from './pages/admin/ManualService';
import FollowUpLeads from './pages/admin/FollowupLeads';
import MatureLeads from './pages/admin/MatureLeads';
import ContactedLeads from './pages/admin/ContactedLeads';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Toaster position="top-center" />
      {!isAdminRoute && <Navbar />}
      <AuthRedirectHandler />
      <Routes>
        {/* Public and User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="payment/:id"
          element={<Payment />}
        />
        <Route path='/add-Service' element={<DirectService />} />
        <Route path="/add-details/:serviceTitle" element={<AddServiceDetails />} />
        <Route path="/userpanel" element={<UserDashboard />} />
        {/* User Protected Route */}
        <Route path="/" element={
          <UserPrivateRoute>
            <Home />
          </UserPrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin" element={
          <AdminPrivateRoute>
            <AdminLayout />
          </AdminPrivateRoute>
        }>
          {/* This index route renders inside AdminLayout's <Outlet /> */}
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<LeadsManagment />} />
          <Route path="services" element={<ServiceProcessingPage />} />
          <Route path="roles" element={<Roles />} />
          <Route path="/admin/payroll" element={<Payroll />} />
          <Route path="/admin/payroll/add/:id" element={<NewPayroll />} />
          <Route path="customers" element={<Customers />} />
          {/* Nested routes for leads management */}
          <Route path='/admin/leads/import' element={<ImportLeads />} />
          <Route path="/admin/leads/add" element={<AddLeads />} />
          <Route path="/admin/payroll/add" element={<NewPayroll />} />
          <Route path="/admin/account" element={<Account />} />
          <Route path="/admin/roles/add" element={<NewEmployee />} />
          <Route path='/admin/leads/followup' element={<FollowUpLeads />} />
          <Route path='/admin/leads/mature' element={<MatureLeads />} />
          <Route path='/admin/leads/contacted' element={<ContactedLeads />} />
          <Route path='/admin/services/manual' element={<ManualService />} />
          <Route path="/admin/services/converted" element={<ConvertedService />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const message = urlParams.get('message');

    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, '/');
      toast.success(message || 'Login Successful!');
    }

    setIsTokenReady(true);
  }, []);

  if (!isTokenReady) return null; // Optional loading spinner

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
