import React,{useState,useEffect} from 'react'
import moment from 'moment';
import './StudentForm.css'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {  useHistory } from 'react-router-dom';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import {MdRealEstateAgent} from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";
import { GrMapLocation } from "react-icons/gr";
import { TbMapPinCode } from "react-icons/tb";
import {CgMail } from "react-icons/cg";
import {FaRegUserCircle,FaRegAddressCard} from "react-icons/fa";
import {toast,Toaster} from 'react-hot-toast';
import axios from 'axios';
import config from '../Login/config';
import { useParams } from 'react-router-dom';


const StudentForm = () => {  
    const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [joinDate,setJoinDate] = useState('');
    
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const[district,setDistrict] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [selectedBloodGroup,setSelectedBloodGroup] = useState("");
    const [pinCode,setPinCode] = useState('');
    const[genderError,setGenderError]=useState('');
    const[mobileError,setMobileError]=useState('');
    const [isVisible, setVisible] = useState(false);
    const [isDisable, setDisable] = useState(false);
    const [standard,setStandard] = useState('');
    const[standardError,setStandardError]=useState('');
    const [standardData, setStandardData] = useState([]);

    useEffect(() => {
      const fetchStandards = async () => {
        try {
          const response = await fetch(`${config.ApiUrl}DropDown/Standard`);
          if (response.ok) {
            const data = await response.json();
            setStandardData(data);
            console.log(data);
          } else {
            throw new Error('Failed to fetch standard');
          }
        } catch (error) {
          console.error('Error fetching standard:', error);
        }
      };  
      fetchStandards();
    }, []);
  
  const toggle = () => {
      setVisible(!isVisible);
    };
  
  const toggleBtn = () => { 
      setDisable(!isDisable);
    };
  
  const str = standard;
  const parts = str.split("-");
  
  const bloodGroup = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
 
  const handleBloodGroupChange = (e) => {
     setSelectedBloodGroup(e.target.value);
  };

  const handlePhoneChange = (value) => {
    setMobileNumber(value);
    const phoneRegex = /^[+]?[0-9]{8,}$/;
    setIsValidPhone(phoneRegex.test(value));
  };
      
  const navigate=useHistory();

  const handleSubmit = async (e) => {
        e.preventDefault();
        if(!standard){
          setStandardError('Select standard');
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
              const emailresponse =await axios.post(`${config.ApiUrl}Student/PostStudent`,{
              Name : name,
              Email : email,
              Password : password,
              Gender : gender,
              BirthDate : birthday,
              MobileNumber : mobileNumber,
              JoinDate : joinDate,
              BloodGroup : selectedBloodGroup,
              Address : address,
              City : city,
              District : district,
              State : state,
              PinCode : pinCode,
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
              navigate.push('/ParentsPortal') 
              }, 1500);
            toast.success("Registration Successfull!")
          }
  
          } catch {
          toast.error('Signup failed. Please try again later.');
        }
        return;
};
  

