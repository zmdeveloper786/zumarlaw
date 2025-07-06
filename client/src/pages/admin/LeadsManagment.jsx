import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2, UserPlus } from "lucide-react";
import { BiImport } from "react-icons/bi";

const tabs = [
  { name: "Today Leads", count: 35 },
  { name: "All Leads", count: 135 },
  { name: "FB Leads", count: 20 },
  { name: "Follow-Ups", count: 10 },
];

export default function LeadManagement() {
  const [activeTab, setActiveTab] = useState("Today Leads");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leads, setLeads] = useState([]);
  const leadsPerPage = 5;

  const statusColor = {
    "New Lead": "bg-purple-100 text-[#57123f]",
    "Follow-up": "bg-yellow-100 text-yellow-700",
    "Contacted": "bg-green-100 text-green-700",
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/leads");
      setLeads(res.data);
    } catch (err) {
      setLeads([]);
    }
  };

  // Filter leads by search and date
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm) ||
        lead.cnic?.includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDate = filterDate
      ? (lead.createdAt && new Date(lead.createdAt).toISOString().slice(0, 10) === filterDate)
      : true;

    return matchesSearch && matchesDate;
  });

  const indexOfLast = currentPage * leadsPerPage;
  const indexOfFirst = indexOfLast - leadsPerPage;
  const paginatedLeads = filteredLeads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  return (
    <div className="w-auto space-y-5 py-6 bg-white">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-2 px-2">
        <Link to="/admin" className="hover:underline">Dashboard</Link> &gt; <span className="text-[#57123f] font-semibold">Leads</span>
      </div>

      {/* Header & Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Leads</h2>
        <div className="space-x-2 flex">
          <Link
            to="/admin/leads/add"
            className="bg-[#57123f] hover:bg-[#7a1a59] text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <UserPlus size={18} />
            Add New Lead
          </Link>
          <Link
            to="/admin/leads/import"
            className="bg-[#57123f] hover:bg-[#7a1a59] text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <BiImport size={18} />
            Import Leads (.csv)
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === tab.name
                ? "bg-[#57123f] text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {tab.name} <span className="ml-1">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Search and Date Filter */}
      <div className="flex flex-wrap gap-4 items-center px-2">
        <input
          type="text"
          placeholder="Search by name, phone, CNIC, email"
          className="border px-4 py-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border px-4 py-2 rounded"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Leads Table */}
      <div className="overflow-auto rounded border">
        <table className="w-full min-w-[957px] text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2"><input type="checkbox" /></th>
              <th className="p-2">Lead Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Registered On</th>
              <th className="p-2">Phone No.</th>
              <th className="p-2">Status</th>
              <th className="p-2">Branch</th>
              <th className="p-2">Assigned To</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.length > 0 ? (
              paginatedLeads.map((lead, idx) => (
                <tr key={lead._id || idx} className="border-b hover:bg-gray-50">
                  <td className="p-2"><input type="checkbox" /></td>
                  <td className="p-2">
                    <div className="font-medium" title={lead.name}>{lead.name && lead.name.length > 5 ? lead.name.slice(0, 5) + '...' : lead.name}</div>
                    <div className="text-gray-500 text-xs" title={lead.cnic}>{lead.cnic && lead.cnic.length > 5 ? lead.cnic.slice(0, 5) + '...' : lead.cnic}</div>
                  </td>
                  <td className="p-2" title={lead.email}>{lead.email && lead.email.length > 5 ? lead.email.slice(0, 5) + '...' : lead.email}</td>
                  <td className="p-2" title={lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}</td>
                  <td className="p-2" title={lead.phone}>{lead.phone && lead.phone.length > 5 ? lead.phone.slice(0, 5) + '...' : lead.phone}</td>
                  <td className="p-2" title={lead.status}>{lead.status && lead.status.length > 5 ? lead.status.slice(0, 5) + '...' : lead.status}</td>
                  <td className="p-2" title={lead.branch}>{lead.branch && lead.branch.length > 5 ? lead.branch.slice(0, 5) + '...' : lead.branch}</td>
                  <td className="p-2" title={lead.assigned}>{lead.assigned && lead.assigned.length > 5 ? lead.assigned.slice(0, 5) + '...' : lead.assigned}</td>
                  <td className="p-2 flex gap-1 text-[#57123f]">
                    <Eye size={18} className="cursor-pointer" />
                    <Edit size={18} className="cursor-pointer" />
                    <Trash2 size={18} className="cursor-pointer" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 px-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-[#57123f] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
