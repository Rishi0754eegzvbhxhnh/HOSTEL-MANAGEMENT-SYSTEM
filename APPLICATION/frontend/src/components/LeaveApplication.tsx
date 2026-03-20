import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeaveApplication: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        studentName: '',
        studentEmail: '',
        phone: '',
        roomNumber: '',
        leaveType: '',
        fromDate: '',
        toDate: '',
        reason: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/leave', form);
            setSubmitted(true);
        } catch (error: any) {
            alert(`Failed to submit: ${error.response?.data?.msg || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2193b0, #6dd5ed)', padding: '20px' }}>
                <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '500px', padding: '50px 40px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
                    <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>Leave Request Submitted!</h2>
                    <p style={{ color: '#555', marginBottom: '30px' }}>Your leave application has been sent to the hostel admin. You'll be notified once it's reviewed.</p>
                    <button onClick={() => navigate('/dashboard')} className="auth-button-primary" style={{ width: 'auto', padding: '12px 30px', borderRadius: '30px' }}>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #2193b0, #6dd5ed)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px 20px' }}>
            <div style={{ width: '100%', maxWidth: '700px' }}>
                <h1 style={{ color: '#fff', textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '5px', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    🏖️ Leave Application
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: '25px' }}>Fill in the form below to apply for leave from the hostel</p>

                <div className="glass-panel" style={{ padding: '35px' }}>
                    <form onSubmit={handleSubmit}>
                        {/* Row 1: Name, Email */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '18px' }}>
                            <div className="form-group">
                                <label>Student Name *</label>
                                <input type="text" name="studentName" className="glass-input" placeholder="Your Full Name" value={form.studentName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input type="email" name="studentEmail" className="glass-input" placeholder="Your Email" value={form.studentEmail} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Row 2: Phone, Room */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '18px' }}>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" className="glass-input" placeholder="Mobile Number" value={form.phone} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Room Number</label>
                                <input type="text" name="roomNumber" className="glass-input" placeholder="e.g. 304" value={form.roomNumber} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Row 3: Leave Type, From, To */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '18px' }}>
                            <div className="form-group">
                                <label>Leave Type *</label>
                                <select name="leaveType" className="glass-input" value={form.leaveType} onChange={handleChange} required>
                                    <option value="" disabled>Select Type</option>
                                    <option value="Home Visit">Home Visit</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="Vacation">Vacation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>From Date *</label>
                                <input type="date" name="fromDate" className="glass-input" value={form.fromDate} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>To Date *</label>
                                <input type="date" name="toDate" className="glass-input" value={form.toDate} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="form-group" style={{ marginBottom: '25px' }}>
                            <label>Reason for Leave *</label>
                            <textarea
                                name="reason"
                                className="glass-input"
                                placeholder="Please describe the reason for your leave..."
                                value={form.reason}
                                onChange={handleChange}
                                required
                                rows={4}
                                style={{ resize: 'vertical', fontFamily: 'inherit' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button type="button" onClick={() => navigate('/dashboard')} className="auth-button-secondary"
                                style={{ flex: 1, borderRadius: '10px', padding: '14px', border: '2px solid #2193b0', color: '#2193b0', background: 'transparent', cursor: 'pointer', fontWeight: 600, fontSize: '15px' }}>
                                ← Cancel
                            </button>
                            <button type="submit" disabled={loading} className="auth-button-primary"
                                style={{ flex: 2, borderRadius: '10px', padding: '14px', fontSize: '15px', background: 'linear-gradient(90deg, #2193b0, #6dd5ed)', opacity: loading ? 0.7 : 1 }}>
                                {loading ? 'Submitting...' : '📤 Submit Leave Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeaveApplication;
