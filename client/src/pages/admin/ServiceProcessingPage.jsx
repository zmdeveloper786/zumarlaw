import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  FaSearch,
  FaIdCard,
  FaFileInvoice
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import ServiceInvoice from '../../components/admin/ServiceInvoice';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ServiceProcessingPage = () => {
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
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/services`, {
        withCredentials: true
      });
      setServices(response.data);
      console.log("services data:", response.data);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (serviceId, newStatus) => {
    try {
      await axios.patch(`${API_URL}/admin/services/${serviceId}/status`, {
        status: newStatus
      }, {
        withCredentials: true
      });
      fetchServices();
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Update payment status
  const handlePaymentStatusUpdate = async (serviceId, newStatus) => {
    try {
      await axios.patch(`${API_URL}/admin/services/${serviceId}/payment-status`, {
        paymentStatus: newStatus
      }, {
        withCredentials: true
      });
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

    try {
      await axios.post(`${API_URL}/admin/services/${selectedRow._id}/certificate`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Certificate uploaded successfully');
      setShowUploadModal(false);
      setSelectedFile(null);
      fetchServices();
    } catch (error) {
      toast.error('Failed to upload certificate');
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

    try {
      const ids = selectedRows.map(row => row._id);
      await axios.post(`${API_URL}/invoices/delete-multiple`, { ids }, {
        withCredentials: true
      });
      toast.success("Deleted successfully");
      setSelectedRows([]);
      setSelectAll(false);
      fetchServices();
    } catch (err) {
      toast.error("Failed to delete rows");
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
          <table className="w-full lg:text-[11px] md:text-[10px] text-left text-gray-800">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-600 uppercase tracking-wide">
                <th className="px-4 py-3">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">CNIC</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
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
                  <td className="px-4 py-3" title={row.personalId?.name || ''}>{row.personalId?.name ? `${row.personalId.name.slice(0, 5)}...` : 'N/A'}</td>
                  <td className="px-4 py-3" title={row.serviceTitle || ''}>{row.serviceTitle ? `${row.serviceTitle.slice(0, 5)}...` : 'N/A'}</td>
                  <td className="px-4 py-3" title={row.personalId?.cnic || ''}>{row.personalId?.cnic ? `${row.personalId.cnic.slice(0, 5)}...` : 'N/A'}</td>
                  <td className="px-4 py-3" title={row.personalId?.phone || ''}>{row.personalId?.phone ? `${row.personalId.phone.slice(0, 5)}...` : 'N/A'}</td>
                  <td className="px-4 py-3 truncate max-w-[180px]" title={row.personalId?.email || ''}>{row.personalId?.email ? `${row.personalId.email.slice(0, 5)}...` : 'N/A'}</td>
                  <td className="px-4 py-3" title={row.assignedTo || ''}>{row.assignedTo ? `${row.assignedTo.slice(0, 5)}...` : 'Unassigned'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={row.status}
                      onChange={(e) => handleStatusUpdate(row._id, e.target.value)}
                      className="bg-white border border-gray-300 rounded px-2 py-1 text-[10px] focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={row.paymentStatus || 'pending'}
                      onChange={e => handlePaymentStatusUpdate(row._id, e.target.value)}
                      className="bg-white border border-gray-300 rounded px-2 py-1 text-[10px] focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="advance">Advance Payment</option>
                      <option value="full">Completely Paid</option>
                    </select>
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
      <div
        ref={invoiceRef}
        className="invoice-content rounded-lg w-full p-6 mx-auto text-black font-sans"
        style={{
          width: '210mm',
          minHeight: '297mm',
        }}
      >
        {showInvoiceModal && selectedRow && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-2">
            {/* Modal wrapper with scroll */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-4">
              {/* Invoice Content A4 */}
              <div
                ref={invoiceRef}
                className="text-black font-sans p-6"
                style={{
                  width: '210mm',         // A4 width
                  minHeight: '297mm',     // A4 height
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-black"
                  onClick={() => setShowInvoiceModal(false)}
                >
                  ✖
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-[#57123f] mb-6">
                  Invoice Form Details
                </h2>

                {/* Basic Info */}
                <div className="mb-4 text-sm">
                  <p><strong>Service:</strong> {selectedRow.serviceTitle}</p>
                  <p><strong>Date & Time:</strong> {new Date().toLocaleString()}</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  {selectedRow.formFields &&
                    Object.entries(selectedRow.formFields).map(([key, value]) => (
                      <div key={key} className="break-inside-avoid">
                        <p className="font-semibold text-gray-700 capitalize mb-1">
                          {key.replace(/_/g, ' ')}
                        </p>

                        {Array.isArray(value) ? (
                          value.map((item, i) => (
                            item.match(/\.(jpg|jpeg|png)$/i) ? (
                              <img
                                key={i}
                                src={`${API_URL}/uploads/${item}`}
                                alt={`Uploaded ${key} ${i + 1}`}
                                className={`h-auto border rounded mb-1 ${key.toLowerCase().includes('cnic') || key.toLowerCase().includes('document')
                                  ? 'w-full max-w-xs'
                                  : 'w-[100px]'
                                  }`}
                              />
                            ) : item.match(/\.pdf$/i) ? (
                              <span key={i} className="text-blue-600 underline block">PDF File {i + 1}</span>
                            ) : (
                              <p key={i} className="text-gray-600">{item}</p>
                            )
                          ))
                        ) : value?.match?.(/\.(jpg|jpeg|png)$/i) ? (
                          <img
                            src={`${API_URL}/uploads/${value}`}
                            alt={`Uploaded ${key}`}
                            className={`h-auto border rounded mb-1 ${key.toLowerCase().includes('cnic') || key.toLowerCase().includes('document')
                              ? 'w-full max-w-xs'
                              : 'w-[100px]'
                              }`}
                          />
                        ) : value?.match?.(/\.pdf$/i) ? (
                          <span className="text-blue-600 underline">PDF File</span>
                        ) : (
                          <p className="text-gray-600">{value}</p>
                        )}
                      </div>
                    ))}
                </div>

                {/* Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleGenerateInvoice}
                    className="bg-[#57123f] hover:bg-[#3e0e2c] text-white px-5 py-2 rounded-full transition"
                  >
                    Generate Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default ServiceProcessingPage;
