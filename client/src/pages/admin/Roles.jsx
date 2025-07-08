import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Roles = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/roles`, {
        withCredentials: true
      });
      setEmployees(response.data);
    } catch (error) {
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setForm({ ...employee });
    setIsEditing(true);
    setEditId(employee._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/admin/roles/${id}`, {
        withCredentials: true
      });
      toast.success('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      toast.error('Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isEditing) setForm({});
  }, [isEditing]);

  const pageMap = {
    '/admin/services': 'Service Processing',
    '/admin/leads': 'Leads Management',
    '/admin/leads/add': 'Leads Management',
    '/admin/leads/import': 'Leads Management',
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Employee List</h3>
        {employees.length === 0 ? (
          <p className="text-gray-500">No employees added.</p>
        ) : (
          <table className="w-full rounded border  ">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2  ">Name</th>
                <th className="p-2  ">Phone</th>
                <th className="p-2  ">Email</th>
                <th className="p-2  ">CNIC</th>
                <th className="p-2  ">Roles</th>
                <th className="p-2  ">Salary</th>
                <th className="p-2  ">Branch</th>
                <th className="p-2  ">Assign Page</th>
                <th className="p-2  ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index} className="text-left hover:bg-gray-50 border-b">
                  <td className="p-2 " title={emp.name}>{emp.name?.length > 5 ? emp.name.slice(0, 7) + '...' : emp.name}</td>
                  <td className="p-2  " title={emp.phone}>{emp.phone?.length > 5 ? emp.phone.slice(0, 7) + '...' : emp.phone}</td>
                  <td className="p-2  " title={emp.email}>{emp.email?.length > 5 ? emp.email.slice(0, 7) + '...' : emp.email}</td>
                  <td className="p-2  " title={emp.cnic}>{emp.cnic?.length > 5 ? emp.cnic.slice(0, 7) + '...' : emp.cnic}</td>
                  <td className="p-2  " title={emp.role}>{emp.role?.length > 5 ? emp.role.slice(0, 7) + '...' : emp.role}</td>
                  <td className="p-2  " title={emp.salary}>{emp.salary?.length > 5 ? emp.salary.slice(0, 7) + '...' : emp.salary}</td>
                  <td className="p-2  " title={emp.branch}>{emp.branch?.length > 5 ? emp.branch.slice(0, 7) + '...' : emp.branch}</td>
                  <td className="p-2   text-sm">
                    {emp.assignedPages?.length ? (
                      (() => {
                        const names = Array.from(new Set(emp.assignedPages.map(p => pageMap[p] || p)));
                        const display = names.slice(0, 5).join(', ');
                        const isTruncated = names.length > 5;
                        return (
                          <span title={names.join(', ')}>
                            {display}{isTruncated ? ', ...' : ''}
                          </span>
                        );
                      })()
                    ) : '-'}
                  </td>
                  <td className="p-2  ">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(emp._id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add a form for editing below the table */}
      {isEditing && (
        <div className="bg-white p-4 rounded shadow mb-6 mt-4">
          <h3 className="text-lg font-semibold mb-4">Edit Employee</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input name="name" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Name" className="border px-3 py-2 rounded" />
            <input name="phone" value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone" className="border px-3 py-2 rounded" />
            <input name="email" value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" className="border px-3 py-2 rounded" />
            <input name="cnic" value={form.cnic || ''} onChange={e => setForm(f => ({ ...f, cnic: e.target.value }))} placeholder="CNIC" className="border px-3 py-2 rounded" />
            <input name="role" value={form.role || ''} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Role" className="border px-3 py-2 rounded" />
            <input name="salary" value={form.salary || ''} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} placeholder="Salary" className="border px-3 py-2 rounded" />
            <input name="branch" value={form.branch || ''} onChange={e => setForm(f => ({ ...f, branch: e.target.value }))} placeholder="Branch" className="border px-3 py-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Assign Pages:</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(pageMap)
                .filter(([path]) => path === '/admin/services' || path === '/admin/leads')
                .map(([path, label], i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="assignPageRadio"
                      value={path}
                      checked={form.assignedPages?.includes(path) || false}
                      onChange={e => {
                        setForm(f => {
                          let updatedPages = [];
                          if (path === '/admin/leads') {
                            updatedPages = ['/admin/leads', '/admin/leads/add', '/admin/leads/import'];
                          } else {
                            updatedPages = [path];
                          }
                          return { ...f, assignedPages: updatedPages };
                        });
                      }}
                    />
                    <span>{label}</span>
                  </label>
                ))}
            </div>
          </div>
          <button
            onClick={async () => {
              try {
                setLoading(true);
                await axios.put(`${API_URL}/admin/roles/${editId}`, form, { withCredentials: true });
                toast.success('Employee updated successfully!');
                setIsEditing(false);
                setEditId(null);
                fetchEmployees();
              } catch (error) {
                toast.error('Failed to update employee');
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="bg-[#57123f] text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50 mr-2"
          >
            {loading ? 'Updating...' : 'Update Employee'}
          </button>
          <button
            onClick={() => { setIsEditing(false); setEditId(null); }}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-opacity-90"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Roles;
