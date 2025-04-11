import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../css/Active.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const Active = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const handleDeleteClick = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post("http://localhost:8080/delete", { item: user });
                    if (res.data.status) {
                        Swal.fire('Deleted!', res.data.msg, 'success');
                        setUsers(prevUsers => prevUsers.filter(u => u._id !== user._id));
                    } else {
                        Swal.fire('Error!', 'Failed to delete user', 'error');
                    }
                } catch (err) {
                    console.error("Error:", err);
                    Swal.fire('Error!', 'Something went wrong', 'error');
                }
            }
        });
    };

    useEffect(() => {
        axios.get("http://localhost:8080/messi")
            .then((res) => {
                if (res.data.status) setUsers(res.data.messi);
                else console.log(res.data.msg);
            })
            .catch(err => console.log("Error:", err));
    }, []);
    const go = useNavigate()
    const editdata = (user) => {
        go("/edit", { state: user })
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const currentUsers = users.slice(indexOfLastUser - usersPerPage, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <>
            <Navbar />

            <div className="compact-container mt-5">
                <div className="dib w-100 d-flex justify-content-center">
                    <h2 className='mt-2'>User Management</h2>
                </div>

                <div className="compact-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Fees</th>
                                <th>Course</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, i) => (
                                <tr key={user._id}>
                                    <td>{i + 1 + (currentPage - 1) * usersPerPage}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.courseFee}</td>
                                    <td>{user.course}</td>

                                    <td>
                                        <button className="icon-btn edit" onClick={() => { editdata(user) }}>Edit</button>
                                        <button className="icon-btn delete" onClick={() => handleDeleteClick(user)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="compact-pagination">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                            &lt;
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
