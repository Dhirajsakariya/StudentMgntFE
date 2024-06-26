import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import AdminPersonal from './Components/Admin/AdminPersonal';
import ParentsPortal from './Components/Admin/ParentsPortal';
import Search_Student from './Components/Admin/Search_Student';
import Search_Teacher from './Components/Admin/Search_Teacher';
import StudentForm from './Components/Admin/StudentForm';
import StudentMarks from './Components/Admin/StudentMarks';
import TeacherForm from './Components/Admin/TeacherForm';
import ForgotPassword from './Components/Login/ForgotPassword';
import Login from './Components/Login/Login';
import Logout from './Components/Login/Logout';
import PageNotFound from './Components/Login/PageNotFound';
import PrivateRoute from './Components/Login/PrivateRoute';
import Registration from './Components/Login/Registration';
import AdminSidebar from './Components/Sidebar/AdminSidebar';
import Sidebar from './Components/Sidebar/Sidebar';
import StudentSidebar from './Components/Sidebar/StudentSidebar';
import TeacherSidebar from './Components/Sidebar/TeacherSidebar';
import StudentFeeForm from './Components/Student/StudentFeeForm';
import TimeTableViewer from './Components/Student/TimeTableViewer';
import StudentPersonal from './Components/Student/StudentPersonal';
import AddExamSchedule from './Components/Teacher/AddExamSchedule';
import Standard from './Components/Teacher/Standard';
import TeacherPersonal from './Components/Teacher/TeacherPersonal';
import TimeTable from './Components/Teacher/TimeTable';
import Navigationbar from './Components/Dashboard/Navigationbar';
import Parents from './Components/Student/Parents';
import StudentReport from './Components/Teacher/StudentReport';
import Home from './Components/Dashboard/Home';
import Footer from './Components/Dashboard/Footer';
import Exam_Schedule from './Components/Student/Exam_Schedule';
import FeesCalculators from './Components/Admin/FeesCalculators';
import IDCard from './Components/Student/IDCard';
import IDcardadmin from './Components/Admin/IDcardadmin';
import IDcardteacher from './Components/Teacher/IDcardteacher';

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path='/Sidebar' component={Sidebar} />
          <Route path='/ForgotPassword' component={ForgotPassword} />
          <Route path='/PageNotFound' component={PageNotFound} />
          <Route path='/Logout' component={Logout} />
          <Route path='/Registration' component={Registration} />
          <Route path='/Login' component={Login} />
          <Route path='/Navigationbar' component={Navigationbar} />
          <Route path='/Footer' component={Footer} />
          <PrivateRoute path='/StudentForm' component={StudentForm} />
          <PrivateRoute path='/TeacherForm' component={TeacherForm} />
          <PrivateRoute path='/TimeTable' component={TimeTable} />
          <PrivateRoute path='/Exam_Schedule' component={Exam_Schedule} />
          <PrivateRoute path='/Standard' component={Standard} />
          <PrivateRoute path='/ParentsPortal' component={ParentsPortal} />
          <PrivateRoute path='/StudentSidebar' component={StudentSidebar} />
          <PrivateRoute path='/TeacherSidebar' component={TeacherSidebar} />
          <PrivateRoute path='/AdminSidebar' component={AdminSidebar} />
          <PrivateRoute path='/StudentFeeForm' component={StudentFeeForm} />
          <PrivateRoute path='/TimeTableViewer' component={TimeTableViewer} />
          <PrivateRoute path='/TeacherPersonal' component={TeacherPersonal} />
          <PrivateRoute path='/AdminPersonal' component={AdminPersonal} />
          <PrivateRoute path='/StudentPersonal' component={StudentPersonal} />
          <PrivateRoute path='/Search_Teacher' component={Search_Teacher} />
          <PrivateRoute path='/Search_Student' component={Search_Student} />
          <PrivateRoute path='/StudentMarks' component={StudentMarks} />
          <PrivateRoute path='/AddExamSchedule' component={AddExamSchedule} />
          <PrivateRoute path='/StudentReport' component={StudentReport} />
          <PrivateRoute path='/FeesCalculators' component={FeesCalculators} />
          <PrivateRoute path='/Parents' component={Parents} />
          <PrivateRoute path='/IDCard' component={IDCard} />
          <PrivateRoute path='/IDcardadmin' component={IDcardadmin} />
          <PrivateRoute path='/IDcardteacher' component={IDcardteacher} />
          {/*<Redirect to="/Login" /> */}
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
