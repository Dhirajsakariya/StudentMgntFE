import { NavLink } from 'react-router-dom'
import './Navigationbar.css';
import { FaGraduationCap } from "react-icons/fa";

const Navigationbar = () => {
  return (
    <nav id="navbar">
      <div id="container">
        <div id="logo">
          Student Management 
          <FaGraduationCap/>
        </div>
        <div id="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/Registration">Sign Up</NavLink>
            </li>
            {/* <li>
              <NavLink to="/contact">Contact</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navigationbar;