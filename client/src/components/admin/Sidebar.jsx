import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/ZumarLogo.png';
import {
    FaTachometerAlt, FaUsers, FaTasks, FaSignOutAlt, FaBars, FaMoneyCheckAlt,
    FaUserShield, FaUserFriends, FaUserCog, FaChevronDown, FaPlus,
    FaFileImport, FaExchangeAlt, FaPhoneVolume, FaStar, FaClipboardCheck
} from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState('');
    const [assignedPages, setAssignedPages] = useState([]);
    const navigate = useNavigate();

    const adminToken = localStorage.getItem('adminToken');
    const employeeToken = localStorage.getItem('employeeToken');
    const isEmployee = employeeToken && !adminToken;
    const isAdmin = !!adminToken;

    useEffect(() => {
        // Only fetch assignedPages for employees
        const fetchAssignedPages = async () => {
            if (isEmployee) {
                try {
                    const res = await axios.get('194.238.16.80:5000/employee/me', {
                        headers: { Authorization: `Bearer ${employeeToken}` },
                        withCredentials: true
                    });
                    if (res.data && Array.isArray(res.data.assignedPages)) {
                        setAssignedPages(res.data.assignedPages);
                    } else {
                        setAssignedPages([]);
                    }
                } catch (err) {
                    setAssignedPages([]);
                }
            }
        };
        fetchAssignedPages();
    }, [employeeToken, adminToken, isEmployee]);

    const handleLogout = async () => {
        try {
            await axios.get('194.238.16.80:5000/admin/logout', { withCredentials: true });
            localStorage.removeItem('adminToken');
            localStorage.removeItem('employeeToken');
            toast.success('Successfully logged out');
            navigate('/admin/login');
        } catch (err) {
            console.error(err);
            toast.error('Logout failed');
        }
    };

    const allMenuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin' },
        {
            name: 'Lead Management', icon: <FaUserFriends />, path: '/admin/leads',
            children: [
                { name: 'Add Lead', path: '/admin/leads/add', icon: <FaPlus /> },
                { name: 'Import Lead', path: '/admin/leads/import', icon: <FaFileImport /> },
                { name: 'Followup Leads', path: '/admin/leads/followup', icon: <FaClipboardCheck /> },
                { name: 'Mature Leads', path: '/admin/leads/mature', icon: <FaStar /> },
                { name: 'Contacted Leads', path: '/admin/leads/contacted', icon: <FaPhoneVolume /> },
            ]
        },
        {
            name: 'Service Processing', icon: <FaTasks />, path: '/admin/services',
            children: [
                { name: 'Converted Service', path: '/admin/services/converted', icon: <FaExchangeAlt /> },
                { name: 'Manual Service', path: '/admin/services/manual', icon: <FaFileImport /> },
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

    let menuItems = [];
    if (isAdmin) {
        menuItems = allMenuItems.map(item => ({
            ...item,
            enabled: true,
            children: item.children?.map(child => ({ ...child, enabled: true })) || []
        }));
    } else if (isEmployee) {
        menuItems = allMenuItems.map(item => {
            const itemEnabled = assignedPages.includes(item.path);
            let children = [];
            if (item.children) {
                children = item.children.map(child => ({
                    ...child,
                    enabled: assignedPages.includes(child.path)
                }));
                const anyChildEnabled = children.some(child => child.enabled);
                return {
                    ...item,
                    enabled: itemEnabled || anyChildEnabled,
                    children
                };
            }
            return {
                ...item,
                enabled: itemEnabled
            };
        });
    }

    return (
        <>
            <div style={{ background: '#fef9c3', color: '#b45309', padding: 8, fontSize: 14, border: '1px solid #fde68a', margin: 8, borderRadius: 4 }}>
                {isAdmin ? "AdminSidebar is shown" : "EmployeeSidebar is shown"}
            </div>

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

            <aside className={`fixed top-0 left-0 z-50 transform transition-transform duration-300 w-64 bg-white shadow-md flex flex-col h-screen ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}>
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex-shrink-0 flex items-center justify-center py-2 px-4 bg-[#57123f]">
                        <img width={170} src={logo} alt="logo" />
                    </div>
                    <nav className="mt-6 flex-1 overflow-y-auto">
                        <ul className="space-y-2 px-4">
                            {menuItems.map((item) => {
                                if (!item.enabled) return null;
                                if (item.children?.length) {
                                    const isOpen = openAccordion === item.name;
                                    return (
                                        <li key={item.name}>
                                            <div className="relative">
                                                <Link
                                                    to={item.path}
                                                    onClick={() => setSidebarOpen(false)}
                                                    className={`flex items-center gap-2 p-2 w-full rounded-lg transition-colors ${location.pathname.startsWith(item.path)
                                                        ? 'bg-[#57123f] text-white'
                                                        : 'text-gray-600 hover:bg-[#57123f] hover:text-white'}`}
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
                                            <ul className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`} style={{ transitionProperty: 'max-height, opacity' }}>
                                                {item.children.map((child) => (
                                                    child.enabled && (
                                                        <li key={child.name}>
                                                            <Link
                                                                to={child.path}
                                                                onClick={() => setSidebarOpen(false)}
                                                                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === child.path
                                                                    ? 'bg-[#57123f] text-white'
                                                                    : 'text-gray-600 hover:bg-[#57123f] hover:text-white'}`}
                                                            >
                                                                {child.icon}
                                                                {child.name}
                                                            </Link>
                                                        </li>
                                                    )
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
                                                : 'text-gray-600 hover:bg-[#57123f] hover:text-white'}`}
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
                <div className="flex-shrink-0 p-4 border-t">
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
