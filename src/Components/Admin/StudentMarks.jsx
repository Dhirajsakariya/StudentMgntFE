import React, { useEffect, useState } from 'react';
import '../Admin/StudentMarks.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { Redirect } from 'react-router-dom';

const StudentMarks = () => {
  const [studentId, setStudentId] = useState('');
  const [examId, setExamId] = useState('');
  const [examType, setExamType] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [marksObtained, setMarksObtained] = useState('');
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  // useEffect(() => {
    
  //   setRole('admin');
  // }, []);
  useEffect(() => {
    const userRole = localStorage.getItem('loggedInRole');
    if (userRole !== 'admin') {
      setRedirectToNotFound(false);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { studentId, examId, examType, subjectId, totalMarks, marksObtained });
  };

  // if (role !== 'admin') {
  //   return <Redirect to="/PageNotFound" />;
  // }

  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />; // Redirect if user role is not admin
  }

  return (
    <AdminSidebar>
    <div id='containerStudentMarks'>
        <form onSubmit={handleSubmit}>
        <h2 id='studentmarksh2'>Add Student Marks</h2>
    
    <div id='form-studentmarks'>
        
        <div id='form-groupstudentMarks'>
        <label id='label_student_marks'>Student Id:</label>
        <input
          id='input_studentmarks'
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder='Enter Student Id'
          required
        />
      </div>
      </div>

      <div id='form-studentmarks'>
      <div id='form-groupstudentMarks'>
        <label id='label_student_marks'>Exam Id:</label>
        <input
          id='input_studentmarks'
          type="number"
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          placeholder='Enter Exam Id'
          required
        />
      </div>
      </div>

      <div id='form-studentmarks'>
      <div id='form-groupstudentMarks'>
        <label id='label_student_marks'>Exam Type:</label>
        <select
          id='input_studentmarks'
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          placeholder='Select Exam Type'
          required
        >
          <option value="">Select Exam Type</option>
          <option value="Midterm">Midterm</option>
          <option value="Final">Final</option>
        </select>
      </div>
      </div>

      <div id='form-studentmarks'>
      <div id='form-groupstudentMarks'>
        <label id='label_student_marks'>Subject Id:</label>
        <input
          id='input_studentmarks'
          type="text"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          placeholder='Enter Subject Id'
          required
        />
      </div>
      </div>

      <div id='form-studentmarks'>
      <div id='form-groupstudentMarks'>
        <label id='label_student_marks'>Total Marks:</label>
        <input
          id='input_studentmarks'
          type="number"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          placeholder='Enter Total Marks'
          required
        />
      </div>
      </div>

      <div>
      <div id='form-groupstudentMarks'>
        <label id='label_student_marks'>Marks Obtained:</label>
        <input
          id='input_studentmarks'
          type="number"
          value={marksObtained}
          onChange={(e) => setMarksObtained(e.target.value)}
          placeholder='Enter Marks Obtained'
          required
        />
      </div>
      </div>
      
      <button type="submit" id='btnaddstudentmarks'>Submit</button>
    </form>
    </div>
    </AdminSidebar>
  );
};

export default StudentMarks;
