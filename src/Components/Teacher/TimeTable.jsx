import React, { useState, useEffect } from 'react';
import '../Teacher/TimeTable.css';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import AdminSidebar from '../Sidebar/AdminSidebar';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';
import { MdFileDownloadDone } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TimeTable = () => {

    const [standardId, setStandardId] = useState('');
    const [standard, setStandard] = useState('');
    const [standard1, setStandard1] = useState('');
    const [standardData, setStandardData] = useState([]);
    const [timeTableData, setTimeTableData] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [noOfDay, setNoOfDay] = useState('');
    const [subjectData, setSubjectData] = useState([]);
    const [subject, setSubject] = useState('');
    const [teacherData, setTeacherData] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [redirectToNotFound, setRedirectToNotFound] = useState(false);
    const [notloginSuccessMessageShown, setNotloginSuccessMessageShown] = useState(false);
    const [currentUserRole,setCurrentUserRole]=useState('');

      const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
      const str = standard;
      const parts = str.split("-");
      var standards = parts[0] === standards;
      var section= parts[1] === section;
      const dayMap = {
        Monday : 1,
        Tuesday : 2,
        Wednesday :3,
        Thursday : 4,
        Friday : 5,
        Saturday : 6
      };
      const dayInteger = dayMap[noOfDay];

      useEffect(() => {
        if (standard) {
          const [standardNumber, section] = standard.split("-");
          fetchStandardId(standardNumber, section);
        }
      }, [standard]);

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
        const fetchStandards = async () => {
          try {
            const response = await fetch(`${config.ApiUrl}DropDown/Standard`);
            if (response.ok) {
              const data = await response.json();
              setStandardData(data);
            } 
            else {
              toast.error('Failed to fetch standard');
            }
          } catch {
            toast.error('Error fetching standard:');
          }
        }; 
          const fetchTeacherName = async () => {
            try {
              const response = await fetch(`${config.ApiUrl}DropDown/TeacherName`);
              if (response.ok) {
                const data = await response.json();
                setTeacherData(data);
              } else {
                 toast.error('Failed to fetch subject');
              }
            } catch {
              toast.error('Error fetching subject:');
            }
        }; 
          const fetchTimeTableData = async () => {
            try {
              const response = await fetch(`${config.ApiUrl}TimeTable/GetTimeTables`);
              if (response.ok) {
                const data = await response.json();
                setTimeTableData(data);
                console.log(data);
              } else {
                 toast.error('Failed to fetch subject');
              }
            } catch {
              toast.error('Error fetching subject:');
            }
     }; 
          
        fetchStandards();
        fetchTeacherName();
        fetchTimeTableData();
        fetchStandardId();
      }, []);
    
      useEffect(() => {
        const fetchSubject = async () => {
          try {
            const response = await fetch(`${config.ApiUrl}DropDown/AllSubjectByStandard/${standardId}`);
            if (response.ok) {
              const data = await response.json();
              setSubjectData(data);
            } else {
              toast.error('Failed to fetch subjects');
            }
          } catch (error) {
            console.error('Error fetching subjects:', error);
            toast.error('Error fetching subjects');
          }
        };
      
        fetchSubject();
      }, [standardId]);
      
      const fetchStandardId = async (standards , section) => {
        try {
          console.log("standardNumber",standards)
          const response = await fetch(`${config.ApiUrl}AdminTeacher/GetStandardFromString/${parts[0]}/${parts[1]}`);
          if (response.ok) {
            const data = await response.json();
            setStandardId(data);
            console.log("standards",data);
          } else {
             toast.error('Failed to fetch subject');
          }
        } catch {
          toast.error('Error fetching subject:');
        }
      }; 
 

      const handleSave =async (e) =>{
        e.preventDefault();
        try{
          const timeTableCreateList = [{
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : dayInteger,
            StartTime : startTime,
            EndTime : endTime,
            SubjectName : subject,
            TeacherName :teacher
          }           
        ]
          const response = await fetch(`${config.ApiUrl}TimeTable/PostTimeTable`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(timeTableCreateList)
          });
          console.log("response",response);
          const result = response;
          console.log("result",result);
          if (response.ok) {
              toast.success("SuccessFully Saved!");
              setTimeout(() => {
              }, 1500);

              const response = await fetch(`${config.ApiUrl}TimeTable/GetTimeTables`);
              const data = await response.json();
              setTimeTableData(data);
              setStandard('');
              setNoOfDay('');
              setStartTime('');
              setEndTime('');
              setSubject('');
              setTeacher('');
           } 
           
           else{
            if (!notloginSuccessMessageShown)
             {
                toast.error('Login failed. Please try again later.');
                setNotloginSuccessMessageShown(true)
             }
           }
        } catch{
            toast.error("Error in data Saving!")
        }
      }

      const customToastStyle = {
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        fontSize: '16px',
        fontWeight: 'bold',
      };

      const handleEdit =()=>{
        // setIsDisable(true);
        // resetSubjects(); 
      }
      
      if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />;
      }
      
  return (
    <>
    { currentUserRole =='admin' ?
    <AdminSidebar>
    <>
    <div>
      <div id='timetable'>
        <h1 id='h1'>Time-Table</h1>
        <input type='hidden' value={standardId} onChange={(e) => setStandardId(e.target.value)}/>
        <table id='teacher-timetable'>
        <tbody>
                <tr>
                  <td id='teacher-timetable-th'>Standard</td>
                  <td id='teacher-timetable-th'>Day</td>
                  <td id='teacher-timetable-th'>Start Time</td>
                  <td id='teacher-timetable-th'>End Time</td>
                  <td id='teacher-timetable-th'>Subject</td>
                  <td id='teacher-timetable-th'>Teacher</td>
                  <td id='teacher-timetable-th'>Action</td>
                </tr>
                <tr id='teacher-timetable-row'>
                <td>
                   <select
                      value={standard}
                      id='sub'
                      required
                      onChange={(e) => {
                      setStandard(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {standardData.map((standard) => (
                      <option key={standard} value={standard}>
                      {standard}
                    </option>
                    ))}
                  </select>
                  </td>
                  <td>
                  <select
                      value={noOfDay}
                      id='sub'
                      required
                      onChange={(e) => {
                      setNoOfDay(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {day.map((day) => (
                      <option key={day} value={day}>
                      {day}
                    </option>
                    ))}
                  </select>                  </td>
                  <td>
                    <input id='sub' type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
                  </td>
                  <td>
                    <input id='sub' type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
                  </td>
                  <td>
                   <select
                      value={subject}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject) => (
                      <option key={subject} value={subject}>
                      {subject}
                    </option>
                    ))}
                  </select>
                  </td>
                  <td>
                   <select
                      value={teacher}
                      id='sub'
                      required
                      onChange={(e) => {
                      setTeacher(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {teacherData.map((teacher) => (
                      <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                    ))}
                  </select>
                  </td>
                  <td>
                  <button id='btn1' type='submit' onClick={handleSave}><MdFileDownloadDone style={{font:"icon"}}/></button>
                  <button id='btn' type='submit' onClick={handleEdit}><FaEdit/></button>
                  </td>
                </tr>
              </tbody>
            </table>
        <div id='formtable'>
          <div>
          <select
              value={standard1}
              id='sub1'
              required
              onChange={(e) => {
              setStandard1(e.target.value);
              }} >
              <option disabled={true} value="">Select Standard</option>
                {standardData.map((standard) => (
                <option key={standard} value={standard}>
                  {standard}
                </option>
                ))}
            </select>
            <table className='table' id='table'>
              <thead>
                <tr>
                    <th id='th'>Day/Period</th>
                    <th id='th'>Monday</th>
                    <th id='th'>Tuesday</th>
                    <th id='th'>Wednesday</th>
                    <th id='th'>Thursday</th>
                    <th id='th'>Friday</th>
                    <th id='th'>Saturday</th>
                </tr>
                </thead>
                <tbody>
                  {timeTableData
                      .filter((timeSlot,index,self) => (
                        // Filter out duplicates based on start and end time
                        index === self.findIndex((t) => (
                            t.startTime === timeSlot.startTime && t.endTime === timeSlot.endTime && t.standard === standard1
                        ))
                    ))
                      .sort((a, b) => {
                          // Compare start time
                          if (a.startTime !== b.startTime) {
                              return a.startTime.localeCompare(b.startTime);
                          }
                          // If start times are equal, compare end time
                          return a.endTime.localeCompare(b.endTime);
                      })
                      .map((timeSlot, index) => (
                          <tr key={index}>
                              <td id='ttdata'>{timeSlot.startTime}-{timeSlot.endTime}</td>
                              {day.map((dayName, dayIndex) => {
                                  const dayData = timeTableData.find(td => (
                                      td.noOfDay === (dayIndex + 1) &&
                                      td.startTime === timeSlot.startTime &&
                                      td.endTime === timeSlot.endTime
                                  ));
                                  return (
                                      <td key={dayIndex} id='ttdata'>
                                          {dayData ? `${dayData.subject} (${dayData.teacherName})` : ''}    
                                      </td>
                                  );
                              })}
                          </tr>
                      ))}
                </tbody>
              </table>
            </div>

        </div>       
      </div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    </div>
    </>
    </AdminSidebar>
    :
    <TeacherSidebar>
      <>
    <div>
      <div id='timetable'>
        <h1 id='h1'>Time-Table</h1>        
        <input type='hidden' value={standardId} onChange={(e) => setStandardId(e.target.value)}/>
        <table id='teacher-timetable'>
        <tbody>
                <tr>
                  <td id='teacher-timetable-th'>Standard</td>
                  <td id='teacher-timetable-th'>Day</td>
                  <td id='teacher-timetable-th'>Start Time</td>
                  <td id='teacher-timetable-th'>End Time</td>
                  <td id='teacher-timetable-th'>Subject</td>
                  <td id='teacher-timetable-th'>Teacher</td>
                  <td id='teacher-timetable-th'>Action</td>
                </tr>
                <tr id='teacher-timetable-row'>
                <td>
                   <select
                      value={standard}
                      id='sub'
                      required
                      onChange={(e) => {
                      setStandard(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {standardData.map((standard) => (
                      <option key={standard} value={standard}>
                      {standard}
                    </option>
                    ))}
                  </select>
                  </td>
                  <td>
                  <select
                      value={noOfDay}
                      id='sub'
                      required
                      onChange={(e) => {
                      setNoOfDay(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {day.map((day) => (
                      <option key={day} value={day}>
                      {day}
                    </option>
                    ))}
                  </select>                  
                  </td>
                  <td>
                    <input id='sub' type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
                  </td>
                  <td>
                    <input id='sub' type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
                  </td>
                  <td>
                   <select
                      value={subject}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject) => (
                      <option key={subject} value={subject}>
                      {subject}
                    </option>
                    ))}
                  </select>
                  </td>
                  <td>
                   <select
                      value={teacher}
                      id='sub'
                      required
                      onChange={(e) => {
                      setTeacher(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {teacherData.map((teacher) => (
                      <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                    ))}
                  </select>
                  </td>
                  <td>
                  <button id='btn1' type='submit' onClick={handleSave}><MdFileDownloadDone style={{font:"icon"}}/></button>
                  <button id='btn' type='submit' onClick={handleEdit}><FaEdit/></button>
                  </td>
                </tr>
              </tbody>
            </table>
        <div id='formtable'>
          <div>
          <select
              value={standard1}
              id='sub1'
              required
              onChange={(e) => {
              setStandard1(e.target.value);
              }} >
              <option disabled={true} value="">Select Standard</option>
                {standardData.map((standard) => (
                <option key={standard} value={standard}>
                  {standard}
                </option>
                ))}
            </select>
            <table className='table' id='table'>
              <thead>
                <tr>
                    <th id='th'>Day/Period</th>
                    <th id='th'>Monday</th>
                    <th id='th'>Tuesday</th>
                    <th id='th'>Wednesday</th>
                    <th id='th'>Thursday</th>
                    <th id='th'>Friday</th>
                    <th id='th'>Saturday</th>
                </tr>
                </thead>
                <tbody>
                  {timeTableData
                      .filter((timeSlot,index,self) => (
                        // Filter out duplicates based on start and end time
                        index === self.findIndex((t) => (
                            t.startTime === timeSlot.startTime && t.endTime === timeSlot.endTime && t.standard === standard1
                        ))
                    ))
                      .sort((a, b) => {
                          // Compare start time
                          if (a.startTime !== b.startTime) {
                              return a.startTime.localeCompare(b.startTime);
                          }
                          // If start times are equal, compare end time
                          return a.endTime.localeCompare(b.endTime);
                      })
                      .map((timeSlot, index) => (
                          <tr key={index}>
                              <td id='ttdata'>{timeSlot.startTime}-{timeSlot.endTime}</td>
                              {day.map((dayName, dayIndex) => {
                                  const dayData = timeTableData.find(td => (
                                      td.noOfDay === (dayIndex + 1) &&
                                      td.startTime === timeSlot.startTime &&
                                      td.endTime === timeSlot.endTime
                                  ));
                                  return (
                                      <td key={dayIndex} id='ttdata'>
                                          {dayData ? `${dayData.subject} (${dayData.teacherName})` : ''}    
                                      </td>
                                  );
                              })}
                          </tr>
                      ))}
                </tbody>
              </table>
            </div>

        </div>       
      </div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    </div>
    </>
     </TeacherSidebar>
}
    </>
  )
}
export default TimeTable
