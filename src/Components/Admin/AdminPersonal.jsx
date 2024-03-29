import React, { useState, useEffect } from 'react';
import './AdminPersonal.css';
import AdminSidebar from '../Sidebar/AdminSidebar';



const AdminPersonal = () => {
  const [Admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

        if (!storedId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await fetch(`https://localhost:7157/api/AdminTeacher/GetAdminTeacher${storedId}`);
        
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

  return (
    <AdminSidebar>
    <div className='Admin-personal-info'>
      <h2 className='Admin-personal-info-h2'>Admin Details</h2>
      <div className='strong-Admin-personal-info'>
       <label> <strong className='strong-Admin'>Name: </strong> {Admin.name}</label><br />
       <label> <strong>Email: </strong> {Admin.email} </label> <br />
        {/* <label> <strong>Birthdate: </strong> {Admin.birthdate} <br /> </label> */}
        <label> <strong className='strong-Admin'>Mobile Number: </strong> {Admin.mobileNumber} </label> <br />
        <label> <strong className='strong-Admin'>Gender: </strong> {Admin.gender} </label> <br />
        <label> <strong className='strong-Admin'>Address: </strong> {Admin.address} </label> <br />
        <label><strong className='strong-Admin'>City: </strong> {Admin.city} </label> <br />
        <label> <strong className='strong-Admin'>District: </strong> {Admin.district} </label> <br />
        <label> <strong className='strong-Admin'>State: </strong> {Admin.state} </label> <br />
        <label> <strong className='strong-Admin'>Pin Code: </strong> {Admin.pinCode} </label> <br />

      </div>
    </div>
    </AdminSidebar>
  );
};

export default AdminPersonal;
