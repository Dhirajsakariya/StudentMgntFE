import React,{useState} from 'react'
import moment from 'moment';
import './StudentForm.css'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Sidebar from '../Sidebar/Sidebar';
import {  useHistory } from 'react-router-dom';
import {toast,Toaster} from 'react-hot-toast';
import axios from 'axios';
import Config from './Config';

const StudentForm = () => {
   
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
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedBloodGroup,setSelectedBloodGroup] = useState("");
    const [selectedStandarad,setSelectedStandard] = useState("");
    const [pinCode,setPinCode] = useState('');
    const [isVisible,setVisible] = useState('');
    const[genderError,setGenderError]=useState('');
    const[mobileError,setMobileError]=useState('');
    const standard = ["8A","8B","9A","9B","10A","10B"];
    const handelStandardChange = (e) => {
      setSelectedStandard(e.target.value);
    }

      
     const bloodGroup = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
    // const [selectedBloodGroup,setSelecteBloodGroup] = useState("");

      const handleBloodGroupChange = (e) => {
        setSelectedBloodGroup(e.target.value);
     };

    const toggle = () => {
      setVisible(!isVisible);
    };

    const districts = [
        "Ahmedabad", "Amreli","Anand","Aravalli","Banaskantha", "Bharuch", "Bhavnagar", "Botad","Chhota Udaipur", "Dahod", "Dang","Devbhoomi Dwarka",
        "Gandhinagar","Gir Somnath","Jamnagar", "Junagadh", "Kutch","Kheda", "Mahisagar","Mehsana","Morbi","Narmada", "Navsari", "Panchmahal","Patan",
        "Porbandar","Rajkot","Sabarkantha","Surat", "Surendranagar","Tapi","Vadodara", "Valsad"
      ];
    
      const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
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
              const emailresponse =await axios.post(`${Config.ApiUrl}Student/PostStudent`,{
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
              District : districts,
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
    <Sidebar>
    <>
        <div className='containerS'>
            <form onSubmit={handleSubmit}>
                <div className='div-one'>
                <h2 className='studentformh2'>Student Detail</h2>
                <div className='form-groups'>
                    <label className='labels'>Roll  No:</label>
                    <input className='inputs' type='text' value={rollNo} onChange={(e)=> setRollNo(e.target.value)} placeholder='Enter RollNo'
                    name='Rollno'  required />
                </div>
                <div className='form-groups'>
                    <label className='labels'>Name:</label>
                    <input className='inputs' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name'
                    name='name'  required />
                </div>
                <div className='form-groups'>
                    <label className='labels'>Email:</label>
                    <input className='inputs' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email'
                    name='Email'  required />
                </div>
                <div className='form-groups'>
                    <label className='labels'>Password:</label>
                    <input className='inputs' type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'
                    name='Password'  required />
                </div>
                <div className='form-groups'>
                <label className='labels'>Gender:</label>
                <div className="radio-groupa">
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
                <div className='form-groups'>
                    <label className='labels'>DOB:</label>
                    <input className='inputs' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />  
                </div>

                <div>
                 <label className='labels' htmlFor="bloodgroup">Select Standard:</label>
                 <select className='inputs'  value={selectedStandarad} onChange={handelStandardChange}>
                 <option value="">--Select Standard--</option>
                  {standard.map((standard, index) => (
                  <option key={index} value={standard}>{standard}</option>
                   ))}
                 </select>
             </div>

                <div className='form-groups'>
                    <label className='labels'>Join-Date:</label>
                    <input className='inputs' type='date' value={joinDate} max={moment().format("YYYY-MM-DD")} onChange={(e) => setJoinDate(e.target.value)} required />
                </div>
           </div>
        
            <div className='div-two'>        
                    
              <div>
                 <label className='labelh' htmlFor="bloodgroup">Select a BloodGroup:</label>
                 <select className='inputh'  value={selectedBloodGroup} onChange={handleBloodGroupChange}>
                 <option value="">--Select BloodGroup--</option>
                  {bloodGroup.map((bloodGroup, index) => (
                  <option key={index} value={bloodGroup}>{bloodGroup}</option>
                   ))}
                 </select>
             </div>
                <div className='form-grouph'>
                    <label className='labelh'>Address:</label>
                    <textarea className='inputtextarea'  value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Address'
                    name='Address'  required />
                </div> 
                <div className='form-grouph'>
                    <label className='labelh'>City:</label>
                    <input className='inputh' type='text' value={city} onChange={(e)=> setCity(e.target.value)} placeholder='Enter Your City'
                    name='city'  required />
                </div>
               
                <div>
                <label className='labelh' htmlFor="district">Select a district:</label>
                     <select className='inputh'  value={selectedDistrict} onChange={handleDistrictChange}>
                     <option value="">--Select District--</option>
                      {districts.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                       ))}
                     </select>
                     {/* {selectedDistrict &&  <p style={{color:'black',position:'right'}}>You selected: {selectedDistrict}</p>} */}
               </div>
               <div className='form-grouph'>
                    <label className='labelh'>State:</label>
                    <input className='inputh' type='text' value='Gujarat' onChange={(e)=> setState(e.target.value)}
                    name='city'  required />
                </div>

                <div className='form-grouph'>
                <label className='labelh'>PinCode:</label>
                <input className='inputh' type='text' value={pinCode} onChange={(e)=> setPinCode(e.target.value)} placeholder='Enter PinCode'
                name='pincode'  required />
            </div>

               <div className='form-grouph'>
                   <label className='labelh'>Mobile Number:</label>
                   <div className='phone_numberS'>
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
             <button className='btnnext' type='submit'>Next</button>
             </form>
        </div>
        <Toaster/>
        </>
        </Sidebar>
  )
}
export default StudentForm