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
      <div id='standard'>
        <h1 id='stdheader'>Standard List</h1>
        <div>
          <table id='tables'>
            <thead> 
              <tr>
                <th id='stdth'>Standard</th>
                <th id='stdth'>Section</th> 
              </tr>
            </thead>
            <tbody> 
              {data.map((item, index) => (
                <tr key={index}>
                  <td id='stdtd'>{item.standardNumber}</td>
                  <td id='stdtd'>{item.section}</td>
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
