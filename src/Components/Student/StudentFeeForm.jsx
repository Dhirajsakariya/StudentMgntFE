import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from "react-icons/fa";
import StudentSidebar from '../Sidebar/StudentSidebar';
import './StudentFeeForm.css';
import { toast, Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';

const StudentFeeForm = () => {
  const [feeAmount, setFeeAmount] = useState('');
  const [feeFrequency, setFeeFrequency] = useState('');
  const feeFrequencies = ["Quarterly", "Annually", "Semi-Annually"];
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  // useEffect(() => {
    
  //   setRole('student');
  // }, []);
  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      console.log('loggedInRole for Student Fee Form', userRole.Role);
      if (userRole.Role !== 'student') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);


  const handleFrequencyChange = async (e) => {
    const selectedFrequency = e.target.value;

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

  const studentObject = JSON.parse(localStorage.getItem('loggedInUserId'));
  const fullId = studentObject;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fees have already been paid
    const paidResponse = await axios.get(`https://localhost:7157/api/Fees/CheckIfFeesPaid/${fullId}`);
    if (paidResponse.data) {
      toast.error("Fees already paid!");
      setFeeFrequency('');
      setFeeAmount('');
      return; 
      
      
    }

    toast.success("Payment Successfully!");

    try {
      const response = await axios.post(`https://localhost:7157/api/Fees/PostFees`, {
        StudentId: fullId,
        FeeFrequency: feeFrequency,
        Amount: feeAmount
      });

      console.log(response.data);
      setFeeFrequency('');
      setFeeAmount('');
    } catch (error) {
      console.error('Error submitting fee:', error);
    }
  };

  const customToastStyle = {
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
  };

  // if (role !== 'student') {
  //   return <Redirect to="/PageNotFound" />;
  // }
  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />; // Redirect if user role is not student
  }

  return (
    <StudentSidebar>
      <div id='containerstudentfeeform'>
        <form onSubmit={handleSubmit}>
          <br /><h2>Fee Form</h2><br />
          <div className="form-groupf">
            <label id="labelboxFee">Fee Frequency:</label>
            <select
              value={feeFrequency}
              id='relationn'
              required
              onChange={(e) => { setFeeFrequency(e.target.value); handleFrequencyChange(e); }}>
              <option value="" disabled hidden>Select Fee Frequency</option>
              {feeFrequencies.map((feeFrequency) => (
                <option key={feeFrequency} value={feeFrequency}>
                  {feeFrequency}
                </option>
              ))}
            </select>
          </div><br />
          <div className='form-groupa'>
            <label id="labelboxFee" htmlFor="feesAmount">Fees Amount:</label>
            <input
              type="text"
              id="input_feeAmount"
              value={feeAmount}
              placeholder='Fee2 Amount'
              readOnly // Ensure the input is read-only to display the fetched amount
              required
            />
            <FaRupeeSign id='feeformicon' />
            <br />
          </div>
          <button id="buttontypee" type="submit">Pay</button>
          <br /><br />
          <Toaster toastOptions={{ className: "custom-toast", style: customToastStyle, duration: 1900, }} position="top-center" reverseOrder={false} />
        </form>
      </div>
    </StudentSidebar>
  );
};

export default StudentFeeForm;
