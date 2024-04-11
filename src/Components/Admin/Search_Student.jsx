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
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { GrScorecard } from "react-icons/gr";

const Search_Student = () => {
  
const [originalData, setOriginalData] = useState([]);
const [data, setData] = useState(null);
const [selectedStudent, setSelectedStudent] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [editedStudent, setEditedStudent] = useState(null);
const [redirectToNotFound, setRedirectToNotFound] = useState(false);
const[familyMembers,setFamilyMembers] = useState([]);
const [currentUserRole,setCurrentUserRole]=useState('');

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
  const getData = () => {
    axios
      .get(`${config.ApiUrl}Student/GetStudents`)
      .then((result) => {
        setOriginalData(result.data);
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //popup view details
  const getStudentDetails = (id) => {
    console.log('Getting student details for ID:', id);
    axios
      .get(`${config.ApiUrl}Student/GetStudent/${id}`)
      .then((result) => {
        setSelectedStudent(result.data);
       // Set editedStudent when getting details
       fetchFamilyMembers(result.data.id);
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

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (id) => {
    getStudentDetailsEdit(id);
  };

  // Function to update edited student details
  const handleUpdate = () => {
    if (editedStudent) {
      axios
        .put(`${config.ApiUrl}Student/PutStudent/${editedStudent.id}`, editedStudent)
        .then((response) => {
          toast.success('Teacher details updated successfully');
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
      }).then((result)=> {
       
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
  const fetchFamilyMembers = (studentId) => {
    axios.get(`${config.ApiUrl}Family/GetFamilyByStudentId/${studentId}`)
      .then((response) => {
        // Handle the response data here
        console.log(response.data);
        // Assuming you want to store family members in state
        setFamilyMembers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching family members:', error);
      });
  };


   //To add StudentMark Details
   const handleAddMarks = (id) =>{
    history.push('/StudentMarks');
    localStorage.setItem('selectedStudentId', id);
    console.log("selectedStudentId",id);
  }

 //To add Student Details
 const handleAddStudent = () =>{
  history.push('/StudentForm');
}

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
    // If search query is empty, reset data to original state
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
    { currentUserRole =='admin' ?
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
                  onChange={handleSearchChange}/>
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
                      <td>{student.gender}</td>
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

                        {/* <button id="btnaddfamilysearchstudent" onClick={() => handleAddFamily(student.id)}>
                                   <MdOutlineFamilyRestroom />
                        </button> */}
                        <button id="btnaddmarkssearchstudent" onClick={() => handleAddMarks(student.id)}>
                                    <GrScorecard />

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
                         closeOnDocumentClick={false} // Prevents closing on document click
                         closeOnEscape={false} // Prevents closing on escape key press
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
                              {/* Add more details as needed */}
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
                    {/* Add more fields as needed */}
                  </div>
                 
                ))}
                </div>
                      </div>  
                      </div>
                    )}
                  </Popup>

                  <>  
                    <Popup 
                          contentStyle={{ width: "790px" , height:'640px' , borderRadius:'10px', background:'lightgray'}}
                          open={editedStudent !== null}
                          onClose={() => setEditedStudent(null)}
                          closeOnDocumentClick={false} // Prevents closing on document click
                          closeOnEscape={false} // Prevents closing on escape key press
                          >
                        {editedStudent && (
                          <div id='edit-popup'>
                            <button id="close-btn" onClick={() => setEditedStudent(null)}>×</button>
                            <h2 id="headingpopup">Edit Details of {editedStudent.name}</h2>
              
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
                                        setEditedStudent({ ...editedStudent, email: e.target.value })}
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
                          )}
                    </Popup>
          </>
        </Fragment>
         <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
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
                  onChange={handleSearchChange}/>
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
                      <td>{student.gender}</td>
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

                        {/* <button id="btnaddfamilysearchstudent" onClick={() => handleAddFamily(student.id)}>
                                   <MdOutlineFamilyRestroom />
                        </button> */}
                        <button id="btnaddmarkssearchstudent" onClick={() => handleAddMarks(student.id)}>
                                    <GrScorecard />

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
                         closeOnDocumentClick={false} // Prevents closing on document click
                         closeOnEscape={false} // Prevents closing on escape key press
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
                              {/* Add more details as needed */}
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
                    {/* Add more fields as needed */}
                  </div>
                 
                ))}
                </div>
                      </div>  
                      </div>
                    )}
                  </Popup>

                  <>  
                    <Popup 
                          contentStyle={{ width: "790px" , height:'640px' , borderRadius:'10px', background:'lightgray'}}
                          open={editedStudent !== null}
                          onClose={() => setEditedStudent(null)}
                          closeOnDocumentClick={false} // Prevents closing on document click
                          closeOnEscape={false} // Prevents closing on escape key press
                          >
                        {editedStudent && (
                          <div id='edit-popup'>
                            <button id="close-btn" onClick={() => setEditedStudent(null)}>×</button>
                            <h2 id="headingpopup">Edit Details of {editedStudent.name}</h2>
              
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
                                        setEditedStudent({ ...editedStudent, email: e.target.value })}
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
                          )}
                    </Popup>
          </>
        </Fragment>
         <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </>
    </TeacherSidebar>
  }
  </>
  );
};
 export default Search_Student;
