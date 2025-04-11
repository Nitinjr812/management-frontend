import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
import { FaUserGraduate, FaTimes, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart - e.changedTouches[0].clientX > 50) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            EduManage
          </Link>

          <div className="desktop-nav-content">
            <div className="nav-links">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/classes" className="nav-link">Classes
                <span className="notification-dot"></span>
              </Link>
              <Link to="/calendar" className="nav-link">Calendar</Link>
            </div>

            <Link to="/login" className="nav-cta">
              <FaUserGraduate className="cta-icon" /> Login
            </Link>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="sidebar-header">
          <Link to="/" className="navbar-brand" onClick={closeSidebar}>EduManage</Link>
          <button className="close-btn" onClick={closeSidebar} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <div className="mobile-nav-links">
          <Link to="/dashboard" className="nav-link" onClick={closeSidebar}>Dashboard</Link>
          <Link to="/classes" className="nav-link" onClick={closeSidebar}>Classes
            <span className="notification-dot"></span>
          </Link>
          <Link to="/calendar" className="nav-link" onClick={closeSidebar}>Calendar</Link>
          <Link to="/grades" className="nav-link" onClick={closeSidebar}>Grades</Link>
          <Link to="/settings" className="nav-link" onClick={closeSidebar}>Settings</Link>
          <Link to="/login" className="nav-cta mobile-cta" onClick={closeSidebar}>
            <FaUserGraduate className="cta-icon m" /> Login
          </Link>
        </div>
      </div>

      <div
        className={`overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />
    </>
  );
};

export default Navbar;