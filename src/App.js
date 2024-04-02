import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import AdminPersonal from './Components/Admin/AdminPersonal';
import FeeForm from './Components/Admin/FeeForm';
import ParentsPortal from './Components/Admin/ParentsPortal';
import Search_Student from './Components/Admin/Search_Student';
import Search_Teacher from './Components/Admin/Search_Teacher';
import StudentForm from './Components/Admin/StudentForm';
import StudentMarks from './Components/Admin/StudentMarks';
import TeacherForm from './Components/Admin/TeacherForm';
import ForgotPassword from './Components/Login/ForgotPassword';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/Login/PrivateRoute';
import Registration from './Components/Login/Registration';
import AdminSidebar from './Components/Sidebar/AdminSidebar';
import Sidebar from './Components/Sidebar/Sidebar';
import StudentSidebar from './Components/Sidebar/StudentSidebar';
import TeacherSidebar from './Components/Sidebar/TeacherSidebar';
import Student from './Components/Student/Student';
import StudentFeeForm from './Components/Student/StudentFeeForm';
import StudentPersonal from './Components/Student/StudentPersonal';
import Standard from './Components/Teacher/Standard';
import Student_Form from './Components/Teacher/Student_Form';
import TeacherPersonal from './Components/Teacher/TeacherPersonal';
import TimeTable from './Components/Teacher/TimeTable';

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
          <PrivateRoute path='/StudentMarks' component={StudentMarks} />
          <Route path='/' component={Login} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
