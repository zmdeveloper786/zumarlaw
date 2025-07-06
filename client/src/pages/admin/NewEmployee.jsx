import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const NewEmployee = ({ onEmployeeAdded }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    cnic: '',
    role: 'Employee',
    salary: '', // new field
    branch: '', // new field
    assignedPages: [],
    tasks: []
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const roles = ['Employee', 'Branch Manager', 'Head Employee'];
  const pages = [
    { label: 'Service Processing', path: '/admin/services' },
    { label: 'Leads Management', path: '/admin/leads' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePageSelection = (e) => {
    const { value, checked } = e.target;

    setForm(prev => {
      let updatedPages = [...prev.assignedPages];

      if (value === '/admin/leads') {
        const leadPages = ['/admin/leads', '/admin/leads/add', '/admin/leads/import'];
        if (checked) {
          updatedPages = Array.from(new Set([...updatedPages, ...leadPages]));
        } else {
          updatedPages = updatedPages.filter(p => !leadPages.includes(p));
        }
      } else {
        if (checked) {
          updatedPages.push(value);
        } else {
          updatedPages = updatedPages.filter(p => p !== value);
        }
      }

      return { ...prev, assignedPages: updatedPages };
    });
  };

  const validateForm = () => {
    if (!form.name || !form.phone || !form.email || !form.cnic || !form.salary || !form.branch) {
      toast.error('Please fill all required fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!/^\d{5}-\d{7}-\d{1}$/.test(form.cnic)) {
      toast.error('Please enter a valid CNIC (format: xxxxx-xxxxxxx-x)');
      return false;
    }
    return true;
  };

  const handleAddEmployee = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const endpoint = isEditing
        ? `http://localhost:5000/admin/roles/${editId}`
        : 'http://localhost:5000/admin/roles';

      const method = isEditing ? 'put' : 'post';

      await axios[method](endpoint, form, {
        withCredentials: true
      });

      toast.success(isEditing ? 'Employee updated successfully!' : 'Employee added successfully!');
      resetForm();
      if (onEmployeeAdded) onEmployeeAdded(); // <-- trigger refresh in parent
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
      setIsEditing(false);
      setEditId(null);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      cnic: '',
      role: 'Employee',
      salary: '', // new field
      branch: '', // new field
      assignedPages: [],
      tasks: []
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Roles Management Panel</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Employee</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border px-3 py-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border px-3 py-2 rounded" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border px-3 py-2 rounded" />
          <input name="cnic" value={form.cnic} onChange={handleChange} placeholder="CNIC (xxxxx-xxxxxxx-x)" className="border px-3 py-2 rounded" />
          <select name="role" value={form.role} onChange={handleChange} className="border px-3 py-2 rounded">
            {roles.map((role, i) => <option key={i} value={role}>{role}</option>)}
          </select>
          <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" className="border px-3 py-2 rounded" />
          <input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" className="border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Assign Pages:</label>
          <div className="grid grid-cols-2 gap-2">
            {pages.map((page, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="assignPageRadio"
                  value={page.path}
                  checked={form.assignedPages.includes(page.path)}
                  onChange={e => {
                    const value = e.target.value;
                    setForm(prev => {
                      let updatedPages = [];
                      if (value === '/admin/leads') {
                        updatedPages = ['/admin/leads', '/admin/leads/add', '/admin/leads/import'];
                      } else {
                        updatedPages = [value];
                      }
                      return { ...prev, assignedPages: updatedPages };
                    });
                  }}
                />
                <span>{page.label}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleAddEmployee}
          disabled={loading}
          className="bg-[#57123f] text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
        >
          {loading ? 'Processing...' : isEditing ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </div>
  );
};

export default NewEmployee;
