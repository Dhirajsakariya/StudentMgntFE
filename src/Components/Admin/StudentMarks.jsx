import React, { useState, useEffect } from 'react';
import './StudentMarks.css'; 
import AdminSidebar from '../Sidebar/AdminSidebar';
import axios from 'axios';
import config from '../Login/config';

const InputMarksTable = () => {
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [enteredData, setEnteredData] = useState([]); 
  const [studentName, setStudentName] = useState(''); 

  useEffect(() => {
    // Fetch subjects from the backend
    const selectId = localStorage.getItem('selectedStudentId');
  
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`https://localhost:7157/api/DropDown/AllSubjectByStudent/${selectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    const fetchStudentName = async () => {
      try {
        const response = await fetch(`https://localhost:7157/api/Student/GetStudent/${selectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student details');
        }
        const studentData = await response.json();
        setStudentName(studentData.name); 
      } catch (error) {
        console.error('Error fetching student name:', error);
      }
    };

    fetchSubjects();
    fetchStudentName();
  }, []);

  
  const handleSubjectChange = (subject, value) => {
    setMarks({ ...marks, [subject]: value });
  };

  
  const calculateTotalMarks = () => {
    let total = 0;
    Object.values(marks).forEach((value) => {
      total += parseInt(value) || 0; 
    });
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Store entered data in an object
    const totalMarks = calculateTotalMarks(); // Calculate total marks
    const newData = { name: studentName, totalMarks, obtainedMarks: totalMarks, status: 'Pass', ...marks }; // Include total marks, obtained marks, and status
    // Update the state to include the new data in the enteredData array
    setEnteredData([...enteredData, newData]);
    // Clear input fields and marks
    setName('');
    setMarks({});
    // Set submitted state to true
    setSubmitted(true);
  };

  // Function to reset the form
  const resetForm = () => {
    setName('');
    setMarks({});
    setSubmitted(false);
    setEnteredData([]);
  };

  return (
    <AdminSidebar>
      <div className="studentmarkscontainer">
        <center>
          <h2 id="heading1">Input Marks</h2><br /><br /></center>
          <form onSubmit={handleSubmit}>
            <table id='t1'>
              <thead>
                <tr id='tr1'>
                  <th id='th1'>Name</th>
                  {subjects.map((subject) => (
                    <th id='th1' key={subject}>{subject}</th>
                  ))}
                </tr>
              </thead>
              <tbody id='tbody'>
                <tr id='tr1'>
                  <td id='td1'>{studentName}</td> {/* Display student's name */}
                  {subjects.map((subject) => (
                    <td id='td1' key={subject}>
                      <input id='i1' type="text" value={marks[subject] || ''} onChange={(e) => handleSubjectChange(subject, e.target.value)} required />
                    </td>
                  ))}
                </tr>
              </tbody>
              <tfoot>
                <tr id='tr1'>
                  <td id='td1'colSpan={1 + subjects.length}><center>
                    <input  id='submitmarks'type="submit" value="Add To Table" /></center>
                  </td>
                </tr>
              </tfoot>
            </table>
          </form>
          <br /><br />
          {submitted && enteredData.length > 0 && (
            <div><center>
              <h2 id='heading1'>View Marks</h2></center><br />
              <table id='t1'>
                <thead>
                  <tr id='tr1'>
                    <th id='th1'>Name</th>
                    {subjects.map((subject) => (
                      <th id='th1' key={subject}>{subject}</th>
                    ))}
                    <th id='th1'>Total Marks</th> {/* Add Total Marks column */}
                    <th id='th1'>Obtained Marks</th> {/* Add Obtained Marks column */}
                    <th id='th1'>Status</th> {/* Add Status column */}
                  </tr>
                </thead>
                <tbody id='tbody'>
                  {enteredData.map((data, index) => (
                    <tr  id='tr1'key={index}>
                      <td id='td1'>{data.name}</td> {/* Display student's name from enteredData */}
                      {subjects.map((subject) => (
                        <td id='td1' key={subject}>{data[subject]}</td>
                      ))}
                      <td id='td1'>{data.totalMarks}</td> {/* Display Total Marks */}
                      <td id='td1'>{data.obtainedMarks}</td> {/* Display Obtained Marks */}
                      <td id ='td1'>{data.status}</td> {/* Display Status */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminSidebar>
    );
  };
  
  export default InputMarksTable;


