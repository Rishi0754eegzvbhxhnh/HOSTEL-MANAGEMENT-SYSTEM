const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const sendEmail = require('../utils/sendEmail');

// @route   POST api/auth/register
// @desc    Register a new student
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, gender, dob, phone, country, state, city } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all required fields' });
        }

        let student = await Student.findOne({ email });
        if (student) return res.status(400).json({ msg: 'Student already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        student = new Student({
            name, email, password: hashedPassword, gender, dob, phone, country, state, city
        });
        await student.save();

        // 📧 Send notification email to admin
        await sendEmail({
            email: process.env.ADMIN_EMAIL,
            subject: '🎓 New Student Registered - HostelPro',
            htmlMessage: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #7b62a6, #9b72b8); padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">🏠 HostelPro</h1>
                        <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">New Student Registration</p>
                    </div>
                    <div style="padding: 30px;">
                        <h2 style="color: #333;">A new student has registered!</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px; font-weight: bold; color: #666; width: 140px;">Name</td><td style="padding: 8px; color: #333;">${name}</td></tr>
                            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Email</td><td style="padding: 8px; color: #333;">${email}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold; color: #666;">Gender</td><td style="padding: 8px; color: #333;">${gender || 'N/A'}</td></tr>
                            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Date of Birth</td><td style="padding: 8px; color: #333;">${dob || 'N/A'}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold; color: #666;">Phone</td><td style="padding: 8px; color: #333;">${phone || 'N/A'}</td></tr>
                            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Location</td><td style="padding: 8px; color: #333;">${city || ''}, ${state || ''}, ${country || ''}</td></tr>
                        </table>
                        <p style="margin-top: 20px; color: #888; font-size: 13px;">Registered at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                    </div>
                    <div style="background: #f5f5f5; padding: 15px; text-align: center; color: #999; font-size: 12px;">
                        HostelPro Management System
                    </div>
                </div>
            `
        });

        const payload = { user: { id: student.id } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: student.id, name: student.name, email: student.email } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate student & get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        const student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: student.id } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: student.id, name: student.name, email: student.email } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
