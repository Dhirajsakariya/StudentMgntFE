import React, { useState } from 'react';
import './FeeForm.css';
import { FaRupeeSign } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import Sidebar from '../Sidebar/Sidebar';

const FeeForm = () => {
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
    <Sidebar>
      <div className='containerfee'>
       <form onSubmit={handleSubmit}>
        <h2>Student Fee Form</h2>
          <div className='form-groupa'>
            <label htmlFor="studentName">Student Name:</label>
              <input
                      type="text"
                      id="studentName"
                      placeholder='Student Name'
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
              />
              <PiStudentBold  className="feeformicon"/>
              <br />
          </div>
          <div className="form-groupf">
            <label>Fee Frequency:</label>
              <select
                      value={feeFrequency}
                      className='relation'
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
         <label htmlFor="feesAmount">Fees Amount:</label>
           <input
                  type="text"
                  id="feeAmount"
                  value={feeAmount}
                  placeholder='Fee Amount'
                  onChange={(e) => setFeeAmount(e.target.value)}
                   required
          />
          <FaRupeeSign className='feeformicon'/>
          <br />
        </div>
        <button type="submit">Confirm Payment</button>
       </form>
      </div>
    </Sidebar>
  );
};

export default FeeForm;