import React, { useState, useEffect } from 'react';
import '../Teacher/TimeTable.css';
import config from '../Login/config';

const TimeTable = () => {
    const [standard, setStandard] = useState([]);
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
    
      useEffect(() => {
        const fetchStandards = async () => {
          try {
            const response = await fetch(`${config.ApiUrl}DropDown/Standard`);
            if (response.ok) {
              const data = await response.json();
              setStandard(data);
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
    
  return (
    <div>
      <div className='timetable'>
        <h1 className='timetable-heading'>TimeTable</h1>
        <div className="formtable">
              <label className='labelofform'>Standard:</label>
              
              <select
                value={formData.standard}
                className='inputform'
                required
                onChange={(e) => {
                  setFormData({ ...formData, standard: e.target.value });
                  setStandardError('');
                }}
              >
                <option value="">Select Standard</option>
                {standard.map((standard) => (
                  <option key={standard} value={standard}>
                    {standard}
                  </option>
                ))}
              </select>
              {standardError && <p style={{ color: 'red' }}>{standardError}</p>}
            </div>
        <div>
            <table className='table'>
                <tr>
                    <th>Day/Period</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
               <tr>
                <td className='sub'>7:30-8:30</td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            <tr>
                <td className='sub'>8:30-9:00</td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            <tr>
                <td className='sub'>9:00-9:30</td>
                <td colspan="6" align="center"> Break</td>
            </tr>
            <tr>
                <td className='sub'>10:00-11:00</td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            <tr>
                <td className='sub'>11:00-12:00</td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            </table>
        </div>       
     </div>
    </div>
  )
}
export default TimeTable