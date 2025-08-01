import React, { useState, useEffect, useRef } from 'react';

// Modern InvoiceContent component matching ConvertedService.jsx
import ZumarLogo from '../../assets/ZumarLogo.png';
function InvoiceContent({ invoiceData }) {
  if (!invoiceData) return null;
  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0002', padding: '2vw', minHeight: '60vh', maxWidth: '100vw', width: '100%', position: 'relative', overflow: 'auto' }}>
      {/* Header with logo and company info */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, borderBottom: '2px solid #57123f', paddingBottom: 16 }}>
        <img src={ZumarLogo} alt="Zumar Law Firm Logo" style={{ height: 64, marginRight: 24, borderRadius: 8 }} />
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#57123f', letterSpacing: 1 }}>Zumar Law Firm</div>
          <div style={{ fontSize: 16, color: '#57123f', fontWeight: 500 }}>Legal & Tax Consultancy</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>www.zumarlawfirm.com | info@zumarlawfirm.com</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#57123f' }}>INVOICE</div>
          <div style={{ fontSize: 13, color: '#888' }}>#{invoiceData._id?.slice(-6).toUpperCase()}</div>
        </div>
      </div>
      {/* Invoice meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontWeight: 600, color: '#57123f' }}>Billed To:</div>
          <div style={{ fontSize: 15 }}>{invoiceData.name}</div>
          <div style={{ fontSize: 13, color: '#555' }}>{invoiceData.email}</div>
          <div style={{ fontSize: 13, color: '#555' }}>{invoiceData.phone}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div><span style={{ fontWeight: 600, color: '#57123f' }}>Date:</span> {invoiceData.createdAt ? new Date(invoiceData.createdAt).toLocaleDateString() : ''}</div>
          <div><span style={{ fontWeight: 600, color: '#57123f' }}>Status:</span> <span style={{ textTransform: 'capitalize' }}>{invoiceData.status || 'pending'}</span></div>
          <div><span style={{ fontWeight: 600, color: '#57123f' }}>Service:</span> {invoiceData.serviceType || invoiceData.service}</div>
        </div>
      </div>
      {/* Details Table */}
      <div style={{ marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600, color: '#57123f', padding: 8, width: 120 }}>CNIC</td>
              <td style={{ padding: 8 }}>{invoiceData.cnic}</td>
            </tr>
            {/* Dynamic fields (user's requested style) */}
            {invoiceData.fields && Object.keys(invoiceData.fields).length > 0 && Object.entries(invoiceData.fields).map(([key, value]) => (
              <tr key={key}>
                <td style={{ fontWeight: 600, color: '#57123f', padding: 8 }}>{key.replace(/_/g, ' ')}</td>
                <td style={{ padding: 8 }}>
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
                        // Render object (e.g. member details)
                        return (
                          <div key={i} className="mb-1">
                            {Object.entries(item).map(([k, v]) => (
                              <div key={k} style={{ fontSize: 13, color: '#444' }}>
                                <span style={{ fontWeight: 500 }}>{k.charAt(0).toUpperCase() + k.slice(1)}:</span> {v}
                              </div>
                            ))}
                          </div>
                        );
                      } else {
                        return <p key={i} className="text-gray-600">{String(item)}</p>;
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
                        <div key={k} style={{ fontSize: 13, color: '#444' }}>
                          <span style={{ fontWeight: 500 }}>{k.charAt(0).toUpperCase() + k.slice(1)}:</span> {v}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">{typeof value === 'string' ? value : JSON.stringify(value)}</p>
                  )}
                </td>
              </tr>
            ))}
            {/* CNIC Groups */}
            {invoiceData.cnicGroups && invoiceData.cnicGroups.length > 0 && (
              <tr>
                <td style={{ fontWeight: 600, color: '#57123f', padding: 8 }}>CNIC Members</td>
                <td style={{ padding: 8 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {invoiceData.cnicGroups.map((group, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
                        <span style={{ fontWeight: 500, fontSize: 13 }}>Front:</span>
                        {group.front && group.front.replace(/\\/g, '/').includes('uploads/') ? (
                          <img src={`http://194.238.16.80:5000/uploads/${group.front.replace(/\\/g, '/').split('uploads/').pop().replace(/^\/+/, '')}`} alt="CNIC Front" className="w-full max-w-xs h-auto border rounded mb-1" style={{ maxWidth: '100%' }} crossOrigin="anonymous" />
                        ) : group.front ? (
                          <span>{group.front}</span>
                        ) : null}
                        <span style={{ fontWeight: 500, fontSize: 13 }}>Back:</span>
                        {group.back && group.back.replace(/\\/g, '/').includes('uploads/') ? (
                          <img src={`http://194.238.16.80:5000/uploads/${group.back.replace(/\\/g, '/').split('uploads/').pop().replace(/^\/+/, '')}`} alt="CNIC Back" className="w-full max-w-xs h-auto border rounded mb-1" style={{ maxWidth: '100%' }} crossOrigin="anonymous" />
                        ) : group.back ? (
                          <span>{group.back}</span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div style={{ borderTop: '1.5px solid #eee', marginTop: 32, paddingTop: 16, textAlign: 'center', color: '#888', fontSize: 13 }}>
        Thank you for choosing Zumar Law Firm. For queries, contact us at <span style={{ color: '#57123f', fontWeight: 500 }}>info@zumarlawfirm.com</span> or visit our website.
      </div>
    </div>
  );
}
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PAGE_SIZE = 10;


const ManualService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch manual service submissions from backend
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://194.238.16.80:5000/manualService');
        setServices(res.data);
      } catch (err) {
        toast.error('Failed to fetch manual services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filter and search logic (defensive: always use array)
  const safeServices = Array.isArray(services) ? services : [];
  const filtered = safeServices.filter(row => {
    const matchesStatus = filterStatus ? (row.status === filterStatus) : true;
    const matchesSearch = searchQuery
      ? (
        (row.name && row.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (row.cnic && row.cnic.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      : true;
    return matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const currentData = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Invoice modal state
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  // Open invoice modal for a row
  const handleOpenInvoice = (row) => {
    setInvoiceData(row);
    setShowInvoice(true);
  };

  // Close invoice modal
  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setInvoiceData(null);
  };


  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(currentData.map(row => row._id));
      setSelectAll(true);
    }
  };

  // Handle single row checkbox
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedRows, id];
      setSelectedRows(newSelected);
      if (newSelected.length === currentData.length) setSelectAll(true);
    }
  };

  // Generate Invoice button handler (shows first selected row's invoice)
  const handleGenerateInvoice = () => {
    if (selectedRows.length > 0) {
      const row = currentData.find(r => r._id === selectedRows[0]);
      if (row) handleOpenInvoice(row);
      else toast.error('Selected row not found on this page.');
    } else {
      toast.error('Please select at least one row.');
    }
  };


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#57123f] mb-6">Manual Service Submissions</h1>
        <div className="flex flex-wrap gap-4 mb-6 items-center">

          <div className="relative flex-1 max-w-sm">
            <FaSearch className="absolute left-3 top-2 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              type="text"
              placeholder="Search by Name or CNIC"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
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
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            className="bg-[#57123f] text-sm text-white px-6 py-2 rounded-full hover:bg-[#4a0f35] font-semibold"
            onClick={handleGenerateInvoice}
          >
            Generate Invoice
          </button>
          <input
            type="file"
            id="certificate-upload"
            style={{ display: 'none' }}
            multiple={false}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              if (selectedRows.length === 0) {
                toast.error('Please select at least one row.');
                return;
              }
              const formData = new FormData();
              formData.append('certificate', file);
              formData.append('ids', JSON.stringify(selectedRows));
              try {
                await axios.post('http://194.238.16.80:5000/manualService/uploadCertificate', formData, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success('Certificate uploaded successfully!');
                // Optionally, refresh data
                const res = await axios.get('http://194.238.16.80:5000/manualService');
                setServices(res.data);
              } catch (err) {
                toast.error('Failed to upload certificate');
              }
              e.target.value = '';
            }}
          />
          <button
            className="bg-[#57123f] text-sm text-white px-6 py-2 rounded-full hover:bg-[#57123f] font-semibold"
            onClick={() => {
              if (selectedRows.length === 0) {
                toast.error('Please select at least one row.');
                return;
              }
              document.getElementById('certificate-upload').click();
            }}
          >
            Upload Certificate
          </button>
          <button
            className="bg-red-600 text-sm text-white px-6 py-2 rounded-full hover:bg-red-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedRows.length === 0}
            onClick={async () => {
              if (selectedRows.length === 0) {
                toast.error('Please select at least one row.');
                return;
              }
              if (!window.confirm('Are you sure you want to delete the selected services?')) return;
              try {
                await axios.post('http://194.238.16.80:5000/manualService/deleteMany', { ids: selectedRows });
                toast.success('Selected services deleted!');
                setServices(prev => prev.filter(row => !selectedRows.includes(row._id)));
                setSelectedRows([]);
                setSelectAll(false);
              } catch (err) {
                toast.error('Failed to delete selected services');
              }
            }}
          >
            Delete Selected
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-xs text-left text-gray-800">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-600 uppercase tracking-wide">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-3">Name & CNIC</th>
                <th className="px-4 py-3">Phone & Email</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3">Status</th>

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-400">Loading...</td>
                </tr>
              ) : currentData.map((row, idx) => (
                <tr key={row._id} className={`hover:bg-gray-50 ${selectedRows.includes(row._id) ? 'bg-purple-100' : ''}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div><span className="font-semibold">{row.name || 'N/A'}</span></div>
                    <div className="text-xs text-gray-500">{row.cnic || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{row.phone || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{row.email || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-3">{row.serviceType || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-xs w-28"
                      value={row.assignedTo || ''}
                      placeholder="Assign user"
                      onChange={e => {
                        const newVal = e.target.value;
                        setServices(prev => prev.map((r, i) => i === (idx + (currentPage - 1) * PAGE_SIZE) ? { ...r, assignedTo: newVal } : r));
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${row.status === 'completed' ? 'bg-green-100 text-green-700' :
                        row.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          row.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'}`}
                    >
                      {row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : 'Pending'}
                    </span>
                  </td>

                </tr>
              ))}
              {currentData.length === 0 && !loading && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-400">No manual services found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Invoice Modal */}
        {showInvoice && invoiceData && (
          <>
            {/* Modal overlay for user */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-xs p-0 relative animate-fade-in flex justify-center">
                <div className="bg-white p-6 rounded-xl shadow w-full flex flex-col mx-auto border border-gray-200 relative" style={{ maxWidth: 380 }}>
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl z-10"
                    onClick={handleCloseInvoice}
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
                        // Download Invoice as PDF (optimized for smaller size)
                        const jsPDF = (await import('jspdf')).default;
                        const html2canvas = (await import('html2canvas')).default;
                        const printArea = document.getElementById('invoice-print-area');
                        if (!printArea) return toast.error('Invoice content not found');
                        // Wait for images to load
                        const images = printArea.querySelectorAll('img');
                        await Promise.all(Array.from(images).map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = res; }))); 
                        await new Promise(res => setTimeout(res, 200));
                        // Fix unsupported oklch() color by overriding all color/backgroundColor styles
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
                        // Lower scale for smaller PDF, and compress image
                        const canvas = await html2canvas(printArea, { scale: 1.2, useCORS: true, allowTaint: false, backgroundColor: '#fff' });
                        // Restore original styles
                        originalStyles.forEach(({ el, color, bg }) => {
                          el.style.color = color;
                          el.style.backgroundColor = bg;
                        });
                        // Compress PNG to JPEG for smaller PDF
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
                        // Compose filename as username_service_invoice.pdf
                        const userName = (invoiceData.name || 'user').replace(/[^a-z0-9]+/gi, '_');
                        const service = (invoiceData.serviceType || invoiceData.service || 'service').replace(/[^a-z0-9]+/gi, '_');
                        pdf.save(`${userName}_${service}_invoice.pdf`);
                        toast.success('Invoice downloaded successfully');
                      }}
                    >
                      Download Invoice
                    </button>
                    <button
                      className="w-full border border-[#57123f] text-[#57123f] rounded-lg py-2 font-semibold hover:bg-[#f7f0f5] transition"
                      onClick={async () => {
                        // Download all images as zip
                        let imageFiles = [];
                        if (invoiceData.fields) {
                          Object.entries(invoiceData.fields).forEach(([key, value]) => {
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
                        if (invoiceData.cnicGroups && Array.isArray(invoiceData.cnicGroups)) {
                          invoiceData.cnicGroups.forEach(group => {
                            if (group.front && group.front.match(/\.(jpg|jpeg|png)$/i)) {
                              imageFiles.push(group.front.replace(/.*uploads[\\/]/, ''));
                            }
                            if (group.back && group.back.match(/\.(jpg|jpeg|png)$/i)) {
                              imageFiles.push(group.back.replace(/.*uploads[\\/]/, ''));
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
                            // skip file if fetch fails
                          }
                        }));
                        const userName = (invoiceData.name || 'user').replace(/[^a-z0-9]+/gi, '_');
                        const service = (invoiceData.serviceType || invoiceData.service || 'service').replace(/[^a-z0-9]+/gi, '_');
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
                        // Download all document files as zip
                        const docExt = /\.(pdf|docx?|xlsx?|xls|pptx?|ppt)$/i;
                        let docFiles = [];
                        if (invoiceData.fields) {
                          const flattenAndCollect = (val) => {
                            if (typeof val === 'string' && docExt.test(val)) {
                              docFiles.push(val.replace(/.*uploads[\\/]/, ''));
                            } else if (Array.isArray(val)) {
                              val.forEach(flattenAndCollect);
                            } else if (typeof val === 'object' && val !== null) {
                              Object.values(val).forEach(flattenAndCollect);
                            }
                          };
                          Object.entries(invoiceData.fields).forEach(([key, value]) => {
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
                            // skip file if fetch fails
                          }
                        }));
                        const userName = (invoiceData.name || 'user').replace(/[^a-z0-9]+/gi, '_');
                        const service = (invoiceData.serviceType || invoiceData.service || 'service').replace(/[^a-z0-9]+/gi, '_');
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
              <InvoiceContent invoiceData={invoiceData} />
            </div>
          </>
        )}
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
      </div>
    </div>
  );
};

export default ManualService;
