import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../Login/config';
import Popup from 'reactjs-popup';
import './Search_Student.css'
import AdminSidebar from '../Sidebar/AdminSidebar';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {toast,Toaster} from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";


const Search_Student = () => {
       const history = useHistory();
       const [data, setData] = useState(null);
       const [selectedStudent,setSelectedStudent] =useState(null);
       const [searchQuery, setSearchQuery] = useState('');
       const [editedStudent, setEditedStudent] = useState(null);

    //TEACHER GET
    const getData = () => {
      axios
        .get(`${config.ApiUrl}Student/GetStudents`)
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
     };


     const getStudentDetails = (id) => {
      console.log("Getting student details for ID:", id);
      axios
        .get(`${config.ApiUrl}Student/GetStudent/${id}`)
        .then((result) => {
          setSelectedStudent(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

   
    useEffect(() => {
      getData();
      getStudentDetails();
    }, []);

 
    const handleEdit = (id) => {
     
    };
      //DELETE TEACHER
      const handleDelete = (id) => {
        if (window.confirm('Are You Sure To Delete This Student')) {
        axios 
        .delete(`${config.ApiUrl}Student/DeleteStudent${id}`)
        .then((response) =>{
          if(response.status===200){
          setData((prevData) => prevData.filter((student) => student.id !== id));
            toast.success('Student Deleted Successfully');
          }
          else{
            toast.error('Failed to delete Student');
          }
        })
        .catch((error) => {
          console.error('Error Deleting Student :',error);
          toast.error('failed to Delete Student');
        });
        }
      };
      
     

      const handleSearch = () => {
        // Filter data based on search query
        const filteredData = data.filter((student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setData(filteredData);
      };
      
      useEffect(() => {
        // If searchQuery becomes empty, reset data to its original state
        if (searchQuery === '') {
          getData();
        } else {
          handleSearch();
        }
      }, [searchQuery]);
      


      const customToastStyle = { 
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        fontSize: '16px',
        fontWeight: 'bold',
      };

 
  return (
    <AdminSidebar>   
    
    <>
    <Fragment>
    <div id="search-container">
            <input
            id='searchstudent'
              type="text"
              placeholder="Search By Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch id='iconsearchstudent'/>
          </div>
      <table id='mainsearchstudent'>
        <thead>
          <tr id='trsearchstudent'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Standard</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((student, index) => {
              return (
                <tr key={index} id='tr1searchstudent'>
                  <td>{index + 1}</td>
                  <td ><button onClick={() => getStudentDetails(student.id)}>{student.name}</button></td>
                  <td>{student.email}</td>
                  <td>{student.gender}</td>
                  <td>{student.mobileNumber}</td>
                  <td>{(student.standard)}</td>
                  <td>{student.subject}</td>
                  <td colSpan={2}>
                    <button
                      id='btneditsearchstudent'
                      onClick={() => handleEdit(student.id)}>
                      <FiEdit />
                    </button>     &nbsp;

                    <button
                      id='btndeletesearchstudent'
                      onClick={() => handleDelete(student.id)}>
                      <RiDeleteBin6Line />

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
      </table>
      <Popup
  open={selectedStudent !== null}
  onClose={() => setSelectedStudent(null)}
>
  {selectedStudent && (
    <div id='studentdetailpopup'>
      <button className="close-btn" onClick={() => setSelectedStudent(null)}>×</button>
      <h2 id='headingpopup'>Details of  {selectedStudent.name}</h2>
      <p id='psearchstudent'>Standard: {selectedStudent.standard}</p>
      <p id='psearchstudent'>Roll No: {selectedStudent.rollNo}</p>
      <p id='psearchstudent'>Email: {selectedStudent.email}</p>
      <p id='psearchstudent'>Gender: {selectedStudent.gender}</p>
      <p id='psearchstudent'>Birth Date: {selectedStudent.birthDate}</p>
      <p id='psearchstudent'>Mobile Number: {selectedStudent.mobileNumber}</p>
      <p id='psearchstudent'>Join Date: {selectedStudent.joinDate}</p>
      <p id='psearchstudent'>Blood Group: {selectedStudent.bloodGroup}</p>
      <p id='psearchstudent'>Address: {selectedStudent.address}</p>
      <p id='psearchstudent'>City: {selectedStudent.city}</p>
      <p id='psearchstudent'>District: {selectedStudent.district}</p>
      <p id='psearchstudent'>State: {selectedStudent.state}</p>
      <p id='psearchstudent'>PinCode: {selectedStudent.pinCode}</p>
      {/* Add more details as needed */}
    </div>  
  )}
</Popup>
<>

</>
            
    </Fragment>
        <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      
        
</>
  </AdminSidebar>
  );
};
export default Search_Student;
