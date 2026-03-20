const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const sendEmail = require('../utils/sendEmail');

// @route   POST /api/leave
// @desc    Submit a new leave request
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { studentName, studentEmail, phone, roomNumber, leaveType, fromDate, toDate, reason } = req.body;

        if (!studentName || !studentEmail || !phone || !leaveType || !fromDate || !toDate || !reason) {
            return res.status(400).json({ msg: 'Please fill all required fields' });
        }

        const leave = new Leave({ studentName, studentEmail, phone, roomNumber, leaveType, fromDate, toDate, reason });
        await leave.save();

        // 📧 Notify admin via email
        await sendEmail({
            email: process.env.ADMIN_EMAIL,
            subject: `🏖️ Leave Request - ${studentName} | HostelPro`,
            htmlMessage: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #2193b0, #6dd5ed); padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">🏠 HostelPro</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">New Leave Application</p>
                    </div>
                    <div style="padding: 30px;">
                        <h2 style="color: #333;">Leave Request Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 10px; font-weight: bold; color: #555; width: 150px;">Student Name</td><td style="padding: 10px; color: #333;">${studentName}</td></tr>
                            <tr style="background:#f9f9f9;"><td style="padding: 10px; font-weight: bold; color: #555;">Email</td><td style="padding: 10px; color: #333;">${studentEmail}</td></tr>
                            <tr><td style="padding: 10px; font-weight: bold; color: #555;">Phone</td><td style="padding: 10px; color: #333;">${phone}</td></tr>
                            <tr style="background:#f9f9f9;"><td style="padding: 10px; font-weight: bold; color: #555;">Room Number</td><td style="padding: 10px; color: #333;">${roomNumber || 'N/A'}</td></tr>
                            <tr><td style="padding: 10px; font-weight: bold; color: #555;">Leave Type</td><td style="padding: 10px; color: #333;">${leaveType}</td></tr>
                            <tr style="background:#f9f9f9;"><td style="padding: 10px; font-weight: bold; color: #555;">From Date</td><td style="padding: 10px; color: #333;">${new Date(fromDate).toLocaleDateString('en-IN')}</td></tr>
                            <tr><td style="padding: 10px; font-weight: bold; color: #555;">To Date</td><td style="padding: 10px; color: #333;">${new Date(toDate).toLocaleDateString('en-IN')}</td></tr>
                            <tr style="background:#f9f9f9;"><td style="padding: 10px; font-weight: bold; color: #555;">No. of Days</td><td style="padding: 10px; color: #e74c3c; font-weight: bold;">${Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000*60*60*24))} days</td></tr>
                            <tr><td style="padding: 10px; font-weight: bold; color: #555;">Reason</td><td style="padding: 10px; color: #333;">${reason}</td></tr>
                            <tr style="background:#fff3cd;"><td style="padding: 10px; font-weight: bold; color: #555;">Status</td><td style="padding: 10px; color: #e67e22; font-weight: bold;">⏳ Pending</td></tr>
                        </table>
                        <p style="margin-top: 20px; color: #888; font-size: 13px;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                    </div>
                    <div style="background: #f5f5f5; padding: 15px; text-align: center; color: #999; font-size: 12px;">
                        HostelPro Management System
                    </div>
                </div>
            `
        });

        res.json({ message: 'Leave application submitted successfully!', leave });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET /api/leave
// @desc    Get all leave applications (for admin)
// @access  Public (should be protected in production)
router.get('/', async (_req, res) => {
    try {
        const leaves = await Leave.find().sort({ createdAt: -1 });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
