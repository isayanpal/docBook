import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";
import { BlurText } from "../components/ui/BlurText";

function Home() {
  const features = [
    {
      icon: <FaCalendarAlt />,
      title: "Easy Booking",
      description: "Schedule appointments with just a few clicks",
    },
    {
      icon: <FaChartLine />,
      title: "Health Tracking",
      description: "Monitor your progress with intuitive dashboards",
    },
    {
      icon: <FaLightbulb />,
      title: "Smart Insights",
      description: "Receive personalized health recommendations",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Glowing circle blur effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-green-300 to-blue-300 opacity-20 blur-[100px] z-0" />

      <motion.div
        className="max-w-4xl mx-auto text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 text-[#F1FDDB]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Effortlessly book appointments, <br />
          track your health, and gain insights
        </motion.h1>

        <motion.div
          className="text-[#34F655] font-bold text-2xl sm:text-3xl lg:text-4xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <BlurText
            text="- all just a click away"
            className="text-[#34F655]"
            delay={50}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            to="/offer"
            className="inline-flex items-center gap-2 bg-[#BEF96F] text-black font-medium py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_4px_10px_#BEF96F]"
          >
            Get Started <FaArrowRight />
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
            >
              <div className="text-[#BEF96F] text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-[#F1FDDB] text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Home;
