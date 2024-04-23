import React, { useEffect, useState } from 'react';
import './IDCard.css';
import config from '../Login/config';
import { Redirect } from 'react-router-dom';
import QRCode from 'react-qr-code'; // Import QRCode component


const IDCard = () => {


  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const [Student, setStudent] = useState(null);
  const [error, setError] = useState(null);

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

  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />; 
  }

  const qrCodeValue = `Roll No: ${Student.rollNo}  Name: ${Student.name}, Number: ${Student.mobileNumber}, Gender: ${Student.gender}, `;


  return (

    <div className="id-card">

      <div className="id-card-header">
      <h2 className='idcard-school'>School</h2>
      </div>

        {/* <div className="id-card-body">
        <strong>Roll No:</strong> 
        {Student.rollNo}
      </div>
       
       
      
      <div className="id-card-body">
        <strong>Birthdate:</strong>  
        {Student.birthDate.split("-").reverse().join("-")} 
      </div>
      
      <div className="id-card-body">
        <strong>Mobile Number:</strong> 
        {Student.mobileNumber}
      </div>
      <div className="id-card-body">
        <strong>Gender:</strong> {Student.gender}
      </div>
    
      <div className="id-card-body">
        <strong>Join Date:</strong> 
        {Student.joinDate.split("-").reverse().join("-")}   
      </div> */}

        <div className="id-card-name">
        <strong> {Student.name}</strong>

        </div> 

        <div className="id-card-Role">
        <strong>  STUDENT </strong>

        </div> 

      <div className="id-card-body">
        <QRCode  value={qrCodeValue} className='qrcode' />
      </div> 

    </div>
  );
};

export default IDCard;