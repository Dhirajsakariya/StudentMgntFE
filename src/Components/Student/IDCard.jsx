import React, { useEffect, useState } from 'react';
import './IDCard.css';
import config from '../Login/config';
import { Redirect } from 'react-router-dom';
import QRCode from 'react-qr-code';
import StudentSidebar from '../Sidebar/StudentSidebar';

const IDCard = () => {
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const [Student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [totalPaidAmount, setTotalPaidAmount] = useState('');
  const [pendingAmount, setPendingAmount] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [parents, setParents] = useState({});
  const [loading, setLoading] = useState(true);

  const storedId = JSON.parse(localStorage.getItem('loggedInUserId'));

  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      console.log('loggedInRole for Student Personal', userRole.Role);
      if (userRole.Role !== 'student') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!storedId) {
          throw new Error('User ID not found in local storage');
        }

        const fetchStudentDetails = async () => {
          try {
            const response = await fetch(`${config.ApiUrl}Student/GetStudent/${storedId}`);
            if (!response.ok) {
              throw new Error(`Error fetching Student details: ${response.status} ${response.statusText}`);
            }
            const responseData = await response.json();
            setStudent(responseData);
          } catch (fetchError) {
            setError(fetchError.message);
          }
        };

        const fetchFeesDetails = async () => {
          try {
            const response = await fetch(`${config.ApiUrl}Fees/GetStudentFeesDetails/${storedId}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const feesdata = await response.json();
            setTotalPaidAmount(feesdata.totalPaidAmount);
            setPendingAmount(feesdata.pendingAmount);
            console.log('Fees details:', feesdata);
            console.log('Payment completed successfully!');
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };

        const fetchUserPhoto = async () => {
          try {
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

        const fetchParentsDetails = async () => {
          try {
            const response = await fetch(`${config.ApiUrl}Family/GetFamilyByStudentId/${storedId}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const parentData = await response.json();
            if (parentData) {
              setParents(parentData);
            }
          } catch (error) {
            console.error('There was a problem with fetching parents details:', error);
          }
        };

        await Promise.all([fetchStudentDetails(), fetchFeesDetails(), fetchUserPhoto(), fetchParentsDetails()]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (redirectToNotFound) {
    return <Redirect to="/PageNotFound" />;
  }

  if (!Student) {
    return <div>Loading...</div>;
  }

  const qrCodeValue = `
    \nRoll No: ${Student.rollNo}
    \nName: ${Student.name}
    \nEmail: ${Student.email}
    \nNumber: ${Student.mobileNumber}
    \nBirth Date: ${Student.birthDate.split("-").reverse().join("-")}
    \nJoin Date: ${Student.joinDate.split("-").reverse().join("-")}
    \nBlood Group: ${Student.bloodGroup}
    \nGender: ${Student.gender}
    \nAddress: ${Student.address}
    \nCity: ${Student.city}
    \nDistrict: ${Student.district}
    \nState: ${Student.state}
    \nPincode: ${Student.pinCode}
    \nPaid Fees: ${totalPaidAmount}
    \nPending Fees: ${pendingAmount}
    \nParents:
    ${parents.map((parent, index) => (
      `\n  ${index + 1}. Relation: ${parent.relation}\n  Name: ${parent.name}\n Email: ${parent.email}\n Occupation: ${parent.occupation}\n Gender: ${parent.gender}\n Mobile Number: ${parent.mobileNumber}\n`
    )).join('')}`;
  return (
    <>
      <StudentSidebar>
        <div className="id-card_student">

          <div className="idcard-school_student">
            <strong>  STUDENT </strong>
          </div>

          <div>
            <img id="id-card-photo_student" src={userPhoto} alt="" />
          </div>

          <div className="id-card-name_student">
            <h2 className='id-card-header_student'>{Student.name}</h2>
          </div> 

          <div className="id-card-body_student">
            <QRCode  value={qrCodeValue} className='qrcode_student' />
          </div> 

      
      </div>
      </StudentSidebar>
    </>
  );
};

export default IDCard;
