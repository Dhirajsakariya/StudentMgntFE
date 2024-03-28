import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Registration from './Components/Login/Registration';
import ForgotPassword from './Components/Login/ForgotPassword';
import Sidebar from './Components/Sidebar/Sidebar';
import StudentForm from './Components/Admin/StudentForm';
import TeacherForm from './Components/Admin/TeacherForm';
import Student_Form from './Components/Teacher/Student_Form';
import Standard from './Components/Teacher/Standard';
import TimeTable from './Components/Teacher/TimeTable';
import Student from './Components/Student/Student';
import FeeForm from './Components/Admin/FeeForm';
import StudentFeeForm from './Components/Student/StudentFeeForm';
import ParentsPortal from './Components/Admin/ParentsPortal';
import StudentSidebar from './Components/Sidebar/StudentSidebar';
import TeacherSidebar from './Components/Sidebar/TeacherSidebar';
import AdminSidebar from './Components/Sidebar/AdminSidebar';
import TeacherPersonal from './Components/Teacher/TeacherPersonal';
import AdminPersonal from './Components/Admin/AdminPersonal';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/Sidebar' component={Sidebar} />
          <Route path='/ForgotPassword' component={ForgotPassword} />
          <Route path='/Registration' component={Registration} />
          <Route path='/StudentForm' component={StudentForm} />
          <Route path='/TeacherForm' component={TeacherForm} />
          <Route path='/Student_Form' component={Student_Form} />
          <Route path='/TimeTable' component={TimeTable} />
          <Route path='/Standard' component={Standard} />
          <Route path='/Student' component={Student} />
          <Route path='/ParentsPortal' component={ParentsPortal} />
          <Route path='/FeeForm' component={FeeForm} />
          <Route path='/StudentSidebar' component={StudentSidebar} />
          <Route path='/TeacherSidebar' component={TeacherSidebar} />
          <Route path='/AdminSidebar' component={AdminSidebar} />
          <Route path='/StudentFeeForm' component={StudentFeeForm} />
          <Route path='/TeacherPersonal' component={TeacherPersonal} />
          <Route path='/AdminPersonal' component={AdminPersonal} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
