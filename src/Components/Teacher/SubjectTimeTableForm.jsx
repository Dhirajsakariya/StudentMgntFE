import React, { useState, useEffect } from 'react';
import '../Teacher/SubjectTimeTableForm.css';
import { toast, Toaster } from 'react-hot-toast';
import config from '../Login/config';
import { useHistory } from 'react-router-dom';
import TeacherSidebar from '../Sidebar/TeacherSidebar';

const SubjectTimeTableForm = () => {
const navigate = useHistory();

  const [dayError, setDayError] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');
  const [standardError, setStandardError] = useState('');
  const [subjectError, setSubjectError] = useState('');

  const [subjectId, setSubjectId] = useState('');
  const [standardId, setStandardId] = useState('');

  const [formData, setFormData] = useState({
    id:'',
    day: '',
    startTime: '',    
    endTime: '',
    standard: '',
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

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const std = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  //const sub = ["kalrav", "kallol", "kalshor", "Aaspas Paryavaran", "Vanchan ane Lekhan", "Drawing", "Maths", "Hindi", "English", "Gujarati", "Science", "Social Science", "Sanskrit", "Computer"];

  const customToastStyle = {
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
  };

   useEffect(() => {
    const subjectTimetable = async () => {
      try {
        const response = await fetch(`${config.ApiUrl}TimeTable/GetTimeTables`);
        if (response.ok) {
          const data = await response.json();
          setSubjectId(data[0]?.subjectId)
          setStandardId(data[0]?.standardId);
          console.log(data);
          // Handle data as needed
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    subjectTimetable();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map the selected day to its corresponding integer value
      const dayInteger = dayMap[formData.day];

      //const timeInteger = formattedTime[formData.startTime];
   
   // Check if the day is selected
      
    if (!dayInteger) {
      setDayError('Please select name of day');
      return;
    } else if (!formData.startTime) {
      setStartTimeError('Please Enter a start time');
      return;
    } else if (!formData.endTime) {
      setEndTimeError('Please Enter a end time');
      return;
    } else if (!formData.standard) {
      setStandardError('Please select a standard');
      return;
    } else if (!formData.subject) {
      setSubjectError('Please select a subject');
      return;
    }
    
    try {
      const response = await fetch(`${config.ApiUrl}TimeTable/PostTimeTable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: formData.id,
          NoOfDay: dayInteger,
          StartTime: formData.startTime,
          EndTime: formData.endTime,
          Standards: formData.standard,
          Subjects: formData.subject
        })
      });
      
      const result = await response.json();
      console.log(result);
    
      if (response.ok) {
        setTimeout(() => {
          navigate.push('/TimeTable');
        }, 1500);
        toast.success('Subject data saved successfully!');
      } else {
        throw new Error(`Failed to save subject details: ${result.message}`);
      }
    
      // Reset form fields
      setFormData({
        id: '',
        day: '',
        startTime: '',
        endTime: '',
        standard: '',
        subject: ''
      });
    } catch (error) {
      toast.error(error.message || 'Failed to save subject details');
    }
  }
  
  return (
    <TeacherSidebar>
    <div>
      <div className='subjectttableform'>
        <div className='formheading'>
          <form onSubmit={handleSubmit}>
            <h1>Subject TimeTable Form</h1>
            <div className="formtable">
              <input type='hidden' value={subjectId} onChange={(e) => setSubjectId(e.target.value)}  readOnly />
              <input type='hidden' value={standardId} onChange={(e) => setStandardId(e.target.value)} readOnly />
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
              {dayError && <p style={{ color: 'red' }}>{dayError}</p>}
            </div>
            <div className='formtable'>
              <label className='labelofform'>Start-Time:</label>
              <input
                className='inputform'
                type='time'
                value={formData.startTime}
                onChange={(e) => {
                  setFormData({ ...formData, startTime: e.target.value });
                  setStartTimeError('');
                }}
                required
              />              
              {startTimeError && <p style={{ color: 'red' }}>{startTimeError}</p>}
            </div>
            <div className='formtable'>
              <label className='labelofform'>End-Time:</label>
              <input
                className='inputform'
                type='time'
                value={formData.endTime}
                onChange={(e) => {
                  setFormData({ ...formData, endTime: e.target.value });
                  setEndTimeError('');
                }}
                required
              />
              {endTimeError && <p style={{ color: 'red' }}>{endTimeError}</p>}
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
              {standardError && <p style={{ color: 'red' }}>{standardError}</p>}
            </div>
            <div className='formtable'>
              <label className='labelofform'>Subject:</label>
              <input
                className='inputform'
                type='text'
                placeholder='Enter a Subject Name'
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  setSubjectError('');
                }}
                required
              />
              {subjectError && <p style={{ color: 'red' }}>{subjectError}</p>}
            </div>
            {/* <div className="formtable">
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
              {subjectError && <p style={{ color: 'red'}}>{subjectError}</p>}
            </div> */}
                <div className='formtable'>
                <button type="submit" className='savebutton' onClick={handleSubmit}>Save</button>
            </div>
            </form>
            <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </div>      
    </div>
  </div>
  </TeacherSidebar>
  )
};

export default SubjectTimeTableForm;
