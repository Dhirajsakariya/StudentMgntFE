import React ,{useState}from 'react'
import moment from 'moment';
import './TeacherForm.css'
import {  useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Sidebar from '../Sidebar/Sidebar';
import {toast,Toaster} from 'react-hot-toast';
import { LuUserCircle2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from 'axios';
import Config from './Config';
const TeacherForm = () => {

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
    const [pinCode,setPinCode] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const[genderError,setGenderError]=useState('');
    const[mobileError,setMobileError]=useState('');
    const Subjects = ["Gujarati","Hindi"];
    const [selectedSubject,setSelectedSubject] =useState("");
    
      const handlePhoneChange = (value) => {
        setMobileNumber(value);
        const phoneRegex = /^[+]?[0-9]{8,}$/;
        setIsValidPhone(phoneRegex.test(value));
      };
      const toggleNewPasswordVisibility = () => { 
        setShowPassword(!showPassword);
    };
    const customToastStyle = { 
      fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      fontSize: '16px',
      fontWeight: 'bold',
    };
    
    const navigate=useHistory();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if(!gender){
        setGenderError('Select Gender');
        return;
      }
      if(!mobileNumber){
        setMobileError('Enter Mobile Number');
        return;
      }
      try {
            const emailresponse =await axios.post(`${Config.ApiUrl}AdminTeacher/PostAdminTeachers`,{
            Name : name,
            Email : email,
            Password : password,
            Gender : gender,
            BirthDate : birthday,
            MobileNumber : mobileNumber,
            JoinDate : joinDate,
            Address : address,
            City : city,
            District : districts,
            State : state,
            PinCode : pinCode,
          
        });
        const userERes = emailresponse.data;
        if(userERes === "email already exists")
        {
              toast.error("Email already exist !!!");
              console.log(userERes);

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
  

      

  return (
    <Sidebar>   
       <>
    <div className='containerT'>
        <form onSubmit={handleSubmit}>
            <div>
            <h2 className='teacher-form'>Teacher Form</h2>
            
            <div className='form-groupa'>
                <label className='labels'>Name:</label>
                <input className='inputs' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name'
                name='name'  required />
                 <LuUserCircle2 className = 'iconT' />
            </div>
            <div className='form-groupa'>
                <label className='labels'>Email:</label>
                <input className='inputs' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email'
                name='Email'  required />
                    <MdOutlineMail className = 'iconT' />
            </div>
            <div className='form-groupa'>
                <label className='labels'>Password:</label>
                <input className='inputs' type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'
                name='Password'  required />
               {showPassword? <IoEyeOutline className='iconT' onClick={toggleNewPasswordVisibility} /> : <IoEyeOffOutline className='iconT' onClick={toggleNewPasswordVisibility}/>}

            </div>
            <div className='form-groupa'>
            <label className='labels'>Gender:</label>
            <div className="radio-groupT">
                   <input className='inputl'
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
                 {genderError && <p style={{color:'red'}}>{genderError}</p>}

            </div>
            <div className='form-groupa'>
                <label className='labels'>DOB:</label>
                <input className='inputs' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />  
            </div>
            <div className='form-groupa'>
                <label className='labels'>Join-Date:</label>
                <input className='inputs' type='date' value={joinDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setJoinDate(e.target.value)} required />
            </div>
            <div className="form-groupr">
            <label className='labels'>Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="inputs"
            >
              <option value="">Select Blood Group</option>
              {Subjects.map((Subject, index) => (
                <option key={index} value={Subject}>
                  {Subject}
                </option>
              ))}
            </select>
          </div>       
          
            </div>

            
        <div className='form-two'>        

            <div className='form-groupa'>
                <label className='labels'>Address:</label>
                <textarea className='inputs'  value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Address'
                name='Address'  required />
            </div> 
            <div className='form-groupa'>
                <label className='labels'>City:</label>
                <input className='inputs' type='text' value={city} onChange={(e)=> setCity(e.target.value)} placeholder='Enter Your City'
                name='city'  required />
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
          
           <div className='form-groupa'>
                <label className='labels'>State:</label>
                <input className='inputs' type='text' value={state} onChange={(e)=> setState(e.target.value)}
                name='state'  required />
            </div>
            <div className='form-groupa'>
                <label className='labels'>PinCode:</label>
                <input className='inputs' type='text' value={pinCode} onChange={(e)=> setPinCode(e.target.value)}
                name='pincode'  required />
            </div>

           
           <div className='form-groupa'>
               <label className='labels'>Mobile Number:</label>
               <div className='phone_numberT'>
               <PhoneInput
                   country={'in'}
                   value={mobileNumber}
                   onChange={handlePhoneChange}
                   enableSearch={true}
                   isValid={isValidPhone}
                   inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                   containerStyle={{padding:'1px'}}
                />
                 </div>
                 {mobileError && <p style={{color:'red'}}>{mobileError}</p>}

               </div>
               
        </div>
        </div>
            <button className='btnnextT'onClick={()=>handleSubmit} type='submit'>Next</button>
         </form>
    </div>
    <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />


    </>
    </Sidebar>
    
  )
}

export default TeacherForm;