import React, { useState, useEffect, useContext } from 'react';
import './CalStyle.css';
import { registerLicense } from '@syncfusion/ej2-base';
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  DragAndDrop,
  Resize
} from '@syncfusion/ej2-react-schedule';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtecXVWRmhcV0x1WUM=');

const Cal = () => {
  const { authTokens } = useContext(AuthContext);
  const [subject, setSubject] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [caseNumber, setCaseNumber] = useState('123'); // Default case number
  const [message, setMessage] = useState('');
  const [body, setBody] = useState('');
  const [recipient, setRecipient] = useState('');
  const [user, setUser] = useState(''); // Add this line
  const [userNotes, setUserNotes] = useState([]);
  
  const fetchUserNotes = async () => {
    try {
      if (!authTokens) {
        console.error('User is not authenticated. Authentication token is missing.');
        throw new Error('Authentication token is missing.');
      }
      const response = await axios.get('http://localhost:8000/app/user/notes/', {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      });
      console.log('Response from fetchUserNotes:', response.data); // Add this line for debugging
      setUserNotes(response.data);
    } catch (error) {
      console.error('Error fetching user notes:', error);
    }
  };
  

  const fetchUserReceivedNotes = async () => {
    try {
      if (!authTokens) {
        console.error('User is not authenticated. Authentication token is missing.');
        throw new Error('Authentication token is missing.');
      }
      const response = await axios.get('http://localhost:8000/app/user/received_notes/', {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      });
      setUserNotes(response.data);
    } catch (error) {
      console.error('Error fetching user received notes:', error);
    }
  };

  useEffect(() => {
    if (authTokens) {
      fetchUserNotes();
    }
  }, [authTokens]); // Include authTokens in the dependency array

  useEffect(() => {
    if (authTokens) {
      fetchUserReceivedNotes();
    }
  }, [authTokens]); // Include authTokens in the dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!authTokens) {
        console.error('User is not authenticated. Authentication token is missing.');
        throw new Error('Authentication token is missing.');
      }
  
      console.log('Attempting to create note...');
      console.log('Subject:', subject); // Log the subject state
      console.log('Attempting to create note...');
      const response = await axios.post(
        'http://localhost:8000/app/notes/',
        { body, recipient, subject, user }, // Include subject in the request body
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
      console.log('Note created successfully:', response.data);
      setMessage('Note created successfully.');
      setBody('');
      setRecipient('');
      setSubject('');
      setBody('User');
      // After creating a note, refresh the user's notes
      fetchUserNotes(); // Fetch user notes after creating a new note
    } catch (error) {
      if (error.message === 'Authentication token is missing.') {
        console.error('User is not authenticated. Authentication token is missing.');
      } else {
        console.error('Error creating note:', error);
      }
      setMessage('Failed to create note.');
    } finally {
      console.log('Finished handling note creation attempt.');
    }
  };
  
  return (
    <div>
      <h2>Create a Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient's email address"
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter your note..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Your Notes</h2>
     












      {message && <p>{message}</p>}

      <h2>Events</h2>
      <ScheduleComponent>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
      </ScheduleComponent>
    </div>
  );
};

export default Cal;
