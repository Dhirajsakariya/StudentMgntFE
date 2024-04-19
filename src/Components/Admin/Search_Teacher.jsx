import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Login/config';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Search_Teacher.css'
import AdminSidebar from '../Sidebar/AdminSidebar';
import { FaSearch } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {toast,Toaster} from 'react-hot-toast';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { GiFemaleVampire } from "react-icons/gi";
import { GiNurseFemale } from "react-icons/gi";


const Search_Teacher = () => {
       const [data, setData] = useState([]);
       const [selectedTeacher,setSelectedTeacher] =useState(null);
       const [searchTerm,setSearchTerm] = useState("");
       const [editedTeacher, setEditedTeacher] = useState(null);
       const [originalData, setOriginalData] = useState([]); 
       const [redirectToNotFound, setRedirectToNotFound] = useState(false);
       const [currentUserRole,setCurrentUserRole]=useState('');
       const [currentPage, setCurrentPage] = useState(1);
       const [totalPages, setTotalPages] = useState(0);
       const itemsPerPage = 5; 

       useEffect(() => {
        const userRoleString = localStorage.getItem('loggedInRole');
        if (userRoleString) {
          const userRole = JSON.parse(userRoleString);
          console.log('loggedInRole for time table', userRole.Role);
          if (userRole.Role !== 'admin') {
            setRedirectToNotFound(true);
          }
        } else {
          console.error('loggedInRole not found in localStorage');
        }
      }, []);
      
      const history =useHistory();

      const handleAddTeacher=()=>{
        history.push('/TeacherForm');
      }
       
       const handleSearch = (query) => {
        const filteredData = originalData.filter((student) =>
          student.name.toLowerCase().includes(query.toLowerCase())
        );
        setData(filteredData);
      };
        // Function to handle search query change
        const handleSearchChange = (e) => {
          const query = e.target.value;
          setSearchTerm(query);
          // If search query is empty, reset data to original state
          if (query === '') {
            setData(originalData);
          } else {
            handleSearch(query);
          }
        };

    //TEACHER GET

    const getData = () => {
      const startIndex = (currentPage -1 ) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      axios
        .get(`${config.ApiUrl}AdminTeacher/GetTeachers`)
        .then((result) => {
          setOriginalData(result.data);
          const slicedData = result.data.slice(startIndex,endIndex);
          setData(slicedData);
          setTotalPages(Math.ceil(result.data.length / itemsPerPage));
          
        })
        .catch((error) => {
          console.log(error);
        });
     };

     useEffect(() => {
      getData();
     },[currentPage]);


     const handlePageClick = (page) => {
      setCurrentPage(page);
     };

     //PopUp View Details
     const getTeacherDetails = (id) => {
      console.log("Getting Teacher details for ID:", id);
      axios
        .get(`${config.ApiUrl}AdminTeacher/GetAdminTeacher/${id}`)
        .then((result) => {
          setSelectedTeacher(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
      };
      useEffect(() => {
      getData();
      getTeacherDetails();
    }, []);

   //PopUp Edit Details
    const getTeacherDetailsForEdit = (id) => {
      axios
        .get(`${config.ApiUrl}AdminTeacher/GetAdminTeacher/${id}`)
        .then((result) => {
          // Assuming result.data contains the teacher details
          setEditedTeacher(result.data); // Set the data for editing
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleEdit = (id) => {
      getTeacherDetailsForEdit(id);
    };
  
    // Function to update edited student details
    const handleUpdate = () => {
      if (editedTeacher) {
        axios
          .put(`${config.ApiUrl}AdminTeacher/PutAdminTeachers/${editedTeacher.id}`, editedTeacher)
          .then((response) => {
            toast.success('Teacher details updated successfully');
            setSelectedTeacher(null);
            getData();
          })
          .catch((error) => {
            toast.error('Failed to update Teacher details');
            console.error('Error updating Teacher:', error);
          });
      }
    };

      //DELETE TEACHER

      const handleDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this teacher!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#29c2a6',
          cancelButtonColor: '#ee8686',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${config.ApiUrl}AdminTeacher/DeleteAdminTeacher/${id}`)
              .then((response) => {
                if (response.status === 200) {
                  setData((prevData) => prevData.filter((teacher) => teacher.id !== id));
                  toast.success('Teacher Deleted Successfully');
                } else {
                  toast.error('Failed to delete teacher');
                }
              })
              .catch((error) => {
                console.error('Error Deleting Teacher:', error);
                toast.error('Failed to delete teacher');
              });
          }
        });
      };
      const customToastStyle = { 
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        fontSize: '16px',
        fontWeight: 'bold',
      };
      if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />; // Redirect if user role is not admin
      }
    
 
  return (
    <AdminSidebar>   
    <>
        <Fragment>
          <h2 id='headingsearchTeacher'>Search Teacher</h2>
        <div id="search-container">
            <input
            id='search'
              type="text"
              placeholder="Search By Name"
              value={searchTerm}
              onChange={handleSearchChange}
              />
              <FaSearch  id='teachersearchicon'/>
              <button id='btn-Add' onClick={handleAddTeacher}>Add</button>
          </div>
     
        <table id='main'>
        <thead >
          <tr id='heading'>
            <th>ID</th>
            <th id='th-name'> Name</th>
            <th id='th-email'>Email</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Standard</th>
            <th>Subject</th>
            <th id='action'>Actions</th>
          </tr>
        </thead>
        <tbody id='table_body'>
          {data && data.length > 0 ? (
            data.map((teacher, index) => {
              return (
                <tr key={index}>
                  <td id='td-align'>{index + 1}</td>
                  <td id='td-align' ><button id='btn-view' onClick={() => getTeacherDetails(teacher.id)}>{teacher.name}</button></td>
                  <td id='td-align'>{teacher.email}</td>
                  {/* <td id='td-align'>{teacher.gender}</td> */}
                  <td id='td-align'>  {teacher.gender === 'male' ? (
                              <GiNurseFemale className="gender-icon"/>
                            ) : (
                              <GiFemaleVampire className="gender-icon" />
                            )
                        }
                         {/* {teacher.gender === 'male' ? 'Male' : 'Female'} */}
                    </td>
                  <td id='td-align'>{teacher.mobileNumber}</td>
                  <td id='td-align'>{(teacher.standard)}</td>
                  <td id='td-align'>{teacher.subject}</td>
                  <td colSpan={2} id='td-align'>
                    <button
                      id='btn-edit'
                      onClick={() => handleEdit(teacher.id)}>
                      <FiEdit />
                    </button>     &nbsp;

                    <button
                      id='btn-delete'
                      onClick={() => handleDelete(teacher.id)}>
                      <RiDeleteBin6Line />

                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan='8'>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
      <Popup contentStyle={{width:'450px', height:'550px',borderRadius:'10px',background:'#f7f9fb'}}
          open={selectedTeacher!== null}
          onClose={() => {
            setSelectedTeacher(null);
          }}
          closeOnDocumentClick={false}
          closeOnEscape={false}
         
          > 
        {selectedTeacher &&(
          
            <div id='pop-up-title'>
               <button id='btn-close' onClick={()=> setSelectedTeacher(null)} >X</button>
              <h2 id='title-name'>Details of {selectedTeacher.name}</h2>
              <p id='pop-field'><b>Email:</b>{selectedTeacher.email}</p>
              <p id='pop-field'><b>Gender:</b> {selectedTeacher.gender}</p>
              <p id='pop-field'><b>Mobile Number:</b> {selectedTeacher.mobileNumber}</p>
              <p id='pop-field'><b>BirthDate: </b>{selectedTeacher.birthDate.split("-").reverse().join("-")}</p>
              <p id='pop-field'><b>JoinDate:</b> {selectedTeacher.joinDate.split("-").reverse().join("-")}</p>
              <p id='pop-field'><b>Address:</b> {selectedTeacher.address}</p>
              <p id='pop-field'><b>City: </b>{selectedTeacher.city}</p>
              <p id='pop-field'><b>District:</b> {selectedTeacher.district}</p>
              <p id='pop-field'><b>State:</b> {selectedTeacher.state}</p>
              <p id='pop-field'><b>Pincode:</b> {selectedTeacher.pinCode}</p>
              <p id='pop-field'><b>Standard:</b> {selectedTeacher.standard}</p>
              <p id='pop-field'><b>Subject:</b> {selectedTeacher.subjectName}</p>
              
            </div>
          )}
        </Popup>
      <>
      <Popup
          contentStyle={{ width: "760px", height:"640px", borderRadius:"10px",background:'lightgray'}}
          open={editedTeacher !== null}
          onClose={() => setEditedTeacher(null)}
          closeOnDocumentClick={false}
          closeOnEscape={false}
        >
            {editedTeacher && (
              <div>
                <button id="close-btn" onClick={() => setEditedTeacher(null)}>
                  × </button>
                <h2 id="headingpopup">Edit Details of {editedTeacher.name}</h2>
                <div id='First-div-editPopup'> 
                <label id='First-div-editPopup_label' htmlFor="teacherName">Name:</label> 
                <input
                  id="teacheredit"
                  type="text"
                  value={editedTeacher.name}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, name: e.target.value })
                  } required
                /> 
                <label id='First-div-editPopup_label'  htmlFor="teacherName">Email:</label> 
                <input
                  id="teacheredit"
                  type="text"
                  value={editedTeacher.email}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, email: e.target.value })
                  }required
                />
                <label id='First-div-editPopup_label' htmlFor="teacherName">Gender:</label> 
                <input
                  id="teacheredit"
                  type="text"
                  value={editedTeacher.gender}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, gender: e.target.value })
                  }required
                />
                <label id='First-div-editPopup_label'  htmlFor="teacherName">Mobile No:</label> 
                <input
                  id="teacheredit"
                  type="text"
                  value={editedTeacher.mobileNumber}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, mobileNumber: e.target.value })
                  }required
                />
                <label id='First-div-editPopup_label' htmlFor="teacherName">BirthDate:</label> 
                <input
                  id="teacheredit"
                  type="text"
                  value={editedTeacher.birthDate.split("-").reverse().join("-")}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, birthDate: e.target.value })
                  }required
                />
                <label id='First-div-editPopup_label' htmlFor="teacherName">JoinDate:</label> 
                <input
                  id="teacheredit"
                  type="text"
                  value={editedTeacher.joinDate.split("-").reverse().join("-")}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, joinDate: e.target.value })
                  }required
                />
                <label id='First-div-editPopup_label' htmlFor="teacherName">Address:</label> 
                <textarea
                  id="teachereditAddress"
                  value={editedTeacher.address}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, address: e.target.value })
                  }required
                />

                </div>
                <div id='Second-div-editPopup'>
                <label id='Second-div-editPopup_label' htmlFor="teacherName">City:</label> 
                <input
                  id="teacheredit2"
                  type="text"
                  value={editedTeacher.city}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, city: e.target.value })
                  }required
                />
                <label id='Second-div-editPopup_label' htmlFor="teacherName">District:</label> 
                <input
                  id="teacheredit2"
                  type="text"
                  value={editedTeacher.district}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, district: e.target.value })
                  }required
                />
                <label id='Second-div-editPopup_label' htmlFor="teacherName">State:</label> 
                <input
                  id="teacheredit2"
                  type="text"
                  value={editedTeacher.state}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, state: e.target.value })
                  }required
                />
                <label id='Second-div-editPopup_label' htmlFor="teacherName">PinCode:</label> 
                <input
                  id="teacheredit2"
                  type="text"
                  value={editedTeacher.pinCode}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, pinCode: e.target.value })
                  }required
                />
                <label id='Second-div-editPopup_label' htmlFor="teacherName">Standard:</label> 
                <input
                  id="teacheredit2"
                  type="text"
                  value={editedTeacher.standard}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, standard: e.target.value })
                  }readOnly
                />
                <label id='Second-div-editPopup_label' htmlFor="teacherName">Subject:</label> 
                <input
                  id="teacheredit2"
                  type="text"
                  value={editedTeacher.subjectName}
                  onChange={(e) =>
                    setEditedTeacher({ ...editedTeacher, subjectName: e.target.value })
                  }readOnly
                />
                </div>

            
              <button id='popup-edit' onClick={handleUpdate}>Update</button>
              </div>
            )}
      </Popup>
     
      </>
            
    </Fragment>
        <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      
            <div className='paginated-search-teacher'>
                {Array.from({ length: totalPages }, (_,index) => (
                  <button
                    key={index}
                    onClick={() => handlePageClick(index + 1 )}
                    disabled={currentPage === index + 1}
                    className='pageButton'
                    >
                      {index + 1}
                  </button>
                ))

                }
            </div>
</>
  </AdminSidebar>
  );
};
export default Search_Teacher;