import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaDownload, FaMoneyBillWave, FaUserCheck, FaRegFileAlt } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-[#f8e6f2] via-[#f3f0fa] to-[#f7f7fa] py-10 px-2 md:px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
          <div>
            <h2 className="text-3xl font-extrabold text-[#57123f] flex items-center gap-2">
              <FaUserCheck className="inline-block text-[#57123f] text-2xl" />
              Hey {userInfo?.firstName || 'User'} 👋
            </h2>
            <p className="text-gray-500 mt-1">Welcome to your Dashboard</p>
          </div>
        </div>

        {/* Top Service Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white shadow-2xl rounded-2xl p-6 border border-[#f3e8ff]">
            <h3 className="text-lg font-bold text-[#57123f] mb-4 flex items-center gap-2">
              <FaRegFileAlt className="text-[#57123f]" /> Your Services Progress
            </h3>
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading...</div>
            ) : userServices.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No services found.</div>
            ) : (
              <table className="w-full text-sm rounded-xl overflow-hidden">
                <thead>
                  <tr className="text-left text-gray-600 border-b bg-[#faf5ff]">
                    <th className="py-2 px-2">Name</th>
                    <th className="py-2 px-2">Member</th>
                    <th className="py-2 px-2">Status</th>
                    <th className="py-2 px-2">View Details</th>
                  </tr>
                </thead>
                <tbody>
                  {userServices.slice(0, 5).map((service, idx) => (
                    <tr key={service._id} className={
                      `border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f5fc]'} hover:bg-[#f3e8ff]/40 transition`}
                    >
                      <td className="py-2 px-2 font-medium">{service.serviceTitle || 'N/A'}</td>
                      <td className="py-2 px-2">{service.personalId?.name || 'N/A'}</td>
                      <td className="py-2 px-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold shadow ${
                          service.formFields?.status === 'completed' ? 'bg-green-100 text-green-700' :
                          service.formFields?.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                          service.formFields?.status === 'pending' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-600'}
                        `}>
                          {service.formFields?.status ? service.formFields.status.charAt(0).toUpperCase() + service.formFields.status.slice(1) : 'N/A'}
                        </span>
                      </td>
                      <td className="py-2 px-2">
                        <button className="flex items-center gap-1 text-[#57123f] hover:text-[#57123f] font-semibold transition" onClick={() => alert('Details coming soon!')}>
                          <FaEye /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-gradient-to-br from-[#f3e8ff] to-[#f8e6f2] shadow-xl rounded-2xl p-6 border border-[#f3e8ff] flex flex-col justify-between">
            <h3 className="text-lg font-bold text-[#57123f] mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-[#57123f]" /> Due Payment
            </h3>
            <p className="text-3xl font-extrabold text-[#57123f] mb-2">{userServices.length > 0 ? '10,000 PKR' : '0 PKR'}</p>
            <ul className="text-sm text-gray-700 mb-4 list-disc list-inside">
              <li>NTN Registration (3)</li>
              <li>Tax Filer Registration</li>
              <li>PRA Registration</li>
            </ul>
            <button className="bg-[#57123f] hover:bg-[#57123f] transition text-white w-full py-2 rounded-lg font-semibold shadow" onClick={() => alert('Payment slip coming soon!')}>Generate Payment Slip</button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 w-full bg-gradient-to-r from-[#f3e8ff] via-[#f8e6f2] to-[#f3e8ff] rounded my-6 opacity-70" />

        {/* Full Table */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 border border-[#f3e8ff]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
            <h3 className="text-lg font-bold text-[#57123f] flex items-center gap-2">
              <FaRegFileAlt className="text-[#57123f]" /> Your Services Progress
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-[#57123f] text-white px-3 py-1 rounded-full font-semibold shadow">Services Done: {userServices.filter(s => s.formFields?.status === 'completed').length}</span>
              <button className="text-[#57123f] underline hover:text-[#57123f] transition" onClick={() => alert('Filters coming soon!')}>Filters</button>
              <select className="border rounded px-2 py-1">
                <option>Last Month</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : userServices.filter(s => s.formFields?.status === 'completed').length === 0 ? (
            <div className="text-center py-8 text-gray-400">No completed services found.</div>
          ) : (
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-sm rounded-xl overflow-hidden">
                <thead className="bg-[#faf5ff] text-gray-600">
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
                  {userServices.filter(s => s.formFields?.status === 'completed').map((service, index) => (
                    <tr key={service._id || index} className={
                      `border-b ${index % 2 === 0 ? 'bg-white' : 'bg-[#f9f5fc]'} hover:bg-[#f3e8ff]/40 transition`}
                    >
                      <td className="p-2"><input type="checkbox" /></td>
                      <td className="p-2 font-medium">{service.serviceTitle || 'N/A'}</td>
                      <td className="p-2">{service.createdAt ? new Date(service.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td className="p-2">{service.paymentAmount ? `${service.paymentAmount} PKR` : 'N/A'}</td>
                      <td className="p-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold shadow ${
                          service.formFields?.status === 'completed' ? 'bg-green-100 text-green-700' :
                          service.formFields?.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                          service.formFields?.status === 'pending' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-600'}
                        `}>
                          {service.formFields?.status ? service.formFields.status.charAt(0).toUpperCase() + service.formFields.status.slice(1) : 'N/A'}
                        </span>
                      </td>
                      <td className="p-2">{service.branch || 'N/A'}</td>
                      <td className="p-2 flex gap-2 text-[#57123f]">
                        <button className="hover:text-[#57123f] transition" title="View Certificate" onClick={() => alert('Certificate view coming soon!')}>
                          <FaEye />
                        </button>
                        <button className="hover:text-[#57123f] transition" title="Download Certificate" onClick={() => alert('Download coming soon!')}>
                          <FaDownload />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
