import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineLocalHospital, MdLogout, MdClose } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged Out");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to={"/"}
          className="text-[#34F655] text-2xl font-bold flex flex-row items-center"
        >
          <MdOutlineLocalHospital /> DocBook
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white" aria-label="Toggle menu">
            <GiHamburgerMenu size={24} />
          </button>
        </div>
        <div className={`fixed top-0 right-0 bottom-0 z-50 w-64 bg-black transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 md:bg-transparent md:w-auto md:flex md:space-x-4`}>
          <div className="flex flex-col h-full gap-2 p-4 md:p-0 md:flex-row">
            <button onClick={toggleMenu} className="self-end text-white mb-8 md:hidden" aria-label="Close menu">
              <MdClose size={24} />
            </button>
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-300 flex flex-row items-center gap-1 py-2 md:py-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LuLayoutDashboard /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 flex flex-row items-center gap-1 py-2 md:py-0"
                >
                  Logout <MdLogout />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="w-full md:w-[100px] rounded-xl p-2 bg-[#BEF96F] flex flex-row gap-1 justify-center items-center mt-2 md:mt-0"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;

