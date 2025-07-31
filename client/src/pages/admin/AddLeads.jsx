import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FiUser, FiCreditCard, FiPhone, FiCalendar, FiCheckCircle, FiChevronDown } from 'react-icons/fi';

const AddLeads = () => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm();

    const onSubmit = async (data) => {
        // Combine CNIC parts
        const cnic = `${data.cnicPart1}-${data.cnicPart2}-${data.cnicPart3}`;
        const lead = {
            name: data.name,
            cnic,
            phone: `${data.countryCode}${data.phoneNumber}`,
            status: data.leadStatus || 'New Lead',
            date: new Date().toISOString().slice(0, 10),
            assigned: data.assignedTo,
            service: data.service,
            leadSource: data.leadSource,
            firstFollowUpDate: data.firstFollowUpDate,
            nextFollowUpDate: data.nextFollowUpDate,
            remarks: data.remarks,
        };
        try {
            await axios.post('http://localhost:5000/leads', lead);
            toast.success('Lead added successfully!');
            reset();
        } catch (err) {
            toast.error('Failed to add lead');
        }
    };

    const services = [
        'NTN Registration - Business',
        'NTN Registration - Salaried',
        'NTN Registration - Partnership',
        'NTN Registration - Company',
        'NTN Registration - NGO/NPO',
        'Private Limited Company Registration',
        'Single Member Company Registration',
        'Limited Liability Partnership (LLP)',
        'Partnership/AOP Registration',
        'Annual Tax Return - Salaried',
        'Annual Tax Return - Sole Proprietor',
        'Annual Tax Return - Company',
        'Annual Tax Return - NPO/NGO',
        'GST Registration - Trader',
        'GST Registration - Manufacturer',
        'Monthly Federal / Provincial Sales Tax Return Filing',
        'PST Registration - Individual',
        'PST Registration - Partnership',
        'PST Registration - Company',
        'Trademark Registration',
        'Copyright Registration',
        'Patent Registration',
        'NPO Registration with SECP',
        'NGO Registration with Registrar',
        'NGO/NPO Registration',
        'Registration of NGOs/ Charities/ Trusts with Sindh Charity Commission',
        'Arms License - Punjab (Non-Prohibited Bore)',
        'Arms License - All Pakistan (Non-Prohibited Bore)',
        'ICT Arms License (Punjab/Islamabad)',
        'Company Renewal Registration',
        'Company Registration PSEB',
        'Call Center Renewal Registration',
        'New Call Center Registration',
        'Freelancer Registration',
        'Freelancer Renewal',
        'Sole Proprietor',
        'Partnership firm',
        'Private Limited Company (PVT)'
    ];

    const leadSources = [
        'Website',
        'Referral',
        'Social Media',
        'Advertisement',
        'Walk-in',
        'Other'
    ];

    const branches = [
        'Main Branch - Islamabad',
        'Lahore Office',
        'Karachi Office',
        'Peshawar Office'
    ];

    const employees = [
        'Ali Khan',
        'Sara Ahmed',
        'Usman Malik',
        'Fatima Riaz'
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Heading and Breadcrumbs */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Add New Lead</h1>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                    <span className="hover:text-[#57123f] cursor-pointer">Dashboard</span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-[#57123f] cursor-pointer">Lead Management</span>
                    <span className="mx-2">/</span>
                    <span className="text-[#57123f] font-medium">Add New Lead</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6">
                {/* Personal Details Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <FiUser className="mr-2" /> Add Personal Details
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className='block'>
                            <span className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <FiCreditCard className="mr-2" /> CNIC
                            </span>
                        </label>
                        <div className="flex space-x-2">
                            <input
                                {...register("cnicPart1", {
                                    required: "CNIC is required",
                                    pattern: {
                                        value: /^\d{5}$/,
                                        message: "Must be 5 digits"
                                    }
                                })}
                                type="text"
                                maxLength={5}
                                className="w-1/4 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="XXXXX"
                            />
                            <span className="flex items-center">-</span>
                            <input
                                {...register("cnicPart2", {
                                    required: true,
                                    pattern: {
                                        value: /^\d{7}$/,
                                        message: "Must be 7 digits"
                                    }
                                })}
                                type="text"
                                maxLength={7}
                                className="w-2/5 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="XXXXXXX"
                            />
                            <span className="flex items-center">-</span>
                            <input
                                {...register("cnicPart3", {
                                    required: true,
                                    pattern: {
                                        value: /^\d{1}$/,
                                        message: "Must be 1 digit"
                                    }
                                })}
                                type="text"
                                maxLength={1}
                                className="w-1/6 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="X"
                            />
                        </div>
                        {errors.cnicPart1 && <p className="mt-1 text-sm text-red-600">{errors.cnicPart1.message}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block">
                            <span className='text-sm font-medium text-gray-700 mb-1 flex items-center'>

                                <FiPhone className="mr-2" /> Mobile Phone
                            </span>
                        </label>
                        <div className="flex">
                            <select
                                {...register("countryCode")}
                                className="w-20 px-2 py-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="+92">+92</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                            </select>
                            <input
                                {...register("phoneNumber", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Must be 10 digits"
                                    }
                                })}
                                type="text"
                                className="flex-1 px-4 py-2 border-t border-b border-r rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="XXXXXXXXXX"
                            />
                        </div>
                        {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
                    </div>
                </section>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Remarks Input */}
                <section className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                    <textarea
                        {...register("remarks")}
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add any remarks or notes about the lead"
                        rows={3}
                    />
                </section>

                {/* Lead Information Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Lead Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested in</label>
                            <div className="relative">
                                <select
                                    {...register("service", { required: "Service is required" })}
                                    className="w-full px-4 py-2 border rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select the service</option>
                                    {services.map((service, index) => (
                                        <option key={index} value={service}>{service}</option>
                                    ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                            </div>
                            {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Legal Source</label>
                            <div className="relative">
                                <select
                                    {...register("leadSource", { required: "Lead source is required" })}
                                    className="w-full px-4 py-2 border rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select the lead source</option>
                                    {leadSources.map((source, index) => (
                                        <option key={index} value={source}>{source}</option>
                                    ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                            </div>
                            {errors.leadSource && <p className="mt-1 text-sm text-red-600">{errors.leadSource.message}</p>}
                        </div>

                        {/* Branch removed */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                            <div className="relative">
                                <select
                                    {...register("assignedTo", { required: "Employee assignment is required" })}
                                    className="w-full px-4 py-2 border rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Choose the employee</option>
                                    {employees.map((employee, index) => (
                                        <option key={index} value={employee}>{employee}</option>
                                    ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                            </div>
                            {errors.assignedTo && <p className="mt-1 text-sm text-red-600">{errors.assignedTo.message}</p>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lead Status</label>
                        <div className="flex flex-wrap gap-3">
                            {['New', 'Contacted', 'Follow-up', 'Mature'].map((status) => (
                                <div key={status} className="flex items-center">
                                    <input
                                        {...register("leadStatus")}
                                        type="radio"
                                        id={status.toLowerCase()}
                                        value={status}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        defaultChecked={status === 'New'}
                                    />
                                    <label htmlFor={status.toLowerCase()} className="ml-2 text-sm text-gray-700">
                                        {status}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Follow-up Details Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <FiCalendar className="mr-2" /> Follow-up Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Follow-Up Date</label>
                            <input
                                {...register("firstFollowUpDate")}
                                type="date"
                                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow-Up Date</label>
                            <input
                                {...register("nextFollowUpDate")}
                                type="date"
                                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        {/* <button
                            type="button"
                            onClick={() => register("markAsComplete").onChange({ target: { checked: true } })}
                            className="px-4 py-2 text-white bg-[#57123f] rounded-md hover:bg-opacity-90 transition-all flex items-center gap-2"
                        >
                            <FiCheckCircle /> Mark As Complete
                        </button> */}

                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-2 rounded-md text-white bg-[#57123f] hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#57123f]"
                        >
                            <FiCheckCircle className="mr-2" /> Move to Processing
                        </button>
                    </div>
                </section>
            </form>
        </div>
    );
};

export default AddLeads;