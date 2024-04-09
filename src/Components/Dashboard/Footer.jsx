import React from 'react';
import './Footer.css';
import { IoIosCall,IoLogoFacebook } from "react-icons/io";
import { SiInstatus } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { TbBrandInstagram } from "react-icons/tb";
import { FiMail } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Footer = () => {
  return (
    <div id="Footer">
      <div id='containerfooter'>
        <div id="AboutUs">
            <div id='AUTitle'>
                <a>About Us</a>
            </div>
            <div id='AUContent'>
              A Student Management System is an environment that manages all the data of the students who are studying in an educational institution.
            	It allows teachers to easily change and access student data, and parents can easily focus on children with a clear environment to meet state level compliance and other regulatory requirements.
                Also facilitates the entry, maintenance and viewing and of all authorized student details.
            </div>
        </div>

        <div id='ContactUs'>
            <div id='CUTitle'>
                <a>Contact Us</a>
            </div>
            <div id="CUContent">
              <div id='CUDetail'>
                <IoIosCall id='iconC'/>
                <p id='pC'>0281 6354-2159</p>
              </div>
              <div id='CUDetail'>
                <FaWhatsapp id='iconC'/>
                <p id='pC'>+91 99785 43221</p>
              </div>
              <div id='CUDetail'>
                <SiInstatus id='iconC'/>
                <p id='pC'>WWW.studentmanagement.edu.in</p>
              </div>
              <div id='CUDetail'>
                <FiMail id='iconC'/>
                <p id='pC'>student.management@gmail.com</p>
              </div>
              <div id='CUDetail'>
                <IoLogoFacebook id='iconC'/>
                <p id='pC'>Student Management</p>
              </div>
            </div> 
        </div>

        <div id='ReachUs'>
            <div id='RUTitle'>
                <a>Reach Us</a>
            </div>
            <div id='RUContent'>
              <HiOutlineLocationMarker id='iconR'/>
              <p id='pR'>Twin Star, Nr. Nana Mava Circle,</p>
              <p id='pR1'>150 Ft. Ring Road,</p>
              <p id='pR1'>Rajkot, Gujarat 360005.</p>
              <p id='pR1'>+91 99090 39045</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;