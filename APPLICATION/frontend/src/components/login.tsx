import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally validate credentials against a backend
        console.log('Login attempt with:', { email, password });
        // Redirect to dashboard on successful login simulation
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <h2>Login to Portal</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signin">Sign In</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <p>
                <Link to="/">Back to Home</Link>
            </p>
        </div>
    );
};

export default Login;
