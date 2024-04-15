import React, { useState, useEffect } from 'react';
import '../Student/Exam_Schedule.css';
import config from '../Login/config';
import StudentSidebar from '../Sidebar/StudentSidebar';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';

const Exam_Schedule = () => {
    const [timeTables, setTimeTables] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [standardId, setStandardId] = useState('');
    const [redirectToNotFound, setRedirectToNotFound] = useState(false);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));
                if (storedId) {
                    setStudentId(storedId);
                } else {
                    console.error('loggedInUserId not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
                toast.error('Error fetching student data');
            }
        };
        fetchStudentData();
    }, []);

    useEffect(() => {
        const fetchStandardData = async () => {
            try {
                const response = await fetch(`${config.ApiUrl}Student/GetStudent/${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setStandardId(data.standardId);
                } else {
                    toast.error('Failed to fetch standard');
                }
            } catch (error) {
                console.error('Error fetching standard:', error);
                toast.error('Error fetching standard');
            }
        };
        if (studentId) {
            fetchStandardData();
        }
    }, [studentId]);

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                const response = await fetch(`${config.ApiUrl}Exam/GetExamByStandardId/${standardId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTimeTables(data);
                } else {
                    toast.error('Failed to fetch timetable');
                }
            } catch (error) {
                console.error('Error fetching timetable:', error);
                toast.error('Error fetching timetable');
            }
        };
        if (standardId) {
            fetchTimeTable();
        }
    }, [standardId]);

    if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />;
    }

    return (
        <>
            <StudentSidebar>
                <div>
                    <div id='examviewer'>
                        <h1 id='h1examschedule'>Exam Schedule</h1>
                    </div>
                    <div id='exam-scheduletable'>
                    <table>
                        <thead>
                            <tr>
                                <th id='thtableexam'>Exam_Type</th>
                                <th id='thtableexam'>Date</th>
                                <th id='thtableexam'>Subject</th>
                                <th id='thtableexam'>Time</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {timeTables.map((schedule, index) => (
                                <tr key={index}>
                                    <td id='exam-th'>{schedule.examType}</td>
                                    <td id='exam-th'>{schedule.examDate.split("-").reverse().join("-")}</td>
                                    <td id='exam-th'>{schedule.subject}</td>
                                    <td id='exam-th'>{schedule.startTime} - {schedule.endTime}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </StudentSidebar>
        </>
    );
};

export default Exam_Schedule;