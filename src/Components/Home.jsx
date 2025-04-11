import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaCalendarAlt, FaBook, FaClipboardCheck, FaUserGraduate, FaTasks, FaBullhorn } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import '../css/Home.css';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SectionTitle = ({ icon, title }) => (
    <motion.h3 className="section-title">
        {icon} {title}
    </motion.h3>
);

const ClassItem = ({ name, time, room, delay = 0 }) => (
    <motion.div className="class-item">
        <div className="class-info">
            <span className="class-name">{name}</span>
            <span className="class-time">{time}</span>
        </div>
        <span className="class-room">{room}</span>
    </motion.div>
);

const AnnouncementItem = ({ text, urgent, delay = 0 }) => (
    <motion.div className={`announcement-item ${urgent ? 'urgent' : ''}`}>
        {urgent && <span className="urgent-badge">⚠️</span>}
        <span>{text}</span>
    </motion.div>
);



const ActionButton = ({ icon, text, delay = 0, gradient }) => (
    <motion.button className="action-button">
        <span className="button-icon">{icon}</span>
        <span>{text}</span>
    </motion.button>
);

const StatCard = ({ icon, value, label, gradient, delay }) => (
    <motion.div className="stat-card">
        <div className="stat-icon">{icon}</div>
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
    </motion.div>
);


const Home = () => {
    const [date, setDate] = useState(new Date());
    const [gradientAngle, setGradientAngle] = useState(135);



    useEffect(() => {
        const interval = setInterval(() => {
            setGradientAngle(prev => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);


    const upcomingClasses = [
        { name: 'Mathematics 101', time: '10:00 AM', room: 'Room 302' },
        { name: 'Physics Lab', time: '12:30 PM', room: 'Lab B-12' }
    ];

    const announcements = [
        { text: 'Final exams schedule posted', urgent: true },
        { text: 'Career counseling session tomorrow', urgent: false }
    ];

    const [data, setdata] = useState([])
    axios.get("http://localhost:8080/messi").then((res) => {
        if (res.data.status) {
            setdata(res.data.messi)
        }
    })
    const [teachlength, teachsetlength] = useState()
    axios.get("http://localhost:8080/users").then((res) => {
        if (res.data.status) {
            teachsetlength(res.data.len)
        }
    })


    return (
        <>
            <Navbar />
            <div className="app-container">
                <div className="particles"></div>

                <div className="content-wrapper">

                    <div className="stats-grid">
                        <Link to="/Active" className='Links' >
                            <StatCard
                                icon={<FaUserGraduate size={32} />}
                                value={data.length}
                                label="Active Students"
                                gradient={`linear-gradient(${gradientAngle}deg, #2c3e50 0%, #3498db 100%)`}
                            />
                        </Link>
                        <StatCard
                            icon={<FaChalkboardTeacher size={32} />}
                            value={teachlength}
                            label="Teachers"
                            gradient={`linear-gradient(${gradientAngle}deg, #27ae60 0%, #2ecc71 100%)`}
                        />
                        <StatCard
                            icon={<FaClipboardCheck size={32} />}
                            value="24"
                            label="Pending Gradings"
                            gradient={`linear-gradient(${gradientAngle}deg, #e74c3c 0%, #f39c12 100%)`}
                        />
                    </div>

                    <div className="content-grid">
                        <motion.div className="column">
                            <SectionTitle icon={<FaBook />} title="Today's Schedule" />
                            <div className="class-list">
                                {upcomingClasses.map((cls, index) => (
                                    <ClassItem
                                        key={index}
                                        name={cls.name}
                                        time={cls.time}
                                        room={cls.room}
                                    />
                                ))}
                            </div>

                            <SectionTitle icon={<FaBullhorn />} title="Announcements" />
                            <div className="announcement-list">
                                {announcements.map((ann, index) => (
                                    <AnnouncementItem
                                        key={index}
                                        text={ann.text}
                                        urgent={ann.urgent}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className="column">
                            <SectionTitle icon="⚡" title="Quick Actions" />
                            <div className="action-buttons">
                                <ActionButton
                                    icon={<FaBook />}
                                    text="Create Assignment"
                                    gradient={`linear-gradient(${gradientAngle}deg, #3498db 0%, #2c3e50 100%)`}
                                />
                                <ActionButton
                                    icon={<FaClipboardCheck />}
                                    text="Take Attendance"
                                    gradient={`linear-gradient(${gradientAngle}deg, #27ae60 0%, #2ecc71 100%)`}
                                />
                            </div>

                            <SectionTitle icon={<FaCalendarAlt />} title="Academic Calendar" />
                            <motion.div className="calendar-container">
                                <Calendar
                                    onChange={setDate}
                                    value={date}
                                    className="modern-calendar"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;