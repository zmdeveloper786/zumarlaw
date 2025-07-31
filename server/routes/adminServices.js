import express from 'express';
import { verifyJWT } from '../middleware/authMiddleware.js';
import Service from '../models/Service.js';

const router = express.Router();

// Get all services (with filter options)
router.get('/admin/services', verifyJWT, async (req, res) => {
  try {
    const { isManualSubmission } = req.query;
    
    // Build query based on parameters
    const query = {};
    if (isManualSubmission !== undefined) {
      query.isManualSubmission = isManualSubmission === 'true';
    }

    const services = await Service.find(query)
      .populate('personalId')
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

export default router;
