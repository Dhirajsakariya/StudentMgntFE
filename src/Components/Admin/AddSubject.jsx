// import React, { useState } from 'react';
// import './FeeForm.css';
// import Sidebar from '../Sidebar/Sidebar';
// import { PiBookOpenTextLight } from "react-icons/pi";
// import standardicon from '../Assets/standardicon.png'

// const AddSubject = () => {
//   const [subjectName, setSubjectName] = useState('');
//   const [standard, setStandard] = useState('');
//   const[subjectNameError,setSubjectNameError] = useState('');
//   const[standardError,setStandardError] = useState('');
  
//   const handleSubmit = (e) => {
//     e.preventDefault();

//    if(!subjectName)
//     {
//       setSubjectNameError('Please Enter Subject Name');
//       return;
//     }
//     else if(!standard)
//     {
//       setStandardError('Please Enter Standard');
//       return;
//     }
//     // Perform form validation and submission logic here
   

//     console.log('Form submitted:', { subjectName,standard });
//   };
//   return (
//     <Sidebar>
//       <div className='containerfee'>
//        <form onSubmit={handleSubmit}>
//         <h2>Add Subject</h2>
//           <div style={{marginTop:'20px'}} className='form-groupa'>
//             <label htmlFor="studentName">Subject Name:</label>
//             <input
//               type="text"
//               id="subjectName"
//               placeholder='Enter Subject Name'
//               value={subjectName}
//               onChange={(e) => {setSubjectName(e.target.value);setSubjectNameError('');}}
              
//             />  
//             <PiBookOpenTextLight className="feeformicon"/>
//             <br />
            
//             {subjectNameError && <p style={{ color: 'red' }}>{subjectNameError}</p>}
//           </div>
//           <div style={{marginTop:'20px'}} className='form-groupa'>
//            <label htmlFor="Standard">Standard:</label>
//            <input
//               type="text"
//               id="standard"
//               value={standard}
//               placeholder='Enter Standard'
//               onChange={(e) => {setStandard(e.target.value);
//               setStandardError('');}}
              
//             />
//             <img src={standardicon} className='familyformicon'/>
//             <br />
//             {standardError && <p style={{ color: 'red' }}>{standardError}</p>}
//           </div>
//           <button style={{marginTop:"40px"}} type="submit">Add Subject</button>
//        </form>
//       </div>
//     </Sidebar>
//   );
  
// };

// export default AddSubject;





import React, { useState } from 'react';
import './FeeForm.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { PiBookOpenTextLight } from "react-icons/pi";
import standardicon from '../Assets/standardicon.png';
import config from '../Login/config';

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [standardId, setStandardId] = useState('');
  const [subjectNameError, setSubjectNameError] = useState('');
  const [standardError, setStandardError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName) {
      setSubjectNameError('Please Enter Subject Name');
      return;
    } else if (!standardId) {
      setStandardError('Please Enter Standard');
      return;
    }

    try {
      const response = await fetch(`${config.ApiUrl}Standard/AddSubjectToStandard/${standardId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subjectName }),
      });

      if (response.ok) {
        // Subject added successfully
        console.log('Subject added successfully');
      } else {
        console.error('Failed to add subject:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  return (
    <AdminSidebar>
      <div className='containerfee'>
        <form onSubmit={handleSubmit}>
          <h2>Add Subject</h2>
          <div style={{ marginTop: '20px' }} className='form-groupa'>
            <label htmlFor="studentName">Subject Name:</label>
            <input
              type="text"
              id="subjectName"
              placeholder='Enter Subject Name'
              value={subjectName}
              onChange={(e) => { setSubjectName(e.target.value); setSubjectNameError(''); }}

            />
            <PiBookOpenTextLight className="feeformicon" />
            <br />

            {subjectNameError && <p style={{ color: 'red' }}>{subjectNameError}</p>}
          </div>
          <div style={{ marginTop: '20px' }} className='form-groupa'>
            <label htmlFor="Standard">Standard ID:</label>
            <input
              type="text"
              id="standardId"
              value={standardId}
              placeholder='Enter Standard ID'
              onChange={(e) => { setStandardId(e.target.value); setStandardError(''); }}

            />
            <img src={standardicon} className='familyformicon' />
            <br />
            {standardError && <p style={{ color: 'red' }}>{standardError}</p>}
          </div>
          <button style={{ marginTop: "40px" }} type="submit">Add Subject</button>
        </form>
      </div>
    </AdminSidebar>
  );
};

export default AddSubject;