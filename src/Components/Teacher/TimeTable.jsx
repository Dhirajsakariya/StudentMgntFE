import React, { useState, useEffect } from 'react';
import '../Teacher/TimeTable.css';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';

const TimeTable = () => {

    const [standard, setStandard] = useState('');
    const [standardData, setStandardData] = useState([]);
    //const [toggle , setToggel] = useState(true);
    const [isDisable , setIsDisable] = useState(true);
    const [standardError, setStandardError] = useState('');
    const [subjectData, setSubjectData] = useState([]);
    const [subject1, setSubject1] = useState('');
    const [subject2, setSubject2] = useState('');
    const [subject3, setSubject3] = useState('');
    const [subject4, setSubject4] = useState('');
    const [subject5, setSubject5] = useState('');
    const [subject6, setSubject6] = useState('');
    const [subject7, setSubject7] = useState('');
    const [subject8, setSubject8] = useState('');
    const [subject9, setSubject9] = useState('');
    const [subject10, setSubject10] = useState('');
    const [subject11, setSubject11] = useState('');
    const [subject12, setSubject12] = useState('');
    const [subject13, setSubject13] = useState('');
    const [subject14, setSubject14] = useState('');
    const [subject15, setSubject15] = useState('');
    const [subject16, setSubject16] = useState('');
    const [subject17, setSubject17] = useState('');
    const [subject18, setSubject18] = useState('');
    const [subject19, setSubject19] = useState('');
    const [subject20, setSubject20] = useState('');
    const [subject21, setSubject21] = useState('');
    const [subject22, setSubject22] = useState('');
    const [subject23, setSubject23] = useState('');
    const [subject24, setSubject24] = useState('');
    const [redirectToNotFound, setRedirectToNotFound] = useState(false);
    const [notloginSuccessMessageShown, setNotloginSuccessMessageShown] = useState(false)
   // const [data, setData] = useState([]);

    const resetSubjects = () => {
      setSubject1('');
      setSubject2('');
      setSubject3('');
      setSubject4('');
      setSubject5('');
      setSubject6('');
      setSubject7('');
      setSubject8('');
      setSubject9('');
      setSubject10('');
      setSubject11('');
      setSubject12('');
      setSubject13('');
      setSubject14('');
      setSubject15('');
      setSubject16('');
      setSubject17('');
      setSubject18('');
      setSubject19('');
      setSubject20('');
      setSubject21('');
      setSubject22('');
      setSubject23('');
      setSubject24('');
  };

      const str = standard;
      const parts = str.split("-");
        
      useEffect(() => {
        const userRoleString = localStorage.getItem('loggedInRole');
        if (userRoleString) {
          const userRole = JSON.parse(userRoleString);
          console.log('loggedInRole for Time table', userRole.Role);
          if (userRole.Role !== 'teacher') {
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
              console.log(data);
            } else {
              throw new Error('Failed to fetch standard');
            }
          } catch (error) {
            console.error('Error fetching standard:', error);
          }
        }; 
        const fetchSubject = async () => {
          try {
            const response = await fetch(`${config.ApiUrl}DropDown/Subject`);
            if (response.ok) {
              const data = await response.json();
              setSubjectData(data);
              console.log(data);
            } else {
              throw new Error('Failed to fetch subject');
            }
          } catch (error) {
            console.error('Error fetching subject:', error);
          }
     }; 
        fetchStandards();
        fetchSubject();
      }, []);

      // useEffect(() => {
      //   fetchData(); 
      // }, []);

      // const fetchData = async () => {
      //   try {
      //     const response = await fetch(`${config.ApiUrl}AdminTeacher/GetStandardFromString/${standardNumber}/${section}`, {
      //       method: 'GET',
      //       headers: {
      //           'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify(GetStandardfromString)
      //   });
      //     if (!response.ok) {
      //       throw new Error('Failed to fetch standard data');
      //     }
      //     const result = await response.json();
      //     setStandardData(result); 
      //   } catch (error) {
      //     console.error('Error fetching standard data:', error);
      //   }
      // };

      const handleSave =async () =>{
        try{
          const timeTableCreateList = [{
            StartTime : "07:30",
            EndTime : "08:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 1,
            SubjectName : subject1
            // Schedules:[
            //   {"NoOfDay":1,SubjectName:subject1},
            //   {"NoOfDay":2,SubjectName:subject2},
            //   {"NoOfDay":3,SubjectName:subject3},
            //   {"NoOfDay":4,SubjectName:subject4},
            //   {"NoOfDay":5,SubjectName:subject5},
            //   {"NoOfDay":6,SubjectName:subject6},
            // ]              
          },
          {
            StartTime : "07:30",
            EndTime : "08:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 2,
            SubjectName : subject2
          },
          {
            StartTime : "07:30",
            EndTime : "08:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 3,
            SubjectName : subject3
          },
          {
            StartTime : "07:30",
            EndTime : "08:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 4,
            SubjectName : subject4
          },
          {
            StartTime : "07:30",
            EndTime : "08:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 5,
            SubjectName : subject5
          },
          {
            StartTime : "07:30",
            EndTime : "08:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 6,
            SubjectName : subject6
          },
          {
            StartTime : "08:30",
            EndTime : "09:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 1,
            SubjectName : subject7
          },  
          {
            StartTime : "08:30",
            EndTime : "09:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 2,
            SubjectName : subject8
          },         
          {
            StartTime : "08:30",
            EndTime : "09:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 3,
            SubjectName : subject9
          },
          {
            StartTime : "08:30",
            EndTime : "09:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 4,
            SubjectName : subject10
          },
          {
            StartTime : "08:30",
            EndTime : "09:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 5,
            SubjectName : subject11
          },
          {
            StartTime : "08:30",
            EndTime : "09:30",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 6,
            SubjectName : subject12
          },
          {
            StartTime : "10:00",
            EndTime : "11:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 1,
            SubjectName : subject13
          },
          {
            StartTime : "10:00",
            EndTime : "11:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 2,
            SubjectName : subject14
          },
          {
            StartTime : "10:00",
            EndTime : "11:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 3,
            SubjectName : subject15
          },
          {
            StartTime : "10:00",
            EndTime : "11:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 4,
            SubjectName : subject16
          },
          {
            StartTime : "10:00",
            EndTime : "11:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 5,
            SubjectName : subject17
          },
          {
            StartTime : "10:00",
            EndTime : "11:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 6,
            SubjectName : subject18
          },
          {
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 1,
            SubjectName : subject19
          },
          {
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 2,
            SubjectName : subject20
          },
          {
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 3,
            SubjectName : subject21
          },
          {
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 4,
            SubjectName : subject22
          },
          {
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 5,
            SubjectName : subject23
          },
          {
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 6,
            SubjectName : subject24
          },
        ]
          setIsDisable(false);

          // const StandardNumber = 10;
          // const Section = 'A';
          // const data = await fetch(`${config.ApiUrl}AdminTeacher/GetStandardFromString/${StandardNumber}/${Section}`,{
          //   method: 'GET',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          // });          
          // console.log(data);

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
           } 
           else{
            // toast.error("Data not Saved!");
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
        setIsDisable(true);
        resetSubjects(); 
      }
      
      if (redirectToNotFound) {
        return <Redirect to="/PageNotFound" />;
      }
          
  return (
    <>
    <TeacherSidebar>
    <div>
      <div id='timetable'>
        <h1 id='h1'>TimeTable</h1>
        <div id='formtable'>
              <select
                value={standard}
                className='inputform' id='inputforms'
                required
                onChange={(e) => {
                 // setFormData({ ...formData, standard: e.target.value });
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
              {standardError && <p style={{ color: 'red' }}>{standardError}</p>}
              <button id='btn1' type='submit' onClick={handleEdit}>Edit</button>
              <button id='btn' type='submit' onClick={handleSave}>Save</button>
              {/* {
                  toggle ? <button id='btn' type='submit' onClick={handleEdit}>Edit</button> :
                  <button id='btn' type='submit' onClick={handleSave}>Save</button>
              }                */}
            </div>
          <div>
            <table className='table' id='table'>
                <tr>
                    <th id='th'>Day/Period</th>
                    <th id='th'>Monday</th>
                    <th id='th'>Tuesday</th>
                    <th id='th'>Wednesday</th>
                    <th id='th'>Thursday</th>
                    <th id='th'>Friday</th>
                    <th id='th'>Saturday</th>
                </tr>
                <tr id='row'>
                  <td id='sub'>07:30-08:30</td>
                  <td>
                  {isDisable ? <select
                      value={subject1}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject1(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject1) => (
                      <option key={subject1} value={subject1}>
                      {subject1}
                    </option>
                    ))}
                  </select> : <input id='sub' value={subject1}  onChange={(e) => subject1(e.target.value) }/>}
                  </td>
                  <td>
                  {isDisable ? <select
                      value={subject2}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject2(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject2) => (
                      <option key={subject2} value={subject2}>
                      {subject2}
                    </option>
                    ))}
                  </select> : <input id='sub' value={subject2} onChange={(e) => subject2(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject3}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject3(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject3) => (
                      <option key={subject3} value={subject3}>
                      {subject3}
                    </option>
                    ))}
                  </select> : <input id='sub' value={subject3} onChange={(e) => subject3(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ? <select
                      value={subject4}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject4(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject4) => (
                      <option key={subject4} value={subject4}>
                      {subject4}
                    </option>
                    ))}
                  </select> : <input id='sub' value={subject4} onChange={(e) => subject4(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ? <select
                      value={subject5}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject5(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject5) => (
                      <option key={subject5} value={subject5}>
                      {subject5}
                    </option>
                    ))}
                  </select> : <input id='sub' value={subject5} onChange={(e) => subject5(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ? <select
                      value={subject6}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject6(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject6) => (
                      <option key={subject6} value={subject6}>
                      {subject6}
                    </option>
                    ))}
                  </select> : <input id='sub' value={subject6} onChange={(e) => subject6(e.target.value)}/> }
                  </td>
                </tr>
                <tr id='row'>
                  <td id='sub'>08:30-09:30</td>
                  <td>
                  {isDisable ? <select
                      value={subject7}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject7(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject7) => (
                      <option key={subject7} value={subject7}>
                      {subject7}
                    </option>
                    ))}
                  </select> : <input id='sub' value={subject7} onChange={(e) => subject7(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ? <select
                      value={subject8}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject8(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject8) => (
                      <option key={subject8} value={subject8}>
                      {subject8}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject8} onChange={(e) => subject8(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ? <select
                      value={subject9}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject9(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject9) => (
                      <option key={subject9} value={subject9}>
                      {subject9}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject9} onChange={(e) => subject9(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject10}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject10(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject10) => (
                      <option key={subject10} value={subject10}>
                      {subject10}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject10} onChange={(e) => subject10(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject11}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject11(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject11) => (
                      <option key={subject11} value={subject11}>
                      {subject11}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject11} onChange={(e) => subject11(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject12}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject12(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject12) => (
                      <option key={subject12} value={subject12}>
                      {subject12}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject12} onChange={(e) => subject12(e.target.value)}/> }
                  </td>
                </tr>
                <tr id='row'>
                  <td id='sub'>09:30-10:00</td>
                  <td id='break' colspan="6" align="center"> Break</td>
                </tr>
                <tr id='row'>
                  <td id='sub'>10:00-11:00</td>
                  <td>
                  {isDisable ?<select
                      value={subject13}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject13(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject13) => (
                      <option key={subject13} value={subject13}>
                      {subject13}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject13} onChange={(e) => subject13(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject14}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject14(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject14) => (
                      <option key={subject14} value={subject14}>
                      {subject14}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject14} onChange={(e) => subject14(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject15}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject15(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject15) => (
                      <option key={subject15} value={subject15}>
                      {subject15}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject15} onChange={(e) => subject15(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject16}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject16(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject16) => (
                      <option key={subject16} value={subject16}>
                      {subject16}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject16} onChange={(e) => subject16(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject17}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject17(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject17) => (
                      <option key={subject17} value={subject17}>
                      {subject17}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject17} onChange={(e) => subject17(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject18}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject18(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject18) => (
                      <option key={subject18} value={subject18}>
                      {subject18}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject18} onChange={(e) => subject18(e.target.value)}/> }
                  </td>
                </tr>
                <tr id='row'>
                  <td id='sub'>11:00-12:00</td>
                  <td>
                  {isDisable ?<select
                      value={subject19}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject19(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject19) => (
                      <option key={subject19} value={subject19}>
                      {subject19}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject19} onChange={(e) => subject19(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject20}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject20(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject20) => (
                      <option key={subject20} value={subject20}>
                      {subject20}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject20} onChange={(e) => subject20(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject21}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject21(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject21) => (
                      <option key={subject21} value={subject21}>
                      {subject21}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject21} onChange={(e) => subject21(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject22}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject22(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject22) => (
                      <option key={subject22} value={subject22}>
                      {subject22}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject22} onChange={(e) => subject22(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject23}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject23(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject23) => (
                      <option key={subject23} value={subject23}>
                      {subject23}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject23} onChange={(e) => subject23(e.target.value)}/> }
                  </td>
                  <td>
                  {isDisable ?<select
                      value={subject24}
                      id='sub'
                      required
                      onChange={(e) => {
                      setSubject24(e.target.value);
                      }} >
                    <option disabled={true} value="">Select</option>
                    {subjectData.map((subject24) => (
                      <option key={subject24} value={subject24}>
                      {subject24}
                    </option>
                    ))}
                  </select>: <input id='sub' value={subject24} onChange={(e) => subject24(e.target.value)}/> }
                  </td>
                </tr>
              </table>
        </div>       
      </div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
    </div>
     </TeacherSidebar>
    </>
  )
}
export default TimeTable