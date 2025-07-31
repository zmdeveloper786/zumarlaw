import mongoose  from 'mongoose';


// Sub-schema for file metadata
const FileMetaSchema = new mongoose.Schema({
  filename: String, // stored filename (with extension)
  originalName: String, // original uploaded name
  type: { type: String }, // 'image' or 'document'
  mimetype: String, // e.g. 'image/png', 'application/pdf'
  url: String, // path or URL to file
  uploadedAt: { type: Date, default: Date.now }
}, { _id: false });

const ConvertedLeadSchema = new mongoose.Schema({
  // Basic lead info
  name: String,
  cnic: String,
  phone: String,
  email: String,
  assigned: String,
  service: String,
  status: { type: String, default: 'Converted' },
  // Dynamic fields
  fields: { type: Object, default: {} },
  // File uploads (store file names/paths)
  files: { type: Object, default: {} },
  // New: Document files (pdf, doc, docx, etc.)
  docs: [FileMetaSchema],
  createdAt: { type: Date, default: Date.now },
});

export default  mongoose.model('ConvertedLead', ConvertedLeadSchema);
