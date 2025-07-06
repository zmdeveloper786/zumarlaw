import express from 'express';
import Lead from '../models/Lead.js';

const router = express.Router();

// Bulk import leads
router.post('/import', async (req, res) => {
    try {
        const { leads } = req.body;
        if (!Array.isArray(leads) || leads.length === 0) {
            return res.status(400).json({ message: 'No leads provided' });
        }
        await Lead.insertMany(leads);
        res.status(201).json({ message: 'Leads imported successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to import leads', error: err.message });
    }
});

// Get all leads
router.get('/', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch leads', error: err.message });
    }
});

// (Optional) Add single lead
router.post('/', async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json(lead);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add lead', error: err.message });
    }
});

export default router;
