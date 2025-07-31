import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaUserCircle, FaTachometerAlt } from 'react-icons/fa';
import { MdMiscellaneousServices } from 'react-icons/md';
import Logo from '../assets/ZumarLogo.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const getLinkStyles = (path) => {
    return `flex items-center justify-center transition-all p-3 rounded-full border border-[#ecd4bc] ${
      isActive(path)
        ? 'bg-[#57123f] text-[#ecd4bc]'
        : 'bg-white text-[#57123f] hover:bg-opacity-90'
    }`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-[#57123f] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
          <img src={Logo} alt="Zumar Law Firm" width={150} />
        </Link>

        {isLoggedIn && (
          <div className="flex items-center gap-6">
            <Link to="/" className={getLinkStyles('/')}>
              <FaHome className="text-2xl" />
            </Link>
            <Link to="/services" className={getLinkStyles('/services')}>
              <MdMiscellaneousServices className="text-2xl" />
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={getLinkStyles('/account')}
              >
                <FaUserCircle className="text-2xl" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {/* New User Panel Link */}
                    <Link
                      to="/userpanel"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#57123f] hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaTachometerAlt /> User Panel
                    </Link>

                    {/* Existing Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[#57123f] hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
