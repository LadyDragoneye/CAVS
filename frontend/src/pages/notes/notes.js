import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Notes = () => {
  const [body, setBody] = useState('');
  const [recipient, setRecipient] = useState('');
  const [user, setUser] = useState(''); // Add this line
  const [subject, setSubject] = useState('');
  const [caseNumber, setCaseNumber] = useState(''); // Default case number
  const [message, setMessage] = useState('');
  const [userNotes, setUserNotes] = useState([]);
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const { authTokens } = useContext(AuthContext);


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
      console.log('date:', start_date); // Log the date state
      console.log('date:', end_date); // Log the date state
      const response = await axios.post(
        'http://localhost:8000/app/notes/',
        { body, recipient, subject, user, caseNumber, start_date, end_date }, // Include subject in the request body
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
      console.log('Note created successfully:', response.data);
      setMessage('Note created successfully.');
      setBody('');
      setRecipient('');
      setSubject('');
      setStart_date('');
      setEnd_date('');
      setCaseNumber(''); // Reset case number state
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
          <input
          type="text"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
          placeholder="case number"
          required
        />
        <input
          type="datetime-local"
          value={start_date}
          onChange={(e) => setStart_date(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={end_date}
          onChange={(e) => setEnd_date(e.target.value)}
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
      <ul>
  {userNotes.map((note) => (
    <li key={note.id}>
      <strong>Sender's Email:</strong> {note.user}<br /> {/* Added this line */}
      <strong>Recipient:</strong> {note.recipient}<br />
      <strong>Subject:</strong> {note.subject}<br />
      <strong>Case Number:</strong> {note.caseNumber}<br /> {/* Added this line */}
      <strong>Body:</strong> {note.body}
    </li>
  ))}
</ul>


    </div>
  );
};

export default Notes;