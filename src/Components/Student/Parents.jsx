import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSidebar from '../Sidebar/StudentSidebar';
import './Parents.css';
import config from '../Login/config';
import { Redirect } from 'react-router-dom';

const Parents = () => {
  const [parents, setParents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  useEffect(() => {
    const checkRole = () => {
      const userRoleString = localStorage.getItem('loggedInRole');
      if (userRoleString) {
        const userRole = JSON.parse(userRoleString);
        console.log('loggedInRole for Parent Details', userRole.Role);
        if (userRole.Role !== 'student') {
          setRedirectToNotFound(true);
        }
      } else {
        console.error('loggedInRole not found in localStorage');
        setRedirectToNotFound(true);
      }
    };

    const fetchFamilyDetails = async () => {
      try {
        const studentId = JSON.parse(localStorage.getItem('loggedInUserId'));
        if (!studentId) {
          throw new Error('Student ID not found in local storage');
        }

        const response = await axios.get(`${config.ApiUrl}Family/GetFamilyByStudentId/${studentId}`);
        setParents(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching family details:", err);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
    if (!redirectToNotFound) {
      fetchFamilyDetails();
    }
  }, [redirectToNotFound]);

  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StudentSidebar>
      <div id='studentfamilyinfo'>
        <h2 id='studentfamilyh2'>Parents Details</h2>
        <div id='cards-container'>
          {parents.map((parent, index) => (
            <div key={index} id='parent-card'>
              <div>
               
               <strong id='familyrelation'> {parent.relation} </strong>
              </div>
              <div id='details1'>
                <strong id='strong-student'>Name: </strong>
                {parent.name}
              </div>
              <div id='details'>
                <strong id='strong-student'>Email:    </strong>
                {parent.email}
              </div>
              <div id='details'>
                <strong id='strong-student'>Occupation:   </strong>
                {parent.occupation}
              </div>
              <div id='details'>
                <strong id='strong-student'>Mobile Number:   </strong>
                {parent.mobileNumber}
              </div>
              <div id='details'>
                <strong id='strong-student'>Gender:   </strong>
                {parent.gender}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentSidebar>
  );
}

export default Parents;
