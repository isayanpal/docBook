import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadUser } from '../features/auth/authSlice';
import { fetchAppointments } from '../features/appointments/appointmentSlice';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { loading: appointmentsLoading } = useSelector((state) => state.appointments);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(loadUser());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user && user.role) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, user]);

  if (userLoading || appointmentsLoading || !user) {
    return <LoadingSpinner />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Welcome: {user.username}
        </motion.h1>
        {renderDashboard()}
      </div>
    </motion.div>
  );
};

export default Dashboard;

