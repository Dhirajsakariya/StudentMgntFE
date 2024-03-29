import React, { useState } from 'react';
import './StudentFeeForm.css';
import { FaRupeeSign } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import StudentSidebar from '../Sidebar/StudentSidebar';
import axios from 'axios';


const StudentFeeForm = () => {
 
  const [feeAmount, setFeeAmount] = useState('');
  const [feeFrequency, setFeeFrequency] = useState('');
  
 
  const feeFrequencies = ["quarterly", "annually"];

  const handleFrequencyChange = async (e) => {
    const selectedFrequency = e.target.value;

  
    const studentObject = JSON.parse(localStorage.getItem('LoggedInUser'));
    const fullId = studentObject.id;

   

    // Fetch fee amount from backend based on selected frequency
    const response = await fetch(`https://localhost:7157/api/Fees/GetFeeAmount/${fullId}?frequency=${selectedFrequency}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      setFeeAmount(data);
    } else {
      console.error('fetching fee amount:', response.statusText);
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const studentObject = JSON.parse(localStorage.getItem('LoggedInUser'));
      const fullId = studentObject.id;
   
      
      const response = await axios.post(`https://localhost:7157/api/Fees/PostFees`,{
        StudentId:fullId,
        FeeFrequency:feeFrequency,
    Amount:feeAmount

    

      });
      console.log(response.data); 
      
      setFeeFrequency(''); 
      setFeeAmount(''); 
      
    } catch (error) {
      console.error('Error submitting fee:', error);
      
    }
  };


  return (
    <StudentSidebar>
      <div id='containerstudentfeeform'>
        <form onSubmit={handleSubmit}>
         <br></br> <h2>Fee Form</h2><br></br>
          
         
          
          <div className="form-groupf">
            <label id="labelboxFee">Fee Frequency:</label>
            <select
              value={feeFrequency}
              id='relation'
              required
              onChange={(e) => { setFeeFrequency(e.target.value); handleFrequencyChange(e); }}>
              <option value="">Select Fee Frequency</option>
              {feeFrequencies.map((feeFrequency) => (
                <option key={feeFrequency} value={feeFrequency}>
                  {feeFrequency}
                </option>
              ))}
            </select>
          </div>
          <div className='form-groupa'>
            <label id="labelboxFee" htmlFor="feesAmount">Fees Amount:</label>
            <input
              type="text"
              id="feeAmount"
              value={feeAmount}
              placeholder='Fee Amount'
              readOnly // Ensure the input is read-only to display the fetched amount
              required
            />
            <FaRupeeSign id='feeformicon' />
            <br />
          </div>
          <button id="buttontypee" type="submit" onSubmit={handleSubmit}>Pay</button>
        </form>
      </div>
    </StudentSidebar>
  );
};

export default StudentFeeForm;

