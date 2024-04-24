import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Notes = () => {
  const [body, setBody] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [userNotes, setUserNotes] = useState([]);
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
      const response = await axios.post(
        'http://localhost:8000/app/notes/',
        { body, recipient },
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
      console.log('Note created successfully:', response.data);
      setMessage('Note created successfully.');
      setBody('');
      setRecipient('');
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
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
