import React,{useState} from 'react'
import '../Teacher/SubjectForm.css';
import { toast, Toaster } from 'react-hot-toast';
import config from '../Login/config';
import { useHistory } from 'react-router-dom';

const SubjectForm = () => {

    //const navigate = useHistory();

    //const [userData, setUserData] = useState({id:''});
    const [day, setDayError] = useState('');
    const [startTime, setStartTimeError] = useState('');
    const [endTime, setEndTimeError] = useState('');
    const [standard, setStandardError] = useState('');
    const [section, setSectionError] = useState('');
    const [subject, setSubjectError] = useState('');
    
    const [formData, setFormData] = useState({
      id: '',
      day: '',
      startTime: '',
      endTime: '',
      standard: '',
      section: '',
      subject: '',
    });
    const days=[ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const std=[ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"  ];
    const sect=[ "A", "B" ];
    const sub=[ "kalrav", "kallol", "kalshor",  "Aaspas Paryavaran", "Vanchan ane Lekhan", "Drawing", "Maths", "Hindi", "English",
     "Gujarati", "Science","Social Science", "Sanskrit", "Computer" ];

    const customToastStyle = {
      fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      fontSize: '16px',
      fontWeight: 'bold',
    };

    const handleSubmit =  (e) => {
        e.preventDefault();

        if (!formData.day) {
          setDayError('Please select name of day');
          return;
        }
         else if(!formData.startTime)
         {
           setStartTimeError('Please Enter a start time');
           return;
         }
         else if(!formData.endTime)
         {
           setEndTimeError('Please Enter a end time');
           return;
         }
         else if(!formData.standard)
         {
          setStandardError('Please select a standard');
           return;
         }
         else if(!formData.section)
         {
          setSectionError('Please select a section');
           return;
         }
         else if(!formData.subject)
         {
          setSubjectError('Please select a subject');
           return;
         }
      //   try {
      //     const saveSubjectData = {
      //       Id: formData.id,
      //       NoOfDay: formData.day,
      //       StartTime: formData.starttime,
      //       EndTime: formData.endtime,
      //       Standards: formData.standard,
      //       Subjects: formData.subject,
      //       SubjectId: userData.id,
      //       StandardId: userData.id
      //     };
      //     const response = await fetch(`${config.ApiUrl}`, {
      //       method: 'POST',
      //       headers: {
      //           'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({
      //         Id: formData.id,
      //         NoOfDay: formData.day,
      //         StartTime: formData.starttime,
      //         EndTime: formData.endtime,
      //         Standards: formData.standard,
      //         Subjects: formData.subject,
      //       })
      //   });
         
      //    if(response.ok){
      //     setTimeout(() => {
      //       navigate.push('/TimeTable') 
      //     }, 1500);
      //     toast.success('Subject data save successfully!')
      //   }    
      //   setFormData({ // Reset form fields
      //     id: '',
      //     day: '',
      //     starttime: '',
      //     endtime: '',
      //     standard: '',
      //     section: '',
      //     subject: '',
      //   });     
      //   }catch {
      //     toast.error('Failed to save subject details');
      // }        
}

  return (
    <div>
        <div className='subjectttableform'>
      <div className='formheading'>
            <form onSubmit={handleSubmit}>
                <h1>Subject Timetable Form</h1>
                <div className="formtable">
                <label className='labelofform'>Name of Day:</label>
              <select
                value={formData.day}
                className='inputform'
                required
                onChange={(e) => {
                  setFormData({ ...formData, day: e.target.value });
                  setDayError('');
                }}
              >
                <option value="">Select Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {day && <p style={{ color: 'red'}}>{day}</p>}
            </div>
                <div className='formtable'>
                    <label className='labelofform'>Start-Time:</label>
                    <input
                        className='inputform'
                        type='time'
                        value={ formData.startTime}
                        onChange={(e) => {
                          setFormData({ ...formData, startTime: e.target.value });
                          setStartTimeError('');
                        }}
                        required
                    />
                    {startTime && <p style={{ color: 'red'}}>{startTime}</p>}
               </div>
                <div className='formtable'>
                    <label className='labelofform'>End-Time:</label>
                    <input
                        className='inputform'
                        type='time'
                        value={ formData.endTime}
                        onChange={(e) => {
                          setFormData({ ...formData, endTime: e.target.value });
                          setEndTimeError('');
                        }}
                        required
                    /> 
                    {endTime && <p style={{ color: 'red'}}>{endTime}</p>}
                </div>
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
                {std.map((standard) => (
                  <option key={standard} value={standard}>
                    {standard}
                  </option>
                ))}
              </select>
              {standard && <p style={{ color: 'red'}}>{standard}</p>}
            </div>
            <div className="formtable">
                <label className='labelofform'>Section:</label>
              <select
                value={formData.section}
                className='inputform'
                required
                onChange={(e) => {
                  setFormData({ ...formData, section: e.target.value });
                  setSectionError('');
                }}
              >
                <option value="">Select Section</option>
                {sect.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
              {section && <p style={{ color: 'red'}}>{section}</p>}
            </div>                
            <div className="formtable">
                <label className='labelofform'>Subject:</label>
              <select
                value={formData.subject}
                className='inputform'
                required
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  setSubjectError('');
                }}
              >
                <option value="">Select Subject</option>
                {sub.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {subject && <p style={{ color: 'red'}}>{subject}</p>}
            </div>
                <div className='formtable'>
                <button type="submit" className='savebutton' onClick={handleSubmit}>Save</button>
            </div>
            </form>
            <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </div>      
    </div>
  </div>
  )
};

export default SubjectForm;
