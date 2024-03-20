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
  const [state] = useState('Gujarat'); // Default state is Gujarat
  const districts = ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"];
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');
  const [role, setRole] = useState();

  const [isVisible, setVisible] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [error] = useState('');

  const toggle = () => {
      setVisible(!isVisible);
    };

  const toggleBtn = () => { 
      setDisable(!isDisable);
    };

  const navigate=useHistory();

  const handlePhoneChange = (value) => {
    setMobileNumber(value);
    const phoneRegex = /^[+]?[0-9]{8,}$/;
    setIsValidPhone(phoneRegex.test(value));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
    if (!name || !email || !birthday || !password || !confirmPassword) {
      toast.error('All fields are required!');
      return;
    }
    if (!name) {
      toast.error('Please enter your name!');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address!');
      return;
    }
    if (!password) {
      toast.error('Please enter a password!');
      return;
    }
    if (!confirmPassword || password !== confirmPassword) {
      toast.error('Password does not match!');
      return;
    }
    if (!gender) {
      toast.error('Please select your gender!');
      return;
    }
    if (!birthday) {
      toast.error('Please select your birthday!');
      return;
    }
    if (!isValidPhone) {
      toast.error('Please enter a valid mobile number!');
      return;
    }
    if (!joinDate) {
      toast.error('Please select your join date!');
      return;
    }
    if (!address) {
      toast.error('Please enter your address!');
      return;
    }
    if (!state) {
      toast.error('Please enter your state!');
      return;
    }
    if (!selectedDistrict) {
      toast.error('Please select your district!');
      return;
    }
    if (!city) {
      toast.error('Please enter your city!');
      return;
    }
    if (!pinCode) {
      toast.error('Please enter your pin code!');
      return;
    }
    if (!role) {
      toast.error('Please select your role!');
      return;
    }

  try {
    const addUserDto = {
      Name: name,
      Email: email,
      BirthDate: birthday,
      Password: password
    };

    const response = await fetch(`${config.ApiUrl}User/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addUserDto)
    });
    const result = await response.text();
    console.log(result);
    if (result === "User Created.") 
    {            
      setTimeout(() => {
        navigate.push('/') 
        }, 1500);
      toast.success("Registration Successfull!")
      localStorage.setItem('registeredEmail', email);
    } 
    else if (result === "User Already Registered!") {
      toast.error('User with this email already exists!');
    } 
    else 
    {
      toast.error('Signup failed. Please try again later.');
    }
  } catch {
      toast.error('Signup failed. Please try again later.');
    }
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
            <label className='labelr'>User Role</label>
            <div className='radio-groupa'>
              <input className='inputr' type="radio" name="role" id="admin" value={1} onChange={e => setRole(e.target.value)} />
              <label htmlFor="administrator">Admin</label>
              <input className="form-check-input" type="radio" name="role" id="teacher" value={2} onChange={e => setRole(e.target.value)} />
              <label htmlFor="staff">Teacher</label>
              {/* <input className="form-check-input" type="radio" name="role" id="student" value={3} onChange={e => setRole(e.target.value)} />
              <label htmlFor="user">Student</label> */}
            </div>
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
              value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required/>
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
              />                     
            </div>
          </div>
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
            />
          </div>
          <div className="form-groupr">
            <label className='labelr'>Select District:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="inputr"
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
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
        <button className='buttonr' onClick={handleSubmit} type='submit'>Sign Up</button>
      </form>
    </div>
    <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
  </>
)
}

export default Registration;
