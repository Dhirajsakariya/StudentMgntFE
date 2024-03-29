import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import {  BiLogOut } from 'react-icons/bi';
import { PiUserListDuotone } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { FaBars } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import user_icon from '../Assets/user_icon.png';
import logout from '../Assets/logout.png';

const TeacherSidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
            path: '/login',
            name: 'Logout',
            icon: <BiLogOut />
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('loggedInEmail');
        navigate.push('/');
    };
  
    return (
        <>
             <div className="menu-container">
                <div className="menu-trigger">
                    <h2>Welcome</h2>
                    <div
                        className="user-icon-container"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <img src={user_icon} alt="" />
                        {dropdownOpen && (
                            <div className="dropdown-menu" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <ul>
                                    <li>
                                        <img className='user_icon' src={user_icon} alt="" />
                                      <a href="/TeacherPersonal">Angle</a>  
                                    </li>
                                    <li onClick={handleLogout}>
                                    <img className='logout_icon' src={logout} alt="" />
                                    <a href="/">Logout</a>
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
                        <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
                            Angle
                            <br /> <span>Infotech</span>
                        </h1>
                        <div style={{ marginLeft: isOpen ? '30px' : '0px' }} className="bars">
                            <FaBars onClick={toggle} />
                        </div>
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

export default TeacherSidebar;

