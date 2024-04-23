import React, { useState, useEffect } from 'react';
import './StudentMarks.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import { toast, Toaster } from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import config from '../Login/config';

const InputMarksTable = () => {
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({});
  const [examType, setExamType] = useState('Midterm'); // Default exam type
  const [submitted, setSubmitted] = useState(false);
  const [enteredData, setEnteredData] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [editedIndex, setEditedIndex] = useState(null);
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const [currentUserRole,setCurrentUserRole]=useState('');


  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      setCurrentUserRole(userRole.Role)
      console.log('loggedInRole for ParentsPortal', userRole.Role);
      if (userRole.Role !== 'teacher' && userRole.Role !== 'admin') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);

  useEffect(() => {
    // Fetch subjects from the backend
    const selectId = localStorage.getItem('selectedStudentId');

    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${config.ApiUrl}DropDown/AllSubjectByStudent/${selectId}`);
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
        const response = await fetch(`${config.ApiUrl}Student/GetStudent/${selectId}`);
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

    // Get data from local storage
    const storedData = JSON.parse(localStorage.getItem('enteredData'));
    if (storedData) {
      setEnteredData(storedData);
    }
  }, []);

  useEffect(() => {
    // Save entered data to local storage whenever it changes
    localStorage.setItem('enteredData', JSON.stringify(enteredData));
  }, [enteredData]);

  const handleSubjectChange = (subject, value) => {
    setMarks({ ...marks, [subject]: value });
  };

  const handleExamTypeChange = (e) => {
    setExamType(e.target.value);
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

    // Count existing records for each exam type
    const midtermCount = enteredData.filter((data) => data.examType === 'Midterm').length;
    const finalCount = enteredData.filter((data) => data.examType === 'Final').length;

    // Check if adding another record exceeds the limit
    if (examType === 'Midterm' && midtermCount >= 1 && editedIndex === null) {
      toast.error('You cannot add more than one Midterm record!');
      clearForm(); // Clear form after showing the toast message
      return;
    } else if (examType === 'Final' && finalCount >= 1 && editedIndex === null) {
      toast.error('You cannot add more than one Final record!');
      clearForm(); // Clear form after showing the toast message
      return;
    }

    const totalMarks = calculateTotalMarks(); // Calculate total marks
    const newData = { name: studentName, examType, totalMarks, obtainedMarks: totalMarks, status: 'Pass', ...marks }; // Include total marks, obtained marks, exam type, and status
    if (editedIndex !== null) {
      // Update existing record
      const updatedData = [...enteredData];
      updatedData[editedIndex] = newData;
      setEnteredData(updatedData);
      toast.success('Record updated successfully!');
      clearForm();
    } else {
      // Add new record
      setEnteredData([...enteredData, newData]);
      toast.success('Record added successfully!');
      clearForm(); // Clear form after successful addition
    }
    setSubmitted(true);
  };

  const clearForm = () => {
    setName('');
    setMarks({});
    setExamType('Midterm'); // Reset exam type to default
    setEditedIndex(null);
  };

  const handleEdit = (index) => {
    const selectedData = enteredData[index];
    setMarks({ ...selectedData });
    setExamType(selectedData.examType); // Set exam type from selected data
    setEditedIndex(index);
    
  };

  const handleDelete = (index) => {
    const updatedData = enteredData.filter((_, i) => i !== index);
    setEnteredData(updatedData);
    setSubmitted(true);
    toast.success('Record deleted successfully!');
  };

  // Define customToastStyle here
  const customToastStyle = {
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <>
      { currentUserRole =='admin' ?
    <AdminSidebar>
      <>
      <div className="studentmarkscontainer">
        <center>
          <h2 id="headingg1">Input Marks</h2>
        </center><br></br>
        <form onSubmit={handleSubmit}>
          <table id="tt1">
            <thead>
              <tr id="trr1">
                <th id="thhh1">Name</th>
                <th id="thh1">Exam Type</th>
                {subjects.map((subject) => (
                  <th id="thh1" key={subject}>{subject}</th>
                ))}
              </tr>
            </thead>
            <tbody id="tbodyy">
              <tr id="trr1">
                <td id='tdd1'align='center'>{studentName}</td>
                <td id='tdd1'>
                  <select id='examTypee' value={examType} onChange={handleExamTypeChange}>
                    <option value="" disabled={true}>Select Exam Type</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                  </select>
                </td>
                {subjects.map((subject) => (
                  <td id='tdd1' key={subject}><center></center>
                    <input id='ii1' type="text" value={marks[subject] || ''} onChange={(e) => handleSubjectChange(subject, e.target.value)} required  autoComplete="off"  />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <center>
            <button id='submitmarkss' type="submit">
              {editedIndex !== null ? "Save Changes" : "Add To Table"}
            </button>
          </center>
        </form>
        <br /><br />
        {submitted && enteredData.length > 0 && (
          <div>
            <center>
              <h2 id='headingg1'>View Marks</h2>
            </center><br />
            <table id='tt1'>
              <thead>
                <tr id='trr1'>
                  <th id='thhh1'>Name</th>
                  <th id='thh1'>Exam Type</th>
                  {subjects.map((subject) => (
                    <th id='thh1' key={subject}>{subject}</th>
                  ))}
                  <th id='thh1'>Total Marks</th>
                  <th id='thh1'>Obtained Marks</th>
                  <th id='thh1'>Status</th>
                  <th id='thh1'>Actions</th>
                </tr>
              </thead>
              <tbody id='tbodyy'>
                {enteredData.map((data, index) => (
                  <tr id='trr1' key={index}>
                    <td id='tdd1'>{data.name}</td>
                    <td id='tdd1'>{data.examType}</td>
                    {subjects.map((subject) => (
                      <td id='tdd1' key={subject}>{data[subject]}</td>
                    ))}
                    <td id='tdd1'>{data.totalMarks}</td>
                    <td id='tdd1'>{data.obtainedMarks}</td>
                    <td id='tdd1'>{data.status}</td>
                    <td id='tdd1'>
                      <button id="btn-editt" onClick={() => handleEdit(index)}>
                        <FiEdit />
                      </button>&nbsp;&nbsp;&nbsp;
                      <button id="btn-deletee" onClick={() => handleDelete(index)}>
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Toaster toastOptions={{ className: "custom-toast", style: customToastStyle, duration: 4500 }} position="top-center" reverseOrder={false} />
      </>
    </AdminSidebar>
    :
    <TeacherSidebar>
      <>
      <div className="studentmarkscontainer">
        <center>
          <h2 id="headingg1">Input Marks</h2>
        </center><br></br>
        <form onSubmit={handleSubmit}>
          <table id="tt1">
            <thead>
              <tr id="trr1">
                <th id="thh1">Name</th>
                <th id="thh1">Exam Type</th>
                {subjects.map((subject) => (
                  <th id="thh1" key={subject}>{subject}</th>
                ))}
              </tr>
            </thead>
            <tbody id="tbodyy">
              <tr id="trr1">
                <td id='tdd1'>{studentName}</td>
                <td id='tdd1'>
                  <select id='examTypee' value={examType} onChange={handleExamTypeChange}>
                    <option value="" disabled={true}>Select Exam Type</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                  </select>
                </td>
                {subjects.map((subject) => (
                  <td id='tdd1' key={subject}><center></center>
                    <input id='ii1' type="text" value={marks[subject] || ''} onChange={(e) => handleSubjectChange(subject, e.target.value)} required  autoComplete="off"  />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <center>
            <button id='submitmarkss' type="submit">
              {editedIndex !== null ? "Save Changes" : "Add To Table"}
            </button>
          </center>
        </form>
        <br /><br />
        {submitted && enteredData.length > 0 && (
          <div>
            <center>
              <h2 id='headingg1'>View Marks</h2>
            </center><br />
            <table id='tt1'>
              <thead>
                <tr id='trr1'>
                  <th id='thh1'>Name</th>
                  <th id='thh1'>Exam Type</th>
                  {subjects.map((subject) => (
                    <th id='thh1' key={subject}>{subject}</th>
                  ))}
                  <th id='thh1'>Total Marks</th>
                  <th id='thh1'>Obtained Marks</th>
                  <th id='thh1'>Status</th>
                  <th id='thh1'>Actions</th>
                </tr>
              </thead>
              <tbody id='tbodyy'>
                {enteredData.map((data, index) => (
                  <tr id='trr1' key={index}>
                    <td id='tdd1'>{data.name}</td>
                    <td id='tdd1'>{data.examType}</td>
                    {subjects.map((subject) => (
                      <td id='tdd1' key={subject}>{data[subject]}</td>
                    ))}
                    <td id='tdd1'>{data.totalMarks}</td>
                    <td id='tdd1'>{data.obtainedMarks}</td>
                    <td id='tdd1'>{data.status}</td>
                    <td id='tdd1'>
                      <button id="btn-editt" onClick={() => handleEdit(index)}>
                        <FiEdit />
                      </button>&nbsp;&nbsp;&nbsp;
                      <button id="btn-deletee" onClick={() => handleDelete(index)}>
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Toaster toastOptions={{ className: "custom-toast", style: customToastStyle, duration: 4500 }} position="top-center" reverseOrder={false} />
      </>
    </TeacherSidebar>
}
    </>
  );
};

export default InputMarksTable;
