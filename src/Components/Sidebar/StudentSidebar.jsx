
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import config from '../Login/config';
import { NavLink } from 'react-router-dom';
import { LuUserCircle2 } from "react-icons/lu";
import { RiParentFill } from "react-icons/ri";
import { BiLogOut } from 'react-icons/bi';
import { FaGooglePay } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { FaBars } from 'react-icons/fa';
import { GrSchedules } from "react-icons/gr";
import { useHistory, Redirect } from 'react-router-dom';
import { FaAddressCard } from "react-icons/fa";


const StudentSidebar = ({ handleLogout, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);
    const [redirectToNotFound, setRedirectToNotFound] = useState(false);
    const [userPhoto, setUserPhoto] = useState(null);

    useEffect(() => {
        const userRoleString = localStorage.getItem('loggedInRole');
        if (userRoleString) {
            const userRole = JSON.parse(userRoleString);
            console.log('loggedInRole for Student Sidebar', userRole.Role);
            if (userRole.Role !== 'student') {
                setRedirectToNotFound(true);
            }
        } else {
            console.error('loggedInRole not found in localStorage');
        }
    }, []);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

                if (!storedId) {
                    throw new Error('User ID not found in local storage');
                }

                const response = await fetch(`${config.ApiUrl}Student/GetStudent/${storedId}`);

                if (!response.ok) {
                    throw new Error(`Error fetching Student details: ${response.status} ${response.statusText}`);
                }

                const responseData = await response.json();
                setStudent(responseData);

                // Fetch user photo
                const photoResponse = await fetch(`${config.ApiUrl}Student/GetPhoto/${storedId}`);
                if (photoResponse.ok) {
                    const photoBlob = await photoResponse.blob();
                    setUserPhoto(URL.createObjectURL(photoBlob));
                } else {
                    throw new Error('Failed to fetch user photo');
                }
            } catch (fetchError) {
                setError(fetchError.message);
            }
        };

        fetchStudentDetails();
    }, []);

    const handleLogoutClick = () => {
        localStorage.removeItem('loggedInEmail');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInRole');
        navigate.push('/Login');
    };

    const menuItem = [
        {
            path: '/Parents',
            name: 'Parents',
            icon: <RiParentFill />
        },
        {
            path: '/StudentFeeForm',
            name: 'StudentFees',
            icon: <FaGooglePay />
        },
        {
            path: '/TimeTableViewer',
            name: 'TimeTable',
            icon: <FaTableCells />
        },
        {
            path: '/Exam_Schedule',
            name: 'Exam Schedule',
            icon: <GrSchedules />,
        },
        {
            path: '/IDCard',
            name: 'IDCard',
            icon: <FaAddressCard />,
        },
        {
            path: '/Home',
            name: 'Logout',
            icon: <BiLogOut />,
            onClick: handleLogoutClick
        }
    ];

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!student) {
        return <div>Loading...</div>;
    }

    if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />;
    }

    return (
        <>
            <div id="menu-container">
                <div id="menu-trigger">
                    <h2 id='h2'>Welcome {student.name}</h2>
                    <div
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <img id="user-icon-container" src={userPhoto} alt="" />
                        {dropdownOpen && (
                            <div id="dropdown-menu" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <ul>
                                    <li>
                                        <a href="/StudentPersonal" ><LuUserCircle2 className='icon' /> {student.name} </a>
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
                            {student.name}
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

export default StudentSidebar;


