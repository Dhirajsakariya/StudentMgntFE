import React,{useState,useEffect} from 'react';
import './ParentsPortal.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import config from '../Login/config';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'; 
//import { BiMale ,BiFemale} from "react-icons/bi";
import { CgMail } from 'react-icons/cg';
import { FiUser } from "react-icons/fi";
import PhoneInput from 'react-phone-input-2';
import ocuupation from '../Assets/occupation.png'
import { Redirect } from 'react-router-dom';

const ParentsPortal = () => {

  const [userData, setUserData] = useState({id:'',email:''});
  const [editing, setEditing] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    email:'',
    name: '',
    occupation: '',
    gender: '',
    relation: '',
   });

  const[idError,setIdError]=useState();
  const[emailError,setEmailError] =useState();
  const[nameError,setNameError] = useState();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [occupationError, setOccupationError] = useState('');
  const [genderError,setGenderError] =useState('');
  const[mobilenumberError,setMobileNumberError]=useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [relationError, setRelationError] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const relations=[ "Father", "Mother"];
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  

  var LoggedInUser = localStorage.getItem('LoggedInUser');
  console.log('LoggedInUser: ', JSON.parse(LoggedInUser));
console.log("student",studentId)

// useEffect(() => {
    
//   setRole('admin');
// }, []);

useEffect(() => {
  const userRole = localStorage.getItem('loggedInRole');
  if (userRole !== 'admin') {
    setRedirectToNotFound(false);
  }
})

  useEffect(() => {
      const fetchFamilyMembers = async () => {
          try {
                const response = await fetch(`https://localhost:7157/api/Family/GetFamilyDetail/FF878E89-BDCA-4848-8E79-1A8BF894AAEA`);
                if (!response.ok) 
                {
                  console.log('Failed to fetch family members');
                }
                const data = await response.json();
                setStudentId(data[0]?.studentId)
                setFamilyMembers(data);
                console.log(data);
              } 
              catch (error) 
              {
                console.error('Error fetching family members:', error);
              }
      };
      
      if(formData.id)
      {
        fetchFamilyMembers();
      }
  },[]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
        setEmailError('Please Enter an Valid Email');
        return;
    }
    else if(!formData.name)
    {
      setNameError('Please Enter a Name');
      return;
    }
    else if(!formData.occupation)
    {
      setOccupationError('Please Enter an Occupation');
      return;
    }
    else if (!formData.gender) {
      setGenderError('Please select a Gender');
      return;
    }
    else if (!formData.relation) {
      setRelationError('Please select a Relation');
      return;
    }
    else if(!mobilenumber){
      setMobileNumberError('Please Select a Mobile Number');
      return;
    }
    try {
          const familyMember = {
            Id:formData.id,
            FirstName: formData.name,
            Occupation: formData.occupation,
            Gender: formData.gender,
            MobileNumber: mobilenumber,
            Relation: formData.relation,
            StudentId: userData.id 
          };
      
          let response;
          if (editing) {
            familyMember.Id = formData.id; // Add member id for editing
            response = await fetch(`https://localhost:7157/api/Family/PutFamily`, {
            method: 'PUT',  
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            Id:formData.id,
            Name: formData.name,
            Occupation: formData.occupation,
            Gender: formData.gender,
            MobileNumber: mobilenumber,
            Relation: formData.relation,
            })
          });
        } else {            
          response = await fetch(`https://localhost:7157/api/Family/PostFamily`, {
          method: 'POST',                         
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            Name: formData.name,
            Email: formData.email,
            Occupation: formData.occupation,
            Gender: formData.gender,
            MobileNumber: mobilenumber,
            Relation: formData.relation,
            StudentId: "FA4F0568-CDD2-4D0C-C879-08DC4EEEDF7D"
            })
          });
        }
        if (response.ok) {
          const result = await response.text();
          console.log('result',result);
          if (editing) {
            const updatedFamilyMembers = familyMembers.map(member => 
            member.id === result.id ? result : member);
            setFamilyMembers(updatedFamilyMembers); // Update the state with the edited member
            toast.success("Edited Successfully!");
            setEditing(false); // Exit editing mode
          } 
          else{
           setFamilyMembers([...familyMembers, result]); // Fetch updated data after adding
           toast.success("Added Successfully!");
          }
          setFormData({ // Reset form fields
          id: '',
          email:'',
          name: '',
          occupation: '',
          gender: '',
          relation: '',
          studentid:'',
          mobilenumber:''
         });
         setMobileNumber('');
        } 
        } catch (error) {
            toast.error(error.message || (editing ? 'Failed to edit family member' : 'Failed to add family member'));
        }
    }

const handleEdit = (user) => {
  // Set the form data based on the properties of the user object
  // setFormData({
  //   id: user.Id,
  //   email: user.Email,
  //   name: user.FirstName,
  //   occupation: user.Occupation,
  //   gender: user.Gender,
  //   relation: user.Relation,
  // });
  setFormData(user);
  setEditing(true);
};

