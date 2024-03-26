import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../Login/config';

const TeacherPersonal = () => {
  const [teachers, setTeachers] = useState([]);

 
useEffect(() => {
  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${config.ApiUrl}AdminTeacher/GetTeachers`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
       // body: JSON.stringify({Role:role ,email, password })

      });
      if (!response.ok) {
        throw new Error('Faild to fetch');
      }
      const data = await response.json();
      setTeachers(data);
    }
    catch(error){
      console.error('Error Fetching Data',error);
    }
  };
  fetchTeachers();
  
},[]);

// useEffect(() => {
//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get('/api/teachers');
//       setTeachers(response.data);
//     } catch (error) {
//       console.error('Error fetching teacher data:', error);
//     }
//   };

//   fetchTeachers();
// }, []);



  return (
    <div className='TeacherPersonal'>
        <form action="">
            <div className="input-TeacherPersonal">
                <h2>Teacher Personal Information</h2>
                <div className="input-row-TeacherPersonal">
                    <label>Name:</label>
                    <p>{teachers.name}</p>
                </div>
                <div className="input-row-TeacherPersonal">
                    <label>Email:</label>
                    <p>{teachers.email}</p>
                </div>
                <div className="input-row-TeacherPersonal">
                    <label>Birthdate:</label>
                    <p>{teachers.birthday}</p>
                </div>
                <div className="input-row-TeacherPersonal">
                    <label>Mobile Number:</label>
                    <p>{teachers.mobileNumber}</p>
                </div>
                <div className="input-row-TeacherPersonal">
                    <label>Gender:</label>
                    <p>{teachers.gender}</p>
                </div>
                <div className="input-row-TeacherPersonal">
                    <label>Address:</label>
                    <p>{teachers.address}<br/>{teachers.state}</p>
                </div>
                <div className="input-row-TeacherPersonal">
                    <label>City:</label>
                    <p>{teachers.city}</p>
                </div>
                <div className="input-row-TeacherPersonal">
                    <label>Pin Code:</label>
                    <p>{teachers.pinCode}</p>
                </div>
                <div className="input-row-TeacherPersonal">
                    <label>Subjects:</label>
                    <p>{teachers.selectedSubject}</p>
                </div>
            </div>
        </form>
    </div>
);
}

export default TeacherPersonal;
