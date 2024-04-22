import React, { useState, useEffect} from 'react';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { toast } from 'react-hot-toast';
import './StudentReport.css'

function StarRating({ value, onChange }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  
  return (
    <div className='starstudentreports'>
      {stars.map((star) => (
        <span 
          key={star}
          style={{ cursor: 'pointer' }}
          onClick={() => onChange(star)}
        >
          {star <= value ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

function StudentReport() {
  const [ratings, setRatings] = useState({
    math: 0,
    science: 0,
    readWrite: 0,
    socialStudy: 0,
    special: 0,
    other: 0
  });
  const [currentUserRole,setCurrentUserRole]=useState('');
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      setCurrentUserRole(userRole.Role)
      console.log('loggedInRole for Student Form', userRole.Role);
      if (userRole.Role !== 'teacher' && userRole.Role !== 'admin') {
      setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);  

  const handleRatingChange = (subject, rating) => {
    setRatings({ ...ratings, [subject]: rating });
  };
  const handlesubmitrating = () =>{
   
    let missingSubject = 'null';
    Object.entries(ratings).forEach(([subject, rating]) => {
      if (rating === 0) {
        missingSubject = subject;
      }
    });

    if (missingSubject) {
      toast.error(`Please fill the rating for ${missingSubject} before submission`);
      return;
    }

    console.log('Submitted ratings:', ratings);
  };
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };


  return (
    <div className={darkTheme ? 'dark-theme' : 'light-theme'}>
    
    { currentUserRole =='admin' ?
    <AdminSidebar>
    <>
    <button onClick={toggleTheme} className='d-k-button'>
            {darkTheme ? 'Light' : 'Dark'}
          </button>

      <div className='studentprojectreport'>
        <form>
          <div className='header-student-report'>
          <h1>Monthly Progress Reports</h1><br/>
          <h2 style={{marginLeft:'-132px'}}>Student Name:<p style={{color:'black', fontSize:'24px', marginTop:'-28px', marginLeft:'300px'}}>Shraddha</p></h2>
          <h2>April 2024</h2>
          </div>
          <div className='projectreport'>
            <table id='tab_main'>
              <thead id='table_column'>
                <tr id='tr_heading'>
                  <th id='th_field'>Topic</th>
                  <th id='th_field'>Academic</th>
                  <th id='th_field'>Behaviors</th>
                </tr>
              </thead>
              <tbody id='starting_body'>
                <tr>
                  <th id='th_tag'>Math</th>
                  <td id='td_tag'><StarRating value={ratings.math} onChange={(rating) => handleRatingChange('math', rating)} name = 'math'/></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorMath} onChange={(rating) => handleRatingChange('behaviorMath', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Science</th>
                  <td id='td_tag'><StarRating value={ratings.science} onChange={(rating) => handleRatingChange('science', rating)} /></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorScience} onChange={(rating) => handleRatingChange('behaviorScience', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Read & Write</th>
                  <td id='td_tag'><StarRating value={ratings.readWrite} onChange={(rating) => handleRatingChange('readWrite', rating)} /></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorReadWrite} onChange={(rating) => handleRatingChange('behaviorReadWrite', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Social Study</th>
                  <td id='td_tag'><StarRating value={ratings.socialStudy} onChange={(rating) => handleRatingChange('socialStudy', rating)} /></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorSocialStudy} onChange={(rating) => handleRatingChange('behaviorSocialStudy', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Special</th>
                  <td id='td_tag'><StarRating value={ratings.special} onChange={(rating) => handleRatingChange('special', rating)} /></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorSpecial} onChange={(rating) => handleRatingChange('behaviorSpecial', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Other</th>
                  <td id='td_tag'> N/A </td>
                  <td id='td_tag'><StarRating value={ratings.behaviorOther} onChange={(rating) => handleRatingChange('behaviorOther', rating)} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={()=>handlesubmitrating} className='studentreportsbutton'>Submit Records</button>
        </form>
      </div>
    </>
    </AdminSidebar>
    :
    <TeacherSidebar>
      <>
      <div className='studentprojectreport'>
        <form>
          <div className='header-student-report'>
          <h1>Monthly Progress Reports</h1><br/>
          <h2 style={{marginLeft:'-132px'}}>Student Name:<p style={{color:'black', fontSize:'24px', marginTop:'-28px', marginLeft:'300px'}}>Shraddha</p></h2>
          <h2>April 2024</h2>
          </div>
          <div className='projectreport'>
            <table id='tab_main'>
              <thead id='table_column'>
                <tr id='tr_heading'>
                  <th id='th_field'>Topic</th>
                  <th id='th_field'>Academic</th>
                  <th id='th_field'>Behaviors</th>
                </tr>
              </thead>
              <tbody id='starting_body'>
                <tr>
                  <th id='th_tag'>Math</th>
                  <td id='td_tag'><StarRating value={ratings.math} onChange={(rating) => handleRatingChange('math', rating)} name = 'math'/></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorMath} onChange={(rating) => handleRatingChange('behaviorMath', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Science</th>
                  <td id='td_tag'><StarRating value={ratings.science} onChange={(rating) => handleRatingChange('science', rating)} /></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorScience} onChange={(rating) => handleRatingChange('behaviorScience', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Read & Write</th>
                  <td id='td_tag'><StarRating value={ratings.readWrite} onChange={(rating) => handleRatingChange('readWrite', rating)} /></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorReadWrite} onChange={(rating) => handleRatingChange('behaviorReadWrite', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Social Study</th>
                  <td id='td_tag'><StarRating value={ratings.socialStudy} onChange={(rating) => handleRatingChange('socialStudy', rating)} /></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorSocialStudy} onChange={(rating) => handleRatingChange('behaviorSocialStudy', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Special</th>
                  <td id='td_tag'><StarRating value={ratings.special} onChange={(rating) => handleRatingChange('special', rating)} /></td>
                  <td id='td_tag'><StarRating value={ratings.behaviorSpecial} onChange={(rating) => handleRatingChange('behaviorSpecial', rating)} /></td>
                </tr>
                <tr>
                  <th id='th_tag'>Other</th>
                  <td id='td_tag'> N/A </td>
                  <td id='td_tag'><StarRating value={ratings.behaviorOther} onChange={(rating) => handleRatingChange('behaviorOther', rating)} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={()=>handlesubmitrating} className='studentreportsbutton'>Submit Records</button>
        </form>
      </div>
      </>
    </TeacherSidebar>
    }
    </div>
  );
}

export default StudentReport;
