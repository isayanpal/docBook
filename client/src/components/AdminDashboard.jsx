import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { deleteAppointment } from '../features/appointments/appointmentSlice';
import toast from 'react-hot-toast';
import AppointmentList from './AppointmentList';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);

  const handleDelete = (id) => {
    dispatch(deleteAppointment(id))
      .then(() => {
        toast.success('Appointment Removed');
      })
      .catch((error) => {
        toast.error('Failed to remove appointment');
      });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">All Appointments</h2>
      <AppointmentList appointments={appointments} isAdmin handleDelete={handleDelete} />
    </motion.div>
  );
};

export default AdminDashboard;

