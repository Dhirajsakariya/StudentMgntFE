import React, { useState, useEffect } from 'react';
import './StudentMarks.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
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
    if (examType === 'Midterm' && midtermCount >= 1) {
      toast.error('You cannot add more than one Midterm record!');
      setName('');
    setMarks({});
    setExamType('Midterm'); // Reset exam type to default
    setEditedIndex(null);
      return;
    } else if (examType === 'Final' && finalCount >= 1) {
      toast.error('You cannot add more than one Final record!');
      setName('');
    setMarks({});
    setExamType('Midterm'); // Reset exam type to default
    setEditedIndex(null);
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
    } else {
      // Add new record
      setEnteredData([...enteredData, newData]);
      toast.success('Record added successfully!');
    }
    setSubmitted(true);
    clearForm(); // Clear form after submission
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
    <AdminSidebar>
      <div className="studentmarkscontainer">
        <center>
          <h2 id="heading1">Input Marks</h2>
        </center><br></br>
        <form onSubmit={handleSubmit}>
          <table id="t1">
            <thead>
              <tr id="tr1">
                <th id="th1">Name</th>
                <th id="th1">Exam Type</th>
                {subjects.map((subject) => (
                  <th id="th1" key={subject}>{subject}</th>
                ))}
              </tr>
            </thead>
            <tbody id="tbody">
              <tr id="tr1">
                <td id='td1'>{studentName}</td>
                <td id='td1'>
                  <select id='examType' value={examType} onChange={handleExamTypeChange}>
                    <option value="" disabled={true}>Select Exam Type</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                  </select>
                </td>
                {subjects.map((subject) => (
                  <td id='td1' key={subject}><center></center>
                    <input id='i1' type="text" value={marks[subject] || ''} onChange={(e) => handleSubjectChange(subject, e.target.value)} required  autoComplete="off"  />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <center>
            <button id='submitmarks' type="submit">
              {editedIndex !== null ? "Save Changes" : "Add To Table"}
            </button>
          </center>
        </form>
        <br /><br />
        {submitted && enteredData.length > 0 && (
          <div>
            <center>
              <h2 id='heading1'>View Marks</h2>
            </center><br />
            <table id='t1'>
              <thead>
                <tr id='tr1'>
                  <th id='th1'>Name</th>
                  <th id='th1'>Exam Type</th>
                  {subjects.map((subject) => (
                    <th id='th1' key={subject}>{subject}</th>
                  ))}
                  <th id='th1'>Total Marks</th>
                  <th id='th1'>Obtained Marks</th>
                  <th id='th1'>Status</th>
                  <th id='th1'>Actions</th>
                </tr>
              </thead>
              <tbody id='tbody'>
                {enteredData.map((data, index) => (
                  <tr id='tr1' key={index}>
                    <td id='td1'>{data.name}</td>
                    <td id='td1'>{data.examType}</td>
                    {subjects.map((subject) => (
                      <td id='td1' key={subject}>{data[subject]}</td>
                    ))}
                    <td id='td1'>{data.totalMarks}</td>
                    <td id='td1'>{data.obtainedMarks}</td>
                    <td id='td1'>{data.status}</td>
                    <td id='td1'>
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
    </AdminSidebar>
  );
};

export default InputMarksTable;
