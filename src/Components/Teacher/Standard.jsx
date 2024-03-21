// import React, { useEffect, useState } from 'react'
// import '../Teacher/Standard.css';
// import config from '../Login/config';

// const Standard = () => {

//   const [data, setData] =useState([]);
// useEffect(() =>{
//   const fetchData = async()=>{
//     try{
//       const response = await fetch(`${config.ApiUrl}Standard/GetStandards`);

//       if(!response.ok){
//       const result = await response.json();
//       setData(result);
//       console.log(result);
//       }
//     }catch(error){
//       console.log("Failed to fetch standard data!");
//     }
//   }
//   fetchData();
// },[])

//   return (
//     <div>
//       <div className='standard'>
//         <h1 className='standard-heading'>Standard List</h1>
//         <div>
//             <table className='tables'>
//                 <tr>
//                     <th>Standard</th>
//                     <th>Section</th>
//                 </tr>                
//             </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Standard

import React, { useEffect, useState } from 'react';
import '../Teacher/Standard.css';
import config from '../Login/config';

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
  );
};

export default Standard;
