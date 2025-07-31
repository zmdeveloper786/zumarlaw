
import express from 'express';
import multer from 'multer';
import path from 'path';
import ManualServiceSubmission from '../models/ManualServiceSubmission.js';
import { deleteManyManualServices } from '../controllers/manualServiceController.js';
// Delete many manual service submissions

const router = express.Router();
router.post('/deleteMany', deleteManyManualServices);

// Multer config for file uploads (store in /uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage });

// Accept manual service submission (DirectService.jsx)
router.post('/', upload.any(), async (req, res) => {
  try {
    const { serviceType, name, email, cnic, phone } = req.body;
    // Parse dynamic fields
    const fields = { ...req.body };
    delete fields.serviceType;
    delete fields.name;
    delete fields.email;
    delete fields.cnic;
    delete fields.phone;

    // Attach file paths to fields
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        // For CNIC groups
        if (file.fieldname.startsWith('cnic_group_')) {
          // handled below
        } else {
          fields[file.fieldname] = file.path;
        }
      });
    }

    // Handle CNIC groups
    let cnicGroups = [];
    if (req.files && req.files.length > 0) {
      const groupMap = {};
      req.files.forEach(file => {
        if (file.fieldname.startsWith('cnic_group_')) {
          // e.g. cnic_group_0_front
          const match = file.fieldname.match(/cnic_group_(\d+)_(front|back)/);
          if (match) {
            const idx = match[1];
            const side = match[2];
            if (!groupMap[idx]) groupMap[idx] = {};
            groupMap[idx][side] = file.path;
          }
        }
      });
      cnicGroups = Object.values(groupMap);
    }

    const submission = new ManualServiceSubmission({
      serviceType,
      name,
      email,
      cnic,
      phone,
      fields,
      cnicGroups
    });
    await submission.save();
    res.status(201).json({ message: 'Submission saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// Get all manual service submissions (DirectService.jsx)
router.get('/', async (req, res) => {
  try {
    const submissions = await ManualServiceSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

export default router;