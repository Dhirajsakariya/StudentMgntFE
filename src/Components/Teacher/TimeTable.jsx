import React, { useState, useEffect } from 'react';
import '../Teacher/TimeTable.css';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import toast from 'react-hot-toast';


const TimeTable = () => {
    const [standard, setStandard] = useState('');
    const [standardData, setStandardData] = useState([]);
    //const [toggle , setToggel] = useState(true);
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

    const [formData, setFormData] = useState({
        id:'',
        day: '',
        startTime: '',    
        endTime: '',
        standard: '',
        section: '',
        subject: '',
      });

      const str = standard;
      const parts = str.split("-");

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
          },{
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
          },{
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 3,
            SubjectName : subject21
          },{
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 4,
            SubjectName : subject22
          },{
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 5,
            SubjectName : subject23
          },{
            StartTime : "11:00",
            EndTime : "12:00",
            StandardNumber : parts[0],
            Section : parts[1],
            NoOfDay : 6,
            SubjectName : subject24
          },
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
                // navigate.push('/Userdetail') 
              }, 1500);
           } 
           else{
            toast.error("Data not Saved!");
           }
        }
        catch{
            toast.error("Error in data Saving!")
        }
      }

      // const handleEdit =()=>{
      //   setToggel(false);
      // }
    
  return (
    <>
    <TeacherSidebar>
    <div>
      <div id='timetable'>
        <h1 id='h1'>TimeTable</h1>
        <div id='formtable'>
              {/* <label className='labelofform' id='labelofform'>Standard:</label> */}              
              <select
                value={standard}
                className='inputform' id='inputforms'
                required
                onChange={(e) => {
                 // setFormData({ ...formData, standard: e.target.value });
                 setStandard(e.target.value);
                  setStandardError('');
                }}
              >
                <option value="">Select Standard</option>
                {standardData.map((standard) => (
                  <option key={standard} value={standard}>
                    {standard}
                  </option>
                ))}
              </select>
              {standardError && <p style={{ color: 'red' }}>{standardError}</p>}
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
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                </tr>
                <tr id='row'>
                  <td id='sub'>08:30-09:30</td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                </tr>
                <tr id='row'>
                  <td id='sub'>09:30-10:00</td>
                  <td id='break' colspan="6" align="center"> Break</td>
                </tr>
                <tr id='row'>
                  <td id='sub'>10:00-11:00</td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                </tr>
                <tr id='row'>
                  <td id='sub'>11:00-12:00</td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                  <td>
                  <select
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
                  </select>
                  </td>
                </tr>
              </table>
        </div>       
      </div>
    </div>
     </TeacherSidebar>
    </>
  )
}
export default TimeTable