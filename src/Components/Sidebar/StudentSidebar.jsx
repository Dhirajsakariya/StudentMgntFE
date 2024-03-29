import React, { useState } from 'react';
import './Sidebar.css';
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

    const handleLogout = () => {
        localStorage.removeItem('loggedInEmail');
        navigate.push('/');
    };

    return (
        <>
             <div id="menu-container">
                <div id="menu-trigger">
                    <h2 id='h2'>Welcome </h2>
                    <div
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <img id="user-icon-container" src={user_icon} alt="" />
                        {dropdownOpen && (
                            <div id="dropdown-menu" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <ul>
                                    <li>
                                        <a href="/StudentPersonal" ><LuUserCircle2 className='icon' />Admin </a>
                                    </li>
                                    <li onClick={handleLogout}>
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

export default StudentSidebar;

