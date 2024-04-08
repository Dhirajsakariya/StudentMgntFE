import React, { useState, useEffect } from 'react';
// import '../Teacher/TimeTable.css';
import '../Student/TimeTableViewer.css';
import config from '../Login/config';
import StudentSidebar from '../Sidebar/StudentSidebar';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';

const TimeTableViewer = () => {

    const [timeTables, setTimeTables] = useState([]);
    const [standard, setStandard] = useState('');
    const [standardData, setStandardData] = useState([]);
    const [isDisable, setIsDisable] = useState(true);
    const [standardError, setStandardError] = useState('');
    const [subjectData, setSubjectData] = useState([]);
    const [redirectToNotFound, setRedirectToNotFound] = useState(false);
    const [periods, setPeriods] = useState([
        { startTime: '', endTime: '' },
        { startTime: '', endTime: '' },
        { startTime: '', endTime: '' },
        { startTime: '', endTime: '' },
        { startTime: '', endTime: '' },
        { startTime: '', endTime: '' },
    ]);
    //const [subjects, setSubjects] = useState(Array(24).fill(''));

    // const resetSubjects = () => {
    //     setSubjects(Array(24).fill(''));
    // };

    useEffect(() => {
        const userRoleString = localStorage.getItem('loggedInRole');
        if (userRoleString) {
          const userRole = JSON.parse(userRoleString);
          console.log('loggedInRole for Student', userRole.Role);
          if (userRole.Role !== 'student') {
            setRedirectToNotFound(true);
          }
        } else {
          console.error('loggedInRole not found in localStorage');
        }
      }, []);

    // useEffect(() => {
    //     const fetchStandards = async () => {
    //         try {
    //             const response = await fetch(${config.ApiUrl}DropDown/Standard);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setStandardData(data);
    //             } else {
    //                 throw new Error('Failed to fetch standard');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching standard:', error);
    //         };
    //     };
    //     const fetchSubject = async () => {
    //         try {
    //             const response = await fetch(${config.ApiUrl}DropDown/Subject);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setSubjectData(data);
    //             } else {
    //                 throw new Error('Failed to fetch subject');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching subject:', error);
    //         }
    //     };
    //     fetchStandards();
    //     fetchSubject();
    // }, []);

    useEffect(() => {
      const fetchStandards = async () => {
          try {
              const response = await fetch(`${config.ApiUrl}DropDown/Standard`);
              if (response.ok) {
                  const data = await response.json();
                  setStandardData(data);
              } else {
                  throw new Error('Failed to fetch standard');
              }
          } catch (error) {
              console.error('Error fetching standard:', error);
          }
          };
          fetchStandards();
      },[]);


    // const handleSave = async () => {
    //     try {
    //         const timeTableCreateList = periods.flatMap((period, index) => {
    //             return {
    //                 StartTime: period.startTime,
    //                 EndTime: period.endTime,
    //                 StandardNumber: standard.split("-")[0],
    //                 Section: standard.split("-")[1],
    //                 NoOfDay: index + 1,
    //                 SubjectName: subjects[index]
    //             };
    //         });
    //         setIsDisable(false);
    //         const response = await fetch(${config.ApiUrl}TimeTable/PostTimeTable, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(timeTableCreateList)
    //         });
    //         if (response.ok) {
    //             toast.success("Successfully Saved!");
    //         } else {
    //             toast.error("Failed to save data!");
    //         }
    //     } catch {
    //         toast.error("Error in data Saving!");
    //     }
    // };

    // const handleEdit = () => {
    //     setIsDisable(true);
    //     resetSubjects();
    // };

    if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />;
    }

    return (
        <>
            <StudentSidebar>
                <div>
                    <div id='timetableviewer'>
                        <h1 id='h1viewer'>TimeTable</h1>
                        {timeTables.map(timeTable => (
                            <li key={timeTable.id}>{timeTable.name}</li>
                        ))}
                        <div id='formtabledata'>
                            <select
                                value={standard}
                                className='inputform' id='inputformstd'
                                required
                                onChange={(e) => {
                                    setStandard(e.target.value);
                                    setStandardError('');
                                    setIsDisable(true);
                                }}
                            >
                                <option value="" disabled={true} >Select Standard</option>
                                {standardData.map((standard) => (
                                    <option key={standard} value={standard}>
                                        {standard}
                                    </option>
                                ))}
                            </select>
                            {/* <button id='btn1' type='button' onClick={handleEdit}>Edit</button>
                            <button id='btn' type='button' onClick={handleSave}>Save</button> */}
                        </div>
                        <div>
                            <table className='tableview' id='tableview'>
                                <thead>
                                    <tr>
                                        <th id='thtable'>Day/Period</th>
                                        <th id='thtable'>Monday</th>
                                        <th id='thtable'>Tuesday</th>
                                        <th id='thtable'>Wednesday</th>
                                        <th id='thtable'>Thursday</th>
                                        <th id='thtable'>Friday</th>
                                        <th id='thtable'>Saturday</th>
                                    </tr>
                                    <tr>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                    </tr>
                                    <tr>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                    </tr>
                                    <tr>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                    </tr>
                                    <tr>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                    </tr>
                                    <tr>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                    </tr>
                                    <tr>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                        <th id='rowview'></th>
                                    </tr>

                                </thead>
                                {/* <tbody>
                                    {periods.map((period, index) => (
                                        <tr key={index}>
                                            <td id='row'>{${period.startTime}${period.endTime}}</td>
                                            {Array(6).fill().map((_, dayIndex) => (
                                                <td key={dayIndex}> */}
                                                  
                                                    {/* {isDisable ?
                                                        <select
                                                            value={subjects[index * 6 + dayIndex]}
                                                            id='sub'
                                                            required
                                                            onChange={(e) => {
                                                                const newSubjects = [...subjects];
                                                                newSubjects[index * 6 + dayIndex] = e.target.value;
                                                                setSubjects(newSubjects);
                                                            }}
                                                        >
                                                            <option disabled={true} value="">Select</option>
                                                            {subjectData.map((subject) => (
                                                                <option key={subject} value={subject}>
                                                                    {subject}
                                                                </option>
                                                            ))}
                                                        </select> :
                                                        <input
                                                            id='sub'
                                                            value={subjects[index * 6 + dayIndex]}
                                                            onChange={(e) => {
                                                                const newSubjects = [...subjects];
                                                                newSubjects[index * 6 + dayIndex] = e.target.value;
                                                                setSubjects(newSubjects);
                                                            }}
                                                        />
                                                    } */}
                                                {/* </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody> */}
                            </table>
                        </div>
                    </div>
                </div>
            </StudentSidebar>
        </>
    );
};

export default TimeTableViewer;