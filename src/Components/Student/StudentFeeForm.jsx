import React, { useState } from 'react';
import './StudentFeeForm.css';
import { FaRupeeSign } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import StudentSidebar from '../Sidebar/StudentSidebar';

const StudentFeeForm = () => {
  const [studentName, setStudentName] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeFrequency,setFeeFrequency] = useState('');

  const feeFrequencies=[ "Monthly", "Quaterly","Annually"];
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation and submission logic here
   

    console.log('Form submitted:', { studentName, feeAmount, feeFrequency });
  };

  return (
    <StudentSidebar>
      <div id='containerstudentfeeform'>
       <form onSubmit={handleSubmit}>
        <h2>Fee Form</h2>
          <div id='form-groupa'>
            <label id="labelbox" htmlFor="studentName">Student Name:</label>
              <input
                      type="text"
                      id="studentname"
                      placeholder='Student Name'
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
              />
              <PiStudentBold  id="feeformicon"/>
              <br />
          </div>
          <div className="form-groupf">
            <label id="labelbox">Fee Frequency:</label>
              <select
                      value={feeFrequency}
                      id='relation'
                      required
                      onChange={(e) => setFeeFrequency(e.target.value)}>
              
                     <option value="">Select Fee Frequency</option>
                        {feeFrequencies.map((feeFrequency) => (
                         <option key={feeFrequency} value={feeFrequency}>
                         {feeFrequency}
                      </option>
                     ))}
              </select>
          </div>
        <div className='form-groupa'>
         <label id="labelbox" htmlFor="feesAmount">Fees Amount:</label>
           <input
                  type="text"
                  id="feeAmount"
                  value={feeAmount}
                  placeholder='Fee Amount'
                  onChange={(e) => setFeeAmount(e.target.value)}
                   required
          />
          <FaRupeeSign id='feeformicon'/>
          <br />
        </div>
        <button id="buttontype" type="submit">Pay</button>
       </form>
      </div>
    </StudentSidebar>
  );
};

export default StudentFeeForm;