export const serviceData = Object.freeze({
  // Prices
  prices: {
    'NTN Registration - Business': 1500,
    'NTN Registration - Salaried': 1000,
    'NTN Registration - Partnership': 2000,
    'NTN Registration - Company': 2000,
    'NTN Registration - NGO/NPO': 2000,
    'Private Limited Company Registration': 15000,
    'Single Member Company Registration': 15000,
    'Limited Liability Partnership (LLP)': 25000,
    'Partnership/AOP Registration': 10000,
    'Annual Tax Return - Salaried': 1500,
    'Annual Tax Return - Sole Proprietor': 3000,
    'Annual Tax Return - Company': 5000,
    'Annual Tax Return - NPO/NGO': 5000,
    'GST Registration - Trader': 8000,
    'GST Registration - Manufacturer': 10000,
    'Monthly Federal / Provincial Sales Tax Return Filing': 4500,
    'PST Registration - Individual': 10000,
    'PST Registration - Partnership': 12000,
    'PST Registration - Company': 12000,
    'Trademark Registration': 60000,
    'Copyright Registration': 60000,
    'Patent Registration': 120000,
    'NPO Registration with SECP': 300000,
    'NGO Registration with Registrar': 180000,
    'NGO/NPO Registration': 200000,
    'Registration of NGOs/ Charities/ Trusts with Sindh Charity Commission': 200000,
    'Arms License - Punjab (Non-Prohibited Bore)': 80000,
    'Arms License - All Pakistan (Non-Prohibited Bore)': 135000,
    'ICT Arms License (Punjab/Islamabad)': 50000,
    'Company Renewal Registration': [30000, 70000],
    'Company Registration PSEB': 25000,
    'Call Center Renewal Registration': 30000,
    'New Call Center Registration': 30000,
    'Freelancer Registration': 3000,
    'Freelancer Renewal': 4000,
    'Sole Proprietor': 3000,
    'Partnership firm': 5000,
    'Private Limited Company (PVT)': 7000
  },
  // Fields
  fields: {
    'NTN Registration - Business': [
      { name: 'gmail_id', label: 'Gmail ID', type: 'email' },
      { name: 'phone_no', label: 'Phone Number', type: 'tel' },
      { name: 'Business_Name', label: 'Business Name', type: 'text' },
      { name: 'Business_Nature', label: 'Business Nature', type: 'text' },
      { name: 'Business_Address', label: 'Business Address', type: 'text' },
      { name: 'cnic_copy_front', label: 'Color Copy of CNIC Front', type: 'file' },
      { name: 'cnic_copy_back', label: 'Color Copy of CNIC Back', type: 'file' },
      { name: 'agree_terms', label: 'I agree to the terms', type: 'checkbox' }
    ],
    'NTN Registration - Salaried': [
      { name: 'gmail_id', label: 'Gmail ID', type: 'email' },
      { name: 'phone_no', label: 'Phone Number', type: 'tel' },
      { name: 'cnic_copy_front', label: 'Color Copy of CNIC Front', type: 'file' },
      { name: 'cnic_copy_back', label: 'Color Copy of CNIC Back', type: 'file' },
    ],
    'NTN Registration - Partnership': [
      { name: 'gmail_id', label: 'Gmail ID', type: 'email' },
      { name: 'phone_no', label: 'Phone Number', type: 'tel' },
      { name: 'cnic_partners_front', label: 'CNIC Copy of Partner Front', type: 'file' },
      { name: 'cnic_partners_back', label: 'CNIC Copy of Partner Back', type: 'file' },
      { name: 'firm_form_c', label: 'Firm Form C', type: 'file' },
      { name: 'deed', label: 'Deed', type: 'file' }
    ],
    'NTN Registration - Company': [
      { name: 'gmail_id', label: 'Gmail ID', type: 'email' },
      { name: 'phone_no', label: 'Phone Number', type: 'tel' },
      { name: 'directors_cnic_front', label: 'Color Copy of Director CNIC Front', type: 'file' },
      { name: 'directors_cnic_back', label: 'Color Copy of Director CNIC Back', type: 'file' },
      { name: 'incorporate_certificate', label: 'Incorporate Certificate', type: 'file' }
    ],
    'NTN Registration - NGO/NPO': [
      { name: 'npo_certificate', label: 'NPO Incorporate Certificate', type: 'file' },
      { name: 'gmail_id', label: 'Gmail ID', type: 'email' },
      { name: 'phone_no', label: 'Phone Number', type: 'tel' },
      { name: 'aoa_moa', label: 'AOA / MOA', type: 'file' },
    ],
    'Private Limited Company Registration': [
      { name: 'company_name', label: 'Company Name', type: 'text' },
      { name: 'company_address', label: 'Company Address', type: 'text' },
      { name: 'business_nature', label: 'Nature Of Business', type: 'text' },
      { name: 'directors_cnic_front', label: 'Color Copy of Director CNIC Front', type: 'file' },
      { name: 'directors_cnic_back', label: 'Color Copy of Director CNIC Back', type: 'file' },
      { name: 'director_gmail', label: 'Director Gmail', type: 'email' },
      { name: 'director_phone', label: 'Director Registered Phone No', type: 'tel' }
    ],
    'Single Member Company Registration': [
      { name: 'company_name', label: 'Company Name', type: 'text' },
      { name: 'company_address', label: 'Company Address', type: 'text' },
      { name: 'business_nature', label: 'Nature Of Business', type: 'text' },
      { name: 'owner_cnic_front', label: 'Owner CNIC Copy Front', type: 'file' },
      { name: 'owner_cnic_back', label: 'Owner CNIC Copy Back', type: 'file' },
      { name: 'owner_gmail', label: 'Owner Gmail', type: 'email' },
      { name: 'owner_phone', label: 'Owner Registered Phone No', type: 'tel' },
      { name: 'nominee_cnic_front', label: 'Nominee CNIC Copy Front', type: 'file' },
      { name: 'nominee_cnic_back', label: 'Nominee CNIC Copy Back', type: 'file' },
      { name: 'nominee_contact', label: 'Nominee Gmail / Phone No', type: 'text' }
    ],
    'Limited Liability Partnership (LLP)': [
      { name: 'llp_names', label: 'Three NAMES of the proposed LLP', type: 'text' },
      { name: 'partners_cnic_front', label: 'CNIC copies of ALL the proposed Partners Front', type: 'file' },
      { name: 'partners_cnic_back', label: 'CNIC copies of ALL the proposed Partners Back', type: 'file' },
      { name: 'iris_login', label: 'Iris Login Id', type: 'text' },
      { name: 'company_address', label: 'Company Address', type: 'text' },
      { name: 'business_nature', label: 'Nature Of Business', type: 'text' },
      { name: 'partners_contact', label: 'Phone / Email of All Partners', type: 'text' }
    ],
    'Partnership/AOP Registration': [
      { name: 'partners_cnic_front', label: 'CNIC copy of ALL the Partner Front', type: 'file' },
      { name: 'partners_cnic_back', label: 'CNIC copy of ALL the Partner Back', type: 'file' },
      { name: 'partners_phone', label: 'Phone No of All Partners', type: 'text' },
      { name: 'partners_email', label: 'Email Id of All Partners', type: 'text' },
      { name: 'firm_deed', label: 'Firm Deed', type: 'file' },
      { name: 'rent_agreement', label: 'Rent Agreement', type: 'file' }
    ],
    'Annual Tax Return - Salaried': [
      { name: 'iris_login', label: 'Iris Login Id', type: 'text' },
      { name: 'bank_statement', label: 'Bank Statement', type: 'file' },
      { name: 'salary_slip', label: 'Salary Slip', type: 'file' },
      { name: 'new_assets', label: 'Any New Asset Details', type: 'text' }
    ],
    'Annual Tax Return - Sole Proprietor': [
      { name: 'iris_login', label: 'Iris Login Id', type: 'text' },
      { name: 'bank_statement', label: 'Bank Statement', type: 'file' },
      { name: 'business_revenue', label: 'Business Revenue Detail', type: 'text' },
      { name: 'new_assets', label: 'Any New Assets Details', type: 'text' }
    ],
    'Annual Tax Return - Company': [
      { name: 'iris_login', label: 'Iris Login Id', type: 'text' },
      { name: 'bank_statement', label: 'Bank Statement', type: 'file' },
      { name: 'taxes_deducted', label: 'Taxes Deducted at Source', type: 'text' },
      { name: 'other_info', label: 'Other Information as Required', type: 'text' }
    ],
    'Annual Tax Return - NPO/NGO': [
      { name: 'iris_login', label: 'Iris Login Id', type: 'text' },
      { name: 'npo_bank_statement', label: 'NPO Account Bank Statement', type: 'file' },
      { name: 'financial_details', label: 'Financial Details', type: 'text' },
      { name: 'other_info', label: 'Other Information as Required', type: 'text' }
    ],
    'GST Registration - Trader': [
      { name: 'iris_login', label: 'Iris Login Id', type: 'text' },
      { name: 'bank_certificate', label: 'Bank Maintenance Certificate', type: 'file' },
      { name: 'business_premises_pic', label: 'Business Premises Pic', type: 'file' },
      { name: 'electricity_bill', label: 'Electricity Bill Pic', type: 'file' },
      { name: 'electricity_meter', label: 'Electricity Meter Pic', type: 'file' },
      { name: 'biometric_verification', label: 'Biometric Verification', type: 'checkbox' }
    ],
    'GST Registration - Manufacturer': [
      { name: 'iris_login', label: 'Iris Login Id', type: 'text' },
      { name: 'bank_certificate', label: 'Bank Maintenance Certificate', type: 'file' },
      { name: 'business_premises_pic', label: 'Business Premises Pic', type: 'file' },
      { name: 'electricity_bill', label: 'Electricity Bill Pic', type: 'file' },
      { name: 'electricity_meter', label: 'Electricity Meter Pic', type: 'file' },
      { name: 'machinery_pic', label: 'Pic of Machinery and Industrial Electricity or Gas Meter Installed', type: 'file' },
      { name: 'biometric_verification', label: 'Biometric Verification', type: 'checkbox' },
      { name: 'post_verification', label: 'Post Verification', type: 'checkbox' }
    ],
    'Monthly Federal / Provincial Sales Tax Return Filing': [
      { name: 'iris_login', label: 'Iris Login Id', type: 'text' },
      { name: 'invoice_details', label: 'Invoice Details', type: 'text' },
      { name: 'purchase_invoices', label: 'Copies of Purchase Invoices', type: 'file' },
      { name: 'bank_statement', label: 'Bank Statement', type: 'file' },
      { name: 'other_info', label: 'Other Information as Required', type: 'text' }
    ],
    'PST Registration - Individual': [
      { name: 'cnic_copy_front', label: 'Color Copy of CNIC Front', type: 'file' },
      { name: 'cnic_copy_back', label: 'Color Copy of CNIC Back', type: 'file' },
      { name: 'rent_agreement', label: 'Rent Agreement', type: 'file' },
      { name: 'letterhead', label: 'Letterhead', type: 'file' },
      { name: 'electricity_bill', label: 'Paid Electricity Bill', type: 'file' },
      { name: 'phone_number', label: 'Phone Number', type: 'text' },
      { name: 'email', label: 'Email Address', type: 'email' },
      { name: 'bank_certificate', label: 'Bank Account Certificate', type: 'file' },
      { name: 'signed_form', label: 'Signed Application Form', type: 'file' }
    ],
    'PST Registration - Company': [
      { name: 'incorporation_certificate', label: 'Incorporation Certificate', type: 'file' },
      { name: 'aoa_moa', label: 'AOA / MOA', type: 'file' },
      { name: 'form_a_29', label: 'Form A / 29', type: 'file' },
      { name: 'cnic_copy_front', label: 'Color Copy of CNIC Front', type: 'file' },
      { name: 'cnic_copy_back', label: 'Color Copy of CNIC Back', type: 'file' },
      { name: 'rent_agreement', label: 'Rent Agreement', type: 'file' },
      { name: 'letterhead', label: 'Letterhead', type: 'file' },
      { name: 'electricity_bill', label: 'Paid Electricity Bill', type: 'file' },
      { name: 'phone_number', label: 'Phone Number', type: 'text' },
      { name: 'email', label: 'Email Address', type: 'email' },
      { name: 'bank_certificate', label: 'Bank Account Certificate', type: 'file' },
      { name: 'signed_form', label: 'Signed Application Form', type: 'file' }
    ],
    'PST Registration - Partnership': [
      { name: 'form_c', label: 'Form C', type: 'file' },
      { name: 'partnership_deed', label: 'Partnership Deed', type: 'file' },
      { name: 'cnic_partners_front', label: 'Color Copy of CNIC (All Partners) Front', type: 'file' },
      { name: 'cnic_partners_back', label: 'Color Copy of CNIC (All Partners) Back', type: 'file' },
      { name: 'rent_agreement', label: 'Rent Agreement', type: 'file' },
      { name: 'letterhead', label: 'Letterhead', type: 'file' },
      { name: 'electricity_bill', label: 'Paid Electricity Bill', type: 'file' },
      { name: 'phone_number', label: 'Phone Number', type: 'text' },
      { name: 'email', label: 'Email Address', type: 'email' },
      { name: 'bank_certificate', label: 'Bank Account Certificate', type: 'file' },
      { name: 'signed_form', label: 'Signed Application Form', type: 'file' }
    ],
    'Trademark Registration': [
      { name: 'gmail_id', label: 'Gmail ID', type: 'email' },
      { name: 'phone_number', label: 'Phone Number', type: 'text' },
      { name: 'cnic_owner_front', label: 'Color Copy of CNIC (Owner) Front', type: 'file' },
      { name: 'cnic_owner_back', label: 'Color Copy of CNIC (Owner) Back', type: 'file' },
      { name: 'brand_logo', label: 'Brand Logo', type: 'file' }
    ],
    'Copyright Registration': [
      { name: 'work_copies', label: 'Two Copies of Work', type: 'file' },
      { name: 'fee_proof', label: 'Demand Draft / Pay Order of Fee', type: 'file' },
      { name: 'cnic_copy_front', label: 'Color Copy of CNIC Front', type: 'file' },
      { name: 'cnic_copy_back', label: 'Color Copy of CNIC Back', type: 'file' },
      { name: 'power_of_attorney', label: 'Power of Attorney', type: 'file' },
      { name: 'letterhead', label: 'Letterhead of the Business', type: 'file' },
      { name: 'noc_publisher', label: 'NOC from Publisher', type: 'file' },
      { name: 'search_certificate', label: 'Search Certificate from Trademark Office', type: 'file' }
    ],
    'Patent Registration': [
      { name: 'form_p1', label: 'Form P-1 or P-1A (Without Priority)', type: 'file' },
      { name: 'form_p2', label: 'Form P-2 or P-2A (With Priority)', type: 'file' },
      { name: 'form_p3', label: 'Form P-3 (Provisional) or P-3A (Complete Specification)', type: 'file' },
      { name: 'specification', label: 'Patent Specification', type: 'file' },
      { name: 'drawings', label: 'Drawings (if any)', type: 'file' },
      { name: 'fee_proof', label: 'Demand Draft / Pay Order of Fee', type: 'file' },
      { name: 'form_p28', label: 'Form P-28 (Power of Attorney)', type: 'file' },
      { name: 'priority_document', label: 'Priority Document', type: 'file' },
      { name: 'cnic_applicant_front', label: 'CNIC of the Applicant Front Side', type: 'file' },
      { name: 'cnic_applicant_back', label: 'CNIC of the Applicant Back Side', type: 'file' },
      { name: 'other_docs', label: 'Other Information or Documents as Required', type: 'file' }
    ],
    'NPO Registration with SECP': [
      { name: 'npo_name', label: 'NPO Name', type: 'text' },
      { name: 'npo_objective', label: 'NPO Objective', type: 'textarea' },
      { name: 'phone_members', label: 'Phone Number of All Members', type: 'text' },
      { name: 'email_members', label: 'Email ID of All Members', type: 'email' },
      { name: 'cnic_members_front', label: 'Color Copy of CNIC (All Members - Minimum 3)', type: 'file' },
      { name: 'cnic_members_back', label: 'Color Copy of CNIC (All Members - Minimum 3)', type: 'file' },
      { name: 'cvs_members', label: 'CVs of All Members', type: 'file' },
      { name: 'qualification_certificates', label: 'Bachelor\'s Qualification Certificates (All Members)', type: 'file' }
    ],

    'NGO Registration with Registrar': [
      { name: 'ngo_name', label: 'NGO Name', type: 'text' },
      { name: 'ngo_objective', label: 'NGO Objective', type: 'textarea' },
      { name: 'phone_members', label: 'Phone Number of All Members', type: 'text' },
      { name: 'email_members', label: 'Email ID of All Members', type: 'email' },
      { name: 'cnic_members_front', label: 'Color Copy of CNIC Front (All Members - Minimum 7)', type: 'file' },
      { name: 'cnic_members_back', label: 'Color Copy of CNIC Back (All Members - Minimum 7)', type: 'file' },
      { name: 'qualification_certificates', label: 'Bachelor\'s Qualification Certificates (All Members)', type: 'file' },
      { name: 'executive_body_list', label: 'Executive Body List', type: 'file' },
      { name: 'rent_agreement', label: 'Rent Agreement', type: 'file' }
    ],

    'NGO/NPO Registration': [
      { name: 'trust_name', label: 'Trust Name', type: 'text' },
      { name: 'email_members', label: 'Email ID of All Members', type: 'email' },
      { name: 'trust_objective', label: 'Trust Objective', type: 'textarea' },
      { name: 'cnic_members_front', label: 'Color Copy of CNIC (All Members) Front', type: 'file' },
      { name: 'cnic_members_back', label: 'Color Copy of CNIC (All Members) Back', type: 'file' },
      { name: 'phone_members', label: 'Phone Number of All Members', type: 'text' },
      { name: 'executive_body_list', label: 'Executive Body List', type: 'file' },
      { name: 'rent_agreement', label: 'Rent Agreement', type: 'file' }
    ],

    'Registration of NGOs/ Charities/ Trusts with Sindh Charity Commission': [
      { name: 'organization_name', label: 'Organization Name', type: 'text' },
      { name: 'organization_objective', label: 'Organization Objective', type: 'textarea' },
      { name: 'phone_members', label: 'Phone Number of All Members', type: 'text' },
      { name: 'email_members', label: 'Email ID of All Members', type: 'email' },
      { name: 'cnic_members_front', label: 'Color Copy of CNIC (All Members) Front', type: 'file' },
      { name: 'cnic_members_back', label: 'Color Copy of CNIC (All Members) Back', type: 'file' },
      { name: 'executive_body_list', label: 'Executive Body List', type: 'file' },
      { name: 'rent_agreement', label: 'Rent Agreement', type: 'file' }
    ],
    'Arms License - Punjab (Non-Prohibited Bore)': [
      { name: 'cnic_copy_front', label: 'CNIC Copy Front', type: 'file' },
      { name: 'cnic_copy_back', label: 'CNIC Copy Back', type: 'file' },
      { name: 'photo', label: 'Photo', type: 'file' },
      { name: 'medical_certificate', label: 'Medical Certificate (Proposed Arms License)', type: 'file' },
      { name: 'character_certificate', label: 'Character Certificate (Proposed Arms License)', type: 'file' },
      { name: 'affidavit', label: 'Affidavit', type: 'file' }
    ],

    'Arms License - All Pakistan (Non-Prohibited Bore)': [
      { name: 'cnic_copy_front', label: 'CNIC Copy Front', type: 'file' },
      { name: 'cnic_copy_back', label: 'CNIC Copy Back', type: 'file' },
      { name: 'photo', label: 'Photo', type: 'file' },
      { name: 'medical_certificate', label: 'Medical Certificate (Proposed Arms License)', type: 'file' },
      { name: 'character_certificate', label: 'Character Certificate (Proposed Arms License)', type: 'file' },
      { name: 'affidavit', label: 'Affidavit', type: 'file' }
    ],

    'ICT Arms License (Punjab/Islamabad)': [
      { name: 'cnic_copy_front', label: 'CNIC Copy Front', type: 'file' },
      { name: 'cnic_copy_back', label: 'CNIC Copy Back', type: 'file' },
      { name: 'photo', label: 'Photo', type: 'file' },
      { name: 'medical_certificate', label: 'Medical Certificate (Proposed Arms License)', type: 'file' },
      { name: 'character_certificate', label: 'Character Certificate (Proposed Arms License)', type: 'file' },
      { name: 'proof_residence', label: 'Proof of Residence in Islamabad', type: 'file' }
    ],
    'Company Renewal Registration': [
      { name: 'export_summary', label: 'Summary of Export Revenue (with IT/ITeS code defined by SBP)', type: 'file' },
      { name: 'financial_statement', label: 'Financial Statement or Income Tax Return (preceding year)', type: 'file' }
    ],
    'Company Registration PSEB': [
      { name: 'business_ntn', label: 'Business NTN', type: 'text' },
      { name: 'directors_cnic', label: 'Color Copy of Director CNIC Front', type: 'file' },
      { name: 'directors_cnic_front', label: 'Color Copy of Director CNIC Front', type: 'file' },
      { name: 'directors_cnic_Back', label: 'Color Copy of Director CNIC Back', type: 'file' },
      { name: 'passports_directors', label: 'Passports of Directors', type: 'file' },
      { name: 'memorandum_articles', label: 'Memorandum & Articles of Association (SECP)', type: 'file' },
      { name: 'incorporation_certificate', label: 'Incorporation Certificate (SECP)', type: 'file' },
      { name: 'partnership_deed', label: 'Partnership Deed (for firms)', type: 'file' },
      { name: 'firm_registration_certificate', label: 'Firm Registration Certificate (for firms)', type: 'file' },
      { name: 'bank_statement', label: 'Business Bank Statement', type: 'file' },
      { name: 'maintenance_certificate', label: 'Business Maintenance Certificate', type: 'file' }
    ],

    'Call Center Renewal Registration': [
      { name: 'export_summary', label: 'Summary of Export Revenue (with IT/ITeS code defined by SBP)', type: 'file' },
      { name: 'financial_statement', label: 'Financial Statement or Income Tax Return (preceding year)', type: 'file' }
    ],

    'New Call Center Registration': [
      { name: 'business_ntn', label: 'Business NTN', type: 'text' },
      { name: 'directors_cnic_front', label: 'Color Copy of Director CNIC Front', type: 'file' },
      { name: 'directors_cnic_back', label: 'Color Copy of Director CNIC Back', type: 'file' },
      { name: 'passports_directors', label: 'Passports of Directors', type: 'file' },
      { name: 'memorandum_articles', label: 'Memorandum & Articles of Association (SECP)', type: 'file' },
      { name: 'incorporation_certificate', label: 'Incorporation Certificate (SECP)', type: 'file' },
      { name: 'partnership_deed', label: 'Partnership Deed (for firms)', type: 'file' },
      { name: 'firm_registration_certificate', label: 'Firm Registration Certificate (for firms)', type: 'file' },
      { name: 'bank_statement', label: 'Business Bank Statement', type: 'file' },
      { name: 'maintenance_certificate', label: 'Business Maintenance Certificate', type: 'file' }
    ],

    'Freelancer Registration': [
      { name: 'personal_ntn', label: 'Personal NTN', type: 'text' },
      { name: 'cnic_front', label: 'CNIC Front', type: 'file' },
      { name: 'cnic_back', label: 'CNIC Back', type: 'file' },
      { name: 'bank_certificate', label: 'Personal Bank Account Letter/Certificate', type: 'file' }
    ],

    'Freelancer Renewal': [
      { name: 'export_summary', label: 'Summary of Export Revenue (with IT/ITeS code defined by SBP)', type: 'file' },
      { name: 'income_tax_return', label: 'Income Tax Return (preceding year)', type: 'file' }
    ],
    'Sole Proprietor': [
      { name: 'business_ntn', label: 'Business NTN', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone No', type: 'text' }
    ],

    'Partnership firm': [
      { name: 'firm_ntn', label: 'Firm NTN', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone No', type: 'text' },
      { name: 'form_c', label: 'Form C', type: 'file' }
    ],

    'Private Limited Company (PVT)': [
      { name: 'company_ntn', label: 'Company NTN', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone No', type: 'text' },
      { name: 'incorporation_certificate', label: 'Incorporation Certificate', type: 'file' }
    ],

  }
});