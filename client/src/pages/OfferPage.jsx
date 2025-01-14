import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { loadUser } from "../features/auth/authSlice";
import Card from "../components/Card";
import { MdFitnessCenter } from "react-icons/md";
import { IoIosBody, IoMdCalendar } from "react-icons/io";

export default function OfferPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden">
      {/* Glowing circle blur effect */}
      <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-gradient-to-r from-green-300 to-blue-300 opacity-20 blur-[120px] z-0" />

      <motion.h1
        className="text-[#F1FDDB] text-5xl font-extrabold mb-16 text-center z-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What We Offer
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card
          icon={<MdFitnessCenter />}
          title="BMI Calculator"
          desc="Track Your Ideal Weight: Calculate Your BMI in Seconds"
          btnText="Calculate"
          link="/bmi"
          whileHover={{ scale: 1.05 }}
        />
        <Card
          icon={<IoIosBody />}
          title="Body Fat Analyzer"
          desc="Measure Your Body Fat, Achieve Your Health Goals"
          btnText="Analyze"
          link="/bodyfat"
          whileHover={{ scale: 1.05 }}
        />
        <Card
          icon={<IoMdCalendar />}
          title="Appointment Manager"
          desc="Manage Your Appointments: View, Track, and Stay Updated"
          btnText={user?.role === "admin" || user?.role === "doctor" ? "Check" : "Book"}
          link={token ? "/dashboard" : "/login"}
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>
    </section>
  );
}

