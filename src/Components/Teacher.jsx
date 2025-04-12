import React, { useState } from "react";
import "../css/Teacher.css";
import Navbar from './Navbar';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
    let go = useNavigate()
    const [user, setuser] = useState()
    const uservalue = (e) => {
        setuser(
            {
                ...user, [e.target.name]: e.target.value
            }
        )
    }
    // console.log(user)
    const submit = () => {
        axios.post("https://management-backend-zeta.vercel.app/teacher", { user }).then((res) => {
            if (res.data.status) {
                // window.location.reload()
                go("/Home")
            }

        })
    }



    // nitin
    // Oio3pg0yQy4UQR8W


    return (
        <>
            <Navbar />
            <div className="register container col-6 mt-5 pt-5">
                <div className="card shadow-lg p-3 mx-auto form-container">
                    <h2 className="text-center mb-3 text-primary fw-bolder ">Ready To Join Our Faculty</h2>

                    <div className="mb-2">
                        <label className="form-label" >Name</label>
                        <input type="text" onChange={uservalue} name="name" className="form-control" placeholder="Enter your name" required />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Email</label>
                        <input type="email" onChange={uservalue} className="form-control" placeholder="Enter your email" name="email" required />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Password</label>
                        <input type="password" onChange={uservalue} className="form-control" placeholder="Enter your password" name="password" required />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Course</label>
                        <select className="form-control" onChange={uservalue} name="course" required>
                            <option>Select Course</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Software-Diploma">Software-Diploma</option>
                            <option value="Full-Stack">Full-Stack</option>
                        </select>
                    </div>

                    <button type="submit" className="btn w-100 btn-secondary" onClick={submit}>
                        Submit
                    </button>

                </div>
            </div>
        </>
    );
};

export default Teacher;