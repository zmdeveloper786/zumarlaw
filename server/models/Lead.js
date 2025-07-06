import mongoose  from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: String,
    cnic: String,
    createdAt: { type: Date, default: Date.now },
    phone: String,
    email: String,
    status: String,
    branch: String,
    assigned: String
});

export default mongoose.model('Lead', LeadSchema);
