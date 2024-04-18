import React,{useState,useEffect} from 'react';
import './ParentsPortal.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import config from '../Login/config';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'; 
import { CgMail } from 'react-icons/cg';
import { FiUser } from "react-icons/fi";
import PhoneInput from 'react-phone-input-2';
import { BiMale, BiFemale, BiEdit, BiTrash, BiEnvelope, BiPhone, BiBriefcase } from 'react-icons/bi';
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
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);
  const relations=[ "Father", "Mother"];
  const [currentUserRole,setCurrentUserRole]=useState('');

  useEffect(() => {
    const userRoleString = localStorage.getItem('loggedInRole');
    if (userRoleString) {
      const userRole = JSON.parse(userRoleString);
      setCurrentUserRole(userRole.Role)
      console.log('loggedInRole for Student Form', userRole.Role);
      if (userRole.Role !== 'teacher' && userRole.Role !== 'admin') {
        setRedirectToNotFound(true);
      }
    } else {
      console.error('loggedInRole not found in localStorage');
    }
  }, []);
  
  useEffect(() => {
    const studentId = localStorage.getItem('selectedStudentId');
    if (studentId) {
      setStudentId(studentId);
      fetchFamilyMembers(studentId);
    }
  }, []);

const fetchFamilyMembers = async (studentId) => {
  try {
    console.log('Fetching parent detail for student:', studentId);
    const response = await fetch(`${config.ApiUrl}Family/GetFamilyByStudentId/${studentId}`);
    if (response.ok) {
      const data = await response.json();
      setFamilyMembers(data); 
      throw new Error('Failed to fetch parent detail ');
    }
  } catch (error) {
    console.error('Error fetching parent detail:', error);
  }
};

const handlePost = async () => {
  try {
    const response = await fetch(`${config.ApiUrl}Family/PostFamily`, {
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
        StudentId: studentId
      })
    });

    if (response.ok) {
      fetchFamilyMembers(studentId)
      
      setFormData({
        id: '',
        email: '',
        name: '',
        occupation: '',
        gender: '',
        relation: '',
      });
      setMobileNumber('+91');
      toast.success("Added Successfully!");
    }
  } catch (error) {
    toast.error('Failed to add parent detail');
  }
};

