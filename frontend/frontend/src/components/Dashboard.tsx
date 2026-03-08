import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
                <div className="sidebar-logo">
                    <h2>{isSidebarOpen ? 'HostelPro' : 'HP'}</h2>
                    <button className="toggle-btn" onClick={toggleSidebar}>
                        {isSidebarOpen ? '◀' : '▶'}
                    </button>
                </div>
                <ul className="sidebar-nav">
                    <li className="nav-item" title="Home" onClick={() => navigate('/dashboard')}>
                        <span className="icon">🏠</span>
                        <span className="nav-text">Home (Dashboard)</span>
                    </li>
                    <li className="nav-item" title="Food Menu" onClick={() => navigate('/food-menu')}>
                        <span className="icon">🍽️</span>
                        <span className="nav-text">Hostel Mess Menu</span>
                    </li>
                    <li className="nav-item" title="Profile">
                        <span className="icon">👤</span>
                        <span className="nav-text">Profile</span>
                    </li>
                    <li className="nav-item" title="Fee Payment">
                        <span className="icon">💳</span>
                        <span className="nav-text">Fee Payment</span>
                    </li>
                    <li className="nav-item" title="Complaints">
                        <span className="icon">📝</span>
                        <span className="nav-text">Complaints</span>
                    </li>
                    <li className="nav-item" title="Complaints" onClick={() => navigate('/complaints')}>
                        <span className="icon">📋</span>
                        <span className="nav-text">Complaints</span>
                    </li>
                    <li className="nav-item" title="Settings">
                        <span className="icon">⚙️</span>
                        <span className="nav-text">Settings</span>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={() => navigate('/login')} title="Logout">
                        {isSidebarOpen ? 'Logout' : '🚪'}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
                {/* Header / Marquee */}
                <div className="marquee-container">
                    {/* @ts-ignore */}
                    <marquee direction="left" scrollamount="8" className="marquee-text">
                        ✨ Welcome to the Hostel Portal! Facilities: 24/7 Wi-Fi | Premium AC Rooms | Hot Water | Laundry Services | Mess & Cafeteria | Gym & Sports ✨
                        {/* @ts-ignore */}
                    </marquee>
                </div>

                <div className="dashboard-content">
                    <h2 className="welcome-text">Student Dashboard</h2>

                    {/* Actions / Booking Navigation */}
                    <div className="action-banner">
                        <div className="banner-text">
                            <h3>Looking for a room?</h3>
                            <p>Explore our interactive map and select the perfect accommodation.</p>
                        </div>
                        <button
                            className="primary-action-btn"
                            onClick={() => navigate('/book-room')}
                        >
                            Book a New Room
                        </button>
                    </div>

                    {/* Booked Rooms Section */}
                    <div className="booked-rooms-section glass-panel">
                        <h3>Your Booked Accommodation</h3>
                        <div className="booking-card">
                            <div className="card-header">
                                <h4>Room 501</h4>
                                <span className="status-badge">Confirmed</span>
                            </div>
                            <div className="card-body">
                                <p><strong>Type:</strong> Premium AC, Single</p>
                                <p><strong>Floor:</strong> 5th Floor</p>
                            </div>
                        </div>
                    </div>

                    {/* Snack Bar / Image Gallery Section */}
                    <div className="gallery-section glass-panel">
                        <h3>Hostel Highlights</h3>
                        <div className="image-grid">
                            <div className="image-card">
                                <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Hostel Room" />
                                <div className="card-overlay"><p>Standard Room</p></div>
                            </div>
                            <div className="image-card">
                                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Premium Room" />
                                <div className="card-overlay"><p>Premium AC Room</p></div>
                            </div>
                            <div className="image-card">
                                <img src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Terrace" />
                                <div className="card-overlay"><p>Rooftop Terrace</p></div>
                            </div>
                            <div className="image-card">
                                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Cafeteria" />
                                <div className="card-overlay"><p>Cafeteria & Snack Bar</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
