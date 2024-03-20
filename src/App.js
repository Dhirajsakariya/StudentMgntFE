//import React,{useState,useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Registration from './Components/Login/Registration'; 
import ForgotPassword from './Components/Login/ForgotPassword';
import Sidebar from './Components/Sidebar/Sidebar';
import DisplayCategory from './Components/Pages/DisplayCategory';
import JsonData from './Components/Pages/JsonData';
import Userdetail from './Components/Pages/Userdetail';
import UpdateUserdetail from './Components/Pages/UpdateUserdetail';
import Familydetail from './Components/Pages/Familydetail';
import StudentForm from './Components/Admin/StudentForm';
import TeacherForm from './Components/Admin/TeacherForm';
import { Student_Form } from './Components/Teacher/Student_Form';

function App() {
 
  
  return (

    <div>
      <Router>
        <Switch>
          <Route path='/Familydetail' component={Familydetail}/>
          <Route path='/UpdateUserdetail' component={UpdateUserdetail}/>
          <Route path='/Userdetail' component={Userdetail}/>
          <Route path='/Sidebar' component={Sidebar}/>
          <Route path='/DisplayCategory' component={DisplayCategory}/>
          <Route path='/JsonData' component={JsonData}/>
          <Route path='/ForgotPassword' component={ForgotPassword}/>
          <Route path='/Registration' component={Registration}/>
          <Route path='/StudentForm' component={StudentForm}/>
          <Route path='/TeacherForm' component ={TeacherForm}/>
          <Route path='/Student_Form' component ={Student_Form}/>
          <Route path='/' component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