const handlePut = async () => {
  try {
    const response = await fetch(`${config.ApiUrl}Family/PutFamily/${formData.id}`, {
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
      toast.success('Parent Detail updated successfully');
    } else {
      throw new Error('Failed to update Parent Detail');
    }
  } catch (error) {
    console.error('Error updating Parent Detail:', error);
    toast.error('Failed to update Parent Detail');
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return ;
  }

  if (!formData.gender) {
    if (formData.relation === 'Father') {
      setFormData({ ...formData, gender: 'male' });
    } else if (formData.relation === 'Mother') {
      setFormData({ ...formData, gender: 'female' });
    }
  }
  
  const existingRecord = familyMembers.find(
    (member) => member.relation === formData.relation
  );

  if (!editing && existingRecord) {
    toast.error(
      `A ${formData.relation} record already exists. Please edit the existing record.`
    );
    return;
  }

  if (editing) {
    await handlePut();
  } else {
    await handlePost();
  }

  setFormData({
    id: '',
    email: '',
    name: '',
    occupation: '',
    gender: '',
    relation: '',
  });
  setMobileNumber('+91');
  setEditing(false);
};

const validateForm = () => {
const emailRegex = /^\S+@\S+\.\S+$/;
if (!emailRegex.test(formData.email)) {
  setEmailError('Please Enter a Valid Email');
  return false;
} else if (!formData.name) {
  setNameError('Please Enter a Name');
  return false;
} else if (!formData.occupation) {
  setOccupationError('Please Enter an Occupation');
  return false;
} else if (!formData.relation) {
  setRelationError('Please select a Relation');
  return false;
} else if (!mobilenumber) {
  setMobileNumberError('Please Select a Mobile Number');
  return false;
}

return true;
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

const handlePhoneChange = (value) => {
  setMobileNumber(value);
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
        const response = await fetch(`${config.ApiUrl}Family/DeleteFamily/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          toast.success('parent detail deleted successfully');
          setFamilyMembers(familyMembers.filter(familyMembers => familyMembers.id !== id));
        } 
        else {
          toast.error('Failed to delete parent detail');
        }
      } catch  {
        
        toast.error('Failed to delete parent detail');
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
    <>
    { currentUserRole =='admin' ?
    <AdminSidebar>
      <>
      <div id='mainp'>
        <div id='containerf'>
          <form>
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
              <div id='form-groupf'>
              <label id='lbl'>Relation:</label>
              {editing ? (
                <span>{formData.relation}</span>
              ) : (
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
              )}
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
            />
            
            <img src={ocuupation} id='familyformicon'/>
            {occupationError  && <p style={{ color: 'red'}}>{occupationError}</p>}
            </div>
            <label id='lbl'>Mobile Number:</label>
            <div id='phone_number'>
                <PhoneInput
                    country={'in'}
                    value={mobilenumber}
                    placeholder="Enter mobile number"
                    countryCodeEditable={false}
                    onChange={handlePhoneChange}
                    disableDropdown={true}
                    isValid={isValidPhone}
                    inputProps={{ maxLength: 15 }}
                    inputStyle={{ backgroundColor: 'white', borderColor: 'white' }}
                    containerStyle={{ padding: '1px' }} 
                    required
                />
            </div>
       <button id='btnf' type="submit" onClick={handleSubmit}>{formData.id? 'Save Change':'Add Parent Detail'}</button>
          </form>
        </div>
      </div>
    <div id='disp'>
  {Array.isArray(familyMembers) && familyMembers.length > 0 ? (
    familyMembers.map((familyMember) => (
      <div key={familyMember.id} id='display'>
        <h2>{familyMember.relation}</h2>
        <div id='parent-details'>
        <div id='detail'>
          {familyMember.gender === 'male' ? (
            <BiMale size='20px' />
          ) : (
            <BiFemale size='20px' />
          )}
          <span>{familyMember.name}</span>
        </div>
        <div id='detail'>
          <BiEnvelope size='20px' />
          <span>{familyMember.email}</span>
        </div>
        <div id='detail'>
          <BiBriefcase size='20px' />
          <span>"{familyMember.occupation}"</span>
        </div>
        <div id='detail'>
          <BiPhone size='20px' />
          <span>{familyMember.mobileNumber}</span>
        </div>
      </div>

        <button id='btneditPP' onClick={() => handleEdit(familyMember)}><BiEdit /></button>
        <button id='btndeletePP' onClick={() => handleDelete(familyMember.id)}><BiTrash /></button>
      </div>
    ))
  ) : (
    <p>No family members to display</p>
  )}
</div>

      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </>
    </AdminSidebar>
    :
    <TeacherSidebar>
    <>
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
            <div id='form-groupf'>
            <label id='lbl'>Relation:</label>
            {editing ? (
              <span>{formData.relation}</span>
            ) : (
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
            )}
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
          <label id='lbl'>Mobile Number:</label>
          <div id='phone_number'>
              <PhoneInput
                  country={'in'}
                  value={mobilenumber}
                  placeholder="Enter mobile number"
                  countryCodeEditable={false}
                  onChange={handlePhoneChange}
                  disableDropdown={true}
                  isValid={isValidPhone}
                  inputProps={{ maxLength: 15 }}
                  inputStyle={{ backgroundColor: 'white', borderColor: 'white' }}
                  containerStyle={{ padding: '1px' }} 
                  required
              />
          </div>
     <button id='btnf' type="submit" onClick={handleSubmit}>{formData.id? 'Save Change':'Add Parent Detail'}</button>
        </form>
      </div>
    </div>
  <div id='disp'>
{Array.isArray(familyMembers) && familyMembers.length > 0 ? (
  familyMembers.map((familyMember) => (
    <div key={familyMember.id} id='display'>
      <h2>{familyMember.relation}</h2>
      <div id='parent-details'>
      <div id='detail'>
        {familyMember.gender === 'male' ? (
          <BiMale size='20px' />
        ) : (
          <BiFemale size='20px' />
        )}
        <span>{familyMember.name}</span>
      </div>
      <div id='detail'>
        <BiEnvelope size='20px' />
        <span>{familyMember.email}</span>
      </div>
      <div id='detail'>
        <BiBriefcase size='20px' />
        <span>"{familyMember.occupation}"</span>
      </div>
      <div id='detail'>
        <BiPhone size='20px' />
        <span>{familyMember.mobileNumber}</span>
      </div>
    </div>

      <button id='btneditPP' onClick={() => handleEdit(familyMember)}><BiEdit /></button>
      <button id='btndeletePP' onClick={() => handleDelete(familyMember.id)}><BiTrash /></button>
    </div>
  ))
) : (
  <p>No family members to display</p>
)}
</div>

    <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    </>
    </TeacherSidebar>
    }
    </>
  );
};

export default ParentsPortal;
