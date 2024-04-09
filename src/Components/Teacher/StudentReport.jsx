

import React, { useState } from 'react';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
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

  return (
    <>
      <TeacherSidebar>
        <div className='studentprojectreport'>
          <form>
            <div className='header-student-report'>
            <h2>Monthly Progress Reports</h2>
            <h2>Student Name:</h2>
            <h2>April 2024</h2>
            </div>
            <div className='projectreport'>
              <table>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Academic</th>
                    <th>Behaviors</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Math</th>
                    <td><StarRating value={ratings.math} onChange={(rating) => handleRatingChange('math', rating)} name = 'math'/></td>
                    <td><StarRating value={ratings.behaviorMath} onChange={(rating) => handleRatingChange('behaviorMath', rating)} /></td>
                  </tr>
                  <tr>
                    <th>Science</th>
                    <td><StarRating value={ratings.science} onChange={(rating) => handleRatingChange('science', rating)} /></td>
                    <td><StarRating value={ratings.behaviorScience} onChange={(rating) => handleRatingChange('behaviorScience', rating)} /></td>
                  </tr>
                  <tr>
                    <th>Read & Write</th>
                    <td><StarRating value={ratings.readWrite} onChange={(rating) => handleRatingChange('readWrite', rating)} /></td>
                    <td><StarRating value={ratings.behaviorReadWrite} onChange={(rating) => handleRatingChange('behaviorReadWrite', rating)} /></td>
                  </tr>
                  <tr>
                    <th>Social Study</th>
                    <td><StarRating value={ratings.socialStudy} onChange={(rating) => handleRatingChange('socialStudy', rating)} /></td>
                    <td><StarRating value={ratings.behaviorSocialStudy} onChange={(rating) => handleRatingChange('behaviorSocialStudy', rating)} /></td>
                  </tr>
                  <tr>
                    <th>Special</th>
                    <td><StarRating value={ratings.special} onChange={(rating) => handleRatingChange('special', rating)} /></td>
                    <td><StarRating value={ratings.behaviorSpecial} onChange={(rating) => handleRatingChange('behaviorSpecial', rating)} /></td>
                  </tr>
                  <tr>
                    <th>Other</th>
                    <td> N/A </td>
                    {/* <td><StarRating value={ratings.other} onChange={(rating) => handleRatingChange('other', rating)} /></td> */}
                    <td><StarRating value={ratings.behaviorOther} onChange={(rating) => handleRatingChange('behaviorOther', rating)} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button onClick={()=>handlesubmitrating} className='studentreportsbutton'>submit recods</button>
          </form>
        </div>
      </TeacherSidebar>
    </>
  );
}

export default StudentReport;
