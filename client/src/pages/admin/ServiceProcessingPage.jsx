import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  FaSearch,
  FaIdCard,
  FaFileInvoice
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import ZumarLogo from '../../assets/ZumarLogo.png';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { fetchEmployees } from '../../utils/employeeApi';
// Employee assignment button/dropdown
function AssignedToDropdown({ employees, assignedTo, onAssign }) {
  return (
    <select
      className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none"
      value={assignedTo || ''}
      onChange={e => onAssign(e.target.value)}
    >
      <option value="">Unassigned</option>
      {employees.map(emp => (
        <option key={emp._id} value={emp.name}>{emp.name}</option>
      ))}
    </select>
  );
}


// Dynamic status button component
const statusColors = {
  pending: 'bg-yellow-400 text-black',
  'in-progress': 'bg-blue-400 text-white',
  completed: 'bg-green-500 text-white',
};
const statusOrder = ['pending', 'in-progress', 'completed'];

function StatusButton({ status, onClick }) {
  const safeStatus = status || 'pending';
  const color = statusColors[safeStatus] || 'bg-gray-300 text-gray-700';
  let label = 'Unknown';
  if (typeof safeStatus === 'string') {
    label = safeStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  return (
    <button
      type="button"
      className={`px-3 py-1 rounded text-gray-600 text-xs font-semibold focus:outline-none transition ${color}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

const paymentColors = {
  pending: 'bg-gray-300 text-gray-700',
  advance: 'bg-orange-400 text-white',
  full: 'bg-green-600 text-white',
};
const paymentOrder = ['pending', 'advance', 'full'];

function PaymentStatusButton({ paymentStatus, onClick }) {
  return (
    <button
      type="button"
      className={`px-3 py-1 rounded text-xs font-semibold focus:outline-none transition ${paymentColors[paymentStatus]}`}
      onClick={onClick}
    >
      {paymentStatus === 'full' ? 'Completely Paid' : paymentStatus === 'advance' ? 'Advance Payment' : 'Pending'}
    </button>
  );
}

const ServiceProcessingPage = () => {
  const [employees, setEmployees] = useState([]);
  // Fetch employees for assignment
  useEffect(() => {
    fetchEmployees().then(setEmployees).catch(() => setEmployees([]));
  }, []);
  // Assign employee to service
  const handleAssignEmployee = async (row, employeeName) => {
    try {
      await axios.patch(
        `http://194.238.16.80:5000/admin/services/${row._id}/assign`,
        { assignedTo: employeeName },
        getAuthHeaders()
      );
      fetchServices();
      toast.success('Assigned to employee');
    } catch (error) {
      toast.error('Failed to assign employee');
    }
  };
  const invoiceRef = useRef();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://194.238.16.80:5000/admin/services', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      setServices(response.data);
      console.log("services data:", response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };


  // Cycle status and update backend
  const handleStatusCycle = async (row) => {
    const currentIdx = statusOrder.indexOf(row.status);
    const nextStatus = statusOrder[(currentIdx + 1) % statusOrder.length];
    try {
      await axios.patch(
        `http://194.238.16.80:5000/admin/services/${row._id}/status`,
        { status: nextStatus },
        getAuthHeaders()
      );
      fetchServices();
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handlePaymentStatusCycle = async (row) => {
    const currentIdx = paymentOrder.indexOf(row.paymentStatus || 'pending');
    const nextStatus = paymentOrder[(currentIdx + 1) % paymentOrder.length];
    try {
      await axios.patch(
        `http://194.238.16.80:5000/admin/services/${row._id}/payment-status`,
        { paymentStatus: nextStatus },
        getAuthHeaders()
      );
      fetchServices();
      toast.success('Payment status updated');
    } catch (error) {
      toast.error('Failed to update payment status');
    }
  };

  const handleCheckboxChange = (row) => {
    const alreadySelected = selectedRows.some(r => r._id === row._id);
    let updatedSelection;

    if (alreadySelected) {
      updatedSelection = selectedRows.filter(r => r._id !== row._id);
    } else {
      updatedSelection = [...selectedRows, row];
    }

    setSelectedRows(updatedSelection);

    // Set selectedRow to the last selected one for actions like invoice/certificate
    if (!alreadySelected) {
      setSelectedRow(row);
    } else if (updatedSelection.length === 0) {
      setSelectedRow(null);
    } else {
      setSelectedRow(updatedSelection[updatedSelection.length - 1]);
    }
  };


  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData);
    }
    setSelectAll(!selectAll);
  };

  const handleCertificateUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedRow) return;

    const formData = new FormData();
    formData.append('certificate', selectedFile);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authorized. Please login again.');
      return;
    }

    try {
      await axios.post(
        `http://194.238.16.80:5000/admin/services/${selectedRow._id}/certificate`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Certificate uploaded successfully');
      setShowUploadModal(false);
      setSelectedFile(null);
      fetchServices();
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1200);
      } else {
        toast.error('Failed to upload certificate');
      }
    }
  };
  const waitForImagesToLoad = (element) => {
    const images = element.querySelectorAll('img');
    const promises = Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = resolve;
        })
    );
    return Promise.all(promises);
  };


  const handleGenerateInvoice = async () => {
    if (!selectedRow) {
      toast.error("Please select a service row");
      return;
    }

    const element = invoiceRef.current;

    // 🧽 Clean unsupported colors (oklch)
    const cleanUnsupportedColors = (el) => {
      const nodes = el.querySelectorAll('*');
      nodes.forEach((node) => {
        const style = getComputedStyle(node);
        if (style.color.includes('oklch')) node.style.color = '#000';
        if (style.backgroundColor.includes('oklch')) node.style.backgroundColor = '#fff';
      });
    };

    // ⏳ Wait for images to load
    const waitForImagesToLoad = async (el) => {
      const images = el.querySelectorAll('img');
      const promises = Array.from(images).map((img) => {
        return new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = resolve;
        });
      });
      await Promise.all(promises);
    };

    try {
      cleanUnsupportedColors(element);
      await waitForImagesToLoad(element);
      await new Promise((res) => setTimeout(res, 300)); // Give time for modal to fully render

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      pdf.addImage(
        imgData,
        'PNG',
        (pdfWidth - imgWidth * ratio) / 2,
        10,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save(`invoice-${selectedRow.serviceTitle || 'service'}.pdf`);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error('PDF Generation Error:', error);
      toast.error("Failed to generate PDF");
    }
  };


  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return toast.error("No rows selected");

    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedRows.length} row(s)?`);
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authorized. Please login again.');
      return;
    }

    try {
      const ids = selectedRows.map(row => row._id);
      await axios.post(
        'http://194.238.16.80:5000/invoices/delete-multiple',
        { ids },
        getAuthHeaders()
      );
      toast.success("Deleted successfully");
      setSelectedRows([]);
      setSelectAll(false);
      fetchServices();
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
      } else {
        toast.error("Failed to delete rows");
      }
    }
  };

  const filteredData = services.filter(item =>
    (item.personalId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.personalId?.cnic?.includes(searchQuery)) &&
    (filterStatus ? item.status === filterStatus : true)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="relative flex-1 max-w-sm">
            <FaSearch className="absolute left-3 top-2 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              type="text"
              placeholder="Search by Name or CNIC"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-100 text-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => {
              if (!selectedRow) return toast.error("No row selected");
              setShowUploadModal(true);
            }}
            className="flex items-center gap-2 bg-[#57123f] text-white px-4 py-2 rounded-full text-sm"
          >
            <FaIdCard /> Upload Certificate
          </button>

          <button
            onClick={() => {
              if (!selectedRow) return toast.error("No row selected");
              setShowInvoiceModal(true);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${selectedRow ? 'bg-[#57123f] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!selectedRow}
          >
            <FaFileInvoice /> Generate Invoice
          </button>

          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm"
          >
            🗑️ Delete Selected
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 max-h-[400px]">
          <table className="w-full lg:text-[12px] md:text-[10px] text-left text-gray-800">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-600 uppercase tracking-wide">
                <th className="px-4 py-3">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="px-4 py-3">Name & CNIC</th>
                <th className="px-4 py-3">Email & Phone</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-400">Loading...</td>
                </tr>
              ) : currentData.map((row) => (
                <tr
                  key={row._id}
                  className={`transition-all ${selectedRows.some(r => r._id === row._id) ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.some(r => r._id === row._id)}
                      onChange={() => handleCheckboxChange(row)}
                    />
                  </td>
                  <td className="px-4 py-3 min-w-[120px] align-top">
                    <div className="grid grid-cols-1 gap-x-2 gap-y-1">
                      <div>
                        <span className="font-semibold text-gray-900 text-xs block" title={row.personalId?.name || ''}>
                          {row.personalId?.name || 'N/A'}
                        </span>
                        <span className="text-gray-500 text-[12px] block" title={row.personalId?.cnic || ''}>
                          {row.personalId?.cnic || 'N/A'}
                        </span>
                      </div>
                    
                    </div>
                  </td>
                  <td className="px-4 py-3 min-w-[120px] align-top">
                    <div className="grid grid-cols-1 gap-x-2 gap-y-1">
                      
                      <div>
                        <span className="text-gray-900 font-semibold text-[12px] block max-w-[120px]" title={row.personalId?.email || ''}>
                          {row.personalId?.email || 'N/A'}
                        </span>
                        <span className="text-gray-500 text-[12px] block" title={row.personalId?.phone || ''}>
                          {row.personalId?.phone || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" title={row.serviceTitle || ''}>{row.serviceTitle || 'N/A'}</td>
                  <td className="px-4 py-3" title={row.assignedTo || ''}>
                    <AssignedToDropdown
                      employees={employees}
                      assignedTo={row.assignedTo}
                      onAssign={empName => handleAssignEmployee(row, empName)}
                    />
                  </td>
                  <td className="px-4 py-3 ">
                    <StatusButton status={row.status} onClick={() => handleStatusCycle(row)} />
                  </td>
                  <td className="px-4 py-3">
                    <PaymentStatusButton paymentStatus={row.paymentStatus || 'pending'} onClick={() => handlePaymentStatusCycle(row)} />
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && !loading && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-400">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      <div className="flex justify-end mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            disabled={currentPage === i + 1}
            className={`px-3 py-1 rounded-full text-sm ${currentPage === i + 1
              ? 'bg-[#57123f] text-white'
              : 'bg-gray-200 text-gray-600'
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Upload Certificate Modal */}
      {showUploadModal && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Upload Certificate</h2>
            <form onSubmit={handleCertificateUpload}>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
                className="w-full mb-4 border p-2 rounded-md"
                accept=".pdf,.doc,.docx"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 border rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#57123f] text-white px-4 py-2 rounded-full"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Invoice Modal */}
      {showInvoiceModal && selectedRow && (
        <>
          {/* Modal overlay for user */}
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-xs p-0 relative animate-fade-in flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow w-full flex flex-col mx-auto border border-gray-200 relative" style={{ maxWidth: 380 }}>
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl z-10"
                  onClick={() => setShowInvoiceModal(false)}
                  style={{ background: 'white', borderRadius: '50%', width: 32, height: 32, boxShadow: '0 1px 4px #0001', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Close"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold text-center mb-6 mt-2">Download Invoice</h2>
                <div className="flex flex-col gap-3 mb-4">
                  <button
                    className="w-full border border-[#57123f] text-[#57123f] rounded-lg py-2 font-semibold hover:bg-[#f7f0f5] transition"
                    onClick={async () => {
                      const jsPDF = (await import('jspdf')).default;
                      const html2canvas = (await import('html2canvas')).default;
                      const printArea = document.getElementById('invoice-print-area');
                      if (!printArea) return toast.error('Invoice content not found');
                      const images = printArea.querySelectorAll('img');
                      await Promise.all(Array.from(images).map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = res; }))); 
                      await new Promise(res => setTimeout(res, 200));
                      const elements = printArea.querySelectorAll('*');
                      const originalStyles = [];
                      elements.forEach(el => {
                        const style = window.getComputedStyle(el);
                        const color = style.color;
                        const bg = style.backgroundColor;
                        let changed = false;
                        if (color && color.startsWith('oklch')) {
                          el.style.color = '#222';
                          changed = true;
                        }
                        if (bg && bg.startsWith('oklch')) {
                          el.style.backgroundColor = '#fff';
                          changed = true;
                        }
                        if (changed) {
                          originalStyles.push({ el, color, bg });
                        }
                      });
                      printArea.style.background = '#fff';
                      const canvas = await html2canvas(printArea, { scale: 1.2, useCORS: true, allowTaint: false, backgroundColor: '#fff' });
                      originalStyles.forEach(({ el, color, bg }) => {
                        el.style.color = color;
                        el.style.backgroundColor = bg;
                      });
                      const imgData = canvas.toDataURL('image/jpeg', 0.7);
                      const pdf = new jsPDF('p', 'mm', 'a4');
                      const pdfWidth = pdf.internal.pageSize.getWidth();
                      const pdfHeight = pdf.internal.pageSize.getHeight();
                      const imgWidth = canvas.width;
                      const imgHeight = canvas.height;
                      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                      pdf.addImage(
                        imgData,
                        'JPEG',
                        (pdfWidth - imgWidth * ratio) / 2,
                        10,
                        imgWidth * ratio,
                        imgHeight * ratio
                      );
                      const userName = (selectedRow.personalId?.name || 'user').replace(/[^a-z0-9]+/gi, '_');
                      const service = (selectedRow.serviceTitle || 'service').replace(/[^a-z0-9]+/gi, '_');
                      pdf.save(`${userName}_${service}_invoice.pdf`);
                      toast.success('Invoice downloaded successfully');
                    }}
                  >
                    Download Invoice
                  </button>
                  <button
                    className="w-full border border-[#57123f] text-[#57123f] rounded-lg py-2 font-semibold hover:bg-[#f7f0f5] transition"
                    onClick={async () => {
                      let imageFiles = [];
                      if (selectedRow.formFields) {
                        Object.entries(selectedRow.formFields).forEach(([key, value]) => {
                          if (Array.isArray(value)) {
                            value.forEach(item => {
                              if (typeof item === 'string' && item.match(/\.(jpg|jpeg|png)$/i)) {
                                imageFiles.push(item.replace(/.*uploads[\\/]/, ''));
                              }
                            });
                          } else if (typeof value === 'string' && value.match(/\.(jpg|jpeg|png)$/i)) {
                            imageFiles.push(value.replace(/.*uploads[\\/]/, ''));
                          }
                        });
                      }
                      if (!imageFiles || imageFiles.length === 0) return toast.error('No images found');
                      toast('Preparing images zip...');
                      const JSZip = (await import('jszip')).default;
                      const zip = new JSZip();
                      await Promise.all(imageFiles.map(async (file) => {
                        const url = `http://194.238.16.80:5000/uploads/${encodeURIComponent(file)}`;
                        try {
                          const response = await fetch(url);
                          if (!response.ok) throw new Error('Failed to fetch ' + file);
                          const blob = await response.blob();
                          zip.file(file, blob);
                        } catch (e) {
                        }
                      }));
                      const userName = (selectedRow.personalId?.name || 'user').replace(/[^a-z0-9]+/gi, '_');
                      const service = (selectedRow.serviceTitle || 'service').replace(/[^a-z0-9]+/gi, '_');
                      const zipName = `${userName}_${service}_images.zip`;
                      const zipBlob = await zip.generateAsync({ type: 'blob' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(zipBlob);
                      link.download = zipName;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      toast.success('Images downloaded as zip');
                    }}
                  >
                    Download All Images
                  </button>
                  <button
                    className="w-full border border-[#57123f] text-[#57123f] rounded-lg py-2 font-semibold hover:bg-[#f7f0f5] transition"
                    onClick={async () => {
                      const docExt = /\.(pdf|docx?|xlsx?|xls|pptx?|ppt)$/i;
                      let docFiles = [];
                      if (selectedRow.formFields) {
                        const flattenAndCollect = (val) => {
                          if (typeof val === 'string' && docExt.test(val)) {
                            docFiles.push(val.replace(/.*uploads[\\/]/, ''));
                          } else if (Array.isArray(val)) {
                            val.forEach(flattenAndCollect);
                          } else if (typeof val === 'object' && val !== null) {
                            Object.values(val).forEach(flattenAndCollect);
                          }
                        };
                        Object.entries(selectedRow.formFields).forEach(([key, value]) => {
                          flattenAndCollect(value);
                        });
                      }
                      if (!docFiles || docFiles.length === 0) return toast.error('No documents found');
                      toast('Preparing documents zip...');
                      const JSZip = (await import('jszip')).default;
                      const zip = new JSZip();
                      await Promise.all(docFiles.map(async (file) => {
                        const url = `http://194.238.16.80:5000/uploads/${encodeURIComponent(file)}`;
                        try {
                          const response = await fetch(url);
                          if (!response.ok) throw new Error('Failed to fetch ' + file);
                          const blob = await response.blob();
                          zip.file(file, blob);
                        } catch (e) {
                        }
                      }));
                      const userName = (selectedRow.personalId?.name || 'user').replace(/[^a-z0-9]+/gi, '_');
                      const service = (selectedRow.serviceTitle || 'service').replace(/[^a-z0-9]+/gi, '_');
                      const zipName = `${userName}_${service}_documents.zip`;
                      const zipBlob = await zip.generateAsync({ type: 'blob' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(zipBlob);
                      link.download = zipName;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      toast.success('Documents downloaded as zip');
                    }}
                  >
                    Download All Documents
                  </button>
                  <button
                    className="w-full bg-[#57123f] text-white rounded-lg py-2 font-semibold hover:bg-[#4a0f35] transition"
                    onClick={() => {
                      toast('Send Invoice logic coming soon!');
                    }}
                  >
                    Send Invoice
                  </button>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2">Note: The files/documents can be downloaded individually.</div>
              </div>
            </div>
          </div>
          {/* Hidden print area for PDF generation */}
          <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '100vw', minHeight: '60vh', background: 'white', zIndex: -1 }} id="invoice-print-area">
            {/* Reuse the detailed invoice content for PDF/print here */}
            <div className="text-black font-sans p-6" style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white', boxSizing: 'border-box' }}>
              {/* Header with logo and firm info */}
              <div className="flex items-center mb-8 border-b-2 border-[#57123f] pb-4">
                <img src={ZumarLogo} alt="Zumar Law Firm Logo" className="h-16 w-16 rounded-lg mr-6" />
                <div>
                  <div className="text-2xl font-bold text-[#57123f] tracking-wide">Zumar Law Firm</div>
                  <div className="text-base text-[#57123f] font-medium">Legal & Tax Consultancy</div>
                  <div className="text-xs text-gray-500 mt-1">www.zumarlawfirm.com | info@zumarlawfirm.com</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-lg font-semibold text-[#57123f]">INVOICE</div>
                  <div className="text-xs text-gray-500">#{selectedRow._id?.slice(-6).toUpperCase()}</div>
                </div>
              </div>
              {/* Invoice meta */}
              <div className="flex justify-between mb-6">
                <div>
                  <div className="font-semibold text-[#57123f]">Billed To:</div>
                  <div className="text-base">{selectedRow.personalId?.name}</div>
                  <div className="text-xs text-gray-600">{selectedRow.personalId?.email}</div>
                  <div className="text-xs text-gray-600">{selectedRow.personalId?.phone}</div>
                </div>
                <div className="text-right">
                  <div><span className="font-semibold text-[#57123f]">Date:</span> {new Date().toLocaleDateString()}</div>
                  <div><span className="font-semibold text-[#57123f]">Status:</span> <span className="capitalize">{selectedRow.status || 'pending'}</span></div>
                  <div><span className="font-semibold text-[#57123f]">Service:</span> {selectedRow.serviceTitle}</div>
                </div>
              </div>
              {/* Details Table */}
              <div className="mb-8">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    <tr>
                      <td className="font-semibold text-[#57123f] py-2 px-3 w-32">CNIC</td>
                      <td className="py-2 px-3">{selectedRow.personalId?.cnic}</td>
                    </tr>
                    {selectedRow.formFields && Object.entries(selectedRow.formFields).map(([key, value]) => (
                      <tr key={key}>
                        <td className="font-semibold text-[#57123f] py-2 px-3">{key.replace(/_/g, ' ')}</td>
                        <td className="py-2 px-3">
                          {Array.isArray(value) ? (
                            value.map((item, i) => {
                              if (typeof item === 'string' && item.match(/\.(jpg|jpeg|png)$/i)) {
                                return (
                                  <img
                                    key={i}
                                    src={`http://194.238.16.80:5000/uploads/${item.replace(/.*uploads[\\/]/, '')}`}
                                    alt={`Uploaded ${key} ${i + 1}`}
                                    className={`h-auto border rounded mb-1 ${key.toLowerCase().includes('cnic') || key.toLowerCase().includes('document') ? 'w-full max-w-xs' : 'w-[100px]'}`}
                                    style={{ maxWidth: '100%' }}
                                  />
                                );
                              } else if (typeof item === 'string' && item.match(/\.pdf$/i)) {
                                return (
                                  <a key={i} href={`http://194.238.16.80:5000/uploads/${item.replace(/.*uploads[\\/]/, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block">PDF File {i + 1}</a>
                                );
                              } else if (typeof item === 'object' && item !== null) {
                                return (
                                  <div key={i} className="mb-1">
                                    {Object.entries(item).map(([k, v]) => (
                                      <div key={k} className="text-xs text-gray-700"><span className="font-medium">{k.charAt(0).toUpperCase() + k.slice(1)}:</span> {v}</div>
                                    ))}
                                  </div>
                                );
                              } else {
                                return <span key={i} className="text-gray-600 block">{String(item)}</span>;
                              }
                            })
                          ) : typeof value === 'string' && value.match(/\.(jpg|jpeg|png)$/i) ? (
                            <img
                              src={`http://194.238.16.80:5000/uploads/${value.replace(/.*uploads[\\/]/, '')}`}
                              alt={`Uploaded ${key}`}
                              className={`h-auto border rounded mb-1 ${key.toLowerCase().includes('cnic') || key.toLowerCase().includes('document') ? 'w-full max-w-xs' : 'w-[100px]'}`}
                              style={{ maxWidth: '100%' }}
                            />
                          ) : typeof value === 'string' && value.match(/\.pdf$/i) ? (
                            <a href={`http://194.238.16.80:5000/uploads/${value.replace(/.*uploads[\\/]/, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">PDF File</a>
                          ) : typeof value === 'object' && value !== null ? (
                            <div>
                              {Object.entries(value).map(([k, v]) => (
                                <div key={k} className="text-xs text-gray-700"><span className="font-medium">{k.charAt(0).toUpperCase() + k.slice(1)}:</span> {v}</div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-600">{typeof value === 'string' ? value : JSON.stringify(value)}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Footer */}
              <div className="border-t pt-4 text-center text-xs text-gray-500">
                Thank you for choosing Zumar Law Firm. For queries, contact us at <span className="text-[#57123f] font-medium">info@zumarlawfirm.com</span> or visit our website.
              </div>
            </div>
          </div>
        </>
      )}

      </div>
  );
}

export default ServiceProcessingPage;
