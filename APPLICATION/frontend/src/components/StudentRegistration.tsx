import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentRegistration: React.FC = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: "", email: "", password: "", gender: "",
        dob: "", phone: "", country: "", state: "", city: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", student);
            alert(`Registration successful! Welcome ${res.data.user.name}.`);
            // Save token
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Registration error:", error.response?.data || error.message);
            alert(`Registration failed: ${error.response?.data?.msg || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="screen-container" style={{ flexDirection: 'column' }}>
            <div className="float-animation" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '10px', textShadow: '0 2px 4px rgba(0,0,0,0.5)', textAlign: 'center' }}>
                    WELCOME TO <br /> HOSTELPRO
                </h1>

                <div style={{ position: 'relative', marginTop: '20px', width: '90%', maxWidth: '750px' }}>
                    {/* The glass card */}
                    <div className="glass-panel" style={{ padding: '30px', paddingBottom: '50px' }}>
                    <form onSubmit={handleSubmit}>
                        {/* Row 1: Name, Email, Password - 3 columns */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="name" className="glass-input" placeholder="Full Name" value={student.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" className="glass-input" placeholder="Enter Email" value={student.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input type={showPassword ? 'text' : 'password'} name="password" className="glass-input" placeholder="Enter Password" value={student.password} onChange={handleChange} required />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer', opacity: 0.7, fontSize: '16px', userSelect: 'none' }}
                                        title={showPassword ? 'Hide password' : 'Show password'}
                                    >{showPassword ? '🙈' : '👁️'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Gender, DOB - 2 columns */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" className="glass-input" value={student.gender} onChange={handleChange} required style={{ appearance: 'none' }}>
                                    <option value="" disabled>Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" name="dob" className="glass-input" value={student.dob} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Row 3: Phone, Country - 2 columns */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <div style={{ display: 'flex' }}>
                                    <span style={{ padding: '12px 10px', background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px 0 0 10px', borderRight: 'none', display: 'flex', alignItems: 'center' }}>🇮🇳 +91</span>
                                    <input type="tel" name="phone" className="glass-input" placeholder="Phone Number" value={student.phone} onChange={handleChange} required style={{ borderRadius: '0 10px 10px 0' }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <select name="country" className="glass-input" value={student.country} onChange={handleChange} required>
                                    <option value="" disabled>Country</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 4: State, City - 2 columns */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
                            <div className="form-group">
                                <label>State *</label>
                                <input type="text" name="state" className="glass-input" placeholder="State *" value={student.state} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" className="glass-input" placeholder="City" value={student.city} onChange={handleChange} required />
                            </div>
                        </div>

                        <div style={{ fontWeight: '500', color: '#222' }}>
                            Already have an account? <Link to="/login" style={{ color: '#000', fontWeight: 'bold' }}>Log in</Link>
                        </div>
                    </form>
                </div>
                
                {/* Submit button overlapping the bottom of the card */}
                <div style={{ position: 'absolute', bottom: '-25px', left: '0', right: '0', display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" onClick={handleSubmit} disabled={loading} className="auth-button-primary" style={{ width: '250px', borderRadius: '30px', padding: '15px 0', fontSize: '18px', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'SIGNING UP...' : 'SIGN UP'}
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default StudentRegistration;