import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import AppointmentList from './AppointmentList';

const DoctorDashboard = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
      <AppointmentList
        appointments={appointments.filter(
          (appointment) => appointment.doctor._id === user._id
        )}
      />
    </motion.div>
  );
};

export default DoctorDashboard;

