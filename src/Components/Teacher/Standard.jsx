import React, { useEffect, useState } from 'react';
import '../Teacher/Standard.css';
import config from '../Login/config';
import TeacherSidebar from '../Sidebar/TeacherSidebar';

const Standard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.ApiUrl}Standard/GetStandards`);

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log(result);
        }
      } catch (error) {
        console.log("Failed to fetch standard data!");
      }
    };

    fetchData();
  }, []);

  return (
    <TeacherSidebar>
    <div>
      <div className='standard'>
        <h1 className='standard-heading'>Standard List</h1>
        <div>
          <table className='tables'>
            <thead> {/* Add thead element */}
              <tr>
                <th>Standard</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody> {/* Add tbody element */}
              {/* Map over your data array and render rows */}
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.standardNumber}</td>
                  <td>{item.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </TeacherSidebar>
  );
};

export default Standard;
