import React, { useEffect, useState } from 'react';
import './IDCard.css';
import config from '../Login/config';
import { Redirect } from 'react-router-dom';
import QRCode from 'react-qr-code';
import StudentSidebar from '../Sidebar/StudentSidebar';

const IDCard = () => {


  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const [Student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [totalPaidAmount, setTotalPaidAmount] = useState('');
  const [pendingAmount,setPendingAmount] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);


  const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));


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
    const fetchData = async () => {
      try {
        const fetchStudentDetails = async () => {
          try {
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
  
        const fetchFeesDetails = async () => {
          try {
            const response = await fetch(`${config.ApiUrl}Fees/GetStudentFeesDetails/${storedId}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const feesdata = await response.json();
            setTotalPaidAmount(feesdata.totalPaidAmount);
            setPendingAmount(feesdata.pendingAmount);
            console.log('Fees details:', feesdata);
            console.log('Payment completed successfully!');
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };
  
        const fetchUserPhoto = async () => {
          try {
            const photoResponse = await fetch(`${config.ApiUrl}Student/GetPhoto/${storedId}`);
            if (photoResponse.ok) {
              const photoBlob = await photoResponse.blob();
              setUserPhoto(URL.createObjectURL(photoBlob));
            } else {
              throw new Error('Failed to fetch user photo');
            }
          } catch (fetchError) {
            setError(fetchError.message);
          }
        };
  
        await Promise.all([fetchStudentDetails(), fetchFeesDetails(), fetchUserPhoto()]);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchData();
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

//   const qrCodeValue = `Roll No: ${Student.rollNo},  Name: ${Student.name}, Number: ${Student.mobileNumber}, Gender: ${Student.gender}, Paid Fees: ${totalPaidAmount}, Pending Fees: ${pendingAmount}`;
const qrCodeValue = `Roll No: ${Student.rollNo}\nName: ${Student.name}\nNumber: ${Student.mobileNumber}\nGender: ${Student.gender}\nPaid Fees: ${totalPaidAmount}\nPending Fees: ${pendingAmount}`;


  return (
    <>
    <StudentSidebar>
    <div className="id-card">

      <div className="id-card-header">
       <h2 className='idcard-school'>{Student.name}</h2> 
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

<div>
<img id="id-card-photo" src={userPhoto} alt="" />
</div>

        {/* <div className="id-card-name">
        <strong> </strong>

        </div>  */}

        <div className="id-card-Role">
        <strong>  STUDENT </strong>

        </div> 

      <div className="id-card-body">
        <QRCode  value={qrCodeValue} className='qrcode' />
      </div> 

    </div>
    </StudentSidebar>
        </>
  );
};

export default IDCard;