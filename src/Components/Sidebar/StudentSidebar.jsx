import React, { useState,useEffect } from 'react';
import './Sidebar.css';
import config from '../Login/config';
import { NavLink } from 'react-router-dom';
import { LuUserCircle2 } from "react-icons/lu";
import { BiSolidUserDetail, BiLogOut } from 'react-icons/bi';
import { FaGooglePay } from "react-icons/fa";
import { FaBars } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import user_icon from '../Assets/user_icon.png';

const StudentSidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [Student, setStudent] = useState(null);
    const [error, setError] = useState(null);

    const menuItem = [
        {
            path: '/Student',
            name: 'Student',
            icon: <BiSolidUserDetail />
        },
        {
            path: '/StudentFeeForm',
            name: 'StudentFeeForm',
            icon: <FaGooglePay   />
        },

        {
            path: '/login',
            name: 'Logout',
            icon: <BiLogOut />
        }
    ];

    useEffect(() => {
        const fetchstudentDetails = async () => {
          try {
            const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));
    
            if (!storedId) {
              throw new Error('User ID not found in local storage');
            }
    
            const response = await fetch(`${config.ApiUrl}Student/GetStudent${storedId}`);
            
            if (!response.ok) {
              throw new Error(`Error fetching Student details: ${response.status} ${response.statusText}`);
            }
    
            const responseData = await response.json();
            setStudent(responseData);
          } catch (fetchError) {
            setError(fetchError.message);
          }
        };
    
        fetchstudentDetails();
      }, []);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!Student) {
        return <div>Loading...</div>;
      }

    return (
        <>
             <div id="menu-container">
                <div id="menu-trigger">
                    <h2 id='h2'>Welcome {Student.name}</h2>
                    <div
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <img id="user-icon-container" src={user_icon} alt="" />
                        {dropdownOpen && (
                            <div id="dropdown-menu" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <ul>
                                    <li>
                                        <a href="/StudentPersonal" ><LuUserCircle2 className='icon' /> {Student.name} </a>
                                    </li>
                                    <li>
                                    <a href="/"><BiLogOut className='icon' />Logout</a>
                                </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="containers">
                <div style={{ width: isOpen ? '300px' : '60px' }} className="sidebar">
                    <div className="top-section">
                    <div style={{ marginLeft: isOpen ? '-33px' : '5px' }} className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                        <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
                            {Student.name}
                        </h1>
                    </div>
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icons">{item.icon}</div>
                            <div style={{ display: isOpen ? 'block' : 'none' }} className="link-text">
                                {item.name}
                            </div>
                        </NavLink>
                    ))}
                </div>
                <main>{children}</main>
            </div>
        </>
    );
};

export default StudentSidebar;

