import React, { useState , useEffect} from 'react';
import './ForgotPassword.css';
import { useHistory } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { CgMail } from 'react-icons/cg';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import moment from 'moment';
import config from './config';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const navigate = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !birthday || !newPassword || !confirmPassword) {
            toast.error('All fields are required!');
            return;
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address!');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Password does not match!");
            return;
        }

        try {
            const response = await fetch(`${config.ApiUrl}User/ChangePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    birthDate: birthday,
                    password: newPassword
                }),
            });
            const result = await response.text();
            console.log(result);
            if (result === "Password updated successfully") 
            {      
                toast.success("Changed  Password Successfully!");     
                setTimeout(() => {
                    navigate.push('/') 
                  }, 1500); 
                localStorage.setItem('registeredEmail', email);
            } 
            else if (result === "Email or BirthDate not Exist") {
                toast.error('Email or Birthday Not Found!');
            } 
            else 
            {
                toast.error('Failed to update password!');
            }
    
        } catch {
            toast.error('Failed to update password!');
        }
    };

    const toggleNewPasswordVisibility = () => { 
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => { 
        setShowConfirmPassword(!showConfirmPassword);
    };

    const customToastStyle = {
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        fontSize: '16px',
        fontWeight: 'bold',
    };

    return (
        <div className='containerF'>
            <form onSubmit={handleSubmit}>
                <h2 className='signup'>Reset Password</h2>
                <div className='form-groupF'>
                    <label className='labelF'>Email:</label>
                    <input
                        className='inputF'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Your Email'
                        required
                    /> 
                </div>
                <CgMail className='icone'/>
                <div className='form-groupF'>
                    <label className='labelF'>Birthdate:</label>
                    <input className='inputF' type='date' value={birthday} max={moment().format("YYYY-MM-DD")} onChange={(e) => setBirthday(e.target.value)} required />
                </div>
                <div className='form-groupF'>
                    <label className='labelFp'>New Password:</label>
                        <input 
                            className='inputF' 
                            type={showNewPassword ? 'text' : 'password'} 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~\@\!\#\$\%\^\&\*\?]).{8,15}$"
                            title="Must contain at least one  number and one uppercase and one lowercase letter and One special Charecter, and at least 8 characters"
                            placeholder='Enter New Password' 
                            required 
                        />
                        {showNewPassword ? <IoEyeOutline className='iconl' onClick={toggleNewPasswordVisibility} /> : <IoEyeOffOutline className='iconl' onClick={toggleNewPasswordVisibility} />}
                </div>
                <div className='form-groupF'>
                    <label className='labelFp'>Confirm Password:</label>
                        <input 
                            className='inputF' 
                            type={showConfirmPassword ? 'text' : 'password'} 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~\@\!\#\$\%\^\&\*\?]).{8,15}$"
                            title="Must contain at least one  number and one uppercase and one lowercase letter and One special Charecter, and at least 8 characters" 
                            placeholder ='Confirm New Password' 
                            required 
                        />
                        {showConfirmPassword ? <IoEyeOutline className='iconle' onClick={toggleConfirmPasswordVisibility} /> : <IoEyeOffOutline className='iconl' onClick={toggleConfirmPasswordVisibility} />}
                      </div>
                <div>
                    <button type='submit' className='buttonF'>Reset Password</button>
                </div>
            </form>
            <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
        </div>
    );
};

export default ForgotPassword;
