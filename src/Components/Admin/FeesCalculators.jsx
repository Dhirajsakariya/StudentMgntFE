import React, { useEffect, useState } from 'react';
import config from '../Login/config';
import axios from 'axios';
import Popup from 'reactjs-popup';
import './FeesCalculators.css'

import { Toaster, toast } from 'react-hot-toast';

const FeesCalculators = () => {
  const [selectedFrequency, setselectedFrequency] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeFrequency, setFeeFrequency] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail,setStudentEmail] = useState('');
  const [studentStandard,setStudentStandard] = useState('');
  const [paidFees, setPaidFees] = useState('');
  const [pendingFees, setPendingFees] = useState('');
  const feeFrequencies = ["Quarterly", "Annually", "Semi-Annually"];
  const [showModal, setShowModal] = useState(false); 

  const fullId = localStorage.getItem('selectedStudentId');

  const handleFrequencyChange = async (e) => {
    const selectedFrequency = e.target.value;
    setselectedFrequency(selectedFrequency);

try {
    const response = await fetch(`${config.ApiUrl}Fees/GetFeeAmount/${fullId}?frequency=${selectedFrequency}`, {
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
} catch (error) {
    console.error('Error fetching fee amount:', error);
  }
  };

  const customToastStyle = {
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
  };


  const handleView = () => {

    fetchStudentFeesDetails(true);
    //setShowModal(true);
  };
  const fetchStudentFeesDetails = async (showFeesView) => {
    try {
      const response = await fetch(`${config.ApiUrl}Fees/GetStudentFeesDetails/${fullId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student fees details');
      }
      const feesData = await response.json();
      console.log('feesData ', feesData, feesData.paidFees);
      setPaidFees(feesData.paidFees);
      setPendingFees(feesData.pendingFees);
      if(showFeesView){
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching student fees details:', error);
    }
  };

  
  useEffect(() => {

  const fetchStudentName =async () => {
    try{
      const response =  await fetch(`${config.ApiUrl}Student/GetStudent/${fullId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student details');
      }
      const studentData = await response.json();
      setStudentName(studentData.name);
      setStudentEmail(studentData.email);
      setStudentStandard(studentData.standard);
   

    } catch (error) {
      console.error('Error fetching student name:', error);
    }
  };
  fetchStudentName();
 }, [fullId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.ApiUrl}Fees/PostFees`, {
        StudentId: fullId,
        FeeFrequency: selectedFrequency,
        Amount: feeAmount
      });
      console.log(response.data);
      setFeeFrequency('');
      setFeeAmount('');
      const userERes = response.data;
      

     if (userERes.remainingAmount > 0) {
        // Display toast message with remaining amount and updated frequencies
        toast.success(`Payment Successfully! Your remaining fee is ${userERes.remainingAmount}. You can pay in the following frequencies: ${userERes.updatedFrequencies.join(', ')}`);
        
      } 
      
      else if(userERes.remainingAmount==0)
      {
        toast.success('payment sucessful');
      }
      else {
        toast.error("Fees already paid.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data === 'Please select appropriate frequencies based on your remaining amount.') {
          toast.error('Please select appropriate frequencies based on your remaining amount.');
          setFeeFrequency('');
          setFeeAmount('');
        } else {
          toast.error( error.response.data); // Show the error message from the backend
          setFeeFrequency('');
          setFeeAmount('');
        }
      } else {
        console.error('Error:', error);
        toast.error('Error processing payment.');
      }
    }
    
  };

  return (
    <div className='form-admin-fess'>
      <form className='fees-form-admin'> 
        <h2 >Fees Form {studentName}</h2>
        
        <label>Fee Frequency:</label>   
        <select
         className='select-fees-admin'
          value={feeFrequency}
         
          required
          onChange={(e) => { setFeeFrequency(e.target.value); handleFrequencyChange(e); }}>
          <option value="" disabled hidden></option>
          {feeFrequencies.map((feeFrequency) => (
            <option key={feeFrequency} value={feeFrequency}>{feeFrequency}</option>
          ))}
        </select>

        <br />
        <label > fees payment </label>
        <input
        className='input-fees-admin'
          type="text"
          placeholder='feeAmount'
          readOnly
          value={feeAmount}
     
        />

        <br />
       
     
      <button className='submit-pay-admin' type="submit" onClick={handleSubmit} >Pay</button>
      <br />           <Toaster toastOptions={{ className: "custom-toast", style: customToastStyle, duration: 4500, }} position="top-center" reverseOrder={false} />

      <button onClick={handleView}className='submit-view-admin' >View</button>
      <Popup
        contentStyle={{ width: "400px" , height:'350px', borderRadius:'10px', background:'#f7f9fb' }}
        open={showModal}
        onClose={() => setShowModal(false)}
        closeOnDocumentClick={false} 
        closeOnEscape={false} 
      >
        <div className='fees-admin'>
          <h2 className='details-fees'> {studentName} </h2>
          Standard : {studentStandard} <br/>
          Email : {studentEmail} <br/>
          Paid fees : {paidFees} <br/>
          Pending Fees : {pendingFees} <br/>
          <button id="close-btn-fees" onClick={() => setShowModal(false)}> × </button>
        </div>
      </Popup>
      </form>
    </div>
  );
}

export default FeesCalculators;
