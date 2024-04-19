import React, { useState, useEffect } from 'react';
import '../Student/TimeTableViewer.css';
import config from '../Login/config';
import StudentSidebar from '../Sidebar/StudentSidebar';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';

const TimeTableViewer = () => {
    const [timeTables, setTimeTables] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [standardId, setStandardId] = useState('');
    const [redirectToNotFound, setRedirectToNotFound] = useState(false); 

    const filterUniqueTimeSlots = (timeTables) => {
        const uniqueTimeSlots = [];
        const uniqueStartTimeSet = new Set();
    
        timeTables.forEach((timeSlot) => {
            if (!uniqueStartTimeSet.has(timeSlot.startTime)) {
                uniqueStartTimeSet.add(timeSlot.startTime);
                uniqueTimeSlots.push(timeSlot);
            }
        });    
        return uniqueTimeSlots;
    };
    
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
                const response = await fetch(`${config.ApiUrl}TimeTable/GetTimeTableByStandardId/${standardId}`);
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

    console.log('time table sort ',new Date(), timeTables.sort((c,d)=> new Date(2024,4,1,c.startTime.split(':')[0],c.startTime.split(':')[1],0,0).getTime() - new Date(2024,4,1,d.startTime.split(':')[0],d.startTime.split(':')[1],0,0)))
    const uniqueTimeTables = filterUniqueTimeSlots(timeTables);
    
    return (
        <>
            <StudentSidebar>
                <div id='timetableviewer'>
                    <div>
                    <h1 id='h1viewer'>TimeTable</h1>
                    <input type='hidden' value={studentId} onChange={(e) => setStudentId(e.target.value)}/>
                    <input type='hidden' value={standardId.standardId}/>
                    </div>
                    <div>
                     <table id='tableview'>
                            <thead>
                                 <tr>
                                    <th id='thtable1'>Day/Period</th>
                                    <th id='thtable'>Monday</th>
                                    <th id='thtable'>Tuesday</th>
                                    <th id='thtable'>Wednesday</th>
                                    <th id='thtable'>Thursday</th>
                                    <th id='thtable'>Friday</th>
                                    <th id='thtable'>Saturday</th>
                                 </tr>
                             </thead> 
                             <tbody>
                                {uniqueTimeTables.map((timeSlot, index) => (
                            <tr key={index}>
                            <td id='tdtimetable'>{timeSlot.startTime} - {timeSlot.endTime}</td>
                            {[1, 2, 3, 4, 5, 6].map(day => {
                            const timetableForDay = timeTables.sort((c,d)=> new Date('2024-04-01'+ c.startTime).getTime() - new Date('2024-04-01'+ d.startTime).getTime()).find(t => t.noOfDay === day && t.startTime === timeSlot.startTime);
                            if (timetableForDay) {
                            return (
                                <td id='tdtimetable' key={day}>
                                    <div>
                                        {timetableForDay.subject} ({timetableForDay.teacherName})
                                    </div>
                                </td>
                                );
                            } else {
                                return <td key={day}></td>;
                            }
                            })}
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

export default TimeTableViewer;