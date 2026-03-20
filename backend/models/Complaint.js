const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintText: { type: String, required: true },
    imagePath: { type: String, required: true },
    authenticity: { type: String, default: 'Unknown' }, // Real or AI-generated
    status: { type: String, default: 'Pending' } // Pending, Resolved, etc.
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
