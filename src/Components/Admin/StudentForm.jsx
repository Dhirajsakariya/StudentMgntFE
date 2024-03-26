import React,{useState,useEffect} from 'react'
import moment from 'moment';
import './StudentForm.css'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import {  useHistory } from 'react-router-dom';
import {toast,Toaster} from 'react-hot-toast';
import axios from 'axios';
import config from '../Login/config';


const StudentForm = () => {
   
    const [rollNo,setRollNo] =useState('');
    const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [joinDate,setJoinDate] = useState('');
    const [grNo,setGrNo] = useState('');
    //const [bloodGroup,setBloodGroup] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const[district,setDistrict] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [selectedBloodGroup,setSelectedBloodGroup] = useState("");
    const [standard,setStandard] = useState("");
    const[standardError,setStandardError]=useState('');
    const [standarddata, setStandardData] = useState([]);
    const [pinCode,setPinCode] = useState('');
    const[genderError,setGenderError]=useState('');
    const[mobileError,setMobileError]=useState('');
   
    const fetchStandardData = async () => {
      try {
        const response = await axios.get(`${config.ApiUrl}DropDown/Standard`);
        setStandardData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      fetchStandardData();
    }, []);

    const handleStandard = (e) =>{
      setStandard(e.target.value);
      setStandardError('');
    }
  
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
              GrNo : grNo,
              Name : name,
              Email : email,
              Password : password,
              Gender : gender,
              BirthDate : birthday,
              MobileNumber : mobileNumber,
              JoinDate : joinDate,
              BloodGroup : bloodGroup,
              Address : address,
              City : city,
              District : district,
              State : state,
              PinCode : pinCode,
            
              
          });
          const userERes = emailresponse.data;
          if(userERes === "email already exists")
          {
                toast.error("User already exist !!!");
                return;
          }
          else{
            setTimeout(() => {
              navigate.push('/FamilyForm') 
              }, 1500);
            toast.success("Registration Successfull!")
          }
  
      } catch {
          toast.error('Signup failed. Please try again later.');
        }
          return;
    };
  
  
   
  return (
    <AdminSidebar>
    <>
        <div id='containerstudentform'>
            <form onSubmit={handleSubmit}>
                
                  <h2 id='studentformh2studentform'>Student Detail</h2>
                  <div className='form-group1'>
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Gr No:</label>
                    <input id='inputstudentform' type='text' value={grNo} onChange={(e)=> setGrNo(e.target.value)} placeholder='Enter Gr No.'
                      name='grno'  required />
                  </div>

                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Roll  No:</label>
                    <input id='inputstudentform' type='text' value={rollNo} onChange={(e)=> setRollNo(e.target.value)} placeholder='Enter RollNo'
                    name='Rollno'  required />
                  </div>

                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Name:</label>
                    <input id='inputstudentform' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name'
                    name='name'  required />
                  </div>
                
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Email:</label>
                    <input id='inputstudentform' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email'
                    name='Email'  required />
                  </div>
                
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Password:</label>
                    <input id='inputstudentform' type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'
                    name='Password'  required />
                  </div>
                
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Gender:</label>
                      <div id="radio-groupa">
                       <input id='inputstudentform'
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

                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>DOB:</label>
                    <input id='inputstudentform' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />  
                  </div>

                  <div className='subjectselection'>
              <div>
                <label className='labelr'>Standard Subject</label>
                <select className='StandardSelection' title='Select Standard' value={standard} onChange={handleStandard}>
                    {standarddata.map((e) => <option value={e} key={e}>{e}</option> )}
                </select>
              </div>
              {standardError && <p style={{color:'red'}}>{standardError}</p>}
           </div>
                  
           </div>       
            
              
              <div id='form-groupstudentform-2'>        
                    
              <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Join-Date:</label>
                    <input id='inputstudentform' type='date' value={joinDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setJoinDate(e.target.value)} required />
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
                
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>Address:</label>
                    <input  type='textarea' id='inputtextarea'  value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Address'
                    name='Address'  required />
                 </div> 
               
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>City:</label>
                    <input id='inputstudentform' type='text' value={city} onChange={(e)=> setCity(e.target.value)} placeholder='Enter Your City'
                    name='city'  required />
                  </div>
               
                  <div id='form-groupstudentform'>
                  <label id='labelstudentform'>District:</label>
                    <input id='inputstudentform' type='text' value={district} onChange={(e)=> setDistrict(e.target.value)} placeholder='Enter Your District'
                    name='district'  required />
                  </div>   
               
                  <div id='form-groupstudentform'>
                    <label id='labelstudentform'>State:</label>
                    <input id='inputstudentform' type='text' value='Gujarat' onChange={(e)=> setState(e.target.value)}
                    name='city'  required />
                  </div>

                  <div id='form-groupr'>
                  <label id='labelstudentform'>PinCode:</label>
                  <input id='inputstudentform' type='text' value={pinCode} onChange={(e)=> setPinCode(e.target.value)} placeholder='Enter PinCode'
                  name='pincode'  required />
                </div>

                <div id='form-groupstudentform'>
                   <label id='labelstudentform'>Mobile Number:</label>
                   <div id='phone_numberstudentform'>
                   <PhoneInput
                       country={'in'}
                       value={mobileNumber}
                       onChange={handlePhoneChange}
                       disableDropdown={true}
                       isValid={isValidPhone}
                       inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                       containerStyle={{padding:'1px'}}
                    />
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