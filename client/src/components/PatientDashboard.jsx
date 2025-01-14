import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { createAppointment } from '../features/appointments/appointmentSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppointmentList from './AppointmentList';

const PatientDashboard = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [doctors, setDoctors] = useState([]);

  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to fetch doctors');
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    dispatch(createAppointment({ doctorId, date, time }))
      .then(() => {
        setDate('');
        setTime('');
        setDoctorId('');
        toast.success('Appointment Booked');
        window.location.reload();
      })
      .catch((error) => {
        toast.error('Failed to book appointment');
      });
  };

  return (
    <div className="space-y-12">
<div className='flex justify-center'>
<motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gradient-to-br from-white to-gray-200 dark:from-gray-800 dark:to-gray-900 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:w-1/2 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Book Your Appointment</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bef96f]"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.username}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bef96f]"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bef96f]"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#bef96f] text-black font-medium rounded-md hover:bg-[#a1e155] transition-colors duration-300"
          >
            Book Appointment
          </button>
        </form>
      </motion.div>
</div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
        <AppointmentList
          appointments={appointments.filter(
            (appointment) => appointment.patient._id === user._id
          )}
        />
      </motion.div>
    </div>
  );
};

export default PatientDashboard;