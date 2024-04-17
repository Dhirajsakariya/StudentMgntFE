import React,{useState,useEffect} from 'react'
import moment from 'moment';
import './StudentForm.css'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {  useHistory,Redirect } from 'react-router-dom';
import AdminSidebar from '../Sidebar/AdminSidebar';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
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
    const [redirectToNotFound, setRedirectToNotFound] = useState(false);
    const [currentUserRole,setCurrentUserRole]=useState('');
    const [photo, setPhoto] = useState(null); // State for storing selected photo

    
  
  // useEffect(() => {
    
  //   setRole('admin');
  // }, []);
  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      setCurrentUserRole(userRole.Role)
      console.log('loggedInRole for Student Form', userRole.Role);
      if (userRole.Role !== 'teacher' && userRole.Role !== 'admin') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);

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
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('birthday', birthday);
    formData.append('joinDate', joinDate);
    formData.append('bloodGroup', selectedBloodGroup); 
    formData.append('city', city);
    formData.append('gender', gender);
    formData.append('state', state);
    formData.append('district', district);
    formData.append('mobileNumber', mobileNumber);
    formData.append('address', address);
    formData.append('password', password);
    formData.append('pinCode', pinCode);
    formData.append('standardNumber', parts[0]);
    formData.append('section', parts[1]);
    formData.append('photo', photo); 
  
    try {
      const response = await axios.post(`${config.ApiUrl}Student/PostStudentWithPhoto`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      toast.success("Student added successfully");
  
      clearForm();
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.includes("already exists")) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        console.error("Error adding student:", error);
        toast.error("Failed to add student");
      }
    }
  };
  
  
  // Function to clear the form fields after successful submission
  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setGender('');
    setBirthday('');
    setJoinDate('');
    setAddress('');
    setCity('');
    setState('');
    setDistrict('');
    setMobileNumber('');
    setSelectedBloodGroup('');
    setPinCode('');
    setPhoto(null);
  };
  

const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios.get(`${config.ApiUrl}Student/GetStudent${id}`)
        .then((response) => {
          const studentData = response.data;
          setName(studentData.name);
          setEmail(studentData.email);
        })
        .catch((error) => {
          console.error('Error fetching student details:', error);
        });
    }
  }, [id]);

  // if (role !== 'admin') {
  //   return <Redirect to="/PageNotFound" />;
  // }
  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />; 
  }
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]); // Capture selected photo
  };
  

   return (
    <>
      { currentUserRole =='admin' ?
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
                       <input
                         type="radio"
                         id='input'
                         value="male"
                         checked={gender === "male"}
                         onChange={() => setGender("male")}
                         required/>
                       <label id='label'>Male</label>
                       <input 
                         type="radio"
                         id='input'
                         value="female"
                         checked={gender === "female"}
                         onChange={() => setGender("female")}
                         required/>
                       <label id='label'>Female</label>
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
                      <option value="" disabled={true}>--Select BloodGroup--</option>
                        {bloodGroup.map((bloodGroup, index) => (
                          <option key={index} value={bloodGroup}>{bloodGroup}</option>
                          ))}
                    </select>
                  </div>
                  
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Upload photo:</label>
                      <input 
                            id='inputstudentformphoto' 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoChange}  
                            name="photo" 
                      />
                  </div>
                  <div id='form-groupstudentform'>
              <label id='labelstudentform2'>Mobile Number:</label>
                <div id='phone_numberstudentform'>
                  <PhoneInput
                    country={'in'}
                    value={mobileNumber}
                    disableDropdown={true}
                    onChange={handlePhoneChange}
                    inputStyle={{backgroundColor: 'white', borderTopColor: '#24305E' }}
                    containerStyle={{padding:'0.5px'}} 
                    required/>
                </div>
                {mobileError && <p style={{color:'red'}}>{mobileError}</p>}
            </div>

                 
            </div>    

           <div id='form-groupstudentform-2'>        
                    

           <div className='form-groupr'>
                  <div className='subjectselection'>
                   <div>
                    <label id='labelstudentform'>Standard</label>
                    <select
                      value={standard}
                      id='inputstudentform'
                      required
                      onChange={(e) => setStandard(e.target.value)}>
                      <option value="" disabled={true}>Select Standard</option>
                        {standardData.map((standard) => (
                      <option key={standard} value={standard} >
                       {standard}
                      </option>
                       ))}
                    </select>
                    </div>
                    {standardError && <p style={{color:'red'}}>{standardError}</p>}
                  </div>
                </div>
            <div id='form-groupstudentform'>
              <label id='labelstudentform2'>Join-Date:</label>
                <input 
                id='inputstudentform2' 
                type='date' 
                value={joinDate}
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

           
          </div>
          <button id='btnnextstudentform' type='submit'>Next</button>
        </form>
      </div>
      <Toaster/>
    </>
  </AdminSidebar>
  :
  <TeacherSidebar>
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
                 <input
                   type="radio"
                   id='input'
                   value="male"
                   checked={gender === "male"}
                   onChange={() => setGender("male")}
                   required/>
                 <label id='label'>Male</label>
                 <input 
                   type="radio"
                   id='input'
                   value="female"
                   checked={gender === "female"}
                   onChange={() => setGender("female")}
                   required/>
                 <label id='label'>Female</label>
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
                <option value="" disabled={true}>--Select BloodGroup--</option>
                  {bloodGroup.map((bloodGroup, index) => (
                    <option key={index} value={bloodGroup}>{bloodGroup}</option>
                    ))}
              </select>
            </div>
            
           <div className='form-groupr'>
            <div className='subjectselection'>
             <div>
              <label id='labelstudentform'>Standard</label>
              <select
                value={standard}
                id='inputstudentform'
                required
                onChange={(e) => setStandard(e.target.value)}>
                <option value="" disabled={true}>Select Standard</option>
                  {standardData.map((standard) => (
                <option key={standard} value={standard} >
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
          value={joinDate}
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
              disableDropdown={true}
              onChange={handlePhoneChange}
              inputStyle={{backgroundColor: 'white', borderTopColor: '#24305E' }}
              containerStyle={{padding:'0.5px'}} 
              required/>
          </div>
          {mobileError && <p style={{color:'red'}}>{mobileError}</p>}
      </div>
    </div>
    <button id='btnnextstudentform' type='submit'>Next</button>
  </form>
</div>
<Toaster/>
</>
  </TeacherSidebar>
}
</>
  )
}
export default StudentForm