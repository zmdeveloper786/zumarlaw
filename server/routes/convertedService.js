import express from 'express';
import multer from 'multer';
import path from 'path';
import * as convertedLeadController from '../controllers/convertedLeadController.js';
const router = express.Router();

// Multer setup for file uploads
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

// Accept any file fields (dynamic)
const anyFiles = upload.any();

// POST /convertedService - create converted lead
router.post('/', anyFiles, convertedLeadController.createConvertedLead);
// GET /convertedService - get all converted leads
router.get('/', convertedLeadController.getAllConvertedLeads);
// GET /convertedService/:id - get one converted lead

// DELETE /convertedService/:id - delete a converted lead
router.delete('/:id', convertedLeadController.deleteConvertedLead);
router.get('/:id', convertedLeadController.getConvertedLead);

export default router;
