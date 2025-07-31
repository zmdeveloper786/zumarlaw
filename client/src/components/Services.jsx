import { useState } from 'react';
import ServiceCard from './ServiceCard';
import NTNSalaried from '../assets/icons/NTN-Salaried.svg'
import NTNPartner from '../assets/icons/NTN -partnership.svg'
import NTNbusines from '../assets/icons/NTN-BUsiness.svg'
import NTNCompany from '../assets/icons/NTN-Company.svg'
import NTNNGO from '../assets/icons/NTN-NGO.svg'
import gst from '../assets/icons/Gst-registration.svg'
import copyright from '../assets/icons/cpoyright.svg'
import patent from '../assets/icons/patent.svg'
import trademark from '../assets/icons/trademark.svg'
import company from '../assets/icons/Company Registration.svg'
import arms from '../assets/icons/arms.svg'
import impoort from '../assets/icons/import export.svg'
import tax from '../assets/icons/incometax.svg'


const categories = [
  "Sales Tax",
  "NTN",
  "PSEB Reg",
  "Company Reg",
  "Income Tax",
  "Arms License",
  "NPO / NGO",
  "Intellectual Property",
  "Import Export",
];

const services = [


  // NTN Services
  {
    title: "NTN Registration - Salaried",
    category: "NTN",
    icon: NTNSalaried
  },
  {
    title: "NTN Registration - Partnership",
    category: "NTN",
    icon: NTNPartner
  },
  {
    title: "NTN Registration - Business",
    category: "NTN",
    icon: NTNbusines
  },
  {
    title: "NTN Registration - Company",
    category: "NTN",
    icon: NTNCompany
  },
  {
    title: "NTN Registration - NGO/NPO",
    category: "NTN",
    icon: NTNNGO
  },

  // Sales Tax Services
  {
    title: "GST Registration - Trader",
    category: "Sales Tax",
    icon: gst
  },
  {
    title: "GST Registration - Manufacturer",
    category: "Sales Tax",
    icon: gst
  },
  {
    title: "Monthly Federal / Provincial Sales Tax Return Filing",
    category: "Sales Tax",
    icon: tax
  },
  {
    title: "PST Registration - Individual",
    category: "Sales Tax",
    icon: tax
  },
  {
    title: "PST Registration - Partnership",
    category: "Sales Tax",
    icon: tax
  },
  {
    title: "PST Registration - Company",
    category: "Sales Tax",
    icon: tax
  },

  // Tax Services
  {
    title: "Annual Tax Return - Salaried",
    category: "Income Tax",
    icon: tax
  },
  {
    title: "Annual Tax Return - Sole Proprietor",
    category: "Income Tax",
    icon: tax
  },
  {
    title: "Annual Tax Return - Company",
    category: "Income Tax",
    icon: tax
  },
  {
    title: "Annual Tax Return - NPO/NGO",
    category: "Income Tax",
    icon: tax
  },

  // Company Services
  {
    title: "Private Limited Company Registration",
    category: "Company Reg",
    icon: company
  },
  {
    title: "Single Member Company Registration",
    category: "Company Reg",
    icon: company
  },
  {
    title: "Limited Liability Partnership (LLP)",
    category: "Company Reg",
    icon: company
  },
  {
    title: "Partnership/AOP Registration",
    category: "Company Reg",
    icon: company
  },

  // Arms License
  {
    title: "Arms License - Punjab (Non-Prohibited Bore)",
    category: "Arms License",
    icon: arms
  },
  {
    title: "Arms License - All Pakistan (Non-Prohibited Bore)",
    category: "Arms License",
    icon: arms
  },
  {
    title: "ICT Arms License (Punjab/Islamabad)",
    category: "Arms License",
    icon: arms
  },

  // NGO Services
  {
    title: "NPO Registration with SECP",
    category: "NPO / NGO",
    icon: NTNNGO
  },
  {
    title: "NGO Registration with Registrar",
    category: "NPO / NGO",
    icon: NTNNGO
  },
  {
    title: "NGO/NPO Registration",
    category: "NPO / NGO",
    icon: NTNNGO
  },

  // PSEB Services
  {
    title: "Company Renewal Registration",
    category: "PSEB Reg",
    icon: company
  },
  {
    title: "Company Registration PSEB",
    category: "PSEB Reg",
    icon: company
  },
  {
    title: "New Call Center Registration",
    category: "PSEB Reg",
    icon: company
  },
  {
    title: "Freelancer Registration",
    category: "PSEB Reg",
    icon: company
  },
  {
    title: "Freelancer Renewal",
    category: "PSEB Reg",
    icon: company
  },

  // Intellectual Property
  {
    title: "Trademark Registration",
    category: "Intellectual Property",
    icon: trademark
  },
  {
    title: "Copyright Registration",
    category: "Intellectual Property",
    icon: copyright
  },
  {
    title: "Patent Registration",
    category: "Intellectual Property",
    icon: patent
  },

  // Import Export
  {
    title: "Sole Proprietor",
    category: "Import Export",
    icon: impoort
  },
  {
    title: "Partnership firm",
    category: "Import Export",
    icon: impoort
  },
  {
    title: "Private Limited Company (PVT)",
    category: "Import Export",
    icon: impoort
  },
];

const Services = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter services based on search query
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered services by category
  const groupedServices = categories.reduce((acc, category) => {
    const categoryServices = filteredServices.filter(service => service.category === category);
    if (categoryServices.length > 0) {
      acc[category] = categoryServices;
    }
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className='text-center font-semibold text-4xl py-4'>Select The Services You Want</h2>
      {/* Search */}
      <div className="mb-8 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search service by name or category"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#57123f] focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 text-xs pb-2">
          <button
            onClick={() => setSelectedTab("All")}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedTab === "All"
              ? "bg-[#57123f] text-white"
              : "bg-[#ecd4bc] bg-opacity-20 text-[#57123f] hover:bg-opacity-30"
              }`}
          >
            All Services
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedTab(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedTab === category
                ? "bg-[#57123f] text-white"
                : "bg-[#ecd4bc] bg-opacity-20 text-[#57123f] hover:bg-opacity-30"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>



      {/* Show "No results found" message if no matches */}
      {filteredServices.length === 0 && searchQuery && (
        <div className="text-center py-8 text-gray-500">
          No services found matching "{searchQuery}"
        </div>
      )}

      {/* Services by Category */}
      <div className="space-y-12">
        {Object.entries(
          selectedTab === "All"
            ? groupedServices
            : { [selectedTab]: groupedServices[selectedTab] || [] }
        ).map(([category, categoryServices]) => (
          categoryServices.length > 0 && (
            <div key={category}>
              <h2 className="text-[#57123f] text-2xl font-semibold mb-6 border-b border-[#ecd4bc] pb-2">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categoryServices.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    status={service.status}
                    Icon={service.icon}
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Services;