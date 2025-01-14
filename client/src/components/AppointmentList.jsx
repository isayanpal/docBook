import React from 'react';
import { motion } from 'framer-motion';

const AppointmentList = ({ appointments, isAdmin, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {appointments.map((appointment, index) => (
        <motion.div
          key={appointment._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.1
          }}
          className="bg-gradient-to-br from-white to-gray-200 dark:from-gray-800 dark:to-gray-900 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {appointment.time}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {new Date(appointment.date).toLocaleDateString()}
            </p>
          </div>
          
          <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
            {isAdmin
              ? `${appointment.patient.username}`
              : isAdmin || appointment.doctor
              ? `Patient Name: ${appointment.patient.username}`
              : `Dr. ${appointment.doctor.username}`}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {isAdmin
              ? `with Dr. ${appointment.doctor.username}`
              : isAdmin || appointment.doctor
              ? `Appointment with Dr. ${appointment.doctor.username}`
              : `Your appointment`}
          </p>
          
          {isAdmin && (
            <button
              onClick={() => handleDelete(appointment._id)}
              className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Cancel Appointment
            </button>
          ) }
        </motion.div>
      ))}
    </div>
  );
};

export default AppointmentList;

