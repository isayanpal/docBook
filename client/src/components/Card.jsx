import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Card({ icon, title, desc, link, btnText, whileHover }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={whileHover}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg w-full max-w-[350px] overflow-hidden"
    >
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="text-[#BEF96F] text-4xl mb-4"
      >
        {icon}
      </motion.div>
      <motion.h3
        initial={{ y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="text-[#F1FDDB] text-xl font-semibold mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-gray-300 mb-6"
      >
        {desc}
      </motion.p>
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          to={link}
          className="inline-flex items-center gap-2 bg-[#BEF96F] text-black font-medium py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_4px_10px_#BEF96F]"
        >
          {btnText}
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <FaArrowRight />
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

