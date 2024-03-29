import React ,{useState, useEffect }from 'react'
import moment from 'moment';
import './TeacherForm.css'
import {  useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import {toast,Toaster} from 'react-hot-toast';
import { LuUserCircle2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from 'axios';
import config from '../Login/config';
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
    const [isVisible, setVisible] = useState(false);
    const [genderError,setGenderError] = useState('');
    const [mobileError,setMobileError] = useState('');
    const [standard,setStandard] = useState('');
    const [subject,setSubject] = useState('');
    const [subjectError,setSubjectError] = useState('');
    const [standardError,setStandardError] = useState('');
    const [standarddata, setStandardData] = useState([]);
    const [subjectdata, setSubjectData] = useState([]);

    const toggle = () => {
      setVisible(!isVisible);
    };
  
    const fetchStandard = async () => {
          try {
            const response = await axios.get(`${config.ApiUrl}DropDown/Standard`);
            setStandardData(response.data);
          } 
          catch (error) {
            console.error("Record Not Found:", error);
          }
    };
    const fetchSubject = async () => {
        try {
          const subjectresponse = await axios.get(`${config.ApiUrl}DropDown/Subject`);
          setSubjectData(subjectresponse.data);
        } 
        catch (error) {
          console.error("Record Not Found:", error);
        }
   };
 
   useEffect(() => {
     fetchStandard();
     fetchSubject();
   }, []);
 
   const handleStandard = (e) => {
      setStandard(e.target.value);
      setStandardError('');   
    };
    const str =standard;
    const parts = str.split("-");
      

   const handleSubject = (e) => {
      setSubject(e.target.value);
      setSubjectError('');
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
      if(!standard){
        setStandardError('Select Standard');
      }
      if(!subject){
        setSubjectError('Select Subject');
      }
      try {
            const emailresponse = await axios.post(`${config.ApiUrl}AdminTeacher/PostAdminTeachers`,{
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
            SubjectName : subject,
            StandardNumber : parts[0],
            Section :parts[1]
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


  return (
    <AdminSidebar>   
       <>
       <div id = 'containerT'>
        <form onSubmit={handleSubmit}>
            <div>
            <h2 id='title' className='teacher-form'>Teacher Form</h2>
            
            <div id='Form-GroupT'>
                <label  id='labelT'>Name:</label>
                <input  id='inputT' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name'
                name='name'  required />
                 <LuUserCircle2 className = 'iconT' />
            </div>
            <div id='Form-GroupT' >
                <label id='labelT'>Email:</label>
                <input id='inputT' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email'
                name='Email'  required />
                    <MdOutlineMail className = 'iconT' />
            </div>
            <div id='Form-GroupT'>
                <label id='labelT'>Password:</label>
                <input id='inputT' type={!isVisible ? "password":"text"} value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'
                name='Password'  required />
              <span className='iconT' onClick={toggle}>
                  {isVisible  ? <IoEyeOutline/> : <IoEyeOffOutline />}
              </span>
            </div>
            <div id='Form-GroupT' >
            <label id='labelT'>Gender:</label>
            <div className="radio-groupT">
                   <input id='inputT'
                     type="radio"
                     value="male"
                     checked={gender === "male"}
                     onChange={() => setGender("male")}
                     required
                   />
                   <label className='labelm'>Male</label>
                   <input
                     id= "inputFemale"
                     type="radio"
                     value="female"
                     checked={gender === "female"}
                     onChange={() => setGender("female")}
                     required
                   />
                   <label className='labelf'>Female</label>
                 </div>
                 {genderError && <p style={{color:'red'}}>{genderError}</p>}

            </div>
            <div id='Form-GroupT' >
                <label id='labelT'>DOB:</label>
                <input id='inputT' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />  
            </div>
            <div id='Form-GroupT' >
                <label id='labelT'>Join-Date:</label>
                <input id='inputT' type='date' value={joinDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setJoinDate(e.target.value)} required />
            </div>
           
            <div>
                <label id='labelT'>Standard</label>
                <select  id = 'inputD' title='Select Standard' value={standard} onChange={handleStandard}>
                    <option disabled={true}>--Select--</option>
                    {standarddata.map((e) => <option value={e} key={e}>{e}</option> )}
                </select>
                <label className='labelD'>Subject</label>
                   <select  id ='inputSD' value={subject} onChange={handleSubject}>
                     {subjectdata.map((e) => <option value={e} key={e}>{e}</option> )}
                </select>
              </div>
              {standardError && <p style={{color:'red'}}>{standardError}</p>}
              {subjectError  && <p style={{color:'red', marginLeft:'192px',marginTop:'-25px'}}>{subjectError}</p>}
         </div>
            
        <div id='Form-Part-Two' >        

            <div id ='Form-GroupT'>
                <label id='labelT'>Address:</label>
                <textarea id='inputText'   value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Address'
                name='Address'  required />
            </div> 
            <div  id ='Form-GroupT'>
                <label id='labelT'>City:</label>
                <input id='inputT' 
                type='text' 
                value={city}
                onChange={(e)=> setCity(e.target.value)}
                placeholder='Enter Your City'
                name='city'  required />
            </div>
           
            <div className="form-groupr">
            <label id='labelT'>District:</label>
            <input
              id="inputT"
              //id="district"
              name="district"
              value={districts}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="District"
              required
            />
          
           <div id ='Form-GroupT'>
                <label id='labelT'>State:</label>
                <input id='inputT' 
                type='text' 
                value={state} 
                placeholder='State'
                onChange={(e)=> setState(e.target.value)}
                name='state'  required />
            </div>
            <div  id ='Form-GroupT'>
                <label id='labelT'>PinCode:</label>
                <input id='inputT' 
                type='text'
                 value={pinCode} 
                 placeholder='PinCode'
                 onChange={(e)=> setPinCode(e.target.value)}
                name='pincode'  required />
            </div>

           
           <div id ='Form-GroupT'>
               <label id='labelT'>Mobile Number:</label>
               <div className='phone_numberT'>
               <PhoneInput
                   country={'in'}
                   value={mobileNumber}
                   disableDropdown={true}
                   onChange={handlePhoneChange}
                   isValid={isValidPhone}
                   inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                   containerStyle={{padding:'1px',marginLeft:'15px'}}
                />
                 </div>
                 {mobileError && <p style={{color:'red'}}>{mobileError}</p>}

               </div>
               
        </div>
        </div>
            <button id ='Button-T'onClick={()=>handleSubmit} type='submit'>ADD</button>
         </form>
    </div>
    <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />


    </>
    </AdminSidebar>
    
  )
}

export default TeacherForm;