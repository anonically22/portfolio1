import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Research from './components/Research';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin Imports
import LoginPage from './admin/LoginPage';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CursorFollower from './components/CursorFollower';

const GlobalLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-background transition-colors duration-300">
      <div className="global-glow" />
      <CursorFollower />
      {children}
    </div>
  );
};

const PublicLayout = () => {
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        if (!id) return;
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Research />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <GlobalLayout>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<PublicLayout />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/masteradmin/login" replace />} />
          <Route path="/masteradmin/login" element={<LoginPage />} />
          <Route
            path="/masteradmin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/masteradmin/*" element={<Navigate to="/masteradmin" replace />} />
        </Routes>
      </GlobalLayout>
    </Router>
  );
}

export default App;
