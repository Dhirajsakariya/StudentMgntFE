import React, { useEffect, useState } from 'react';
import './IDcardadmin.css';
import config from '../Login/config';
import { Redirect } from 'react-router-dom';
import QRCode from 'react-qr-code';
import AdminSidebar from '../Sidebar/AdminSidebar';

const IDcardadmin = () => {


  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [Admin, setAdmin] = useState(null);



  const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      console.log('loggedInRole for Admin Personal', userRole.Role);
      if (userRole.Role !== 'admin') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

        if (!storedId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await fetch(`${config.ApiUrl}AdminTeacher/GetAdminTeacher/${storedId}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching Admin details: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        setAdmin(responseData);
      } catch (fetchError) {
        setError(fetchError.message);
      }
    };

    fetchAdminDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Admin) {
    return <div>Loading...</div>;
  }
  // if (role !== 'admin') {
  //   return <Redirect to="/PageNotFound" />;
  // }

  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />; 
  }


//   const qrCodeValue = `Roll No: ${Student.rollNo},  Name: ${Student.name}, Number: ${Student.mobileNumber}, Gender: ${Student.gender}, Paid Fees: ${totalPaidAmount}, Pending Fees: ${pendingAmount}`;
const qrCodeValue = 
`\n Name: ${Admin.name} 
 \n Email: ${Admin.email}
 \n Birthdate: ${Admin.birthDate.split("-").reverse().join("-")}
 \n Join Date: ${Admin.joinDate.split("-").reverse().join("-")}
 \n Mobile Number ${Admin.mobileNumber}
 \n Gender: ${Admin.gender}
 \n Address: ${Admin.address}
 \n City: ${Admin.city} 
 \n District: ${Admin.district}
 \n State ${Admin.state} 
 \n Pincode: ${Admin.pinCode}`;


  return (
    <>
    <AdminSidebar>
    <div className="id-card">

      <div className="id-card-header">
       <h2 className='idcard-school'>{Admin.name}</h2> 
      </div>


        {/* <div className="id-card-name">
        <strong> </strong>

        </div>  */}

        <div className="id-card-Role">
        <strong>  Admin </strong>

        </div> 

      <div className="id-card-body">
        <QRCode  value={qrCodeValue} className='qrcode' />
      </div> 

    </div>
    </AdminSidebar>
        </>
  );
};

export default IDcardadmin;


