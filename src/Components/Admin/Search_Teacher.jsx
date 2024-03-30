import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Login/config';
import './Search_Teacher.css'
import AdminSidebar from '../Sidebar/AdminSidebar';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {toast,Toaster} from 'react-hot-toast';

const Search_Teacher = () => {
  const [standards, setStandards] = useState({});
  const [subjects,setSubject] = useState({});
  const [data, setData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal,setShowModel] =useState([]);


  const handleEdit = (name) =>{
    alert(name);
  }

  const handleView = (teacher) =>{
    setSelectedTeacher(teacher);
  }

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

  const getData = () => {
    axios
      .get(`${config.ApiUrl}AdminTeacher/GetTeachers`)
      .then((result) => {
        setData(result.data);
        // Fetch standard details for each student
        result.data.forEach((teacher) => {
          axios
            .get(`${config.ApiUrl}Standard/GetStandard${teacher.standardId}`)
            .then((response) => {
              setStandards((prevStandards) => ({
                ...prevStandards,
                [teacher.standardId]: response.data,
              }));
            })
            .catch((error) => {
              console.log(error);
            });
        });
        result.data.forEach((subject) => {
            axios
              .get(`${config.ApiUrl}Subject/GetSubject${subject.subjectId}`)
              .then((response) => {
                setSubject((prevSubject) => ({
                  ...prevSubject,
                  [subject.subjectId]: response.data,
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

  const customToastStyle = { 
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
  };

 const TeacherModel =({ teacher,onclose})=>{
  return(
    <div>
      <div id='pop-up'>
            <span id='pop-heading'onClick={onclose}>&times;</span>
            <h2 id='detail_heading'>Details of {teacher.name}</h2>
            <p id='teacherinfo'>Email:&nbsp; {teacher.email}</p>
            <p id='teacherinfo'>Gender:&nbsp; {teacher.gender}</p>
            <p id='teacherinfo'>Birth-Date:&nbsp;{teacher.birthDate}</p>
            <p id='teacherinfo'>MobileNo: &nbsp;{teacher.mobileNumber}</p>
            <p id='teacherinfo'>Join-Date:&nbsp;{teacher.joinDate}</p>
            <p id='teacherinfo'>Address:&nbsp;{teacher.address}</p>
            <p id='teacherinfo'>City:&nbsp;{teacher.city}</p>
            <p id='teacherinfo'>District:&nbsp;{teacher.district}</p>
            <p id='teacherinfo'>State: &nbsp;{teacher.state}</p>
            <p id='teacherinfo'>PinCode: &nbsp;{teacher.pinCode}</p>
            <p id='teacherinfo'>Standard: &nbsp;{standards[teacher.standardId]? standards[teacher.standardId].standardNumber:'N/A'}</p>
            <p id='teacherinfo'>Section:&nbsp;{standards[teacher.standardId]? standards[teacher.standardId].section:'N/A'}</p>
            <p id='teacherinfo'>Subject:&nbsp;{subjects[teacher.subjectId]? subjects[teacher.subjectId].name:'N/A'}</p>


      </div>
    </div>
  )
 } 


  return (
    <AdminSidebar>   
    
    <>
    <Fragment>
      <Table id='main'>
        <thead>
          <tr id='heading'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Standard</th>
            <th>Section</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <button
                      id='btn-view'
                      onClick={() => handleView(item)}>
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
                  <td>
                    {subjects[item.subjectId]
                      ? subjects[item.subjectId].name
                      : ''}
                  </td>
                 <td colSpan={2}>
                    <button
                      id='btn-edit'
                      onClick={() => handleEdit(item.name)}>
                      <FiEdit />
                    </button>{' '}
                    &nbsp;
                    <button
                      id='btn-delete'
                      onClick={() => handleDelete(item.id)}>
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
      </Table>
      {showModal && selectedTeacher && (
        <TeacherModel teacher={selectedTeacher} onclose={() => setShowModel(false)}/>
      )}      
    </Fragment>
        <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      
        
</>
  </AdminSidebar>
  );
};
export default Search_Teacher;