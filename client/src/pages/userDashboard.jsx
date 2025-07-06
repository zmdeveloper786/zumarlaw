import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaDownload } from 'react-icons/fa';

const UserDashboard = () => {
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
    fetchUserServices();
  }, []);

  const fetchUserServices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:5000/userpanel/services', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      setUserServices(response.data);
    } catch (err) {
      console.error('Failed to fetch user services:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-[#57123f]">Hey {userInfo?.firstName || 'User'} 👋</h2>
        <p className="text-gray-500 mb-4">Welcome to your Dashboard</p>

        {/* Top Service Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#57123f] mb-4">Your Services Progress</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2">Name</th>
                  <th className="py-2">Member</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">View Details</th>
                </tr>
              </thead>
              <tbody>
                {userServices.slice(0, 5).map((service) => (
                  <tr key={service._id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{service.serviceTitle}</td>
                    <td className="py-2">{service.personalId?.name}</td>
                    <td className="py-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        service.formFields?.status === 'completed' ? 'bg-green-100 text-green-700' :
                        service.formFields?.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                        service.formFields?.status === 'pending' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'}
                      `}>
                        {service.formFields?.status || 'N/A'}
                      </span>
                    </td>
                    <td className="py-2">
                      <FaEye className="text-[#57123f] cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#57123f] mb-4">Due Payment</h3>
            <p className="text-2xl font-bold text-gray-800 mb-2">10,000 PKR</p>
            <ul className="text-sm text-gray-700 mb-4 list-disc list-inside">
              <li>NTN Registration (3)</li>
              <li>Tax Filer Registration</li>
              <li>PRA Registration</li>
            </ul>
            <button className="bg-[#57123f] text-white w-full py-2 rounded">Generate Payment Slip</button>
          </div>
        </div>

        {/* Full Table */}
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#57123f]">Your Services Progress</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-[#57123f] text-white px-3 py-1 rounded-full">Services Done in June: 08</span>
              <button className="text-[#57123f] underline">Filters</button>
              <select className="border rounded px-2 py-1">
                <option>Last Month</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-2"><input type="checkbox" /></th>
                <th className="p-2">Services</th>
                <th className="p-2">Payment Date</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Status</th>
                <th className="p-2">Branch</th>
                <th className="p-2">Certificates</th>
              </tr>
            </thead>
            <tbody>
              {userServices.map((service, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2"><input type="checkbox" /></td>
                  <td className="p-2">{service.serviceTitle}</td>
                  <td className="p-2">{new Date(service.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">20,000 PKR</td>
                  <td className="p-2">
                    <span className="bg-[#57123f] text-white px-2 py-1 rounded text-xs">Done</span>
                  </td>
                  <td className="p-2">Chaburji</td>
                  <td className="p-2 flex gap-2 text-[#57123f]">
                    <FaEye className="cursor-pointer" />
                    <FaDownload className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
