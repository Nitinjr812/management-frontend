import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "../css/Students.css"
import axios from 'axios';

const Students = () => {
    const [value, setvalue] = useState({});
    const [courseFee, setCourseFee] = useState(0);
    const [showFeeDetails, setShowFeeDetails] = useState(false);

    const courseFees = {
        "Frontend": 7000,
        "Backend": 9000,
        "Software-Diploma": 15000,
        "Full-Stack": 12000
    };


    const userdata = (e) => {
        if (e.target.name === 'course') {
            const selectedCourse = e.target.value;
            setCourseFee(selectedCourse ? courseFees[selectedCourse] : 0);
        }
        setvalue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://management-backend-zeta.vercel.app/studentsdata", { value, courseFee, installment })
            .then((res) => {
                if (res.data.status) {
                    alert(res.data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toggleFeeDetails = () => {
        setShowFeeDetails(!showFeeDetails);
    };


    const [installment, setinstallment] = useState()
    const installments = (e) => {
        setinstallment({ ...installment, [e.target.name]: e.target.value })
    }

    // const [addinstallment, setaddinstallment] = useState([1])
    // const addinstall = () => {
    //     setaddinstallment([...addinstallment, addinstallment.length + 1])

    // }    
    const [date, setdate] = useState('')

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setdate(today)
    }, [])

    return (
        <>
            <Navbar />
            <div className="teacher-registration">
                <div className="registration-container">
                    <div className="decoration-circle circle-1"></div>
                    <div className="decoration-circle circle-2"></div>

                    <div className="registration-card">
                        <div className="card-header">
                            <h2>Welcome</h2>
                            <p>You Are At The Path Of Bright Future</p>
                        </div>

                        <div className="registration-form">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={userdata}
                                        required
                                    />
                                    <span className="input-highlight"></span>
                                    <span className="input-bar"></span>
                                    <label htmlFor="name">Full Name</label>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={userdata}
                                        required
                                    />
                                    <span className="input-highlight"></span>
                                    <span className="input-bar"></span>
                                    <label htmlFor="email">Email Address</label>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={userdata}
                                        required
                                    />
                                    <span className="input-highlight"></span>
                                    <span className="input-bar"></span>
                                    <label htmlFor="password">Create Password</label>
                                </div>

                                <div className="select-group">
                                    <label>Course Selection</label>
                                    <div className="custom-select">
                                        <select name="course" onChange={userdata} required>
                                            <option value="">Select your course</option>
                                            <option value="Frontend">Frontend Development</option>
                                            <option value="Backend">Backend Development</option>
                                            <option value="Software-Diploma">Software Diploma</option>
                                            <option value="Full-Stack">Full-Stack Development</option>
                                        </select>
                                        <div className="select-arrow"></div>
                                    </div>
                                </div>
                                {value.course && (
                                    <div className="fee-display">
                                        <h3>Course Fee: ₹{courseFee}</h3>
                                        <button
                                            type="button"
                                            className="fee-details-btn"
                                            onClick={toggleFeeDetails}
                                        >
                                            {showFeeDetails ? 'Hide Fee Details' : 'Show Fee Details'}
                                        </button>

                                        {showFeeDetails && (
                                            <div className="fee-details">
                                                <h4>Fee Structure:</h4>
                                                <ul>
                                                    <li>Frontend Development: ₹7,000</li>
                                                    <li>Backend Development: ₹9,000</li>
                                                    <li>Software Diploma: ₹15,000</li>
                                                    <li>Full-Stack Development: ₹12,000</li>
                                                </ul>
                                                <p className="payment-info">
                                                    Payment plans available. Contact us for installment options.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <h3>Installment Plan</h3>

                                <div className="installment-row">
                                    <div className="input-group">
                                        <input
                                            type="date"
                                            id="installment-date-1"
                                            name="installmentDate1"
                                            onChange={installments}
                                            value={installment.installmentDate2 || date}
                                        />
                                        <span className="input-highlight"></span>
                                        <span className="input-bar"></span>
                                        <label htmlFor="installment-date-1">First Payment Date</label>
                                    </div>

                                    <div className="input-group">
                                        <input
                                            type="number"
                                            id="installment-amount-1"
                                            name="installmentAmount1"
                                            onChange={installments}
                                        />
                                        <span className="input-highlight"></span>
                                        <span className="input-bar"></span>
                                        <label htmlFor="installment-amount-1">Amount (₹)</label>
                                    </div>
                                    <div className="input-group">
                                        <input
                                            type="date"
                                            id="installment-date-1"
                                            name="installmentDate2"
                                            value={date}
                                            onChange={installments}
                                        />
                                        <span className="input-highlight"></span>
                                        <span className="input-bar"></span>
                                        <label htmlFor="installment-date-2">Second Payment Date</label>
                                    </div>

                                    <div className="input-group">
                                        <input
                                            type="number"
                                            id="installment-amount-1"
                                            name="installmentAmount2"
                                         

                                            onChange={installments}

                                        />
                                        <span className="input-highlight"></span>
                                        <span className="input-bar"></span>
                                        <label htmlFor="installment-amount-1">Amount (₹)</label>
                                    </div>
                                    <div className="input-group">
                                        <input
                                            type="date"
                                            id="installment-date-1"
                                            name="installmentDate3"
                                            value={installment.installmentDate3 || date}
                                            onChange={installments}
                                        />
                                        <span className="input-highlight"></span>
                                        <span className="input-bar"></span>
                                        <label htmlFor="installment-date-3">Third Payment Date</label>
                                    </div>

                                    <div className="input-group">
                                        <input
                                            type="number"
                                            id="installment-amount-1"
                                            name="installmentAmount3"
                                            onChange={installments}

                                        />
                                        <span className="input-highlight"></span>
                                        <span className="input-bar"></span>
                                        <label htmlFor="installment-amount-1">Amount (₹)</label>
                                    </div>
                                </div>


                                <div className="installment-section">

                                    {/* <button
                                        type="button"
                                        className="add-installment-btn"
                                        onClick={addinstall}>
                                        + Add More Installments
                                    </button> */}
                                </div>

                                <button type="submit" className="submit-btn">
                                    <span>Complete Registration</span>
                                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Students;