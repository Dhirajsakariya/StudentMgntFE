import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaRupeeSign } from "react-icons/fa";
import StudentSidebar from '../Sidebar/StudentSidebar';
import Popup from 'reactjs-popup';
import './StudentFeeForm.css';
import config from '../Login/config';

const StudentFeeForm = () => {
  const [feeAmount, setFeeAmount] = useState('');
  const [feeFrequency, setFeeFrequency] = useState('');
  const feeFrequencies = ["Quarterly", "Annually", "Semi-Annually"];
  const [selectedFrequency,setselectedFrequency]=useState('');
  const [selectfeeFrequency , setSelectFeeFrequency] = useState('')
  const [message, setMessage] = useState('');
  const [studentName, setStudentName] = useState('');
  const [pendingAmount,setPendingAmount] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [paidFees, setPaidFees] = useState('');

  
  const handleFrequencyChange = async (e) => {
    const selectedFrequency = e.target.value;
    setselectedFrequency(selectedFrequency);


    // Fetch fee amount from backend based on selected frequency
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
            
  
      } catch (error) {
        console.error('Error fetching student name:', error);
      }
    };
    fetchStudentName();
   }, []);

  const handleView = () => {

    fetchStudentFeesDetails(true);
    setShowModal(true);
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
      // setPendingFees(feesData.pendingFees);
      if(showFeesView){
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching student fees details:', error);
    }
  };


  const studentObject = JSON.parse(localStorage.getItem('loggedInUserId'));
  const fullId = studentObject;

  const handleSubmit = async (e) => {
    e.preventDefault();


    
    if (!feeFrequency) {
      if(!selectfeeFrequency){
      toast.error('Please select a frequency.');
      }
      setSelectFeeFrequency(true)
      return; 
    }

    try {
      const response = await axios.post(`${config.ApiUrl}Fees/PostFees`, {
        StudentId: fullId,
        FeeFrequency: feeFrequency,
        Amount: feeAmount
        

      });

      console.log(response.data);
      setFeeFrequency('');
      setFeeAmount('');
      const userERes = response.data;
      setPendingAmount(userERes.remainingAmount);   

     if (userERes.remainingAmount > 0) {
        // Display toast message with remaining amount and updated frequencies
        toast.success(`Payment Successfully! Your remaining fee is ${userERes.remainingAmount}. You can pay in the following frequencies: ${userERes.updatedFrequencies.join(', ')}`);
        
      } 
      
      else if(userERes.remainingAmount==0)
      {
        toast.success("payment sucessful");
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

  const customToastStyle = {
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
  };

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
              placeholder='Fees Amount'
              readOnly // Ensure the input is read-only to display the fetched amount
              required
            />
            <FaRupeeSign id='feeformicon' />
            <br />
          </div>
          <button id="buttontypee" type="submit">Pay</button>
      
          <button onClick={handleView}id="buttontypeview" >View</button>
          <Toaster toastOptions={{ className: "custom-toast", style: customToastStyle, duration: 4500, }} position="top-center" reverseOrder={false} />
          <Popup
        contentStyle={{ width: "400px" , height:'350px', borderRadius:'10px', background:'#f7f9fb' }}
        open={showModal}
        onClose={() => setShowModal(false)}
        closeOnDocumentClick={false} 
        closeOnEscape={false} 
      >
        <div id="popup-content" className='fees-student'>
          <h2 className='details-student-fees'> {studentName} </h2>
        
         <p id='popup-content' className='p-student-fees-form'> Paid fees : {paidFees}</p> 
         <p id='popup-content' className='p-student-fees-form'> Pending Fees : {pendingAmount} </p>
          <button id="close-btn-fees" onClick={() => setShowModal(false)}> × </button>
         
        </div>
      </Popup>
       
        </form>
      </div>
    </StudentSidebar>
  );
};

export default StudentFeeForm;
