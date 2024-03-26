import React, { useState, useEffect } from 'react';
import './TeacherPersonal.css'; // Import your CSS file
import { toast } from 'react-hot-toast'; // Import toast for notifications
import config from '../Login/config';

const TeacherPersonal = () => {
    const [teacherDetails, setTeacherDetails] = useState(null); // State to store teacher details

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await fetch(`${config.ApiUrl}AdminTeacher/GetTeachers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // filter
                    const loggedInEmail = localStorage.getItem('loggedInEmail');
                    const loggedInTeacher = data.find(teacher => teacher.email === loggedInEmail);
                    if (loggedInTeacher) {
                        setTeacherDetails(loggedInTeacher);
                    } else {
                        toast.error('Teacher details not found.');
                    }
                } else {
                    toast.error('Failed to fetch teacher details. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching teacher details:', error);
                toast.error('Failed to fetch teacher details. Please try again later.');
            }
        };

        fetchTeacherDetails();
    }, []);

    return (
        <div className="teacher-details-container">
            <h2>Teacher Details</h2>
            {teacherDetails ? (
                <div className="details">
                    <p><strong>Name:</strong> {teacherDetails.name}</p>
                    <p><strong>Email:</strong> {teacherDetails.email}</p>
                    {/* <p><strong>Birthdate:</strong> {teacherDetails.birthdate}</p> */}
                    <p><strong>Mobile Number:</strong> {teacherDetails.mobileNumber}</p>
                    <p><strong>Gender:</strong> {teacherDetails.gender}</p>
                    <p><strong>City:</strong> {teacherDetails.city}</p>
                    <p><strong>Pin Code:</strong> {teacherDetails.pinCode}</p>
                    {/* <p><strong>Subjects:</strong> {teacherDetails.selectedSubject}</p> */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TeacherPersonal;
