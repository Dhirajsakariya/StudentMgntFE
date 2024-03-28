import React, { useState, useEffect } from 'react';
import '../Teacher/TimeTable.css';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';
import toast from 'react-hot-toast';

const TimeTable = () => {
    const [standard, setStandard] = useState('');
    const [standardData, setStandardData] = useState([]);
    const [toggle , setToggel] = useState(true);
    const [standardError, setStandardError] = useState('');
    const [formData, setFormData] = useState({
        id:'',
        day: '',
        startTime: '',    
        endTime: '',
        standard: '',
        section: '',
        subject: '',
      });

      const dayMap = {
        Sunday : 0,
        Monday : 1,
        Tuesday : 2,
        Wednesday :3,
        Thursday : 4,
        Friday : 5,
        Saturday : 6
      };
      const dayInteger = dayMap[formData.day];

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
        fetchStandards();
      }, []);

      const handleSave =async () =>{
        try{
          const timeTableCreateList = {
            NoOfDay:dayInteger,
            StartTime:formData.startTime,
            EndTime: formData.endTime,
            SubjectName: formData.subject,
            StandardNumber: parts[0],
            Section : parts[1]
          };
          const response = await fetch(`${config.ApiUrl}TimeTable/PostTimeTable`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(timeTableCreateList)
          });
           const result = response.json();
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

      const handleEdit =()=>{
        setToggel(false);
      }
    
  return (
    <>
    <TeacherSidebar>
    <div>
      <div className='timetable' id='timetable'>
        <h1 className='timetable-heading' id='timetable-heading'>TimeTable</h1>
        <div className="formtable" id='formtable'>
              <label className='labelofform' id='labelofform'>Standard:</label>
              
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
              {
                  toggle ? <button id='btn' type='submit' onClick={handleEdit}>Edit</button> :
                  <button id='btn' type='submit' onClick={handleSave}>Save</button>
              }               
            </div>
        <div>
            <table className='table' id='table'>
                <tr>
                    <th>Day/Period</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
                <tr id='row'>
                  <td>7:30-8:30</td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                </tr>
                <tr id='row'>
                  <td>8:30-9:30</td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                </tr>
                <tr id='row'>
                  <td>9:30-10:00</td>
                  <td colspan="6" align="center"> Break</td>
                </tr>
                <tr id='row'>
                  <td>10:00-11:00</td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                </tr>
                <tr id='row'>
                  <td>11:00-12:00</td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
                  <td><input id='sub' type='text'/></td>
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