import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import StudentSidebar from '../Sidebar/StudentSidebar';
import './StudentFeeForm.css';
import config from '../Login/config';



const Parents = ({ studentId }) => {
  const [parents, setParents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFamilyDetails = async () => {
      try {
        const response = await axios.get(`${config.ApiUrl}/GetFamilyDetail/${studentId}`);
        setParents(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching family details:", err);
      }
    };

    if (studentId) {
      fetchFamilyDetails();
    }
  }, [studentId]); 

  return (
    <StudentSidebar>
    <div className='student-personal-info'>
      <h2 className='student-personal-info-h2'>Parents Details</h2>
      {error && <p className="error">{error}</p>}
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
