import React, { useState, useEffect, useRef } from 'react';
import "../css/Homes.css";
import { FaChalkboardTeacher, FaUserGraduate, FaBook, FaCalendarAlt, FaChartLine, FaMobileAlt, FaServer, FaCloud } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Homes = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const sliderRef = useRef(null);

    const minSwipeDistance = 50;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Touch event handlers for swipe detection
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            // Swipe left - next testimonial
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        } else if (isRightSwipe) {
            // Swipe right - previous testimonial
            setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    }

    // Mouse event handlers for desktop drag support
    const onMouseDown = (e) => {
        setTouchEnd(null);
        setTouchStart(e.clientX);
    }

    const onMouseMove = (e) => {
        if (touchStart === null) return;
        setTouchEnd(e.clientX);
    }

    const onMouseUp = () => {
        onTouchEnd();
    }

    const features = [
        { icon: <FaChalkboardTeacher />, title: "Expert Faculty", description: "Manage and track your teaching staff with ease" },
        { icon: <FaUserGraduate />, title: "Student Portal", description: "Comprehensive student management system" },
        { icon: <FaBook />, title: "Curriculum Management", description: "Organize courses and learning materials" },
        { icon: <FaCalendarAlt />, title: "Scheduling", description: "Automated class and exam scheduling" },
        { icon: <FaChartLine />, title: "Analytics", description: "Real-time performance tracking" },
        { icon: <FaMobileAlt />, title: "Mobile Access", description: "Access from any device, anywhere" },
    ];

    const testimonials = [
        { name: "Dr. Sarah Johnson", role: "Principal, Greenfield Academy", quote: "This system transformed how we manage our institution. Efficiency improved by 60%!" },
        { name: "Mark Williams", role: "IT Administrator, City College", quote: "The most intuitive institute management platform we've used." },
        { name: "Lisa Chen", role: "Dean, University of Technology", quote: "Our faculty and students love the seamless experience." },
    ];

    return (
        <>
            {/* Navigation */}
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <motion.div
                        className="logo"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="logo-primary">Edu</span>
                        <span className="logo-secondary">Manage</span>
                    </motion.div>

                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </button>

                    <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                        <ul>
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <a href="#features">Features</a>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <a href="#solutions">Solutions</a>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <a href="#testimonials">Testimonials</a>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <a href="#contact">Contact</a>
                            </motion.li>
                            
                            <Link to="/AdminHome">
                                <motion.button
                                    className="cta-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <div className="naya">
                <section className="hero">
                    <div className="container">
                        <div className="hero-content">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                Transform Your Institute with <span>Smart Management</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Comprehensive solutions for schools, colleges, and universities to streamline operations and enhance learning experiences.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="hero-buttons"
                            >
                                <button className="primary-button">Request Demo</button>
                                <button className="secondary-button">Learn More</button>
                            </motion.div>
                        </div>
                        <motion.div
                            className="hero-image"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <div className="dashboard-mockup">
                                <div className="mockup-screen">
                                    <div className="mockup-header"></div>
                                    <div className="mockup-sidebar"></div>
                                    <div className="mockup-content">
                                        <div className="content-row"></div>
                                        <div className="content-row"></div>
                                        <div className="content-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="features">
                    <div className="container">
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2>Powerful Features</h2>
                            <p>Everything you need to manage your educational institution effectively</p>
                        </motion.div>

                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="feature-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="feature-icon">
                                        {feature.icon}
                                    </div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Solutions Section */}
                <section id="solutions" className="solutions">
                    <div className="container">
                        <div className="solutions-content">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2>Tailored Solutions for Every Educational Need</h2>
                                <p>Our platform adapts to your institution's unique requirements, whether you're a small private school or a large university.</p>

                                <div className="solution-points">
                                    <div className="point">
                                        <FaServer className="point-icon" />
                                        <div>
                                            <h4>Cloud-Based Infrastructure</h4>
                                            <p>Access your data securely from anywhere with our reliable cloud platform.</p>
                                        </div>
                                    </div>
                                    <div className="point">
                                        <FaCloud className="point-icon" />
                                        <div>
                                            <h4>Automated Updates</h4>
                                            <p>Always have the latest features without any downtime.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                            className="solutions-image"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="solution-animation">
                                <div className="animation-circle"></div>
                                <div className="animation-circle"></div>
                                <div className="animation-circle"></div>
                                <div className="animation-center"></div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Testimonials Section with Swipe Functionality */}
                <section id="testimonials" className="testimonials">
                    <div className="container">
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2>Trusted by Leading Institutions</h2>
                            <p>Hear from our satisfied clients</p>
                        </motion.div>

                        <div
                            className="testimonial-container"
                            ref={sliderRef}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseUp}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTestimonial}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className="testimonial-card"
                                >
                                    <p className="testimonial-quote">"{testimonials[activeTestimonial].quote}"</p>
                                    <div className="testimonial-author">
                                        <h4>{testimonials[activeTestimonial].name}</h4>
                                        <p>{testimonials[activeTestimonial].role}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="testimonial-dots">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                                        onClick={() => setActiveTestimonial(index)}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="cta-content"
                        >
                            <h2>Ready to Transform Your Institution?</h2>
                            <p>Join thousands of educational institutions that trust our platform for their management needs.</p>
                            <div className="cta-buttons">
                                <button className="primary-button">Get Started Now</button>
                                <button className="secondary-button">Schedule a Demo</button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <footer id="contact" className="footer">
                    <div className="container">
                        <div className="footer-grid">
                            <div className="footer-about">
                                <div className="logo">
                                    <span className="logo-primary">Edu</span>
                                    <span className="logo-secondary">Manage</span>
                                </div>
                                <p>Empowering educational institutions with cutting-edge management solutions since 2015.</p>
                                <div className="social-links">
                                    <a href="#"><span className="sr-only">Facebook</span></a>
                                    <a href="#"><span className="sr-only">Twitter</span></a>
                                    <a href="#"><span className="sr-only">LinkedIn</span></a>
                                    <a href="#"><span className="sr-only">Instagram</span></a>
                                </div>
                            </div>

                            <div className="footer-links">
                                <h3>Quick Links</h3>
                                <ul>
                                    <li><a href="#features">Features</a></li>
                                    <li><a href="#solutions">Solutions</a></li>
                                    <li><a href="#testimonials">Testimonials</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                            </div>

                            <div className="footer-contact">
                                <h3>Contact Us</h3>
                                <ul>
                                    <li>123 Education Ave, Suite 100</li>
                                    <li>Boston, MA 02115</li>
                                    <li>Phone: (555) 123-4567</li>
                                    <li>Email: info@edumanage.com</li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer-bottom">
                            <p>&copy; {new Date().getFullYear()} EduManage. All rights reserved.</p>
                            <div className="legal-links">
                                <a href="#">Privacy Policy</a>
                                <a href="#">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Homes;