const handlePhoneChange = (value) => {
  setMobileNumber(value);
  const phoneRegex = /^[+]?[0-9]{8,}$/;
  if (!phoneRegex.test(value)) {
    setMobileNumberError('please enter valid Mobile Number');
  }else{
    setMobileNumberError('');//clear the error if the input is valid
  }
  setIsValidPhone(phoneRegex.test(value));
};

const handleDelete = async (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this user!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#29c2a6',
    cancelButtonColor: '#ee8686',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result)=> {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://localhost:7157/api/Family/DeleteFamily/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          toast.success('User deleted successfully');
          setFamilyMembers(familyMembers.filter(user => user.id !== id));
        } 
        else {
          toast.error('Failed to delete family member');
        }
      } catch  {
        
        toast.error('Failed to delete user');
      }
    }
  })
};

const customToastStyle = {
  fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
  fontSize: '16px',
  fontWeight: 'bold',
};

// if (role !== 'admin') {
//   return <Redirect to="/PageNotFound" />;
// }
if (redirectToNotFound) {
  return <Redirect to="/PageNotFound" />; // Redirect if user role is not admin
}


  return (
    <AdminSidebar>
      <div id='mainp'>
        <div id='containerf'>
          <form onSubmit={handleSubmit}>
            <h2>Parents Detail</h2>
            <input id='input' type="hidden" name="id" value={formData.id} onChange={(e) => {setFormData({ ...formData, id: e.target.value });
                          setIdError('');} }/>
            <div id='form-groupf'>
                  <input 
                          type='hidden' 
                          value={studentId} 
                          placeholder='id'
                          onChange={(e) => {setStudentId({ ...formData, id: e.target.value });
                          setIdError('');} }
                required
              />
              {emailError  && <p style={{ color: 'red'}}>{idError}</p>}
              <div id="form-groupf">
              <label id='lbl'>Relation:</label>
                <select
                        value={formData.relation}
                        className='relation'
                        required
                        onChange={(e) => {
                          setFormData({ ...formData, relation: e.target.value });
                          setRelationError('');
                        }}
                      >
                <option value="">Select Relation</option>
                  {relations.map((relation) => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
                </select>
                {relationError && <p style={{ color: 'red'}}>{relationError}</p>}
            </div>
                <label id='lbl' >Email:</label>
                  <input 
                          id='input'
                          type='email' 
                          value={formData.email} 
                          placeholder='Email'
                          onChange={(e) => {setFormData({ ...formData, email: e.target.value });
                          setEmailError('');} }
                required
              /><CgMail id='familyformicon' />
              {emailError  && <p style={{ color: 'red'}}>{emailError}</p>}  
            </div>
            <div id='form-groupf'>
              <label id='lbl'>Name:</label>
                <input
                        type="text"
                        id='input'
                        value={formData.name}
                        placeholder='Full Name'
                        onChange={(e) => {setFormData({ ...formData, name: e.target.value });
                          setNameError('');} }
                required
              /> < FiUser id='familyformicon' />
              {nameError  && <p style={{ color: 'red'}}>{nameError}</p>}
            </div>
            <div id='form-groupf'>
              <label id='lbl'>Occupation:</label>
                <input
                        id='input'
                        type='text'
                        value={formData.occupation}
                        placeholder='Occupation'
                        onChange={(e) => {setFormData({ ...formData, occupation: e.target.value });
                        setOccupationError('');} }
              required
            /><img src={ocuupation} id='familyformicon'/>
            {occupationError  && <p style={{ color: 'red'}}>{occupationError}</p>}
            </div>
            <div id='form-groupf'>
              <label id='lbl'>Gender:</label>
                <div id="radio-groupf">
                  <input
                          type="radio"
                          value="male"
                          checked={formData.gender === "male" }
                          onChange={(e) => {
                            setFormData({...formData, gender: e.target.value});
                            setGenderError('');
                          }}
                          required
                        />
              <label id='lbl'>Male</label>
                <input
                        type="radio"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={(e) => {
                          setFormData({...formData, gender: e.target.value});
                          setGenderError('');
                        }}
                        required
                      />
              <label id='lbl'>Female</label>
              </div>
              {genderError && <p style={{color: 'red'}}>{genderError}</p>}
            </div>
            <div id='form-groupa'>
              <label id='lbl'>Mobile Number:</label>
                <div id='phone_number'>
                  <PhoneInput
                       country={'in'}
                       value={mobilenumber}
                       onChange={handlePhoneChange}
                       disableDropdown={false}
                       isValid={isValidPhone}
                       inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                       containerStyle={{padding:'1px'}} 
                       required
                  />
                </div>
               {/*mobilenumberError && <p style={{ color:'red'}}>{mobilenumberError}</p>*/}
            </div>
            <button id='btnf' type="submit" onClick={handleSubmit}>{formData.id? 'Save Change':'Add Family Member'}</button>
          </form>
        </div>
      </div>
      <div id='disp'>
        {familyMembers.map((user) => {
                console.log(familyMembers.length);
                return(
                  <div id= {editing && user.id === formData.id ?'display editing':'display'} key={user.id}>
                  
                       <h2>{user.Relation}</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Occupation:</strong> {user.occupation}</p>
                
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </div>
                );
        })}
      </div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    </AdminSidebar>
  );
};

export default ParentsPortal;

