import React,{useState,useEffect} from 'react';
import './ParentsPortal.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import config from '../Login/config';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'; 
import { BiMale ,BiFemale} from "react-icons/bi";
import { CgMail } from 'react-icons/cg';
import { FiUser } from "react-icons/fi";
import PhoneInput from 'react-phone-input-2';
import ocuupation from '../Assets/occupation.png'

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


// Inside useEffect, set the studentId state variable with the actual student ID
useEffect(() => {
  
  const studentId = "FA4F0568-CDD2-4D0C-C879-08DC4EEEDF7D"; 
  setStudentId(studentId);
  fetchFamilyMembers(studentId); // Pass the student ID to fetchFamilyMembers
}, []);

// Update fetchFamilyMembers to accept the studentId parameter
const fetchFamilyMembers = async (studentId) => {
  try {
    console.log('Fetching family members for student:', studentId);
    const response = await fetch(`https://localhost:7157/api/Family/GetFamilyDetail/${studentId}`);
    // Remaining code remains the same
    // ...
  } catch (error) {
    console.error('Error fetching family members:', error);
  }
};

const handlePost = async () => {
  try {
    const response = await fetch(`https://localhost:7157/api/Family/PostFamily`, {
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
    if (response.ok) {
      const result = await response.json(); // Assuming the response contains the newly added family member object
      setFamilyMembers([...familyMembers, result]); // Fetch updated data after adding
      toast.success("Added Successfully!");
    }
  } catch (error) {
    toast.error('Failed to add family member');
  }
};
const handlePut = async () => {
  try {
    const response = await fetch(`https://localhost:7157/api/Family/PutFamily/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: formData.name,
        Email: formData.email,
        Occupation: formData.occupation,
        Gender: formData.gender,
        MobileNumber: mobilenumber,
        Relation: formData.relation,
      }),
    });
    if (response.ok) {
      const updatedMember = await response.json();
      const updatedMembers = familyMembers.map((member) =>
        member.id === formData.id ? { ...member, ...updatedMember } : member
      );
      setFamilyMembers(updatedMembers);
      toast.success('Member updated successfully');
    } else {
      throw new Error('Failed to update member');
    }
  } catch (error) {
    console.error('Error updating member:', error);
    toast.error('Failed to update member');
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  if (editing) {
    await handlePut();
  } else {
    await handlePost();
  }

  // Reset form fields after submission
  setFormData({
    id: '',
    email: '',
    name: '',
    occupation: '',
    gender: '',
    relation: '',
  });
  setMobileNumber('');
  setEditing(false);
};

const validateForm = () => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(formData.email)) {
    setEmailError('Please Enter a Valid Email');
    return;
  } else if (!formData.name) {
    setNameError('Please Enter a Name');
    return;
  } else if (!formData.occupation) {
    setOccupationError('Please Enter an Occupation');
    return;
  } else if (!formData.gender) {
    setGenderError('Please select a Gender');
    return;
  } else if (!formData.relation) {
    setRelationError('Please select a Relation');
    return;
  } else if (!mobilenumber) {
    setMobileNumberError('Please Select a Mobile Number');
    return;
  }
  
  // Your validation logic here
  return true; // Replace this with your actual validation logic
};

const handlePhoneChange = (value) => {
  setMobileNumber(value);
};

const handleEdit = (familyMember) => {
  setFormData({
    id: familyMember.id,
    email: familyMember.email,
    name: familyMember.name,
    occupation: familyMember.occupation,
    gender: familyMember.gender,
    relation: familyMember.relation,
  });
  setMobileNumber(familyMember.mobileNumber);
  setEditing(true);
};



const handleDelete = async (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this parentdetail!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#29c2a6',
    cancelButtonColor: '#ee8686',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result)=> {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://localhost:7157/api/Family/DeleteFamily152A31E3-7238-41A9-BD2E-D4BB68B11ED5`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          toast.success('parent deleted successfully');
          setFamilyMembers(familyMembers.filter(familyMembers => familyMembers.id !== id));
        } 
        else {
          toast.error('Failed to delete family member');
        }
      } catch  {
        
        toast.error('Failed to delete parent');
      }
    }
  })
};

const customToastStyle = {
  fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
  fontSize: '16px',
  fontWeight: 'bold',
};

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
              <label id='lbl'>Mobile Number:</label>
                <div id='phone_number'>
                  <PhoneInput
                       country={'in'}
                       value={mobilenumber}
                       onChange={handlePhoneChange}
                       disableDropdown={true}
                       isValid={isValidPhone}
                       inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                       containerStyle={{padding:'1px'}} 
                       required
                  />
            </div>
            <button id='btnf' type="submit" onClick={handleSubmit}>{formData.id? 'Save Change':'Add Family Member'}</button>
          </form>
        </div>
      </div>
      <div id='disp'>
      {Array.isArray(familyMembers) && familyMembers.length > 0 ? (
  familyMembers.map((familyMember) => (
    <div key={familyMember.id} id='display'>
      <h2 id='display'>{familyMember.relation}</h2>
      <div id="icon_f_m">
        {familyMember.gender === 'male' ? (
          <BiMale size='20px' />
        ) : (
          <BiFemale size='20px' />
        )}
        <span>{familyMember.name}</span>
      </div>
      <p>
        <strong>Email:</strong> {familyMember.email}
      </p>
      <p>
        <strong>Occupation:</strong> {familyMember.occupation}
      </p>
      <p>
        <strong>Mobile Number:</strong> {familyMember.mobileNumber}
      </p>

      <button onClick={() => handleEdit(familyMember)}>Edit</button>
      <button onClick={() => handleDelete(familyMember.id)}>Delete</button>
    </div>
  ))
) : (
  <p>No family members to display</p>
)}

</div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    </AdminSidebar>
  );
};

export default ParentsPortal;

