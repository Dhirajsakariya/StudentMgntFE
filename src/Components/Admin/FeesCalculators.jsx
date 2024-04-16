import React, { useState } from 'react';
import config from '../Login/config';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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
  const [formData, setFormData] = useState({ name: '' });

  const handleFrequencyChange = async (e) => {
    const selectedFrequency = e.target.value;

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

  const fullId = localStorage.getItem('selectedStudentId');

  const handleView = () => {
    setShowModal(true);
  };

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.ApiUrl}Fees/PostFees`, {
        StudentId: fullId,
        FeeFrequency: selectedFrequency,
        Amount: feeAmount
      });
      console.log(response.data);
      setselectedFrequency('');
      setFeeAmount('');
      const userfees = response.data;

      if (userfees.remainingAmount > 0) {
        toast.success('Payment successful');
      } else if (userfees.remainingAmount === 0) {
        toast.success('Payment done');
      } else {
        toast.error('Fees already paid');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data === 'select the right fre..') {
          toast.error('Select the right frequency');
        } else {
          toast.error(error.response.data);
        }
      } else {
        console.error('Error:', error);
        toast.error('Error processing payment.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
      <button type="submit">Submit</button>
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
