import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../Login/config';
import Popup from 'reactjs-popup';
import './Search_Teacher.css'
import AdminSidebar from '../Sidebar/AdminSidebar';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {toast,Toaster} from 'react-hot-toast';

const Search_Teacher = () => {
       const history = useHistory();
       const [data, setData] = useState(null);
       const [selectedTeacher,setSelectedTeacher] =useState("");
       const [standardString, setStandardString] = useState("");

     
      
      
    //TEACHER GET
    const getData = () => {
      axios
        .get(`${config.ApiUrl}AdminTeacher/GetTeachers`)
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
     };

     //PopUp Details
     const getTeacherDetails = (id) => {
      console.log("Getting Teacher details for ID:", id);
      axios
        .get(`${config.ApiUrl}AdminTeacher/GetAdminTeacher/${id}`)
        .then((result) => {
          setSelectedTeacher(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      getData();
      getTeacherDetails();
    }, []);

    //EDIT TEACHER
      const handleEdit = (id) => {
      history.push('/TeacherForm');

      };

      //DELETE TEACHER
      const handleDelete = (id) => {
        if (window.confirm('Are You Sure To Delete This Teacher')) {
        axios 
        .delete(`${config.ApiUrl}AdminTeacher/DeleteAdminTeacher${id}`)
        .then((response) =>{
          if(response.status===200){
          setData((prevData) => prevData.filter((teacher) => teacher.id !== id));
            toast.success('Teacher Deleted Successfully');
          }
          else{
            toast.error('Failed to delete Teacher');
          }
        })
        .catch((error) => {
          console.error('Error Deleting Teacher :',error);
          toast.error('failed to Delete Teacher');
        });
        }
      };
      


      const customToastStyle = { 
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        fontSize: '16px',
        fontWeight: 'bold',
      };

 
  return (
    <AdminSidebar>   
    <>

    <Fragment>
      <table id='main'>
        <thead>
          <tr id='heading'>
            <th>ID</th>
            <th id='th-name'> Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Standard</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((teacher, index) => {
              return (
                <tr key={index}>
                  <td id='td-align'>{index + 1}</td>
                  <td id='td-align' ><button id='btn-view' onClick={() => getTeacherDetails(teacher.id)}>{teacher.name}</button></td>
                  <td id='td-align'>{teacher.email}</td>
                  <td id='td-align'>{teacher.gender}</td>
                  <td id='td-align'>{teacher.mobileNumber}</td>
                  <td id='td-align'>{(teacher.standard)}</td>
                  <td id='td-align'>{teacher.subject}</td>
                  <td colSpan={2} id='td-align'>
                    <button
                      id='btn-edit'
                      onClick={() => handleEdit(teacher.id)}>
                      <FiEdit />
                    </button>     &nbsp;

                    <button
                      id='btn-delete'
                      onClick={() => handleDelete(teacher.id)}>
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
           
          open={selectedTeacher!== null}
          onClose={() => {
            setSelectedTeacher(null);
            setStandardString(''); 
          }}
          closeOnDocumentClick
          >
         
             
        {selectedTeacher &&(
          
            <div id='pop-up-title'>
               <button id='btn-close' onClick={()=> setSelectedTeacher(null)} >X</button>
              <h2 id='title-name'>Details of {selectedTeacher.name}</h2>
              <p id='pop-field'>Email: {selectedTeacher.email}</p>
              <p id='pop-field'>Gender: {selectedTeacher.gender}</p>
              <p id='pop-field'>Mobile Number: {selectedTeacher.mobileNumber}</p>
              <p id='pop-field'>BirthDate: {selectedTeacher.birthDate}</p>
              <p id='pop-field'>JoinDate: {selectedTeacher.joinDate}</p>
              <p id='pop-field'>Address: {selectedTeacher.address}</p>
              <p id='pop-field'>City: {selectedTeacher.city}</p>
              <p id='pop-field'>District: {selectedTeacher.district}</p>
              <p id='pop-field'>State: {selectedTeacher.state}</p>
              <p id='pop-field'>Pincode: {selectedTeacher.pinCode}</p>
              <p id='pop-field'>Standard: {selectedTeacher.standard}</p>
              <p id='pop-field'>Subject: {selectedTeacher.subjectName}</p>
              
            </div>
          )}
        </Popup>
            
    </Fragment>
        <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      
        
</>
  </AdminSidebar>
  );
};
export default Search_Teacher;