import React,{useState} from 'react'
import moment from 'moment';
import './StudentForm.css'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import {CgMail } from "react-icons/cg";
import {FaRegUserCircle} from "react-icons/fa";
import {toast,Toaster} from 'react-hot-toast';

const StudentForm = () => {
    
    const [grNo,setGrNO] = useState('');
    const [rollNo,setRollNo] = useState('');
    const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [joinDate,setJoinDate] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [districts,setDistrict] = useState('');
    const [state,setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [standard,setStandard] =useState('');
    const [section,setSection] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [error] = useState('');
    const [genderError,setGenderError] = useState('');

      
     const bloodGroup = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
     const [selectedBloodGroup,setSelecteBloodGroup] = useState("");

    //  const handleBloodGroupChange = (e) => {
    //    setSelecteBloodGroup(e.target.value);
    //  };

    const toggle = () => {
      setVisible(!isVisible);
    };
  

    
      const handlePhoneChange = (value) => {
        setMobileNumber(value);
        const phoneRegex = /^[+]?[0-9]{8,}$/;
        setIsValidPhone(phoneRegex.test(value));
      };
      const customToastStyle = { 
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        fontSize: '16px',
        fontWeight: 'bold',
      };


      const handleSubmit = (e) => {
        e.preventDefault();
        if(!gender){
          setGenderError('Please select a Gender');
          return;
        }
      }
      
      
      
    
   
  return (
    <AdminSidebar>
  <>
    <div className='containerS'>
      <form onSubmit={handleSubmit}>
        <h2 className='signup'>Student Form</h2>
      <div className='form-group1'>
      <div className='form-groupr'>
            <label className='labelr'>Gr No:</label>
            <input className='inputr' type='text' value={grNo} onChange={(e)=> setGrNO(e.target.value)} placeholder='Gr No'
              name='grno'  required />
          </div>
      <div className='form-groupr'>
            <label className='labelr'>Roll No:</label>
            <input className='inputr' type='text' value={rollNo} onChange={(e)=> setRollNo(e.target.value)} placeholder='Roll No'
              name='rollno'  required />
          </div>
          <div className='form-groupr'>
            <label className='labelr'>Name:</label>
            <input className='inputr' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Full Name'
              name='name'  required />
            <FaRegUserCircle className='iconl' />
          </div>
          <div className='form-groupr'>
            <label className='labelr'>Email:</label>
            <input className='inputr' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'
              name='email'  required />
            <CgMail className='iconr' /> 
          </div>
          <div className='form-groupr'>
            <label className='labelr'>Password:</label>
            <input className='inputr' type={!isVisible ? "password" : "text"}
              name='password' placeholder='Password' 
              value={password} onChange={(e)=> setPassword(e.target.value)}
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~\@\!\#\$\%\^\&\*\?]).{8,15}$"
              title="Must contain at least one  number and one uppercase and one lowercase letter and One special Charecter, and at least 8 characters"
              autoComplete='current-password'
              required/>
            <span className='iconr' onClick={toggle}>
              {isVisible  ? <IoEyeOutline/> : <IoEyeOffOutline />
              }</span>
          </div><p className='pass'>{error}</p>
          <div className='form-groupr'>
            <label className='labelr'>Standard:</label>
            <input className='inputr' type='text' value={standard} onChange={(e)=> setStandard(e.target.value)} placeholder='Standard'
              name='standard'  required />
          </div>
          <div className='form-groupr'>
            <label className='labelr'>Section:</label>
            <input className='inputr' type='text' value={section} onChange={(e)=> setSection(e.target.value)} placeholder='Section'
              name='section'  required />
          </div>

          <div className='form-groupr'>
            <label className='labelr'>Birthdate:</label>
            <input className='inputr' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />
          </div>
          
          <div className='form-groupr'>
          <label className='labelr'>Gender:</label>
          <div className="radio-groupa">
            <input
              className='inputr'
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
        </div>
        <div className='form-groupr2'>
       
        <div className='form-groupr'>
          <label className='labell'>Join Date:</label>
          <input className='inputl' type='date' value={joinDate} onChange={(e) => setJoinDate(e.target.value)} required />
        </div> 
          <div className='form-groupr'>
            <lable className='labelr'>Address:</lable>
            <textarea className="inputr" id="Address" name="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Ex: 294/5, Sammanthurai" rows="2" required></textarea>
          </div>
          <div className="form-groupr">
            <label className='labelr'>City:</label>
            <input
              className="inputr"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div className="form-groupr">
            <label className='labelr'>District:</label>
            <input
              className="inputr"
              id="district"
              name="district"
              value={districts}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="District"
              required
            />
          
          <div className="form-groupr">
            <label className='labelr'>State:</label>
            <input
              className="inputr"
              id='state'
              type="text"
              name='state'
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder='State'
              required
            />
          </div>
          
         
          <div className="form-groupr">
            <label className='labelr'>PinCode:</label>
            <input
              className="inputr"
              id="pincode"
              name="pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="PinCode"
              required
            />
          </div> 
          <div className='form-groupr'>
          <label className='labelr'>Mobile Number:</label>
            <div className='phone_numberr'>
              <PhoneInput
                country="in"
                value={mobileNumber}
                disableDropdown={true}
                onChange={handlePhoneChange}
                inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                containerStyle={{padding:'1px'}}
              />                     
            </div>
          </div>
          <div className="form-groupr">
            <label className='labelr'>Select Blood Group:</label>
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelecteBloodGroup(e.target.value)}
              className="inputr"
            >
              <option value="">Select Blood Group</option>
              {bloodGroup.map((bloodGroup, index) => (
                <option key={index} value={bloodGroup}>
                  {bloodGroup}
                </option>
              ))}
            </select>
          </div>       
          </div>
        </div>
        <button className='buttonr'  type='submit'>Sign Up</button>
      </form>
    </div>
    <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
  </>
        </AdminSidebar>
  )
}


export default StudentForm;