
import React, { useState, useEffect } from 'react';
import './StudentPersonal.css';
import config from '../Login/config';
import StudentSidebar from '../Sidebar/StudentSidebar'
import { Redirect } from 'react-router-dom';


const StudentPersonal = () => {
  const [Student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  // useEffect(() => {
    
  //   setRole('student');
  // }, []);
  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      console.log('loggedInRole for Student Personal', userRole.Role);
      if (userRole.Role !== 'student') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchstudentDetails = async () => {
      try {
        const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

        if (!storedId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await fetch(`${config.ApiUrl}Student/GetStudent/${storedId}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching Student details: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        setStudent(responseData);
      } catch (fetchError) {
        setError(fetchError.message);
      }
    };

    fetchstudentDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Student) {
    return <div>Loading...</div>;
  }

  
  // if (role !== 'student') {
  //   return <Redirect to="/PageNotFound" />;
  // }
  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />; // Redirect if user role is not student
  }


  return (
    <StudentSidebar>
    <div id='student-personal-info'>
      <h2 className='student-personal-info-h2'>Student Details</h2>
      <div className='strong-student-personal-info'>
      
      <label> 
      <strong className='strong-student'>Roll no: </strong> 
      {Student.rollNo}
      </label><br />
      
       <label> 
       <strong className='strong-student'> Name: </strong>
        {Student.name}
        </label><br />
       
       <label> 
       <strong className='strong-student'> Email: </strong>
       {Student.email} 
       </label> <br />

        <label >
         <strong className='strong-student'>Birthdate: </strong>
         {Student.birthDate.split("-").reverse().join("-")} 
         <br /> </label> 
        
        <label> 
        <strong className='strong-student'>Mobile Number: </strong>
        {Student.mobileNumber} 
        </label> <br />

        <label> 
        <strong className='strong-student'>Gender: </strong>
        {Student.gender} 
        </label> <br />

        <label>
          <strong className='strong-student'>Join Date:</strong>
          {Student.joinDate.split("-").reverse().join("-")} 
        </label><br />

        <label className="label-student">
        <strong className='strong-student'>bloodGroup: </strong>
        {Student.bloodGroup} 
        </label> <br />

        <label>
        <strong className='strong-student'>Address: </strong> 
        {Student.address} 
        </label> <br />

        <label>
        <strong className='strong-student'> City: </strong>
        {Student.city} 
        </label> <br />

        <label> 
        <strong className='strong-student'> District: </strong> 
        {Student.district}
        </label> <br />

        <label> 
        <strong className='strong-student'> State: </strong> 
        {Student.state} 
        </label> <br />

        <label>
        <strong className='strong-student'> Pin Code: </strong> 
        {Student.pinCode} </label> <br />

      </div>
    </div>
    </StudentSidebar>
  );
};

export default StudentPersonal;
