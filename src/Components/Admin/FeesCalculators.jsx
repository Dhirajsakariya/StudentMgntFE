import React, { useEffect, useState } from 'react';
import config from '../Login/config';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const FeesCalculators = () => {
  const [selectedFrequency, setselectedFrequency] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeFrequency, setFeeFrequency] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail,setStudentEmail] = useState('');
  const [StudentRollNo,setStudentRollNo] = useState('');
  const [studentStandard,setStudentStandard] = useState('');
  const [studentGender,setStudentGender] = useState('');
  const [studentAddress,setStudentAddress] = useState('');
  const [studentCity, setStudentCity] = useState('');
  const [studentDistrict,setStudentDistrict] = useState('');
  const [studentState, setStudentState] = useState('');
  const [studentPincode, setStudentPincode] = useState('');
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
      setStudentRollNo(studentData.RollNo)
      setStudentEmail(studentData.email);
      setStudentStandard(studentData.standard);
      setStudentGender(studentData.gender);
      setStudentCity(studentData.city);
      setStudentAddress(studentData.address);
      setStudentDistrict(studentData.district);
      setStudentState(studentData.state);
      setStudentPincode(studentData.pinCode);


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
//       console.log(response.data);
//       setselectedFrequency('');
//       setFeeAmount('');
//       const userfees = response.data;

//       if (userfees.remainingAmount > 0) {
//         toast.success('Payment successful');
//       } else if (userfees.remainingAmount === 0) {
//         toast.success('Payment done');
//       } else {
//         toast.error('Fees already paid');
//       }

//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         if (error.response.data === 'select the right fre..') {
//           toast.error('Select the right frequency');
//           setFeeFrequency('');
//           setFeeAmount('');
//         } else {
//           toast.error(error.response.data); // error message backend
//           setFeeFrequency('');
//           setFeeAmount('');
//         }
//       } else {
//         console.error('Error:', error);
//         toast.error('Error processing payment.');
//       }
//     }
//   };

  return (
    <div>
      <form>
        <h2>Fees Form {studentName}</h2>
        
        <label>Fee Frequency:</label>
        <select
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
          type="text"
          placeholder='feeAmount'
          readOnly
          value={feeAmount}
     
        />

        <br />
        {/* <label>  Name </label>
       
        <input
          type="text"
          value={formData.studentName}
          onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })}
          required
        /> */}
{/*         
        <br />
        <label>Standard:</label>
        <input
          type="text"
          value={formData.standard}
          onChange={(e) =>
          setFormData({ ...setFormData, standard: e.target.value })}
          required
        /> 

        <br />
        <label>Roll No:</label>
        <input
          type="text"
          value={formData.rollNo}
          onChange={(e) =>
          setFormData({ ...setFormData, rollNo: e.target.value })}
          required
        /> 
        
        <br />
        <label>Email:</label>
        <input
          type="text"
          value={formData.email}
          onChange={(e) =>
          setFormData({ ...setFormData, email: e.target.value })}
          required
        /> 
        
        <br />
        <label>Gender:</label>
        <input
          type="text"
          value={formData.gender}
          onChange={(e) =>
          setFormData({ ...setFormData, gender: e.target.value })}
          required
        /> 
         
        <br />
        <label>Mobile Number:</label>
        <input
          type="text"
          value={formData.mobileNumber}
          onChange={(e) =>
          setFormData({ ...setFormData, mobileNumber: e.target.value })}
          required
        /> 
*/}
        <br />
       
      </form>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <br />           <Toaster toastOptions={{ className: "custom-toast", style: customToastStyle, duration: 4500, }} position="top-center" reverseOrder={false} />

      <button onClick={handleView}>View</button>
      {showModal && (
        <div>
          <span onClick={() => setShowModal(false)}></span>
          <h2> Details:</h2>
          {/* Name : {formData.studentName} <br /> */}
            Standard : {studentStandard} <br />
            Email : {studentEmail} <br />
            Gender : {studentGender} <br />
            City : {studentCity} <br />
            Address : {studentAddress} <br />
            State : {studentState} <br />
            Pincode : {studentPincode} <br />
            District : {studentDistrict} <br />

            Frequency : {feeFrequency} <br />
            Amount : {feeAmount} <br />



          {/* setStudentName(studentData.name);
      setStudentEmail(studentData.email);
      setStudentStandard(studentData.standard);
      setStudentGender(studentData.gender);
      setStudentCity(studentData.city);
      setStudentAddress(studentData.address);
      setStudentDistrict(studentData.district);
      setStudentState(studentData.state);
      setStudentPincode(studentData.pinCode); */}

        </div>
      )}
    </div>
  )
}

export default FeesCalculators;