const { id } = useParams();
  useEffect(() => {
    if (id) {
      // Fetch student details based on ID
      axios.get(`${config.ApiUrl}Student/GetStudent${id}`)
        .then((response) => {
          const studentData = response.data;
          // Set the fetched student data into state variables to pre-fill the form fields
          setName(studentData.name);
          setEmail(studentData.email);
          // Similarly, set other state variables as needed
        })
        .catch((error) => {
          console.error('Error fetching student details:', error);
          // Handle error fetching student details
        });
    }
  }, [id]);
   return (
    <AdminSidebar>
      <>
        <div id='containerstudentform'>
            <form onSubmit={handleSubmit}>
                
              <h2 id='studentformh2studentform'>Student Detail</h2>
                  
                <div className='form-group1'>
                  
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Name:</label>
                      <input 
                      id='inputstudentform'
                      type='text' value={name} 
                      onChange={(e)=> setName(e.target.value)} 
                      placeholder='Enter Full Name'
                     name='name'  
                     required />
                    <FaRegUserCircle id='iconstudentform'/>
                  </div>
                
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Email:</label>
                    <input 
                    id='inputstudentform' 
                    type='email' 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)} 
                    placeholder='Enter Email'
                    name='Email'  required />
                    <CgMail id='iconstudentform'/>
                  </div>
                
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Password:</label>
                    <input 
                    id='inputstudentform'  
                    type={!isVisible ? "password" : "text"} 
                    name='password' 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~\@\!\#\$\%\^\&\*\?]).{8,15}$"
                    title="Must contain at least one  number and one uppercase and one lowercase letter and One special Charecter, and at least 8 characters"
                    autoComplete='current-password'
                    required/>
                    <span id='iconstudentformeye' onClick={toggle}>
                    {isVisible  ? <IoEyeOutline/> : <IoEyeOffOutline />}</span>
                  </div>

                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Gender:</label>
                      <div id="radio-groupa">
                       <input id='inputstudentform'
                         type="radio"
                         value="male"
                         checked={gender === "male"}
                         onChange={() => setGender("male")}
                         required/>
                       <label>Male</label>
                       <input
                         type="radio"
                         value="female"
                         checked={gender === "female"}
                         onChange={() => setGender("female")}
                         required/>
                       <label>Female</label>
                     </div>
                      {genderError && <p style={{color:'red'}}>{genderError}</p>}
                  </div>

                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Date Of Birth:</label>
                     <input 
                      id='inputstudentform' 
                      type='date' 
                      value={birthday} 
                      max={moment().format("YYYY-MM-DD")} 
                      onChange={(e) => setBirthday(e.target.value)} 
                      required />  
                  </div>

                  <div>
                    <label id='labelstudentform' htmlFor="bloodgroup">Select a BloodGroup:</label>
                     <select id='inputstudentform'  value={selectedBloodGroup} onChange={handleBloodGroupChange}>
                      <option value="">--Select BloodGroup--</option>
                        {bloodGroup.map((bloodGroup, index) => (
                          <option key={index} value={bloodGroup}>{bloodGroup}</option>
                          ))}
                    </select>
                  </div>
                  
                 <div className='form-groupr'>
                  <div className='subjectselection'>
                   <div>
                    <label className='labelr'>Standard</label>
                    <select
                      value={standard}
                      id='inputstudentform'
                      required
                      onChange={(e) => setStandard(e.target.value)}>
                      <option value="">Select Standard</option>
                        {standardData.map((standard) => (
                      <option key={standard} value={standard}>
                       {standard}
                      </option>
                       ))}
                    </select>
                    </div>
                    {standardError && <p style={{color:'red'}}>{standardError}</p>}
                  </div>
                </div>
            </div>     


           <div id='form-groupstudentform-2'>        
                    
            <div id='form-groupstudentform'>
              <label id='labelstudentform2'>Join-Date:</label>
                <input 
                id='inputstudentform2' 
                type='date' 
                value={joinDate} max={moment().format("YYYY-MM-DD")} 
                onChange={(e) => setJoinDate(e.target.value)} 
                required />
            </div>
                
            <div id='form-groupstudentform'>
              <label id='labelstudentform2'>Address:</label>
                <input 
                type='textarea' 
                id='inputtextarea'  
                value={address} 
                onChange={(e)=> setAddress(e.target.value)} 
                placeholder='Address'
                name='Address'  required />
                <FaRegAddressCard  id='iconstudentform'/>
            </div> 
               
            <div id='form-groupstudentform'>
              <label id='labelstudentform2'>City:</label>
                <input 
                id='inputstudentform2' 
                type='text' 
                value={city} 
                onChange={(e)=> setCity(e.target.value)} 
                placeholder='Enter Your City'
                name='city'
                required />
                <LiaCitySolid id='iconstudentform'/>
            </div>
               
            <div id='form-groupstudentform'>
              <label id='labelstudentform2'>District:</label>
                <input
                id='inputstudentform2' 
                type='text' 
                value={district} 
                onChange={(e)=> setDistrict(e.target.value)} 
                placeholder='Enter Your District'
                name='district'  required />
                <GrMapLocation id='iconstudentform' />
            </div>   
               
            <div id='form-groupstudentform'>
              <label id='labelstudentform2'>State:</label>
                <input 
                id='inputstudentform2' 
                type='text' 
                value={state} 
                onChange={(e)=> setState(e.target.value)} 
                placeholder='Enter Your State'
                name='city'  required />
                <MdRealEstateAgent id='iconstudentform' />
            </div>

            <div id='form-groupr'>
              <label id='labelstudentform2'>PinCode:</label>
                <input 
                id='inputstudentform2' 
                type='text' 
                value={pinCode} 
                onChange={(e)=> setPinCode(e.target.value)}
                placeholder='Enter PinCode'
                name='pincode'  
                required />
                <TbMapPinCode id='iconstudentform'/>
            </div>

            <div id='form-groupstudentform'>
              <label id='labelstudentform2'>Mobile Number:</label>
                <div id='phone_numberstudentform'>
                  <PhoneInput
                       country={'in'}
                       value={mobileNumber}
                       onChange={handlePhoneChange}
                       disableDropdown={true}
                       isValid={isValidPhone}
                       inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                       containerStyle={{padding:'1px'}}/>
                </div>
                {mobileError && <p style={{color:'red'}}>{mobileError}</p>}
            </div>
          </div>
          <button id='btnnextstudentform' type='submit'>Next</button>
        </form>
      </div>
      <Toaster/>
    </>
  </AdminSidebar>
  )
}
export default StudentForm