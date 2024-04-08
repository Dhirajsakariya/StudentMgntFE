import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSidebar from '../Sidebar/StudentSidebar';
import './StudentFeeForm.css';
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
          throw new Error('User ID not found in local storage');
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
      <div className='student-personal-info'>
        <h2 className='student-personal-info-h2'>Parents Details</h2>
        <div className='strong-student-personal-info'>
          {parents.map((parent, index) => (
            <div key={index}>
              <label>
                <strong className='strong-student'>Relation:</strong>
                {parent.relation}
              </label><br />
              <label>
                <strong className='strong-student'>Name:</strong>
                {parent.name}
              </label><br />
              <label>
                <strong className='strong-student'>Email:</strong>
                {parent.email}
              </label> <br />
              <label>
                <strong className='strong-student'>Occupation:</strong>
                {parent.occupation}
              </label><br />
              <label>
                <strong className='strong-student'>Mobile Number:</strong>
                {parent.mobileNumber}
              </label> <br />
              <label>
                <strong className='strong-student'>Gender:</strong>
                {parent.gender}
              </label> <br />
            </div>
          ))}
        </div>
      </div>
    </StudentSidebar>
  );
}

export default Parents;
