import React,{useState} from 'react'
import moment from 'moment';
import './StudentForm.css'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


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
    <>
        <div className='containers'>
            <form>
                <div className='div-one'>
                <h2 className='student-form'>Student Detail</h2>
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
                </div>
                <div className='form-groups'>
                    <label className='labels'>DOB:</label>
                    <input className='inputs' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />  
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
                    <textarea className='inputh'  value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Address'
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
                   <label className='labelh'>Mobile Number:</label>
                   <div className='phone_number'>
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
                   </div>
                   
            </div>
           



                <button className='btnnexts' type='submit'>Next</button>
             </form>
        </div>
        </>
  )
}


export default StudentForm