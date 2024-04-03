import React, { useState,useEffect } from 'react';
import './Sidebar.css';
import config from '../Login/config';
import { NavLink } from 'react-router-dom';
import {  BiLogOut } from 'react-icons/bi';
import { LuUserCircle2 } from "react-icons/lu";
import { PiUserListDuotone } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { FaBars } from 'react-icons/fa';
import { useHistory,Redirect} from 'react-router-dom';
import user_icon from '../Assets/user_icon.png';
import Logout from '../Login/Logout';

const TeacherSidebar = ({ handleLogout,children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [teacher, setTeacher] = useState(null);
    const [error, setError] = useState(null);
    const [role, setRole] = useState('');

    useEffect(() => {
      
      setRole('teacher');
    }, []);
  

    const handleLogoutClick = () => {
        localStorage.removeItem('loggedInEmail');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInRole');
        navigate.push('/');
        };

    const menuItem = [
        {
            path: '/Student_Form',
            name: 'Student Form',
            icon: <FaWpforms   />
        },
        {
            path: '/Standard',
            name: 'Standard',
            icon: <PiUserListDuotone   />
        },
        {
            path: '/TimeTable',
            name: 'TimeTable',
            icon: <FaTableCells  />
        },
        {
            path: '/Logout',
            name: 'Logout',
            icon: <BiLogOut />,
            onClick: handleLogoutClick 

            // component: <handleLogoutClick />
            
        }
    ];
  
    useEffect(() => {
        const fetchTeacherDetails = async () => {
          try {
            const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));
    
            if (!storedId) {
              throw new Error('User ID not found in local storage');
            }
    
            const response = await fetch(`${config.ApiUrl}AdminTeacher/GetAdminTeacher/${storedId}`);
            
            if (!response.ok) {
              throw new Error(`Error fetching teacher details: ${response.status} ${response.statusText}`);
            }
    
            const responseData = await response.json();
            setTeacher(responseData);
          } catch (fetchError) {
            setError(fetchError.message);
          }
        };
    
        fetchTeacherDetails();
      }, []);
       
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!teacher) {
        return <div>Loading...</div>;
      }

      if (role !== 'teacher') {
        return <Redirect to="/PageNotFound" />;
      }

    return (
        <>
             <div id="menu-container">
                <div id="menu-trigger">
                    <h2 id='h2'>Welcome {teacher.name}</h2>
                    <div
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <img id="user-icon-container" src={user_icon} alt="" />
                        {dropdownOpen && (
                            <div id="dropdown-menu" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <ul>
                                    <li>
                                        <a href="/TeacherPersonal" ><LuUserCircle2 className='icon' />{teacher.name} </a>
                                    </li>
                                    <li>
                                    <a onClick={handleLogoutClick}><BiLogOut className='icon' />Logout</a>
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
                           {teacher.name}
                        </h1>
                    </div>
                    {menuItem.map((item, index) => (
    <NavLink to={item.path} key={index} className="link" activeClassName="active" onClick={item.onClick}>
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

export default TeacherSidebar;

