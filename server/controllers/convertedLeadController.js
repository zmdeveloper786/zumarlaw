// Delete a converted lead by ID (hard delete)
export const deleteConvertedLead = async (req, res) => {
  try {
    const lead = await ConvertedLead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
import ConvertedLead from '../models/ConvertedLead.js';
import path from 'path';
import fs from 'fs';

// Helper to handle file fields
function extractFilesFromReq(req) {
  const files = {};
  if (req.files) {
    Object.keys(req.files).forEach(field => {
      if (Array.isArray(req.files[field])) {
        files[field] = req.files[field].map(f => f.filename);
      } else {
        files[field] = req.files[field].filename;
      }
    });
  }
  return files;
}

export const createConvertedLead = async (req, res) => {
  try {
    // Basic fields
    const { name, cnic, phone, email, assigned, service, status, ...rest } = req.body;
    // Dynamic fields (non-file)
    const fields = { ...rest };
    // File fields
    const files = extractFilesFromReq(req);
    const lead = new ConvertedLead({
      name, cnic, phone, email, assigned, service, status,
      fields,
      files,
    });
    await lead.save();
    res.status(201).json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllConvertedLeads = async (req, res) => {
  try {
    const leads = await ConvertedLead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConvertedLead = async (req, res) => {
  try {
    const lead = await ConvertedLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
