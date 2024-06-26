import React, { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { GrScorecard } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { LuUserCircle2 } from "react-icons/lu";
import { MdEditCalendar } from "react-icons/md";
import { FaGooglePay } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaTableCells } from "react-icons/fa6";
import { NavLink, useHistory } from 'react-router-dom';
import user_icon from '../Assets/user_icon.png';
import config from '../Login/config';
import './Sidebar.css';
import { Redirect } from 'react-router-dom';
import { FaAddressCard } from "react-icons/fa";


const AdminSidebar = ({handleLogout, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [Admin, setAdmin] = useState(null);
    const [error, setError] = useState(null);
    const [redirectToNotFound, setRedirectToNotFound] = useState(false);

    useEffect(() => {
        const userRoleString = localStorage.getItem('loggedInRole');
        if (userRoleString) {
          const userRole = JSON.parse(userRoleString);
          console.log('loggedInRole for time table', userRole.Role);
          if (userRole.Role !== 'admin') {
            setRedirectToNotFound(true);
          }
        } else {
          console.error('loggedInRole not found in localStorage');
        }
      }, []);
    
    const handleLogoutClick = () => {
        localStorage.removeItem('loggedInEmail');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInRole');
        navigate.push('/Login');
        };
    
    const menuItem = [
           
        {
          path: '/Search_Teacher',
          name: 'Teachers',
          icon: <LiaChalkboardTeacherSolid />
        },
        {
          path: '/Search_Student',
          name: 'Students',
          icon: <PiStudentBold  />
        },
        {
          path: '/TimeTable',
          name: 'Time Table',
          icon: <FaTableCells />
        },
        {
          path: '/AddExamSchedule',
          name: 'Exam Schedule',
          icon: <MdEditCalendar />
        },
        {
          path: '/StudentReport',
          name: 'Student Report',
          icon: <GrScorecard />
        },
        {
          path: '/IDcardadmin',
          name: 'IDcard',
          icon: <FaAddressCard/>
        },
        {
          path: '/Home',
          name: 'Logout',
          icon: <BiLogOut />,
          onClick: handleLogoutClick
        }
    ];
   
    useEffect(() => {
        const fetchAdminDetails = async () => {
          try {
            const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));
    
            if (!storedId) {
              throw new Error('User ID not found in local storage');
            }
    
            const response = await fetch(`${config.ApiUrl}AdminTeacher/GetAdminTeacher/${storedId}`);
            
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

    //   if (role !== 'admin') {
    //     return <Redirect to="/PageNotFound" />;
    //   }
    if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />; 
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
                                    <a onClick={handleLogoutClick}><BiLogOut className='icon' />Logout</a>
                                    </li>
                                    <li>
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

export default AdminSidebar;

 