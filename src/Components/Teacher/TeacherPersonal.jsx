// import React, { useState, useEffect } from 'react';
// import './TeacherPersonal.css';

// const TeacherPersonal = () => {
//   const [teacher, setTeacher] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTeacherDetails = async () => {
//       try {
//         const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

//         if (!storedId) {
//           throw new Error('User ID not found in local storage');
//         }

//         const response = await fetch(`https://localhost:7157/api/AdminTeacher/GetAdminTeacher${storedId}`);
        
//         if (!response.ok) {
//           throw new Error(`Error fetching teacher details: ${response.status} ${response.statusText}`);
//         }

//         const responseData = await response.json();
//         setTeacher(responseData);
//       } catch (fetchError) {
//         setError(fetchError.message);
//       }
//     };

//     fetchTeacherDetails();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!teacher) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='teacher-personal-info'>
//       <h2 className='teacher-personal-info-h2'>Teacher Details</h2>
//       <div className='teacher-info'>
//         <p>Name: {teacher.Name}</p>
//         <p>Email: {teacher.Email}</p>
//       </div>
//     </div>
//   );
// };

// export default TeacherPersonal;
import React, { useState, useEffect } from 'react';
import './TeacherPersonal.css';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import { Redirect } from 'react-router-dom';

const TeacherPersonal = () => {
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState(null);
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  // useEffect(() => {
    
  //   setRole('teacher');
  // }, []);
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
  

  return (
    <TeacherSidebar>
    <div className='teacher-personal-info'>
      <h2 className='teacher-personal-info-h2'>Teacher Details</h2>
      <div className='strong-teacher-personal-info'>
      
      <label>
      <strong className='strong-teacher'> Name: </strong> 
      {teacher.name}
      </label><br />

       <label> 
       <strong className='strong-teacher'> Email: </strong> 
       {teacher.email} 
       </label> <br />

        <label>
        <strong className='strong-teacher'> Birthdate: </strong> 
        {teacher.birthDate} 
        <br /> </label>

        <label> 
        <strong className='strong-teacher'> Mobile Number: </strong> 
        {teacher.mobileNumber} 
        </label> <br />

        <label>
        <strong className='strong-teacher'>Join Date:</strong>
        {teacher.joinDate}
        </label><br />

        <label> 
        <strong className='strong-teacher'> Gender: </strong> 
        {teacher.gender} 
        </label> <br />

        <label> 
        <strong className='strong-teacher'> Address: </strong> 
        {teacher.address}
        </label> <br />

        <label>
        <strong className='strong-teacher'> City: </strong> 
        {teacher.city} 
        </label> <br />

        <label> 
        <strong className='strong-teacher'> District: </strong>
        {teacher.district} 
        </label> <br />

        <label> 
        <strong className='strong-teacher'> State: </strong> 
        {teacher.state} 
        </label> <br />

        <label>
        <strong className='strong-teacher'> Pin Code: </strong>
        {teacher.pinCode} </label> <br />

      </div>
    </div>
    </TeacherSidebar>
  );
};

export default TeacherPersonal;
