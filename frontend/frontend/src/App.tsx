import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import StudentRegistration from "./components/StudentRegistration.tsx";
import Login from "./components/login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import RoomBooking from "./components/RoomBooking.tsx";
import FoodMenu from "./components/FoodMenu.tsx";
import ComplaintForm from "./components/ComplaintForm.tsx";

function Home() {
  return (
    <div className="home-container">
      {/* Background Image setup */}
      <div
        className="hero-background"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/originals/ae/bd/a5/aebda5a3ba478eda1324412ff14b38f1.jpg")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#111', // Solid backing for when image doesn't fill entirely
          width: '100vw',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Dark overlay to make text pop */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }}></div>

        {/* Content overlaid on top */}
        <div className="home-content" style={{ zIndex: 2, textAlign: 'center', color: 'white' }}>
          <header className="home-header" style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', margin: 0 }}>
              Welcome to HostelPro
            </h1>
            <p style={{ fontSize: '1.2rem', marginTop: '10px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Your premium student accommodation management portal
            </p>
          </header>

          <div className="home-auth-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/login">
              <button style={{
                padding: '12px 30px', fontSize: '18px', backgroundColor: 'transparent',
                color: 'white', border: '2px solid white', borderRadius: '30px',
                cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s'
              }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'black'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
              >
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button style={{
                padding: '12px 30px', fontSize: '18px', backgroundColor: '#e61cb0',
                color: 'white', border: '2px solid #e61cb0', borderRadius: '30px',
                cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(230, 28, 176, 0.4)'
              }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Register Now
              </button>
            </Link>
          </div>
        </div>
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
    </Routes>
  );
}

export default App;