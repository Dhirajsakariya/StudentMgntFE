import React from 'react';
import AdminSidebar from './AdminSidebar';
import StudentSidebar from './StudentSidebar';
import TeacherSidebar from './TeacherSidebar';

const Sidebar = ({ role }) => {
    return (
        <div>
            
            {role === 'admin' && <AdminSidebar />}
            {role === 'student' && <StudentSidebar />}
            {role === 'teacher' && <TeacherSidebar />}
        </div>
    );
};

export default Sidebar;

