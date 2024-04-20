import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FiEdit } from "react-icons/fi";
import { MdCancelPresentation } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Redirect } from 'react-router-dom';
import Popup from 'reactjs-popup';
import config from '../Login/config';
import AdminSidebar from '../Sidebar/AdminSidebar';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import '../Teacher/AddExamSchedule.css';

const AddExamSchedule = () => {
  const [examType, setExamType] = useState('');
  const [examType1, setExamType1] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [standard, setStandard] = useState('');
  const [standard1, setStandard1] = useState('');
  const [subject, setSubject] = useState('');
  const [examSchedules, setExamSchedules] = useState([]);
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const [standardData, setStandardData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [currentUserRole,setCurrentUserRole]=useState('');

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      setCurrentUserRole(userRole.Role)
      console.log('loggedInRole for Student Form', userRole.Role);
      if (userRole.Role !== 'teacher' && userRole.Role !== 'admin') {
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
    
    fetchExamSchedules();
  }, []);

  const fetchExamSchedules = async () => {
    try {
      const response = await axios.get(`${config.ApiUrl}Exam/GetExams`);
      setExamSchedules(response.data);
    } catch (error) {
      console.error('Error fetching exam schedules:', error);
    }
  };

  const str = standard;
  const parts = str.split("-");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Adding a new exam schedule
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
      fetchExamSchedules();
  
      // Reset form fields
      setExamType('');
      setSubject('');
      setExamDate('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      toast.error('Failed to add exam schedule. Please try again later.');
      console.error('Error adding exam schedule:', error);
    }
  };
  
  const customToastStyle = {
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
  };

  
  const handleEditClose = () => {
    setFormData(null); 
    setIsEditPopupOpen(false);
  };
  
  const handleEdit = (examSchedule) => {
    setFormData({ ...examSchedule }); 
    setIsEditPopupOpen(true); 
  };
  
  const handleUpdate = () => {
    if (formData) {
      axios
        .put(`${config.ApiUrl}Exam/PutExam/${formData.id}`, formData)
        .then((response) => {
          toast.success('Exam schedule updated successfully');
          fetchExamSchedules(); 
          setIsEditPopupOpen(false); 
        })
        .catch((error) => {
          toast.error('Failed to update exam schedule');
          console.error('Error updating exam schedule:', error);
        });
    }
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
    <>
    { currentUserRole =='admin' ?
    <AdminSidebar>
    <>
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
                      // value={examDate.split("-").reverse().join("-")}
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
            <td>
              <select
                id='exam-sub'
                value={standard1}
                required
                onChange={(e) => setStandard1(e.target.value)}
                >
                <option value="" disabled>Select Standard</option>
                {standardData.map((standard) => (
                <option key={standard} value={standard}>
                {standard}
                </option>
                  ))}
              </select>
            </td>
  
            <td>
              <select
                id='exam-sub'
                value={examType1}
                onChange={(e) => setExamType1(e.target.value)}
                required
                >
                <option value="" disabled>Select Exam Type</option>
                <option value="Midterm">Mid-Term</option>
                <option value="Final">Final</option>
              </select>
            </td>

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
            {examSchedules.filter((examSchedule) => examSchedule.standard === standard1 && examSchedule.examType === examType1).map((examSchedule, index) => (
            <tr key={index}>
              <td id='student-exam-sub'>{examSchedule.standard}</td>
              <td id='student-exam-sub'>{examSchedule.subject}</td>
              <td id='student-exam-sub'>{examSchedule.examType}</td>
              <td id='student-exam-sub'>{examSchedule.examDate}</td>
              <td id='student-exam-sub'>{examSchedule.startTime}</td>
              <td id='student-exam-sub'>{examSchedule.endTime}</td>
              <td id='student-exam-sub'>

              <button id="editexamschedulebtn" onClick={() =>  handleEdit(examSchedule)}><FiEdit /></button>
            <button id="deleteexamschedulebtn" onClick={() => handleDelete(index)}><RiDeleteBin6Line /></button>
              </td>
            </tr>
              ))}
          </tbody>
        </table>
        </div>

        <Popup contentStyle={{width: "400px" , height:'fit-content',borderRadius:'10px',background:'#f7f9fb'}}
        open={isEditPopupOpen} closeOnDocumentClick onClose={handleEditClose} >
        
          <div id="popup-header-exam">
          <h2 id="popup-title-exam">Edit Exam Schedule</h2>
                <button id="close-btn-exam" onClick={handleEditClose}><MdCancelPresentation /></button>
          </div>
          
          <label id="label-popup-exam">
            Standard:
              <input
              id='popup-exam-sub'
              type='text'
              value={formData?.standard || ''}
              onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
              readOnly
              />
            </label>

          <label id="label-popup-exam">
            Subject:
            <select
            id='popup-exam-sub'
              value={formData?.subject || ''}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            >
              <option value="" disabled={true}>Select Subject</option>
              {subjectData.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>

          <label id="label-popup-exam">
            Exam Type:
            <select
            id='popup-exam-sub'
              value={formData?.examType || ''}
              onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
              required
            >
              <option value="" disabled={true}>Select Exam Type</option>
              <option value="Midterm">Mid-Term</option>
              <option value="Final">Final</option>
            </select>
          </label>

          <label id="label-popup-exam">
            Exam Date:
            <input
            id='popup-exam-sub'
              type='date'
              value={formData?.examDate || ''}
              onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
              required
            />
          </label>
          <label id="label-popup-exam">
            Start Time:
            <input
            id='popup-exam-sub'
              type="time"
              value={formData?.startTime || ''}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
            />
          </label>

          <label id="label-popup-exam">
            End Time:
            <input
            id='popup-exam-sub'
              type="time"
              value={formData?.endTime || ''}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
            />
          </label>

          <button id="update-exam-btn" onClick={() =>  handleUpdate(formData)}>Update</button>
        
      </Popup>

        </div>
      </div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    </>
    </AdminSidebar>
    :
    <TeacherSidebar>
      <>
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
                      // value={examDate.split("-").reverse().join("-")}
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
            <td>
              <select
                id='exam-sub'
                value={standard1}
                required
                onChange={(e) => setStandard1(e.target.value)}
                >
                <option value="" disabled>Select Standard</option>
                {standardData.map((standard) => (
                <option key={standard} value={standard}>
                {standard}
                </option>
                  ))}
              </select>
            </td>
  
            <td>
              <select
                id='exam-sub'
                value={examType1}
                onChange={(e) => setExamType1(e.target.value)}
                required
                >
                <option value="" disabled>Select Exam Type</option>
                <option value="Midterm">Mid-Term</option>
                <option value="Final">Final</option>
              </select>
            </td>

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
            {examSchedules.filter((examSchedule) => examSchedule.standard === standard1 && examSchedule.examType === examType1).map((examSchedule, index) => (
            <tr key={index}>
              <td id='student-exam-sub'>{examSchedule.standard}</td>
              <td id='student-exam-sub'>{examSchedule.subject}</td>
              <td id='student-exam-sub'>{examSchedule.examType}</td>
              <td id='student-exam-sub'>{examSchedule.examDate}</td>
              <td id='student-exam-sub'>{examSchedule.startTime}</td>
              <td id='student-exam-sub'>{examSchedule.endTime}</td>
              <td id='student-exam-sub'>

              <button id="editexamschedulebtn" onClick={() =>  handleEdit(examSchedule)}><FiEdit /></button>
            <button id="deleteexamschedulebtn" onClick={() => handleDelete(index)}><RiDeleteBin6Line /></button>
              </td>
            </tr>
              ))}
          </tbody>
        </table>
        </div>

        <Popup contentStyle={{width: "400px" , height:'fit-content',borderRadius:'10px',background:'#f7f9fb'}}
        open={isEditPopupOpen} closeOnDocumentClick onClose={handleEditClose} >
        <div id="popup-content-exam">
          <div id="popup-header-exam">
          <h2 className="popup-title-exam">Edit Exam Schedule</h2>
                <button id="close-btn-exam" onClick={handleEditClose}>X</button>
          </div>
          
          <label id="label-popup-exam">
            Standard:
              <input
              id='popup-exam-sub'
              type='text'
              value={formData?.standard || ''}
              onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
              readOnly
              />
            </label>
            
          <label id="label-popup-exam">
            Subject:
            <select
            id='popup-exam-sub'
              value={formData?.subject || ''}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            >
              <option value="" disabled={true}>Select Subject</option>
              {subjectData.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>
          <label id="label-popup-exam">
            Exam Type:
            <select
            id='popup-exam-sub'
              value={formData?.examType || ''}
              onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
              required
            >
              <option value="" disabled={true}>Select Exam Type</option>
              <option value="Midterm">Mid-Term</option>
              <option value="Final">Final</option>
            </select>
          </label>
          <label id="label-popup-exam">
            Exam Date:
            <input
            id='popup-exam-sub'
              type='date'
              value={formData?.examDate || ''}
              onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
              required
            />
          </label>
          <label id="label-popup-exam">
            Start Time:
            <input
            id='popup-exam-sub'
              type="time"
              value={formData?.startTime || ''}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
            />
          </label>
          <label id="label-popup-exam">
            End Time:
            <input
            id='popup-exam-sub'
              type="time"
              value={formData?.endTime || ''}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
            />
          </label>
          <button id="update-exam-btn" onClick={() =>  handleUpdate(formData)}>Update</button>
        </div>
      </Popup>

        </div>
      </div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </>
    </TeacherSidebar>
    }
    </>
  );
};

export default AddExamSchedule;
