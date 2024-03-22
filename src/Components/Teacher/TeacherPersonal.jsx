import React from 'react'
import { useState } from 'react';

const TeacherPersonal = () => {
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
    
  return (
    <div>
        <form action="">
            <div>
                <h2>Teacher PersonalInfo</h2>
                
            </div>
        </form>
    </div>
  )
}

export default TeacherPersonal