import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import StudentRegistration from "./components/StudentRegistration.tsx";
import Login from "./components/login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import RoomBooking from "./components/RoomBooking.tsx";
import FoodMenu from "./components/FoodMenu.tsx";
import ComplaintForm from "./components/ComplaintForm.tsx";
import LeaveApplication from "./components/LeaveApplication.tsx";

function Home() {
  return (
    <div className="screen-container" style={{ flexDirection: 'column', textAlign: 'center' }}>
      <div className="float-animation" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '800', 
          color: '#fff', 
          textShadow: '0 4px 10px rgba(0,0,0,0.3)',
          marginBottom: '40px',
          lineHeight: '1.2'
        }}>
          WELCOME TO<br/>HOSTELPRO
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
          <Link to="/login" style={{ width: '100%' }}>
            <button style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#fff',
              background: 'rgba(50, 70, 150, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(50, 70, 150, 0.8)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(50, 70, 150, 0.6)'; }}
            >
              LOG IN
            </button>
          </Link>
          <Link to="/register" style={{ width: '100%' }}>
            <button style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#fff',
              background: 'rgba(100, 80, 160, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(100, 80, 160, 0.8)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(100, 80, 160, 0.6)'; }}
            >
              SIGN UP
            </button>
          </Link>
        </div>

        <p style={{ marginTop: '30px', fontSize: '14px', color: '#fff', opacity: 0.8 }}>
          By continuing, you agree to HostelPro's <br/>
          <b>Terms Of Use</b> and <b>Privacy Policy</b>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<StudentRegistration />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/book-room" element={<RoomBooking />} />
      <Route path="/food-menu" element={<FoodMenu />} />
      <Route path="/complaints" element={<ComplaintForm />} />
      <Route path="/leave" element={<LeaveApplication />} />
    </Routes>
  );
}

export default App;