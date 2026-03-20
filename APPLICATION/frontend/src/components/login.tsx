import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            console.log('Login successful:', res.data);
            alert(`Welcome back, ${res.data.user.name || res.data.user.email}!`);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error.response?.data || error.message);
            alert(`Login failed: ${error.response?.data?.msg || error.message}`);
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

                <div style={{ position: 'relative', marginTop: '20px', width: '90%', maxWidth: '400px' }}>
                    <div className="glass-panel" style={{ padding: '40px 30px', paddingBottom: '60px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="glass-input"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="glass-input"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer', opacity: 0.7, fontSize: '16px', userSelect: 'none' }}
                                    title={showPassword ? 'Hide password' : 'Show password'}
                                >{showPassword ? '🙈' : '👁️'}</span>
                            </div>
                        </div>
                        
                        <div style={{ fontWeight: '500', color: '#222', marginTop: '10px', fontSize: '14px' }}>
                            Don't have an account? <Link to="/register" style={{ color: '#000', fontWeight: 'bold' }}>Register here</Link>
                        </div>
                    </form>
                </div>

                {/* Submit button overlapping the bottom of the card */}
                <div style={{ position: 'absolute', bottom: '-25px', left: '0', right: '0', display: 'flex', justifyContent: 'center' }}>
                    <button type="button" onClick={handleSubmit} disabled={loading} className="auth-button-primary" style={{ width: '250px', borderRadius: '30px', padding: '15px 0', fontSize: '18px', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'LOGGING IN...' : 'LOG IN'}
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;
