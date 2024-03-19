import React,{useState,useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Login/Login';
import Registration from './Components/Login/Registration'; 
import ForgotPassword from './Components/Login/ForgotPassword';
import Sidebar from './Components/Sidebar/Sidebar';
import DisplayCategory from './Components/Pages/DisplayCategory';
import JsonData from './Components/Pages/JsonData';
import Userdetail from './Components/Pages/Userdetail';
import UpdateUserdetail from './Components/Pages/UpdateUserdetail';
import Familydetail from './Components/Pages/Familydetail';
import Standard from './Components/Teacher/Standard';
import TimeTable from './Components/Teacher/TimeTable';
import SubjectForm from './Components/Teacher/SubjectForm';
import Student from './Components/Student/Student';
import FamilyForm from './Components/Admin/FamilyForm'
import FeeForm from './Components/Admin/FeeForm';
import StudentFeeForm from './Components/Student/StudentFeeForm';

function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/Familydetail' component={Familydetail}/>
          <Route path='/UpdateUserdetail' component={UpdateUserdetail}/>
          <Route path='/StudentFeeForm' component={StudentFeeForm}/>
          <Route path='/Userdetail' component={Userdetail}/>
          <Route path='/Sidebar' component={Sidebar}/>
          <Route path='/DisplayCategory' component={DisplayCategory}/>
          <Route path='/JsonData' component={JsonData}/>
          <Route path='/Student' component={Student}/>
          <Route path='/FamilyForm' component={FamilyForm}/>
          <Route path='/FeeForm' component={FeeForm}/>
          <Route path='/ForgotPassword' component={ForgotPassword}/>
          <Route path='/Registration' component={Registration}/>
          <Route path='/TimeTable' component={TimeTable}/>
          <Route path='/Standard' component={Standard}/>
          <Route path='/SubjectForm' component={SubjectForm}/>
          <Route path='/' component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
