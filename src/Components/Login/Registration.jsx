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
import Navigationbar from '../Dashboard/Navigationbar';
import Footer from '../Dashboard/Footer';

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
  const [toggleTeacher, setToggleTeacher] = useState(false);
  // State to store the fetched data
  const [data, setData] = useState([]);
  const[standard,setStandard]=useState('');
  const[subject,setSubject]=useState(null);
  const[subjectError,setSubjectError]=useState('');
  const[standardError,setStandardError]=useState('');

  const [standarddata, setStandardData] = useState([]);
  const [subjectdata, setSubjectData] = useState([]);

  const fetchStandardData = async () => {
     try {
       const response = await axios.get(`${config.ApiUrl}DropDown/Standard`);
       setStandardData(response.data);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };
   const fetchSubjectdData = async () => {
    try {
      const subjectresponse = await axios.get(`${config.ApiUrl}DropDown/Subject`);
      setSubjectData(subjectresponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  useEffect(() => {
    fetchStandardData();
    fetchSubjectdData();
  }, []);

  const toggle = () => {
      setVisible(!isVisible);
    };
  
  const toggleBtn = () => { 
      setDisable(!isDisable);
    };
  
  const navigate=useHistory();
  
  const handleRole = (e) =>{
    if (e.target.value === 'teacher'){
      setRole(e.target.value)
      setRoleError('');
      if(!toggleTeacher){
      setToggleTeacher(toggleTeacher => !toggleTeacher)
      }
    }
    else{
      setIsAdmin(isAdmin => !isAdmin)
      setRole(e.target.value)
      setRoleError('');
      if(toggleTeacher){
      setToggleTeacher(toggleTeacher => !toggleTeacher)
      }
    }
  }

  const handleStandard = (e) => {
    setStandard(e.target.value);
    setStandardError('');
  };

  const str = standard;
  const parts = str.split("-");
  
  const handleSubject = (e) => {
    setSubject(e.target.value);
    setSubjectError('');
  };

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
    if(role === 'teacher')
    {
      if(!standard){
        setStandardError('Select standard');
        return;
      }
      if(!subject){
        setStandardError('Select Subject');
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
        IsAdmin : isAdmin,
        SubjectName: subject,
        StandardNumber: parts[0],
        Section : parts[1]
        });
      const userERes = emailresponse.data;
      if(userERes === "email already exists")
      {
          toast.error("User already exist !!!");
          return;
      }
      else{
        setTimeout(() => {
          navigate.push('/Login') 
          }, 1500);
        toast.success("Registration Successfull!")
      } 
    } 
    catch {
    toast.error('Signup failed. Please try again later.');
    }
      return;
  }
  try {
          const adminresponse =await axios.post(`${config.ApiUrl}AdminTeacher/PostAdminTeachers`,{
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
          IsAdmin : isAdmin,
      });
      const adminERes = adminresponse.data;
      if(adminERes === "email already exists")
      {
            toast.error("User already exist !!!");
            return;
      }
      else{
        setTimeout(() => {
          navigate.push('/Login') 
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
    <Navigationbar/>
    <div class="noeffect">
    <div id='containerr'>
      <form onSubmit={handleSubmit}>
        <h2 id='signup'>Sign Up</h2>
      <div id='form-group1'>
        <div id='form-groupr'>
            <label id='labelr'>Role</label>
            <div id='radio-groupa'>
              <input
                type="radio" 
                value="admin"
                checked={role === "admin"}
                onChange={handleRole}
                required/>
              <label  id='lradio'>Admin</label>
              <input  
                type="radio" 
                value="teacher"
              checked={role === "teacher"}
              onChange={handleRole}
              required/>
              <label  id='lradio'>Teacher</label>
              {/* <input id="form-check-input" type="radio" name="role" id="student" value={3} onChange={e => setRole(e.target.value)} />
              <label htmlFor="user">Student</label> */}
            </div>
            {roleError && <p style={{color:'red'}}>{roleError}</p>}
          </div>
          <div id='form-groupr'>
          {toggleTeacher && (
             <div id='subjectselection'>
              <div>
                <select id='StandardSelection' title='Select Standard' value={standard} onChange={handleStandard}>
                    <option value="" >Select Standard</option>
                    {standarddata.map((e) => <option value={e} key={e}>{e}</option> )}
                </select>
                <select id='SubjectSelection' value={subject} onChange={handleSubject}>
                <option value="" >Select Subject</option>
                  {subjectdata.map((e) => <option value={e} key={e}>{e}</option> )}
                </select>
              </div>
              {standardError && <p style={{color:'red'}}>{standardError}</p>}
              {subjectError  && <p style={{color:'red'}}>{subjectError}</p>}
           </div>
          )}
          </div>
          <div id='form-groupr'>
            <label id='labelr'>Name:</label>
            <input id='inputr' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Full Name'
              name='name'  required />
            <FaRegUserCircle id='iconr' />
          </div>
          <div id='form-groupr'>
            <label id='labelr'>Email:</label>
            <input id='inputr' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'
              name='email'  required />
            <CgMail id='iconr' /> 
          </div>
          <div id='form-groupr'>
            <label id='labelr'>Password:</label>
            <input id='inputr' type={!isVisible ? "password" : "text"}
              name='password' placeholder='Password' 
              value={password} onChange={(e)=> setPassword(e.target.value)}
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~\@\!\#\$\%\^\&\*\?]).{8,15}$"
              title="Must contain at least one  number and one uppercase and one lowercase letter and One special Charecter, and at least 8 characters"
              autoComplete='current-password'
              required/>
            <span id='iconeye' onClick={toggle}>
              {isVisible  ? <IoEyeOutline/> : <IoEyeOffOutline />
              }</span>
          </div><p id='pass'>{error}</p>
          <div id='form-groupr'>
            <label id='labelr'>Confirm Password:</label>
            <input id='inputr' type={!isDisable ? "password" : "text"}
              name='password' placeholder='Confirm-Password'
              autoComplete='Confirm-Password'
              value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
              pattern={password} 
              title="The Password Confirmation does not match !"required/>
            <span id='iconeye' onClick={toggleBtn}>
              {isDisable  ? <IoEyeOutline /> : <IoEyeOffOutline /> }</span>
          </div><p id='pass'>{error}</p>
          <div id='form-groupr'>
            <label id='labelr'>Birthdate:</label>
            <input id='inputr' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />
          </div>
          <div id='form-groupr'>
          <label id='labelr'>Mobile Number:</label>
            <div id='phone_numberr'>
              <PhoneInput
                country="in"
                value={mobileNumber}
                disableDropdown={true}
                onChange={handlePhoneChange}
                inputStyle={{backgroundColor: 'white', borderTopColor: '#24305E' }}
                containerStyle={{padding:'0.5px'}}
                required
              />                     
            </div>
          </div>
          {mobileError && <p style={{color:'red'}}>{mobileError}</p>}
        </div>
        <div id='form-groupr2'>
        <div id='form-groupr'>
          <label id='labell'>Gender</label>
          <div id="radio-groupa">
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={handleGender}
              required
            />
            <label id='lradio'>Male</label>
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={handleGender}
              required
            />
            <label  id='lradio'>Female</label>
          </div>
          {genderError && <p style={{color:'red'}}>{genderError}</p>}
        </div>
          <div id='form-groupr'>
          <label id='labell'>Join Date:</label>
          <input id='inputl' type='date' value={joinDate} onChange={(e) => setJoinDate(e.target.value)} required />
        </div> 
          <div id='form-groupr'>
            <lable id='labell'>Address:</lable>
            <textarea id="inputl"  name="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Ex: 294/5, Sammanthurai" rows="2" required></textarea>
          </div>
          <div id="form-groupr">
            <label id='labell'>State:</label>
            <input
              id="inputl"
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              placeholder="Enter State" 
            required/>
          </div>
          <div id="form-groupr">
            <label id='labell'>District:</label>
            <input
              id="inputl"
              type="text"
              value={district}
              onChange={e => setDistrict(e.target.value)}
              placeholder="Enter District" 
            required/>
          </div>
          <div id="form-groupr">
            <label id='labell'>City:</label>
            <input
              id="inputl"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div id="form-groupr">
            <label id='labell'>PinCode:</label>
            <input
              id="inputl"
              name="pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="PinCode"
              required
            />
          </div>        
        </div>
        <button type="submit" id='buttonr' onClick={()=>handleSubmit}>Sign Up</button>
      </form>
    </div>
    </div>
    <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    <Footer/>
  </>
)
}

export default Registration;
