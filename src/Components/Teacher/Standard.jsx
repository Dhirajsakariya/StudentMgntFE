import React from 'react'
import '../Teacher/Standard.css';

const Standard = () => {
  return (
    <div>
      <div className='standard'>
        <h1 className='standard-heading'>Standard List</h1>
        <div>
            <table className='tables'>
                <tr >
                    <th>No.</th>
                    <th>Standard</th>
                    <th>Section</th>
                </tr>
                <tr >
                <td>1</td>
                <td>1st</td>
                <td>A</td>
                </tr>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Standard
