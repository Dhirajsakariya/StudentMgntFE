import moment from 'moment';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import './Student_Form.css';

export const Student_Form = () => {

    const [GrNo, setGrNo] = useState('')
    const [rollNo,setRollNo] =useState('');
    const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [joinDate,setJoinDate] = useState('');
    //const [bloodGroup,setBloodGroup] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);
  
    const bloodGroup = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
    const [selectedBloodGroup,setSelecteBloodGroup] = useState("");

    const handleBloodGroupChange = (e) => {
      setSelecteBloodGroup(e.target.value);
    };
    
    const districts = [
        "Ahmedabad", "Amreli","Anand","Aravalli","Banaskantha", "Bharuch", "Bhavnagar", "Botad","Chhota Udaipur", "Dahod", "Dang","Devbhoomi Dwarka",
        "Gandhinagar","Gir Somnath","Jamnagar", "Junagadh", "Kutch","Kheda", "Mahisagar","Mehsana","Morbi","Narmada", "Navsari", "Panchmahal","Patan",
        "Porbandar","Rajkot","Sabarkantha","Surat", "Surendranagar","Tapi","Vadodara", "Valsad"
      ];
    
      const [selectedDistrict, setSelectedDistrict] = useState("");
    
      const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
      };
      const handlePhoneChange = (value) => {
        setMobileNumber(value);
        const phoneRegex = /^[+]?[0-9]{8,}$/;
        setIsValidPhone(phoneRegex.test(value));
      };
      
    
  return (
  <TeacherSidebar>
    <>
    <div className='containerST'>
        <form>
            <div>
            <h2 id='student-form'>Student Detail</h2>
            <div id='form-groupstudent_form'>
                <label id='student_form'>Gr  No:</label>
                <input id='inputstudent_form' type='text' value={GrNo} onChange={(e)=> setGrNo(e.target.value)} placeholder='Enter GrNo'
                name='no'  required />
            </div>
            <div id='form-groupstudent_form'>
                <label id='student_form'>Roll  No:</label>
                <input id='inputstudent_form' type='text' value={rollNo} onChange={(e)=> setRollNo(e.target.value)} placeholder='Enter RollNo'
                name='Rollno'  required />
            </div>
            <div id='form-groupstudent_form'>
                <label id='student_form'>Name:</label>
                <input id='inputstudent_form' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name'
                name='name'  required />
            </div>
            <div id='form-groupstudent_form'>
                <label id='student_form'>Email:</label>
                <input id='inputstudent_form' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email'
                name='Email'  required />
            </div>
            <div id='form-groupstudent_form'>
                <label id='student_form'>Password:</label>
                <input id='inputstudent_form' type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'
                name='Password'  required />
            </div>
            <div id='form-groupstudent_form'>
            <label id='student_form'>Gender:</label>
            <div id="radio-groupstd">
                   <input id='inputstudent_form'
                     type="radio"
                     value="male"
                 checked={gender === "male"}
                     onChange={() => setGender("male")}
                     required
                   />
                   <label>Male</label>
                   <input
                     type="radio"
                     value="female"
                     checked={gender === "female"}
                     onChange={() => setGender("female")}
                     required
                   />
                   <label>Female</label>
                 </div>
            </div>
            <div id='form-groupstudent_form'>
                <label id='student_form'>DOB:</label>
                <input id='inputstudent_form' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />  
            </div>
            
            <div id='form-groupstudent_form'>
                <label id='student_form'>Join-Date:</label>
                <input id='inputstudent_form' type='date' value={joinDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setJoinDate(e.target.value)} required />
            </div>
            </div>
    
        <div id='div_two'>           
        <div>
            <label id='student_form2' htmlFor="bloodgroup">Select a BloodGroup:</label>
                 <select id='inputstudent_form2'  value={selectedBloodGroup} onChange={handleBloodGroupChange}>
                 <option value="">--Select BloodGroup--</option>
                  {bloodGroup.map((bloodGroup, index) => (
                  <option key={index} value={bloodGroup}>{bloodGroup}</option>
                   ))}
                 </select>
           </div>
            <div id='form-groupstudent_form'>
                <label id='student_form2'>Address:</label>
                <textarea id='inputstudent_form2'  value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Address'
                name='Address'  required />
            </div> 
            <div id='form-groupstudent_form'>
                <label id='student_form2'>City:</label>
                <input id='inputstudent_form2' type='text' value={city} onChange={(e)=> setCity(e.target.value)} placeholder='Enter Your City'
                name='city'  required />
            </div>
           
            <div>
            <label id='student_form2' htmlFor="district">Select a district:</label>
                 <select id='inputstudent_form2'  value={selectedDistrict} onChange={handleDistrictChange}>
                 <option value="">--Select District--</option>
                  {districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                   ))}
                 </select>
                 {/* {selectedDistrict &&  <p style={{color:'black',position:'right'}}>You selected: {selectedDistrict}</p>} */}
           </div>
           <div id='form-groupstudent_form'>
                <label id='student_form2'>State:</label>
                <input id='inputstudent_form2' type='text' value='Gujarat' onChange={(e)=> setState(e.target.value)}
                name='city'  required />
            </div>
           
           <div id='form-groupstudent_form'>
               <label id='student_form2'>Mobile Number:</label>
               <div id='phone_numberS'>
               <PhoneInput
                   country={'in'}
                   value={mobileNumber}
                   onChange={handlePhoneChange}
                   enableSearch={true}
                   isValid={isValidPhone}
                   inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                   containerStyle={{padding:'1px'}}
                   required />
                 </div>
               </div>  
        </div>
            <button id='btnnexts' type='submit'>Next</button>
         </form>
    </div>
    </>
     </TeacherSidebar>
    
  )
}
export default Student_Form;