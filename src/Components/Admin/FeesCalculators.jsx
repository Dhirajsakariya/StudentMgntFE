import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import config from '../Login/config';
import AdminSidebar from '../Sidebar/AdminSidebar';
import './FeesCalculators.css';

import { Toaster, toast } from 'react-hot-toast';

const FeesCalculators = () => {
  const [selectedFrequency, setselectedFrequency] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeFrequency, setFeeFrequency] = useState('');
  const [selectfeeFrequency , setSelectFeeFrequency] = useState('')
  const [studentName, setStudentName] = useState('');
  const [studentEmail,setStudentEmail] = useState('');
  const [studentStandard,setStudentStandard] = useState('');
  const [paidFees, setPaidFees] = useState('');
  const feeFrequencies = ["Quarterly", "Annually", "Semi-Annually"];
  const [showModal, setShowModal] = useState(false); 
  // const [remainingAmount , setRemainingAmount] = useState();
  const [pendingAmount,setPendingAmount] = useState(null);

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

  const handlePrint = () => {
    const popupContent = document.getElementById('popup-content').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>FEES RECEIPT</title>
          <link rel="stylesheet" type="text/css" href="FeesCalculators.css">
        </head>
        <body>
          <div id="print-view">
            ${popupContent}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  

 
  

  const handleView = () => {
    handleFeesPayment(); 
    setShowModal(true);
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



 const handleFeesPayment = async () => {
  try {
    const response = await fetch(`${config.ApiUrl}Fees/GetStudentFeesDetails/${fullId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const feesdata = await response.json();
    setPaidFees(feesdata.paidFees);
    setPendingAmount(feesdata.pendingFees);
    console.log('Fees details:', feesdata);
    console.log('Payment completed successfully!');
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

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
        FeeFrequency: selectedFrequency,
        Amount: feeAmount
      });
      console.log(response.data);
      setFeeFrequency('');
      setFeeAmount('');
      const userERes = response.data;
      // setPendingAmount(userERes.remainingAmount);

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
    <AdminSidebar>
    <div id='form-admin-fess'>
      <form > 
        <h2 id='h2-fees-admin' >Fees Form {studentName}({studentStandard}) </h2>
        
        <label id='lable-fees-form'>Fees Frequency:</label>   
        <select
         className='select-fees-admin'
          value={feeFrequency}
         id='input-fees-admin'
          required
          onChange={(e) => { setFeeFrequency(e.target.value); handleFrequencyChange(e); }}>
          <option value="" disabled hidden></option>
          {feeFrequencies.map((feeFrequency) => (
            <option key={feeFrequency} value={feeFrequency}>{feeFrequency}</option>
          ))}
        </select>

        <br />
        <label id='lable-fees-form'> Fees Payment: </label>
        <input
        id='input-fees-admin'
          type="text"
          readOnly
          value={feeAmount}
     
        />

        <br />
       
     
      <button id='submit-pay-admin' type="submit" onClick={handleSubmit} >Pay</button>
     
      <button onClick={handleView} id='submit-view-admin' >View</button>
     <Toaster toastOptions={{ className: "custom-toast", style: customToastStyle, duration: 4500, }} position="top-center" reverseOrder={false} />

     
      <Popup
        contentStyle={{ width: "400px" , height:'350px', borderRadius:'10px', background:'#f7f9fb' }}
        open={showModal}
        onClose={() => setShowModal(false)}
        closeOnDocumentClick={false} 
        closeOnEscape={false} 
      >
        <div id="popup-content" className='fees-admin'>
          <h2 className='details-fees'> {studentName} </h2>
         <p id='popup-content' className='p-admin-fees-form'> Standard : {studentStandard} </p> 
         <p id='popup-content' className='p-admin-fees-form'> Email : {studentEmail} </p>
         <p id='popup-content' className='p-admin-fees-form'> Paid fees : {paidFees}</p> 
         <p id='popup-content' className='p-admin-fees-form'> Pending Fees : {pendingAmount} </p>
          <button id="close-btn-fees" onClick={() => setShowModal(false)}> × </button>
         
        </div>
        <button onClick={handlePrint} className='print-admin-fees'> Print </button>
      </Popup>
      </form>
    </div>
    </AdminSidebar>
  );
}


export default FeesCalculators;

