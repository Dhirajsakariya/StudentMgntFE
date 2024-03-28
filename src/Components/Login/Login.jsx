import React, { useState, useEffect } from 'react';
import './Login.css';
import config from './config'; 
import { useHistory } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; 
import { CgMail } from 'react-icons/cg';
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [id, setId] = useState('');
    const navigate = useHistory();
    const [role, setRole] = useState('');
    const [loginSuccessMessageShown, setLoginSuccessMessageShown] = useState(false); 
    const [rememberMe, setRememberMe] = useState(false); // Add rememberMe state

    useEffect(() => {
        const storedUser = localStorage.getItem('rememberedUser');
        const storedPassword = localStorage.getItem('rememberedPassword');
        if (storedUser && storedPassword) {
            setEmail(storedUser);
            setPassword(storedPassword);
            setRememberMe(true); // Set rememberMe state when rememberedUser and rememberedPassword are found
        }
    }, []);

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    useEffect(() => {
        const registeredEmail = localStorage.getItem('registeredEmail');
        if (registeredEmail) {
            setEmail(registeredEmail);
            localStorage.removeItem('registeredEmail'); // Remove the email after fetching it           
        }
    }, []); // Empty dependency array means this effect runs only once when component mounts

    const handleUserChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => { 
        setShowPassword(!showPassword);
    };
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role) {
            toast.error('Please select your role!');
            return;
        }
        
        try {
            const response = await fetch(`${config.ApiUrl}AdminTeacher/IsLogin`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Role: role, email: email, password: password })
            });
        

            if (response.ok) {
                const data = await response.json();
                console.log('id', data.id);
                setId(data.id);
                localStorage.setItem('loggedInEmail', JSON.stringify(data.email));
                localStorage.setItem('loggedInUserId', JSON.stringify(data.id));
                localStorage.setItem('loggedInRole', JSON.stringify(data.role));

               
                setTimeout(() => {
                    switch (role) {
                        case 'admin':
                            navigate.push('/AdminSidebar');
                            break;
                        case 'teacher':
                            navigate.push('/TeacherPersonal');
                            break;
                        case 'student':
                            navigate.push('/StudentSidebar');
                            break;
                        default:
                            navigate.push('/'); 
                            break;
                    }
                }, 1500); 
                
                if (!loginSuccessMessageShown) {
                    toast.success("Login Successfully!");
                    setLoginSuccessMessageShown(true);
                }
                    localStorage.setItem("loggedEmail", JSON.stringify({
                    email,
                    id
                }));
        
            } else if (response.status === 401) {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            } else {
                toast.error('Login failed. Please try again later.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed');
        }
    };

    const customToastStyle = {
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        fontSize: '16px',
        fontWeight: 'bold',
    };

    return (
        <div className='containerl'>
            <form onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                <input type='hidden' value={id} onChange={() => {}} /> {/* Add onChange event handler to prevent uncontrolled input warning */}
                <div className='form-groupl'>
                    <label className='labellogin'>User Role</label>
                    <div className='radio-group3'>
                        <input className='inputr' type="radio" name="role" id="admin" value={1} onChange={e => setRole('admin')} />
                        <label htmlFor="administrator">Admin</label>
                        <input className="form-check-input" type="radio" name="role" id="teacher" value={2} onChange={e => setRole('teacher')} />
                        <label htmlFor="staff">Teacher</label>
                        <input className="form-check-input" type="radio" name="role" id="student" value={3} onChange={e => setRole('student')} />
                        <label htmlFor="user">Student</label>
                    </div>
                </div>
                <div className='form-groupl'>
                    <label className='labell'>Email:</label>
                    <input
                        className='inputl'
                        type='email'
                        value={email}
                        onChange={handleUserChange}
                        placeholder='Enter Your Email'
                        required
                    /> 
                </div>
                <CgMail className='icone'/>
                <div className='form-groupl'>
                    <label className='labell'>Password:</label>
                    <div className='password-input'>
                        <input className='inputl' type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder='Enter Your Password' required />
                        {showPassword ? <IoEyeOutline className='iconl' onClick={togglePasswordVisibility} /> : <IoEyeOffOutline className='iconl' onClick={togglePasswordVisibility} />}
                    </div>
                </div>
                <div className='forgotl'>
                    <input type='checkbox' checked={rememberMe} onChange={handleRememberMeChange} /><span>Remember me</span>
                    <a href='ForgotPassword' className='f'>Forgot Password?</a>
                </div>
                <div>
                    <button type='submit' className='button'> Login </button>
                </div>
                <div className='register-link'>
                    <p className='p'>Don't have an account? <a href='Registration' className='f'>Register</a></p>
                </div>
            </form>
            <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Login;