import React, { useState } from 'react';
import './FeeForm.css';
import Sidebar from '../Sidebar/Sidebar';
import { PiBookOpenTextLight } from "react-icons/pi";
import standardicon from '../Assets/standardicon.png'

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [standard, setStandard] = useState('');
  const[subjectNameError,setSubjectNameError] = useState('');
  const[standardError,setStandardError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

   if(!subjectName)
    {
      setSubjectNameError('Please Enter Subject Name');
      return;
    }
    else if(!standard)
    {
      setStandardError('Please Enter Standard');
      return;
    }
    // Perform form validation and submission logic here
   

    console.log('Form submitted:', { subjectName,standard });
  };
  return (
    <Sidebar>
      <div className='containerfee'>
       <form onSubmit={handleSubmit}>
        <h2>Add Subject</h2>
          <div style={{marginTop:'20px'}} className='form-groupa'>
            <label htmlFor="studentName">Subject Name:</label>
            <input
              type="text"
              id="subjectName"
              placeholder='Enter Subject Name'
              value={subjectName}
              onChange={(e) => {setSubjectName(e.target.value);setSubjectNameError('');}}
              
            />
            <PiBookOpenTextLight className="feeformicon"/>
            <br />
            
            {subjectNameError && <p style={{ color: 'red' }}>{subjectNameError}</p>}
          </div>
          <div style={{marginTop:'20px'}} className='form-groupa'>
           <label htmlFor="Standard">Standard:</label>
           <input
              type="text"
              id="standard"
              value={standard}
              placeholder='Enter Standard'
              onChange={(e) => {setStandard(e.target.value);
              setStandardError('');}}
              
            />
            <img src={standardicon} className='familyformicon'/>
            <br />
            {standardError && <p style={{ color: 'red' }}>{standardError}</p>}
          </div>
          <button style={{marginTop:"40px"}} type="submit">Add Subject</button>
       </form>
      </div>
    </Sidebar>
  );
  
};

export default AddSubject;