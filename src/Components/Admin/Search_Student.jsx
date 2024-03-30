import React, { Fragment, useEffect, useState } from 'react';

import './Search_Student.css'
import axios from 'axios';
import config from '../Login/config';
import AdminSidebar from '../Sidebar/AdminSidebar';
const Search_Student = () => {

  const [standards, setStandards] = useState({});
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStandard, setSelectedStandard] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function handleView(id) {
    axios
      .get(`${config.ApiUrl}Student/GetStudent${id}`)
      .then((response) => {
        setSelectedStudent(response.data);
        // Fetch standard details corresponding to the student's standard ID
        axios
          .get(`${config.ApiUrl}Standard/GetStandard${response.data.standardId}`)
          .then((standardResponse) => {
            setSelectedStandard(standardResponse.data);
            setShowModal(true);
          })
          .catch((error) => {
            console.error('Error fetching standard details:', error);
            alert('Failed to fetch standard details.');
          });
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
        alert('Failed to fetch student details.');
      });
  }
  const handleEdit = (name) => {
    alert(name)
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this student?')) {
      axios
        .delete(`${config.ApiUrl}Student/DeleteStudent${id}`)
        .then((response) => {
          if (response.status === 200) {
            // Remove the deleted student from the data state
            setData((prevData) => prevData.filter((student) => student.id !== id));
            alert('Student deleted successfully.');
          } else {
            alert('Failed to delete student.');
          }
        })
        .catch((error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student.');
        });
    }
  };

  const getData = () => {
    axios
      .get(`${config.ApiUrl}Student/GetStudentDetail`)
      .then((result) => {
        setData(result.data);
        // Fetch standard details for each student
        result.data.forEach((student) => {
          axios
            .get(`${config.ApiUrl}Standard/GetStandard${student.standardId}`)
            .then((response) => {
              setStandards((prevStandards) => ({
                ...prevStandards,
                [student.standardId]: response.data,
              }));
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const StudentModal = ({ student, onClose }) => {
    return (

      <div className="modal">
        <div id='studentdetailpopup' className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Details of {student.name}</h2>
          <p id='psearchstudent'>Email: {student.email}</p>
          <p id='psearchstudent'>Gender: {student.gender}</p>
          <p id='psearchstudent'>Birth Date: {student.birthDate}</p>
          <p id='psearchstudent'>Mobile Number: {student.mobileNumber}</p>
          <p id='psearchstudent'>Join Date: {student.joinDate}</p>
          <p id='psearchstudent'>Blood Group: {student.bloodGroup}</p>
          <p id='psearchstudent'>Address: {student.address}</p>
          <p id='psearchstudent'>City: {student.city}</p>
          <p id='psearchstudent'>District: {student.district}</p>
          <p id='psearchstudent'>State: {student.state}</p>
          <p id='psearchstudent'>Pincode: {student.pinCode}</p>
          <p id='psearchstudent'>Standard Number: {selectedStandard ? selectedStandard.standardNumber : ''}</p>
          <p id='psearchstudent'>Section: {selectedStandard ? selectedStandard.section : ''}</p>
          
          {/* Add other details as needed */}
        </div>
      </div>
    );
  };
 
  return (
    <AdminSidebar>
    <Fragment>
      <Table striped bordered hover id='mainsearchstudent' >
        <thead>
          <tr id='trsearchstudent'>
            <th>ID</th>
            <th>Name</th>
            <th >Email</th>
            <th >Gender</th>
            <th >Mobile Number</th>
            <th >Standard Number</th>
            <th >Section</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}  id='datasearchstudent'>
                  <td>{index + 1}</td>
                  <td>
                    <button id="btnviewsearchstudent" onClick={() => handleView(item.id)}>
                      {item.name}
                    </button>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.mobileNumber}</td>
                  <td>
                    {standards[item.standardId]
                      ? standards[item.standardId].standardNumber
                      : ''}
                  </td>
                  <td>
                    {standards[item.standardId]
                      ? standards[item.standardId].section
                      : ''}
                  </td>
                  <td colSpan={2}>
                    <button
                      id='btneditsearchstudent'
                      onClick={() => handleEdit(item.name)}>
                      Edit
                    </button>{' '}
                    &nbsp;
                    <button
                      id='btndeletesearchstudent'
                      onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan='8'>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
      {showModal && selectedStudent && (
        <StudentModal   student={selectedStudent} onClose={() => setShowModal(false)} />
      )}
    </Fragment>
    </AdminSidebar>
  );
};
export default Search_Student;
