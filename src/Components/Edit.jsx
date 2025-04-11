import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../css/Edit.css"
import Navbar from './Navbar';

const Edit = () => {
    const loc = useLocation()
    const [edit, setedit] = useState(loc.state || {})

    const handleChange = (e) => {
        setedit({ ...edit, [e.target.name]: e.target.value });
    };
    const editeddata = () => {
        axios.post("http://localhost:8080/edit", { edit })
        
    }

    return (
        <>
            <Navbar />
            <div className="contain">
                <div className="form-container mt-5 pt-5">
                    <h2>Edit User</h2>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={edit.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={edit.email} onChange={handleChange} required />
                    </div>
                    <div className="select-group">
                        <label>Course</label>
                        <div className="custom-select">
                            <select name="course" value={edit.course} onChange={handleChange} required>
                                <option >Select your course</option>
                                <option value="Frontend">Frontend Development</option>
                                <option value="Backend">Backend Development</option>
                                <option value="Software-Diploma">Software Diploma</option>
                                <option value="Full-Stack">Full-Stack Development</option>
                            </select>
                            <div className="select-arrow"></div>
                        </div>
                    </div>
                    <button className="btn" onClick={editeddata}>Save</button>
                </div>
            </div>
        </>
    );
};

export default Edit;