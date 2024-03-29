import React, { useState,useEffect } from 'react';
import './Sidebar.css';
import config from '../Login/config';
import { NavLink } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { FaGooglePay } from "react-icons/fa";
import { LuUserCircle2 } from "react-icons/lu";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdFamilyRestroom } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaBars } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import user_icon from '../Assets/user_icon.png';

const AdminSidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [Admin, setAdmin] = useState(null);
    const [error, setError] = useState(null);

    const menuItem = [
        {
            path: '/TeacherForm',
            name: 'Teacher Form',
            icon: <LiaChalkboardTeacherSolid  />
        },
        {
            path: '/StudentForm',
            name: 'Student Form',
            icon: <PiStudentBold  />
        },
        {
            path: '/ParentsPortal',
            name: 'ParentsPortal',
            icon: <MdFamilyRestroom  />
            },
        {
            path: '/FeeForm',
            name: 'FeeForm',
            icon: <FaGooglePay  />
        }, 
       {
            path: '/login',
            name: 'Logout',
             icon: <BiLogOut />
        }
    ];

    useEffect(() => {
        const fetchAdminDetails = async () => {
          try {
            const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));
    
            if (!storedId) {
              throw new Error('User ID not found in local storage');
            }
    
            const response = await fetch(`${config.ApiUrl}AdminTeacher/GetAdminTeacher${storedId}`);
            
            if (!response.ok) {
              throw new Error(`Error fetching Admin details: ${response.status} ${response.statusText}`);
            }
    
            const responseData = await response.json();
            setAdmin(responseData);
          } catch (fetchError) {
            setError(fetchError.message);
          }
        };
    
        fetchAdminDetails();
      }, []);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!Admin) {
        return <div>Loading...</div>;
      }

    return (
        <>
             <div id="menu-container">
                <div id="menu-trigger">
                    <h2 id='h2'>Welcome {Admin.name} </h2>
                    <div
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <img id="user-icon-container" src={user_icon} alt="" />
                        {dropdownOpen && (
                            <div id="dropdown-menu" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <ul>
                                    <li>
                                        <a href="/AdminPersonal" ><LuUserCircle2 className='icon' />{Admin.name} </a>
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
                            {Admin.name}
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

export default AdminSidebar;

 