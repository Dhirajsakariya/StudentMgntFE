import React from 'react';
import { useHistory } from 'react-router-dom';
import AdminSidebar from '../Sidebar/AdminSidebar';
import StudentSidebar from '../Sidebar/StudentSidebar';
import TeacherSidebar from '../Sidebar/TeacherSidebar';

const Logout = () => {
    const navigate = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('loggedInRole');
    navigate.push('/');
};

  return (
    <div>
      <AdminSidebar handleLogout={handleLogout} />
      <StudentSidebar handleLogout={handleLogout}/>
      <TeacherSidebar handleLogout={handleLogout}/> 
    </div>
  );
};

export default Logout;
