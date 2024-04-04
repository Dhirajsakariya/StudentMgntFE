import React,{useState, useEffect} from 'react';
import './Student.css';
import StudentSidebar from '../Sidebar/StudentSidebar';
import { Redirect } from 'react-router-dom';


const Student = () => {

    const [studentDetails, setStudentDetails] = useState(null);
    const [redirectToNotFound, setRedirectToNotFound] = useState(false);
   
      //  useEffect(() => {
         
      //    setRole('student');
      //  }, []);
     
	  //  useEffect(() => {
    //   const userRole = localStorage.getItem('loggedInRole');
    //   if (userRole !== 'student') {
    //     setRedirectToNotFound(false);
    //   }
    //   })
    useEffect(() => {
      const userRoleString = localStorage.getItem('loggedInRole');
      if (userRoleString) {
        const userRole = JSON.parse(userRoleString);
        console.log('loggedInRole for Student', userRole.Role);
        if (userRole.Role !== 'student') {
          setRedirectToNotFound(true);
        }
      } else {
        console.error('loggedInRole not found in localStorage');
      }
    }, []);
    
    useEffect(() => {
        const storedStudentDetails = JSON.parse(localStorage.getItem('studentDetails'));
        setStudentDetails(storedStudentDetails);
      }, []); 
     
      // if (role !== 'student') {
      //   return <Redirect to="/PageNotFound" />;
      // }
      if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />; // Redirect if user role is not student
      }
    

  return (
    <StudentSidebar>
        <div className='containeru'>
        <h2>Student Details</h2>
            <form>
                <div className='form-groupu'>
                {studentDetails && (
                    <>
                        <label>Roll No:</label>
                        <p>{studentDetails.RollNo}</p>
                        <label>Name:</label>
                        <p>{studentDetails.Name}</p>
                        <label>Gender:</label>
                        <p>{studentDetails.Gender}</p>
                        <label>Date of BirthDate:</label>
                        <p>{studentDetails.birthdate.split("-").reverse().join("-")}</p>
                        <label>Mobile Number:</label>
                        <p>{studentDetails.MobileNumber}</p> 
                        <label>Join Date:</label>
                        <p>{studentDetails.JoinDate}</p>
                        <label>Blood Group:</label>
                        <p>{studentDetails.BloodGroup}</p>
                        <label>Address:</label>
                        <p>{studentDetails.Address}</p>
                        <label>City:</label>
                        <p>{studentDetails.City}</p>
                        <label>District:</label>
                        <p>{studentDetails.District}</p>
                        <label>State:</label>
                        <p>{studentDetails.state}</p>
                        <label>PinCode:</label>
                        <p>{studentDetails.PinCode}</p>
                    </>
                )}
                <button type='submit' className='next'> Next </button>
              </div>
            </form>
        </div>
    </StudentSidebar>
  )
}

export default Student;


  
