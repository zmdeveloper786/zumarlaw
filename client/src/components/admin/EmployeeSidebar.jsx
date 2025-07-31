import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/ZumarLogo.png';
import { FaTachometerAlt, FaTasks, FaUserFriends, FaMoneyCheckAlt, FaUserShield, FaUsers, FaUserCog, FaChevronDown, FaPlus, FaFileImport, FaExchangeAlt, FaPhoneVolume, FaStar, FaClipboardCheck, FaSignOutAlt, FaBars } from 'react-icons/fa';

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

// Deprecated: EmployeeSidebar is no longer used. Sidebar.jsx now handles both admin and employee logic robustly.
