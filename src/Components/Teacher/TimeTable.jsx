import React from 'react'
import '../Teacher/TimeTable.css';

const TimeTable = () => {
  return (
    <div>
      <div className='timetable'>
        <h1 className='timetable-heading'>TimeTable</h1>
        <div>
            <table>
                <tr className='table'>
                    <th>Day/Period</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
               <tr>
                <td className='sub'>7:30-8:00</td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            <tr>
                <td className='sub'>8:00-8:30</td>
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
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            <tr>
                <td className='sub'>9:30-10:00</td>
                <td colspan="6" align="center"> Break</td>
            </tr>
            <tr>
                <td className='sub'>10:00-10:30</td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            <tr>
                <td className='sub'>10:30-11:00</td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            <tr>
                <td className='sub'>11:00-11:30</td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
                <td className='sub'></td>
            </tr>
            <tr>
                <td className='sub'>11:30-12:00</td>
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
