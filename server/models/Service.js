import mongoose from 'mongoose';


const ServiceDetailSchema = new mongoose.Schema({
  serviceTitle: String,
  formFields: Object,
  personalId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalDetail' },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // isManualSubmission removed; manual and direct services are independent
}, { timestamps: true });

export default mongoose.model('ServiceDetail', ServiceDetailSchema);
