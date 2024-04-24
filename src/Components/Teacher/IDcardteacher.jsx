import React, { useEffect, useState } from 'react';
import './IDcardteacher.css';
import config from '../Login/config';
import { Redirect } from 'react-router-dom';
import QRCode from 'react-qr-code';
import TeacherSidebar from '../Sidebar/TeacherSidebar';

const IDcardteacher = () => {


  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [teacher, setTeacher] = useState(null);



  const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      console.log('loggedInRole for Teacher Personal', userRole.Role);
      if (userRole.Role !== 'teacher') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

        if (!storedId) {
          throw new Error('User ID not found in local storage');
        }

         const response = await fetch(`${config.ApiUrl}AdminTeacher/GetAdminTeacher/${storedId}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching teacher details: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        setTeacher(responseData);
      } catch (fetchError) {
        setError(fetchError.message);
      }
    };

    fetchTeacherDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teacher) {
    return <div>Loading...</div>;
  }

  

  // if (role !== 'teacher') {
  //   return <Redirect to="/PageNotFound" />;
  // }
  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />;
  }


 const qrCodeValue = 
`\n Name: ${teacher.name} 
 \n Email: ${teacher.email}
 \n Birthdate: ${teacher.birthDate.split("-").reverse().join("-")}
 \n Join Date: ${teacher.joinDate.split("-").reverse().join("-")}
 \n Mobile Number: ${teacher.mobileNumber}
 \n Gender: ${teacher.gender}
 \n Address: ${teacher.address}
 \n City: ${teacher.city} 
 \n District: ${teacher.district}
 \n State: ${teacher.state} 
 \n Pincode: ${teacher.pinCode}`;


  return (
    <>
    <TeacherSidebar>
    <div className="id-card">

      <div className="id-card-header">
       <h2 className='idcard-teacher'>{teacher.name}</h2> 
      </div>


        {/* <div className="id-card-name">
        <strong> </strong>

        </div>  */}

        <div className="id-card-Role">
        <strong>  Teacher </strong>

        </div> 

      <div className="id-card-body">
        <QRCode  value={qrCodeValue} className='qrcode' />
      </div> 

    </div>
    </TeacherSidebar>
        </>
  );
};

export default IDcardteacher;


