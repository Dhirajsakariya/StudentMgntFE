import React,{useState, useEffect} from 'react';
import './Familydetail.css';
import Sidebar from '../Sidebar/Sidebar';

const Userdetail = () => {

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        setUserDetails(storedUserDetails);
      }, []); 
     
  return (
    <Sidebar>
        <div className='containeru'>
        <h2>Family Detail</h2>
            <form>
                <div className='form-groupu'>
                {userDetails && (
                    <>
                        <label>Name:</label>
                        <p>{userDetails.Name}</p>
                        <label>Email</label>
                        <p>{userDetails.Email}</p>
                        <label>Relation:</label>
                        <p>{userDetails.Relation}</p>
                        <label>Occupation:</label>
                        <p>{userDetails.Occupation}</p>
                        <label>Gender:</label>
                        <p>{userDetails.gender}</p>
                        <label>Mobile Number:</label>
                        <p>{userDetails.mobileNumber}</p> 
                    </>
                )}
                <button type='submit' className='btnnext'>Next</button>
              </div>
            </form>
        </div>
    </Sidebar>
  )
}

export default Userdetail


  
