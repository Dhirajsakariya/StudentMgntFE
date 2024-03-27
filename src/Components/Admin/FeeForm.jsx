import React, { useState } from 'react';
import './FeeForm.css';
import { FaRupeeSign } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import AdminSidebar from '../Sidebar/AdminSidebar';

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
    <AdminSidebar>
      <div id='containerfee'>
       <form onSubmit={handleSubmit}>
        <h2>Student Fee Form</h2>
          <div id='form-groupa'>
            <label id="labelbox" htmlFor="studentName">Student Name:</label>
              <input
                      type="text"
                      id="studentName"
                      placeholder='Student Name'
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
              />
              <PiStudentBold  id="feeformicon"/>
              <br />
          </div>
          <div id="form-groupf">
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
        <div id='form-groupa'>
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
        <button id="button" type="submit">Confirm Payment</button>
       </form>
      </div>
    </AdminSidebar>
  );
};

export default FeeForm;