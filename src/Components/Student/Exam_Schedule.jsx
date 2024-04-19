import React, { useState, useEffect } from 'react';
import '../Student/Exam_Schedule.css';
import config from '../Login/config';
import StudentSidebar from '../Sidebar/StudentSidebar';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';

const Exam_Schedule = () => {
    const [examSchedule, setExamSchedule] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [standardId, setStandardId] = useState('');
    const [selectedExamType, setSelectedExamType] = useState('');
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
        const fetchExamSchedule = async () => {
            try {
                    const response = await fetch(`${config.ApiUrl}Exam/GetExamByStandardId/${standardId}`);
                    if (response.ok) {
                    const data = await response.json();
                    setExamSchedule(data);
                    } else {
                        toast.error('Failed to fetch Exam-Schedule');
                    }
                } catch (error) {
                console.error('Error fetching Exam-Schedule:', error);
                toast.error('Error fetching Exam-Schedule');
            }
        };
        if (standardId) {
            fetchExamSchedule();
        }
    }, [standardId]);

    // Filter timeTables based on selected exam type
    const filteredExamSchedule = selectedExamType
        ? examSchedule.filter(schedule => schedule.examType === selectedExamType)
        : examSchedule;

    if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />;
    }


    const filteredAndSortedExamSchedule = selectedExamType
    ? examSchedule.filter(schedule => schedule.examType === selectedExamType)
    : examSchedule.sort((a, b) => new Date(a.examDate) - new Date(b.examDate));



    return (
        <>
            <StudentSidebar>
                <div> 
                    <div id='examviewer'>
                        <h1 id='h1examschedule'>Exam Schedule</h1>
                    </div>
                    <div id='exam-scheduletable'>
                        <div>
                            <select id="examdropdown" onChange={e => setSelectedExamType(e.target.value)}>
                                <option value="" disabled >Select Exam-Type</option>
                                <option value="">All</option>
                                <option value="MidTerm">MidTerm</option>
                                <option value="Final">Final</option>
                            </select>
                        </div>
                        <table id='table'>
                            <thead>
                             <tr>
                                 {selectedExamType === "" && (
                                    <th id='thtableexam'>Exam_Type</th>
                                 )}
                                    <th id='thtableexam'>Date</th>
                                    <th id='thtableexam'>Subject</th>
                                    <th id='thtableexam'>Time</th>
                             </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedExamSchedule.map((schedule, index) => (
                                    <tr key={index}>
                                        {selectedExamType === "" && (
                                            <td id='exam-th'>{schedule.examType}</td>
                                        )}
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
