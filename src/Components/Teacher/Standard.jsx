import React, { useEffect, useState } from 'react';
import '../Teacher/Standard.css';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import { Redirect } from 'react-router-dom';

const Standard = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState('');
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  // useEffect(() => {
    
  //   setRole('teacher');
  // }, []);

  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      console.log('loggedInRole for time table', userRole.Role);
      if (userRole.Role !== 'teacher') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.ApiUrl}Standard/GetStandards`);

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log(result);
        }
      } catch (error) {
        console.log("Failed to fetch standard data!");
      }
    };

    fetchData();
  }, []);

  // if (role !== 'teacher') {
  //   return <Redirect to="/PageNotFound" />;
  // }

  
  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />; // Redirect if user role is not teacher
  }

  return (
    <TeacherSidebar>
    <div>
      <div id='standard'>
        <h1 id='stdheader'>Standard List</h1>
        <div>
          <table id='tables'>
            <thead> 
              <tr>
                <th id='stdth'>Standard</th>
                <th id='stdth'>Section</th> 
              </tr>
            </thead>
            <tbody> 
              {data.map((item, index) => (
                <tr key={index}>
                  <td id='stdtd'>{item.standardNumber}</td>
                  <td id='stdtd'>{item.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </TeacherSidebar>
  );
};

export default Standard;
