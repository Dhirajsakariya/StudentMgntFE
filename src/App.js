import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
import StudentPersonal from './Components/Student/StudentPersonal';
import Search_Teacher from './Components/Admin/Search_Teacher';
import Search_Student from './Components/Admin/Search_Student';
import PrivateRoute from './Components/Login/PrivateRoute';

function App() {


  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path='/Sidebar' component={Sidebar} />
          <Route path='/ForgotPassword' component={ForgotPassword} />
          <Route path='/Registration' component={Registration} />
          <PrivateRoute path='/StudentForm' component={StudentForm} />
          <PrivateRoute path='/TeacherForm' component={TeacherForm} />
          <PrivateRoute path='/Student_Form' component={Student_Form} />
          <PrivateRoute path='/TimeTable' component={TimeTable} />
          <PrivateRoute path='/Standard' component={Standard} />
          <PrivateRoute path='/Student' component={Student} />
          <PrivateRoute path='/ParentsPortal' component={ParentsPortal} />
          <PrivateRoute path='/FeeForm' component={FeeForm} />
          <PrivateRoute path='/StudentSidebar' component={StudentSidebar} />
          <PrivateRoute path='/TeacherSidebar' component={TeacherSidebar} />
          <PrivateRoute path='/AdminSidebar' component={AdminSidebar} />
          <PrivateRoute path='/StudentFeeForm' component={StudentFeeForm} />
          <PrivateRoute path='/TeacherPersonal' component={TeacherPersonal} />
          <PrivateRoute path='/AdminPersonal' component={AdminPersonal} />
          <PrivateRoute path='/StudentPersonal' component={StudentPersonal} />
          <PrivateRoute path='/Search_Teacher' component={Search_Teacher} />
          <PrivateRoute path='/Search_Student' component={Search_Student} />
          <Route path='/' component={Login} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
