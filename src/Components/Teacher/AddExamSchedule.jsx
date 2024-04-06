import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Redirect } from 'react-router-dom';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import '../Teacher/AddExamSchedule.css';

const AddExamSchedule = () => {
  const [examType, setExamType] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [standard, setStandard] = useState('');
  const [subject, setSubject] = useState('');
  const [examSchedules, setExamSchedules] = useState([]);
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  const [standardError, setStandardError] = useState('');
  const [standardData, setStandardData] = useState([]);
  const [subjectError, setSubjectError] = useState('');
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
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

  useEffect(() => {
    const fetchExamSchedules = async () => {
      try {
        const response = await axios.get(`${config.ApiUrl}Exam/GetExams`);
        setExamSchedules(response.data);
      } catch (error) {
        console.error('Error fetching exam schedules:', error);
      }
    };
    fetchExamSchedules();
  }, []);

  const str = standard;
  const parts = str.split("-");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${config.ApiUrl}Exam/PostExams`, {
        ExamType: examType,
        StandardNumber: parts[0],
        Section: parts[1],
        SubjectName: subject,
        ExamDate: examDate,
        StartTime: startTime,
        EndTime: endTime,
      });

      const newExamSchedule = response.data;
      setExamSchedules([...examSchedules, newExamSchedule]);
      toast.success('Exam schedule added successfully');
    } catch (error) {
      toast.error('Failed to add exam schedule. Please try again later.');
      console.error('Error adding exam schedule:', error);
    }
    
    const updatedExamSchedule = await axios.get(`${config.ApiUrl}Exam/GetExams`);
    setExamSchedules(updatedExamSchedule.data);
          
    // Reset form fields
    setExamType('');
    //setStandard('');
    setSubject('');
    setExamDate('');
    setStartTime('');
    setEndTime('');
  };

  

  const handleDelete = async (index) => {
    const examId = examSchedules[index].id; 
    try {
      await axios.delete(`${config.ApiUrl}Exam/DeleteExam/${examId}`);
      setExamSchedules(examSchedules.filter((_, i) => i !== index));
      toast.success('Exam schedule deleted successfully');
    } catch (error) {
      toast.error('Failed to delete exam schedule. Please try again later.');
      console.error('Error deleting exam schedule:', error);
    }
  };

  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />;
  }

  return (
    <TeacherSidebar>
      <div>
        <div id="student-exam-timetable">
          <h2 id="studentexamtimetableh2">Add Exam Schedule</h2>
          <form onSubmit={handleSubmit}>
            <table id='student-table'>
              <tbody>
                <tr>
                  <td id='student-exam-th'>Standard</td>
                  <td id='student-exam-th'>Subject</td>
                  <td id='student-exam-th'>Exam Type</td>
                  <td id='student-exam-th'>Exam Date</td>
                  <td id='student-exam-th'>Start Time</td>
                  <td id='student-exam-th'>End Time</td>
                </tr>
                <tr id='student-exam-row'>
                  <td>
                    <select
                      id='student-exam-sub'
                      value={standard}
                      required
                      onChange={(e) => setStandard(e.target.value)}
                    >
                      <option value="" disabled={true}>Select Standard</option>
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
                      <option value="" disabled={true}>Select Subject</option>
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
                      <option value="" disabled={true}>Select Exam Type</option>
                      <option value="Midterm">Mid-Term</option>
                      <option value="Final">Final</option>
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

            <button id='student-exam-btn' type="submit">Add Exam Schedule</button>

          </form>
          <div id="student-exam-timetable2">
          <table id="student-table">
            <thead>
              <tr>
                <th id='student-exam-th'>Standard</th>
                <th id='student-exam-th'>Subject</th>
                <th id='student-exam-th'>Exam Type</th>
                <th id='student-exam-th'>Exam Date</th>
                <th id='student-exam-th'>Start Time</th>
                <th id='student-exam-th'>End Time</th>
                <th id='student-exam-th'>Actions</th>
              </tr>
            </thead>
            <tbody>
            {examSchedules.filter((examSchedule) => examSchedule.standard === standard).map((examSchedule, index) => (
              <tr key={index}>
                <td id='student-exam-sub'>{examSchedule.standard}</td>
                <td id='student-exam-sub'>{examSchedule.subject}</td>
                <td id='student-exam-sub'>{examSchedule.examType}</td>
                <td id='student-exam-sub'>{examSchedule.examDate}</td>
                <td id='student-exam-sub'>{examSchedule.startTime}</td>
                <td id='student-exam-sub'>{examSchedule.endTime}</td>
                <td id='student-exam-sub'>
              
            <button id="deleteexamschedulebtn" onClick={() => handleDelete(index)}><RiDeleteBin6Line /></button>
            </td>
            </tr>
            ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </TeacherSidebar>
  );
};

export default AddExamSchedule;
