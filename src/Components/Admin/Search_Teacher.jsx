import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../Login/config';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Search_Teacher.css'
import AdminSidebar from '../Sidebar/AdminSidebar';
import { FaSearch } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {toast,Toaster} from 'react-hot-toast';
import { Redirect } from 'react-router-dom';

const Search_Teacher = () => {
       const history = useHistory();
       const [data, setData] = useState(null);
       const [selectedTeacher,setSelectedTeacher] =useState("");
       const [standardString, setStandardString] = useState("");
       const [searchTerm,setSearchTerm] = useState("");
       const [role, setRole] = useState('');

       const handleSearch = () => {
        const filteredData = data.filter((teacher) =>
          teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredData);
      };
      
      
      useEffect(() => {
         
        setRole('admin');
      }, []);
      
      useEffect(() => {
        if (searchTerm === '') {
          getData();
        } else {
          handleSearch();
        }
      }, [searchTerm]);


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
        .delete(`${config.ApiUrl}AdminTeacher/DeleteAdminTeacher/${id}`)
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

      if (role !== 'admin') {
        return <Redirect to="/PageNotFound" />;
      }
    
  return (
    <AdminSidebar>   
    <>
        <Fragment>
        <div id="search-container">
            <input
            id='search'
              type="text"
              placeholder="Search By Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch  id='teachersearchicon'/>
          </div>

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
      <Popup contentStyle={{width:'450px',borderRadius:'10px',background:'lightGray'}}
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
              <p id='pop-field'><b>Email:</b>{selectedTeacher.email}</p>
              <p id='pop-field'><b>Gender:</b> {selectedTeacher.gender}</p>
              <p id='pop-field'><b>Mobile Number:</b> {selectedTeacher.mobileNumber}</p>
              <p id='pop-field'><b>BirthDate: </b>{selectedTeacher.birthDate}</p>
              <p id='pop-field'><b>JoinDate:</b> {selectedTeacher.joinDate}</p>
              <p id='pop-field'><b>Address:</b> {selectedTeacher.address}</p>
              <p id='pop-field'><b>City: </b>{selectedTeacher.city}</p>
              <p id='pop-field'><b>District:</b> {selectedTeacher.district}</p>
              <p id='pop-field'><b>State:</b> {selectedTeacher.state}</p>
              <p id='pop-field'><b>Pincode:</b> {selectedTeacher.pinCode}</p>
              <p id='pop-field'><b>Standard:</b> {selectedTeacher.standard}</p>
              <p id='pop-field'><b>Subject:</b> {selectedTeacher.subjectName}</p>
              
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