import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/ZumarLogo.png';
import { FaTachometerAlt, FaUsers, FaTasks, FaSignOutAlt, FaBars, FaMoneyCheckAlt, FaUserShield, FaUserFriends, FaUserCog, FaChevronDown, FaPlus, FaFileImport, FaExchangeAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';


const Sidebar = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get(`${API_BASE_URL}/admin/logout`, { withCredentials: true });
            localStorage.removeItem('adminToken');
            localStorage.removeItem('employeeToken');
            toast.success('Successfully logged out');
            navigate('/admin/login');
        } catch (err) {
            console.error(err);
            toast.error('Logout failed');
        }
    };

    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin', alwaysShow: true },
        {
            name: 'Lead Management', icon: <FaUserFriends />, path: '/admin/leads',
            children: [
                { name: 'Add Lead', path: '/admin/leads/add', icon: <FaPlus /> },
                { name: 'Import Lead', path: '/admin/leads/import', icon: <FaFileImport /> },
            ]
        },
        {
            name: 'Service Processing', icon: <FaTasks />, path: '/admin/services',
            children: [
                { name: 'Converted Service', path: '/admin/services/converted', icon: <FaExchangeAlt /> },
            ]
        },
        {
            name: 'Payroll', icon: <FaMoneyCheckAlt />, path: '/admin/payroll',
            children: [
                { name: 'New Payroll', path: '/admin/payroll/add', icon: <FaPlus /> },
            ]
        },
        {
            name: 'Roles', icon: <FaUserShield />, path: '/admin/roles',
            children: [
                { name: 'Add New Employee', path: '/admin/roles/add', icon: <FaPlus /> },
            ]
        },
        { name: 'Customers', icon: <FaUsers />, path: '/admin/customers' },
        { name: 'Account', icon: <FaUserCog />, path: '/admin/account' },
    ];

    return (
        <>
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow-md"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <FaBars size={20} />
            </button>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 transform transition-transform duration-300 
    w-64  bg-white shadow-md flex flex-col justify-between min-h-screen
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 md:static md:flex`}
            >
                <div>
                    <div className="flex items-center justify-center py-2 px-4 bg-[#57123f]">
                        <img width={170} src={logo} alt="logo" />
                    </div>
                    <nav className="mt-6">
                        <ul className="space-y-2 px-4">
                            {menuItems.map((item) => {
                                if (item.children) {
                                    const isOpen = openAccordion === item.name;
                                    return (
                                        <li key={item.name}>
                                            <div className="relative">
                                                <Link
                                                    to={item.path}
                                                    onClick={() => setSidebarOpen(false)}
                                                    className={`flex items-center gap-2 p-2 w-full rounded-lg transition-colors ${location.pathname.startsWith(item.path)
                                                        ? 'bg-[#57123f] text-white'
                                                        : 'text-gray-600 hover:bg-[#57123f] hover:text-white'
                                                        }`}
                                                >
                                                    {item.icon}
                                                    {item.name}
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-white absolute right-2 top-1/2 -translate-y-1/2 p-1 focus:outline-none"
                                                    onClick={() => setOpenAccordion(isOpen ? '' : item.name)}
                                                    tabIndex={-1}
                                                >
                                                    <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${location.pathname.startsWith(item.path) ? 'text-white' : 'text-black'}`} />
                                                </button>
                                            </div>
                                            <ul className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`} style={{transitionProperty: 'max-height, opacity'}}>
                                                {item.children.map((child) => (
                                                    <li key={child.name}>
                                                        <Link
                                                            to={child.path}
                                                            onClick={() => setSidebarOpen(false)}
                                                            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === child.path
                                                                ? 'bg-[#57123f] text-white'
                                                                : 'text-gray-600 hover:bg-[#57123f] hover:text-white'
                                                                }`}
                                                        >
                                                            {child.icon}
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    );
                                }
                                return (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === item.path
                                                ? 'bg-[#57123f] text-white'
                                                : 'text-gray-600 hover:bg-[#57123f] hover:text-white'
                                                }`}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 bg-[#57123f] text-white rounded hover:bg-primary/90"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
