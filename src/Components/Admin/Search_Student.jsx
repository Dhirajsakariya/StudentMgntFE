import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Login/config';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Search_Student.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast, Toaster } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { SiAmazonpay } from "react-icons/si";
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { GrScorecard } from "react-icons/gr";
import { CgMail } from 'react-icons/cg';
import { FiUser } from "react-icons/fi";
import PhoneInput from 'react-phone-input-2';
import { BiMale, BiFemale, BiEdit, BiTrash, BiEnvelope, BiPhone, BiBriefcase } from 'react-icons/bi';
import ocuupation from '../Assets/occupation.png'
import { GiFemaleVampire } from "react-icons/gi";
import { GiNurseFemale } from "react-icons/gi";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 


const Search_Student = () => {
                const [originalData, setOriginalData] = useState([]);
                const [data, setData] = useState(null);
                const [selectedStudent, setSelectedStudent] = useState(null);
                const [searchQuery, setSearchQuery] = useState('');
                const [editedStudent, setEditedStudent] = useState(null);
                const [totalPages, setTotalPages] = useState(0);


              //family start
                const [editing, setEditing] = useState(false);
                const [studentId, setStudentId] = useState('');
                const [editedCardId, setEditedCardId] = useState(null);
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
                const [currentPage, setCurrentPage] = useState(1);
                const itemsPerPage = 5; 

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

                const handlePageClick = (page) => {
                  setCurrentPage(page);
              };
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
                            fetchFamilyMembersf(studentId)
                            
                            setFormData({
                              id: '',
                              email: '',
                              name: '',
                              occupation: '',
                              gender: '',
                              relation: '',
                            });
                            setMobileNumber('');
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
                        setMobileNumber('');
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


                      const handleEditf = (familyMember) => {
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
                        setEditedCardId(familyMember.id);
                      };

                      const handlePhoneChange = (value) => {
                        setMobileNumber(value);
                      };

                      const handleDeletef = async (id) => {
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


                        /*family end*/

                      const history = useHistory();

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

                      // GET Student
                      // const getData = () => {
                      //   axios
                      //     .get(`${config.ApiUrl}Student/GetStudents?page=${currentPage}&pageSize=${itemsPerPage}`)
                      //     .then((result) => {
                      //       setOriginalData(result.data);
                      //       setData(result.data);
                          
                      //     })
                      //     .catch((error) => {
                      //       console.log(error);
                      //     });
                      // };

                      // GET Student
                            const getData = () => {
                              const startIndex = (currentPage - 1) * itemsPerPage;
                              const endIndex = startIndex + itemsPerPage;
                              axios
                                .get(`${config.ApiUrl}Student/GetStudents`)
                                .then((result) => {
                                  setOriginalData(result.data);
                                  const slicedData = result.data.slice(startIndex, endIndex);
                                  setData(slicedData);
                                  setTotalPages(Math.ceil(result.data.length / itemsPerPage));

                                    })
                                .catch((error) => {
                                  console.log(error);
                                });
                            };

                            useEffect(() => {
                              getData();
                            }, [currentPage]);

                      //popup view details
                      const getStudentDetails = (id) => {
                        console.log('Getting student details for ID:', id);
                        axios
                          .get(`${config.ApiUrl}Student/GetStudent/${id}`)
                          .then((result) => {
                            setSelectedStudent(result.data);
                            // Set editedStudent when getting details
                            fetchFamilyMembersf(result.data.id);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      };

                      //popup view details for edit
                      const getStudentDetailsEdit = (id) => {
                        console.log('Getting student details for ID:', id);
                        axios
                          .get(`${config.ApiUrl}Student/GetStudent/${id}`)
                          .then((result) => {
                            setEditedStudent(result.data); // Set editedStudent when getting details
                            localStorage.setItem('selectedStudentId', id);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      };

                      //popup view details for edit
                    
                      const handleEdit = (id) => {
                        getStudentDetailsEdit(id);
                      };

                      // Function to update edited student details
                      const handleUpdate = () => {
                        if (editedStudent) {
                          axios
                            .put(`${config.ApiUrl}Student/PutStudent/${editedStudent.id}`, editedStudent)
                            .then((response) => {
                              toast.success('Student details updated successfully');
                              setSelectedStudent(null);
                              getData();
                            })
                            .catch((error) => {
                              toast.error('Failed to update Teacher details');
                              console.error('Error updating Teacher:', error);
                            });
                        }
                      };

                      
                      //To Delete the Student
                      const handleDelete = (id) => {
                        Swal.fire({
                          title: 'Are you sure?',
                          text: 'You will not be able to recover this Student!',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#29c2a6',
                          cancelButtonColor: '#ee8686',
                          confirmButtonText: 'Yes, delete it!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            axios
                              .delete(`${config.ApiUrl}Student/DeleteStudent/${id}`)
                              .then((response) => {
                                if (response.status === 200) {
                                  setData((prevData) => prevData.filter((student) => student.id !== id));
                                  toast.success('Student Deleted Successfully');
                                } else {
                                  toast.error('Failed to delete Student');
                                }
                              })
                              .catch((error) => {
                                console.error('Error Deleting Student :', error);
                                toast.error('failed to Delete Student');
                              });

                          }
                        });
                      };

                      //To add Family Details
                      const fetchFamilyMembersf = (studentId) => {
                        axios.get(`${config.ApiUrl}Family/GetFamilyByStudentId/${studentId}`)
                          .then((response) => {
                            // Handle the response data here
                            console.log(response.data);
                            // Assuming you want to store family members in state
                            setFamilyMembers(response.data);
                          })
                          .catch((error) => {
                            console.error('Error fetching  parents details:', error);
                          });
                      };


                      //To add StudentMark Details
                      const handleAddMarks = (id) => {
                        history.push('/StudentMarks');
                        localStorage.setItem('selectedStudentId', id);
                        console.log("selectedStudentId", id);
                      };

                      //add fees detailes
                      const handlefeesform = (id) => {
                        history.push('/FeesCalculators');
                        localStorage.setItem('selectedStudentId',id);
                        console.log('selectedStudentId',id);
                      }

                      //To add Student Details
                      const handleAddStudent = () => {
                        history.push('/StudentForm');
                      };

                      // Function to filter data based on search query
                      const handleSearch = (query) => {
                        const filteredData = originalData.filter((student) =>
                          student.name.toLowerCase().includes(query.toLowerCase())
                        );
                        setData(filteredData);
                      };

                      const handleSearchChange = (e) => {
                        const query = e.target.value;
                        setSearchQuery(query);
                        if (query === '') {
                          setData(originalData);
                        } else {
                          handleSearch(query);
                        }
                      };

                      const customToastStyle = {
                        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                        fontSize: '16px',
                        fontWeight: 'bold',
                      };

                      if (redirectToNotFound) {
                        return <Redirect to="/PageNotFound" />;
                      }

                      

  return (
    <>
      {currentUserRole === 'admin' ?
        <AdminSidebar>
          <>
            <Fragment>
              <h2 id='searchstudenth2'>Search Student</h2>
              <div id="search-container">
                <input
                  id="searchstudentbutton"
                  type="text"
                  placeholder="Search By Name..."
                  value={searchQuery}
                  onChange={handleSearchChange} />
                <FaSearch id="iconsearchstudent" />
                <button id="btnaddstudent" onClick={handleAddStudent}>Add</button>
              </div>
              <table id="mainsearchstudent">
                <thead>
                  <tr id="trsearchstudent">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Mobile Number</th>
                    <th>Standard</th>
                    <th id='actionth'>Actions</th>
                  </tr>
                </thead>
              

                <tbody id='searchstudenttable'>
                  {data && data.length > 0 ? (
                    data.map((student, index) => {
                      return (
                        <tr key={index} id="tr1searchstudent">
                          <td>{index + 1}</td>
                          <td>
                            <button id='butnnameview'
                              onClick={() => getStudentDetails(student.id)}>
                              {student.name}
                            </button>
                          </td>
                          <td>{student.email}</td>

                          <td>  {student.gender === 'male' ? (
                              <GiNurseFemale className="gender-icon"/>
                            ) : (
                              <GiFemaleVampire  className="gender-icon" />
                            )
                        }
                         {/* {student.gender === 'male' ? 'Male' : 'Female'} */}

                        </td>

                      
                          <td>{student.mobileNumber}</td>
                          <td>{student.standard}</td>
                          <td>{student.subject}</td>
                          <td colSpan={4}>
                            <button id="btneditsearchstudent" onClick={() => handleEdit(student.id)}>
                              <FiEdit />
                            </button>

                            <button id="btndeletesearchstudent" onClick={() => handleDelete(student.id)}>
                              <RiDeleteBin6Line />
                            </button>

                            <button id="btnaddmarkssearchstudent" onClick={() => handleAddMarks(student.id)}>
                              <GrScorecard />
                            </button>

                          <button id="btnaddstudentfees" onClick={() => handlefeesform(student.id)}>
                          <SiAmazonpay />

                        </button> 
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8">Loading...</td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              <Popup  contentStyle={{width: "790px" , height:'640px',borderRadius:'10px',background:'#f7f9fb'}}
                         open={selectedStudent !== null}
                         onClose={() => setSelectedStudent(null)}
                         closeOnDocumentClick={false} 
                         closeOnEscape={false} 
                         >
                    {selectedStudent && (
                      <div>
                      
                        <button id="close-btn" onClick={() => setSelectedStudent(null)}>×</button>
                            <h2 id='headingpopup5'>Details of  {selectedStudent.name}</h2>
                            <div id='popuppart1'>
                              <h2 id='headingpopup1'>Student Details</h2>
                              <div id='part2'>
                                <div id='part-2'>
                            <p id='psearchstudent'><b>Standard:</b> {selectedStudent.standard}</p>
                            <p id='psearchstudent'><b>Roll No:</b> {selectedStudent.rollNo}</p>
                            <p id='psearchstudent'><b>Email:</b> {selectedStudent.email}</p>
                            <p id='psearchstudent'><b>Gender:</b> {selectedStudent.gender}</p>
                            <p id='psearchstudent'><b>Birth Date:</b> {selectedStudent.birthDate.split("-").reverse().join("-")}</p>
                            <p id='psearchstudent'><b>Mobile No.:</b> {selectedStudent.mobileNumber}</p>
                            <p id='psearchstudent'><b>Join Date:</b> {selectedStudent.joinDate.split("-").reverse().join("-")}</p>
                            <p id='psearchstudent'><b>Blood Group:</b> {selectedStudent.bloodGroup}</p>
                            <p id='psearchstudent'><b>Address: </b>{selectedStudent.address}</p>
                            <p id='psearchstudent'><b>City: </b>{selectedStudent.city}</p>
                            <p id='psearchstudent'><b>District:</b> {selectedStudent.district}</p>
                            <p id='psearchstudent'><b>State: </b>{selectedStudent.state}</p>
                            <p id='psearchstudent'><b>PinCode:</b> {selectedStudent.pinCode}</p>
                            </div>
                            </div>
                              </div>
                              <div id='popuppart2'>
                              <h2 id='headingpopup2'>Parents Details</h2>
                              <div id='popupcardcontainer'>
                {familyMembers.map((member, index) => (
                  <div  id='popupparents-card'key={index}>
                    <p id='parentrelation'>{member.relation}</p>
                    <p id='psearchstudent2'><strong>Name:</strong> {member.name}</p>
                    <p id='psearchstudent2'><strong>Email:</strong> {member.email}</p>
                    <p id='psearchstudent2'><strong>Occupation:</strong> {member.occupation}</p>
                    <p id='psearchstudent2'><strong>Mobile No.:</strong> {member.mobileNumber}</p> 
                  </div>
                 
                ))}
                </div>
                      </div>  
                      </div>
                    )}
                  </Popup>
              <>
                <Popup
                  contentStyle={{ width: "1700px", height: '690px', borderRadius: '10px', background: 'lightgray' }}
                  open={editedStudent !== null}
                  onClose={() => setEditedStudent(null)}
                  closeOnDocumentClick={false} // Prevents closing on document click
                  closeOnEscape={false} // Prevents closing on escape key press
                >
                  {editedStudent && (
                    <div id='edit-popup'>
                      <button id="close-btn" onClick={() => setEditedStudent(null)}>×</button>
                      <h2 id="headingpopup1">Edit Details of {editedStudent.name}</h2>
                    <div id='stddetailes_border'> 
                      <div id='edit-popuppart1'>

                        <label id='edit-popuplabel'>Standard:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.standard}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, standard: e.target.value })}
                          readOnly
                        />

                        <label id='edit-popuplabel'>Roll No.:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.rollNo}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, rollNo: e.target.value })}
                          readOnly
                        />

                        <label id='edit-popuplabel'>Name:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.name}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, name: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Email:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.email}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, email: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Gender:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.gender}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, gender: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Birth Date:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.birthDate.split("-").reverse().join("-")}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, birthDate: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Mobile No:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.mobileNumber}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, mobileNumber: e.target.value })}
                        />
                      </div>

                      <div id="edit-popuppart2">

                        <label id='edit-popuplabel'>Join Date:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.joinDate.split("-").reverse().join("-")}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, joinDate: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Blood Group:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.bloodGroup}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, bloodGroup: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Address:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.address}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, address: e.target.value })}
                        />

                        <label id='edit-popuplabel'>City:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.city}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, city: e.target.value })}
                        />

                        <label id='edit-popuplabel'>District:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.district}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, district: e.target.value })}
                        />

                        <label id='edit-popuplabel'>State:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.state}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, state: e.target.value })}
                        />

                        <label id='edit-popuplabel'>PinCode:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.pinCode}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, pinCode: e.target.value })}
                        />
                      </div>
                      <button id='edit-popupbtn' onClick={handleUpdate}>Update</button>

                      </div>
                     
                     {/* family member upadting */}
                     <>
                     <div>
                        <h2 id='edit_family_heading'>Parents Details of {editedStudent.name} </h2>
                      </div>

                                    <div id='family_div'>
                                      <div id='containerFamily'>
                                        <form onSubmit={handleSubmit}>
                                          <h2 id='heading_div'>Parents Detail</h2>
                                          <input id='inputfamily' type="hidden" name="id" value={formData.id} onChange={(e) => {setFormData({ ...formData, id: e.target.value });
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
                                                        id='inputfamily'
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
                                                      id='inputfamily'
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
                                                      id='inputfamily'
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
              <div id='dispfamily'>
            {Array.isArray(familyMembers) && familyMembers.length > 0 ? (
              familyMembers.map((familyMember) => (
                <div key={familyMember.id} 
                id='displayfamily'
                style={{
                  backgroundColor:
                    editedCardId === familyMember.id ? '#d3f0f9' : '#e1e4e8', 
                }}
>
                  <h2 id='heading_div'>{familyMember.relation}</h2>
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

                  <button id='btneditPP' onClick={() => handleEditf(familyMember)}><BiEdit /></button>
                  <button id='btndeletePP' onClick={() => handleDeletef(familyMember.id)}><BiTrash /></button>
                </div>
              ))
            ) : (
              <p>No family members to display</p>
            )}
          </div>

      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </>
                    
                    </div>
                  )}
                </Popup>
              </>
            </Fragment>
            <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
           
              

            <div className='Paginated-search-student'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                        disabled={currentPage === index + 1}
                        className='pageButton'
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
                            {/* <div className='Paginated-search-student'>
                  <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='leftarraybutton'>  <FaArrowLeft />
                </button>
                  <span>{currentPage}</span>
                  <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(originalData.length / itemsPerPage)} className='Rightarraybutton'>   <FaArrowRight  />
                </button>
                </div> */}

          </>
        </AdminSidebar>
        : 

     <TeacherSidebar>
  <>
            <Fragment>
              <h2 id='searchstudenth2'>Search Student</h2>
              <div id="search-container">
                <input
                  id="searchstudentbutton"
                  type="text"
                  placeholder="Search By Name..."
                  value={searchQuery}
                  onChange={handleSearchChange} />
                <FaSearch id="iconsearchstudent" />
                <button id="btnaddstudent" onClick={handleAddStudent}>Add</button>
              </div>
              <table id="mainsearchstudent">
                <thead>
                  <tr id="trsearchstudent">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Mobile Number</th>
                    <th>Standard</th>
                    <th id='actionth'>Actions</th>
                  </tr>
                </thead>

                <tbody id='searchstudenttable'>
                  {data && data.length > 0 ? (
                    data.map((student, index) => {
                      return (
                        <tr key={index} id="tr1searchstudent">
                          <td>{index + 1}</td>
                          <td>
                            <button id='butnnameview'
                              onClick={() => getStudentDetails(student.id)}>
                              {student.name}
                            </button>
                          </td>
                          <td>{student.email}</td>

                          <td>  {student.gender === 'male' ? (
                              <BiMale className="gender-icon"/>
                            ) : (
                              <BiFemale className="gender-icon" />
                            )
                        }
                         {/* {student.gender === 'male' ? 'Male' : 'Female'} */}

                        </td>
                          <td>{student.mobileNumber}</td>
                          <td>{student.standard}</td>
                          <td>{student.subject}</td>
                          <td colSpan={4}>
                            <button id="btneditsearchstudent" onClick={() => handleEdit(student.id)}>
                              <FiEdit />
                            </button>

                            <button id="btndeletesearchstudent" onClick={() => handleDelete(student.id)}>
                              <RiDeleteBin6Line />
                            </button>

                            <button id="btnaddmarkssearchstudent" onClick={() => handleAddMarks(student.id)}>
                              <GrScorecard />
                            </button>

                          <button id="btnaddstudentfees" onClick={() => handlefeesform(student.id)}>
                          <SiAmazonpay />

                        </button> 
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8">Loading...</td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              <Popup  contentStyle={{width: "790px" , height:'640px',borderRadius:'10px',background:'#f7f9fb'}}
                         open={selectedStudent !== null}
                         onClose={() => setSelectedStudent(null)}
                         closeOnDocumentClick={false} 
                         closeOnEscape={false} 
                         >
                    {selectedStudent && (
                      <div>
                      
                        <button id="close-btn" onClick={() => setSelectedStudent(null)}>×</button>
                            <h2 id='headingpopup5'>Details of  {selectedStudent.name}</h2>
                            <div id='popuppart1'>
                              <h2 id='headingpopup1'>Student Details</h2>
                              <div id='part2'>
                                <div id='part-2'>
                            <p id='psearchstudent'><b>Standard:</b> {selectedStudent.standard}</p>
                            <p id='psearchstudent'><b>Roll No:</b> {selectedStudent.rollNo}</p>
                            <p id='psearchstudent'><b>Email:</b> {selectedStudent.email}</p>
                            <p id='psearchstudent'><b>Gender:</b> {selectedStudent.gender}</p>
                            <p id='psearchstudent'><b>Birth Date:</b> {selectedStudent.birthDate.split("-").reverse().join("-")}</p>
                            <p id='psearchstudent'><b>Mobile No.:</b> {selectedStudent.mobileNumber}</p>
                            <p id='psearchstudent'><b>Join Date:</b> {selectedStudent.joinDate.split("-").reverse().join("-")}</p>
                            <p id='psearchstudent'><b>Blood Group:</b> {selectedStudent.bloodGroup}</p>
                            <p id='psearchstudent'><b>Address: </b>{selectedStudent.address}</p>
                            <p id='psearchstudent'><b>City: </b>{selectedStudent.city}</p>
                            <p id='psearchstudent'><b>District:</b> {selectedStudent.district}</p>
                            <p id='psearchstudent'><b>State: </b>{selectedStudent.state}</p>
                            <p id='psearchstudent'><b>PinCode:</b> {selectedStudent.pinCode}</p>
                            </div>
                            </div>
                              </div>
                              <div id='popuppart2'>
                              <h2 id='headingpopup2'>Parents Details</h2>
                              <div id='popupcardcontainer'>
                {familyMembers.map((member, index) => (
                  <div  id='popupparents-card'key={index}>
                    <p id='parentrelation'>{member.relation}</p>
                    <p id='psearchstudent2'><strong>Name:</strong> {member.name}</p>
                    <p id='psearchstudent2'><strong>Email:</strong> {member.email}</p>
                    <p id='psearchstudent2'><strong>Occupation:</strong> {member.occupation}</p>
                    <p id='psearchstudent2'><strong>Mobile No.:</strong> {member.mobileNumber}</p> 
                  </div>
                 
                ))}
                </div>
                      </div>  
                      </div>
                    )}
                  </Popup>
              <>
                <Popup
                  contentStyle={{ width: "1700px", height: '690px', borderRadius: '10px', background: 'lightgray' }}
                  open={editedStudent !== null}
                  onClose={() => setEditedStudent(null)}
                  closeOnDocumentClick={false} // Prevents closing on document click
                  closeOnEscape={false} // Prevents closing on escape key press
                >
                  {editedStudent && (
                    <div id='edit-popup'>
                      <button id="close-btn" onClick={() => setEditedStudent(null)}>×</button>
                      <h2 id="headingpopup1">Edit Details of {editedStudent.name}</h2>
                    <div id='stddetailes_border'> 
                      <div id='edit-popuppart1'>

                        <label id='edit-popuplabel'>Standard:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.standard}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, standard: e.target.value })}
                          readOnly
                        />

                        <label id='edit-popuplabel'>Roll No.:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.rollNo}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, rollNo: e.target.value })}
                          readOnly
                        />

                        <label id='edit-popuplabel'>Name:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.name}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, name: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Email:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.email}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, email: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Gender:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.gender}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, gender: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Birth Date:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.birthDate.split("-").reverse().join("-")}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, birthDate: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Mobile No:</label>
                        <input
                          id="edit-popup1"
                          type="text"
                          value={editedStudent.mobileNumber}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, mobileNumber: e.target.value })}
                        />
                      </div>

                      <div id="edit-popuppart2">

                        <label id='edit-popuplabel'>Join Date:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.joinDate.split("-").reverse().join("-")}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, joinDate: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Blood Group:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.bloodGroup}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, bloodGroup: e.target.value })}
                        />

                        <label id='edit-popuplabel'>Address:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.address}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, address: e.target.value })}
                        />

                        <label id='edit-popuplabel'>City:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.city}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, city: e.target.value })}
                        />

                        <label id='edit-popuplabel'>District:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.district}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, district: e.target.value })}
                        />

                        <label id='edit-popuplabel'>State:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.state}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, state: e.target.value })}
                        />

                        <label id='edit-popuplabel'>PinCode:</label>
                        <input
                          id="edit-popup2"
                          type="text"
                          value={editedStudent.pinCode}
                          onChange={(e) =>
                            setEditedStudent({ ...editedStudent, pinCode: e.target.value })}
                        />
                      </div>
                      <button id='edit-popupbtn' onClick={handleUpdate}>Update</button>

                      </div>
                     
                     {/* family member upadting */}
                     <>
                     <div>
                        <h2 id='edit_family_heading'>Parents Details of {editedStudent.name} </h2>
                      </div>

                                    <div id='family_div'>
                                      <div id='containerFamily'>
                                        <form onSubmit={handleSubmit}>
                                          <h2 id='heading_div'>Parents Detail</h2>
                                          <input id='inputfamily' type="hidden" name="id" value={formData.id} onChange={(e) => {setFormData({ ...formData, id: e.target.value });
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
                                                        id='inputfamily'
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
                                                      id='inputfamily'
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
                                                      id='inputfamily'
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
              <div id='dispfamily'>
            {Array.isArray(familyMembers) && familyMembers.length > 0 ? (
              familyMembers.map((familyMember) => (
                <div key={familyMember.id} 
                id='displayfamily'
                style={{
                  backgroundColor:
                    editedCardId === familyMember.id ? '#d3f0f9' : '#e1e4e8', 
                }}
>
                  <h2 id='heading_div'>{familyMember.relation}</h2>
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

                  <button id='btneditPP' onClick={() => handleEditf(familyMember)}><BiEdit /></button>
                  <button id='btndeletePP' onClick={() => handleDeletef(familyMember.id)}><BiTrash /></button>
                </div>
              ))
            ) : (
              <p>No family members to display</p>
            )}
          </div>

      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </>
                    
                    </div>
                  )}
                </Popup>
              </>
            </Fragment>
            <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />

            <div className='Paginated-search-student'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                        disabled={currentPage === index + 1}
                        className='pageButton'
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
{/* 
            <div className='Paginated-search-student'>
  <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='leftarraybutton'>  <FaArrowLeft />
 </button>
  <span>{currentPage}</span>
  <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(originalData.length / itemsPerPage)} className='Rightarraybutton'>   <FaArrowRight  />
 </button>
</div> */}


          </>
    </TeacherSidebar>
  }
    </>
  );
};

export default Search_Student;

