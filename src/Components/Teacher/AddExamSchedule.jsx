import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import '../Teacher/AddExamSchedule.css';
import { Redirect } from 'react-router-dom';


const AddExamSchedule = () => {
  const [examType, setExamType] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [standard, setStandard] = useState('');
  const [standardError, setStandardError] = useState('');
  const [standardData, setStandardData] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [subjectData, setSubjectData] = useState([]);

  const [selectedExamSchedule, setSelectedExamSchedule] = useState(null);
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);



  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      console.log('loggedInRole for time table', userRole.Role);
      if (userRole.Role !== 'teacher') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);
  

  useEffect(() => {
    const fetchStandards = async () => {
      try {
        const response = await fetch(`${config.ApiUrl}DropDown/Standard`);
        if (response.ok) {
          const data = await response.json();
          setStandardData(data);
        } else {
          throw new Error('Failed to fetch standard');
        }
      } catch (error) {
        console.error('Error fetching standard:', error);
      }
    };
    const fetchSubjects = async () => {
      try {
        const subjectresponse = await axios.get(`${config.ApiUrl}DropDown/Subject`);
        setSubjectData(subjectresponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStandards();
    fetchSubjects();
  }, []);

  const str = standard;
  const parts = str.split("-");

  const navigate=useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response =await axios.post(`${config.ApiUrl}Exam/PostExams`,{
        ExamType: examType,
        StandardNumber: parts[0],
        Section : parts[1],
        SubjectName: subject,
        ExamDate: examDate,
        StartTime : startTime,
        EndTime : endTime,
        
        });
    const userERes = response.data;
    if(userERes === "exam is already updated")
    {
          toast.error("exam is already updated !!!");
          return;
    }
    else{
      setTimeout(() => {
        navigate.push('/') 
        }, 1500);
      toast.success("Added Exam Time")
    }

    } catch {
    toast.error('Add failed. Please try again later.');
  }
  return;
};



  const handleEdit = (examSchedule) => {
    setSelectedExamSchedule(examSchedule);
  };

  const handleDelete = (examSchedule) => {
    
  };

  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />;
  }
  
  return (
    <TeacherSidebar>
    <div>
      <div id='student-exam-timetable'>
      <h2 id='studentexamtimetableh2'>Add Exam Schedule</h2>
      <form onSubmit={handleSubmit}>
      <table id='student-table'>
          <tbody>
            <tr>
              <td id='student-exam-th'>Standard:</td>
              <td id='student-exam-th'>Subject:</td>
              <td id='student-exam-th'>Exam Type:</td>
              <td id='student-exam-th'>Exam Date:</td>
              <td id='student-exam-th'>Start Time:</td>
              <td id='student-exam-th'>End Time:</td>
            </tr>
            <tr id='student-exam-row'>
              <td>
                <select
                id='student-exam-sub'
                  value={standard}
                  required
                  onChange={(e) => setStandard(e.target.value)}
                >
                  <option value="">Select Standard</option>
                  {standardData.map((standard) => (
                    <option key={standard} value={standard}>
                      {standard}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                id='student-exam-sub'
                  value={subject}
                  required
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select Subject</option>
                  {subjectData.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                id='student-exam-sub'
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  required
                >
                  <option value="">Select Exam Type</option>
                  <option value="Midterm">Midterm</option>
                  <option value="Final">Final</option>
                  <option value="Quiz">Quiz</option>
                </select>
              </td>
              
              <td>
                <input
                id='student-exam-sub' 
                type='date' 
                value={examDate} 
                onChange={(e) => setExamDate(e.target.value)} 
                required 
                />
            </td>
            <td>
              <input
                id='student-exam-sub'
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
             />
            </td>

            <td>
                <input
                id='student-exam-sub'
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
               />
                </td>
            </tr>
          </tbody> 
        </table>
        
        <button id='student-exam-btn' type="submit" onClick={()=>handleSubmit}>Add Exam Schedule</button>
              
      </form>
      {selectedExamSchedule && (
        <div>
          <h3>Edit Exam Schedule</h3>
          <p>Selected Exam Type: {selectedExamSchedule.examType}</p>
          <p>Selected Date and Time: {selectedExamSchedule.dateTime}</p>
          <p>Selected Duration (minutes): {selectedExamSchedule.durationMinutes}</p>
          <button onClick={() => handleEdit(null)}>Cancel</button>
          <button onClick={() => handleDelete(selectedExamSchedule)}>Delete</button>
        </div>
      )}
      </div>
    </div>
    </TeacherSidebar>
  );
};

export default AddExamSchedule;
