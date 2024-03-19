
import React,{useState,useEffect} from 'react';
import './FamilyForm.css';
//import moment from 'moment';
import { BiMale ,BiFemale} from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import Sidebar from '../Sidebar/Sidebar';
import config from '../Login/config';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'; 
import { CgMail } from 'react-icons/cg';
import { FiUser } from "react-icons/fi";
import PhoneInput from 'react-phone-input-2';
import ocuupation from '../Assets/occupation.png'

const FamilyForm = () => {

  const [userData, setUserData] = useState({id:'',email:''});
  const [editing, setEditing] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
 
  const [formData, setFormData] = useState({
    id: '',
    email:'',
    name: '',
    occupation: '',
    gender: '',
    mobileNo: '',
    relation: '',
  });
  
  const relations=[ "Father", "Mother"];
  const handlePhoneChange = (value) => {
    setMobileNo(value);
    const phoneRegex = /^[+]?[0-9]{8,}$/;
    setIsValidPhone(phoneRegex.test(value));
  };

 useEffect(() => {
  const storedUserDetails = JSON.parse(localStorage.getItem('loggedEmail'));
  if(storedUserDetails){
    setUserData({id:storedUserDetails.id,email:storedUserDetails.email});
  }
}, []); 

  useEffect(() => {
      const fetchFamilyMembers = async () => {
          try {
                const response = await fetch(`${config.ApiUrl}FamilyMember/GetByEmail?email=${userData.email}`);
                if (!response.ok) 
                {
                  console.log('Failed to fetch family members');
                }
                const data = await response.json();
                console.log(data);
                setFamilyMembers(data);
              } 
              catch (error) 
              {
                console.error('Error fetching family members:', error);
              }
      };
      if(userData.email)
      {
        fetchFamilyMembers();
      }
  }, [userData.email]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        toast.error('Please enter a valid email address!');
        return;
    }
    if(!formData.occupation)
    {
        toast.error('please enter occupation');
    }
    else if(!formData.name)
    {
       toast.error('Please Enter a name');
      
    }
    else if (!formData.gender) {
      toast.error('Please select a Gender');
      return;
    }
    // else if(!formData.mobileNo){
    //   toast.error('Please Select a Mobile Number');
    //   return;
    // }
    else if (!formData.relation) {
      toast.error('Please select a Relation');
      return;
    }
     
    
    try {
          const familyMember = {
            Id:formData.id,
            FirstName: formData.name,
            Occupation: formData.occupation,
            Gender: formData.gender,
            MobileNo: formData.mobileNo,
            Relation: formData.relation,
            UserId: userData.id
          };
      
          let response;
          if (editing) {
            familyMember.Id = formData.id; // Add member id for editing
            response = await fetch(`${config.ApiUrl}FamilyMember/UpdateFamilyMember`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            Id:formData.id,
            Name: formData.name,
            Occupation: formData.occupation,
            Gender: formData.gender,
            MobileNo: formData.mobileNo,
            Relation: formData.relation,
            })
          });
        } else {
          response = await fetch(`${config.ApiUrl}FamilyMember/AddFamilyMember/${userData.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            Name: formData.name,
            Email: formData.email,
            Occupation: formData.occupation,
            Gender: formData.gender,
            MobileNo: formData.mobileNo,
            Relation: formData.relation,
            UserId: userData.id
            })
          });
        }
  
        if (response.ok) {
          const result = await response.json();
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
          mobileNo: '',
          relation: '',
         });
        } 
  
        } catch (error) {
            toast.error(error.message || (editing ? 'Failed to edit family member' : 'Failed to add family member'));
        }
        }

const handleEdit = async (user) => {
  setFormData(user);
  setEditing(true);
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
        const response = await fetch(`${config.ApiUrl}FamilyMember/DeleteFamilyMember/${id}`, {
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

  return (
    <Sidebar>
      <div className='main'>
        <div className='containerf'>
          <form onSubmit={handleSubmit}>
            <h2>Family Form</h2>

            <div className='form-groupf'>
                <label >Email:</label>
                  <input 
                          type='email' 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Email'
                          name='email'  required />
                  <CgMail className='familyformicon' />
            </div>
          
            <div className='form-groupf'>
              <label>Name:</label>
                <input
                        type="text"
                        value={formData.name}
                        placeholder='Full Name'
                        onChange={(e) => {setFormData({ ...formData, name: e.target.value })}}
                        required/>
                  < FiUser className='familyformicon' />
            </div>

            <div className='form-groupf'>
              <label>Occupation:</label>
                <input
                        type='text'
                        value={formData.occupation}
                        placeholder='Occupation'
                        onChange={(e)=>{setFormData({ ...formData, occupation: e.target.value })}}
                        required/>
                <img src={ocuupation} className='familyformicon'/>
            </div>
            <div className='form-groupf'>
              <label>Gender:</label>
                <div className="radio-groupf">
                  <input
                          type="radio"
                          value="male"
                          checked={formData.gender === "male" }
                          onChange={(e) => {
                          setFormData({...formData, gender: e.target.value});}}
                          required/>
                
              <label>Male</label>
                <input
                        type="radio"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={(e) => {
                        setFormData({...formData, gender: e.target.value});}}
                        required/>
              <label>Female</label>
              </div>
            </div>
           
            <div className="form-groupf">
              <label>Relation:</label>
                <select
                        value={formData.relation}
                        className='relation'
                        required
                        onChange={(e) => {
                        setFormData({ ...formData, relation: e.target.value });}}>
                <option value="">Select Relation</option>
                  {relations.map((relation) => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
                </select>
            </div>

            <div className='form-groupa'>
              <label>Mobile Number:</label>
                <div className='phone_number'>
                  <PhoneInput
                       country={'in'}
                       value={mobileNo}
                       onChange={handlePhoneChange}
                       enableSearch={true}
                       isValid={isValidPhone}
                       inputStyle={{backgroundColor: 'white', borderColor: 'white' }}
                       containerStyle={{padding:'1px'}}
                  />
                </div>
            </div>
            
            <button type="submit" onClick={handleSubmit}>{formData.id? 'Save Change':'Add Family Member'}</button>
          </form>
        </div>
      </div>
      <div className='disp'>
        {familyMembers.map((user) => {
                console.log(familyMembers.length);
                return(
                  <div className= {editing && user.id === formData.id ?'display editing':'display'} key={user.id}>
                     <h2>{user.relation}</h2>
                    <div className="icon_f_m">
                              {user.gender === 'male' ? (
                                <BiMale  size='20px'/>
                              ) : (
                                <BiFemale size='20px' />
                              )}
                              <span>{user.firstName} {user.lastName}</span>
                            </div>
                            <div className="dob">
                            <SlCalender />
                                <span> {user.birthDate.split("-").reverse().join("-")} </span>
                              </div>
                     <button  onClick={() =>handleEdit(user)}>Edit</button>
                    <button onClick={() =>handleDelete(user.id)}>Delete</button>
                  </div>
                );
        })}
      </div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    </Sidebar>
  );
};

export default FamilyForm;

