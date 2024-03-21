import React,{useState,useEffect} from 'react'
import {FaRegUserCircle} from "react-icons/fa";
import {  useHistory } from 'react-router-dom';
import config from './config';
import {CgMail } from "react-icons/cg";
import {IoEyeOutline,IoEyeOffOutline} from 'react-icons/io5'
import {toast,Toaster} from 'react-hot-toast';
import moment from 'moment';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Registration.css';
import axios from 'axios';
function Registration(props) {

  //const [id, setId] = useState('');
  const [name, setName ] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [address, setAddress] = useState('');
  const [state,setState] = useState(); 
  const [district , setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);

  //State for Enter role in Db
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState();
  
  const [isVisible, setVisible] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [error] = useState('');
  const[roleError,setRoleError]=useState('');
  const[genderError,setGenderError]=useState('');
  const[mobileError,setMobileError]=useState('');

  const toggle = () => {
      setVisible(!isVisible);
    };
  
  const toggleBtn = () => { 
      setDisable(!isDisable);
    };
  
  const navigate=useHistory();
  
  const handleRole = (e) =>{
    if (e.target.value === 'admin'){
      setIsAdmin(isAdmin => !isAdmin)
      setRole(e.target.value)
      setRoleError('');
    }
    setRole(e.target.value)
    setRoleError('');
  }

  const handleGender = (e) =>{
    setGender(e.target.value)
    setGenderError('');
  }

  const handlePhoneChange = (value) => {
    setMobileNumber(value);
    const phoneRegex = /^[+]?[0-9]{8,}$/;
    setIsValidPhone(phoneRegex.test(value));
    setMobileError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!role){
      setRoleError('Select Role');
      return;
    }
    if(!gender){
      setGenderError('Select Gender');
      return;
    }
    if(!mobileNumber){
      setMobileError('Enter Mobile Number');
      return;
    }
    try {
          const emailresponse =await axios.post(`${config.ApiUrl}AdminTeacher/PostAdminTeachers`,{
          Name : name,
          Email : email,
          Password : password,
          Gender : gender,
          BirthDate : birthday,
          MobileNumber : mobileNumber,
          JoinDate : joinDate,
          Address : address,
          City : city,
          District : district,
          State : state,
          PinCode : pinCode,
          IsAdmin : isAdmin
      });
      const userERes = emailresponse.data;
      if(userERes === "email already exists")
      {
            toast.error("User already exist !!!");
            return;
      }
      else{
        setTimeout(() => {
          navigate.push('/') 
          }, 1500);
        toast.success("Registration Successfull!")
      }
      
  } catch {
      toast.error('Signup failed. Please try again later.');
    }
      return;
};

const customToastStyle = { 
  fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
  fontSize: '16px',
  fontWeight: 'bold',
};

return (
  <>
    <div className='containerr'>
      <form onSubmit={handleSubmit}>
        <h2 className='signup'>Sign Up</h2>
      <div className='form-group1'>
        <div className='form-groupr'>
            <label className='labelr'>Role</label>
            <div className='radio-groupa'>
              <input className='inputr'
                type="radio" 
                value="admin"
              checked={role === "admin"}
              onChange={handleRole}
              required/>
              <label htmlFor="administrator">Admin</label>
              <input className="form-check-input" 
                type="radio" 
                value="teacher"
              checked={role === "teacher"}
              onChange={handleRole}
              required/>
              <label htmlFor="staff">Teacher</label>
              {/* <input className="form-check-input" type="radio" name="role" id="student" value={3} onChange={e => setRole(e.target.value)} />
              <label htmlFor="user">Student</label> */}
            </div>
            {roleError && <p style={{color:'red'}}>{roleError}</p>}
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
            <label className='labelr'>Confirm Password:</label>
            <input className='inputr' type={!isDisable ? "password" : "text"}
              name='password' placeholder='Confirm-Password'
              autoComplete='Confirm-Password'
              value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
              pattern={password} 
              title="The Password Confirmation does not match !"required/>
            <span className='iconr' onClick={toggleBtn}>
              {isDisable  ? <IoEyeOutline /> : <IoEyeOffOutline /> }</span>
          </div><p className='pass'>{error}</p>
          <div className='form-groupr'>
            <label className='labelr'>Birthdate:</label>
            <input className='inputr' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />
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
                required
              />                     
            </div>
          </div>
          {mobileError && <p style={{color:'red'}}>{mobileError}</p>}
        </div>
        <div className='form-groupr2'>
        <div className='form-groupr'>
          <label className='labelr'>Gender:</label>
          <div className="radio-groupa">
            <input
              className='inputr'
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={handleGender}
              required
            />
            <label>Male</label>
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={handleGender}
              required
            />
            <label>Female</label>
          </div>
          {genderError && <p style={{color:'red'}}>{genderError}</p>}
        </div>
          <div className='form-groupr'>
          <label className='labell'>Join Date:</label>
          <input className='inputl' type='date' value={joinDate} onChange={(e) => setJoinDate(e.target.value)} required />
        </div> 
          <div className='form-groupr'>
            <lable className='labelr'>Address:</lable>
            <textarea className="inputr" id="Address" name="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Ex: 294/5, Sammanthurai" rows="2" required></textarea>
          </div>
          <div className="form-groupr">
            <label className='labelr'>State:</label>
            <input
              className="inputr"
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              placeholder="Enter State" 
            required/>
          </div>
          <div className="form-groupr">
            <label className='labelr'>District:</label>
            <input
              className="inputr"
              type="text"
              value={district}
              onChange={e => setDistrict(e.target.value)}
              placeholder="Enter District" 
            required/>
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
        </div>
        <button type="submit" className='buttonr' onClick={()=>handleSubmit}>Sign Up</button>
      </form>
    </div>
    <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
  </>
)
}

export default Registration;
