import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DtPicker } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/style.css'
import "./App.css";
import DatePicker from './DatePicker'; // Assuming DatePicker.js is in the same directory
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import React, { useState, useEffect, useContext } from 'react';




const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const App = () => {
  const [newEvent, setNewEvent] = useState({ subject: '', start: '', end: '', caseNumber: '', body: '', recipient: '' });
  const [allNotes, setAllNotes] = useState([]);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    if (authTokens) {
      fetchUserNotes();
    }
  }, [authTokens]); // Include authTokens in the dependency array

  const fetchUserNotes = async () => {
    try {
      if (!authTokens) {
        console.error('User is not authenticated. Authentication token is missing.');
        throw new Error('Authentication token is missing.');
      }

      const response = await axios.get('http://localhost:8000/app/notes/', {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });

      setAllNotes(response.data);
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!authTokens) {
        console.error('User is not authenticated. Authentication token is missing.');
        throw new Error('Authentication token is missing.');
      }

      console.log('Attempting to create event...');
      console.log('Subject:', newEvent.subject); // Log the title state
      const response = await axios.post(
        'http://localhost:8000/app/notes/',
        { subject: newEvent.subject, start: newEvent.start, end: newEvent.end, caseNumber: newEvent.caseNumber, body: newEvent.body, recipient: newEvent.recipient },
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
      console.log('Event created successfully:', response.data);
      setNewEvent({ subject: '', start: '', end: '', caseNumber: '', body: '', recipient: '' }); // Reset newEvent state
      fetchUserNotes(); // Fetch user events after creating a new event
    } catch (error) {
      if (error.message === 'Authentication token is missing.') {
        console.error('User is not authenticated. Authentication token is missing.');
      } else {
        console.error('Error creating event:', error);
      }
    }
  };

    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Subject" style={{ width: "20%", marginRight: "10px" }} value={newEvent.subject} onChange={(e) => setNewEvent({ ...newEvent, subject: e.target.value })} />
                <input type="text" placeholder="Add Case Number" style={{ width: "20%", marginRight: "10px" }} value={newEvent.caseNumber} onChange={(e) => setNewEvent({ ...newEvent, caseNumber: e.target.value })} />
                <input type="text" placeholder="Add Recipient" style={{ width: "20%", marginRight: "10px" }} value={newEvent.recipient} onChange={(e) => setNewEvent({ ...newEvent, recipient: e.target.value })} />
                <input type="text" placeholder="Add Body" style={{ width: "20%", marginRight: "10px" }} value={newEvent.body} onChange={(e) => setNewEvent({ ...newEvent, body: e.target.value })} />
                <div style={{ marginTop: "200px" }}> {/* Adjust position */}
                    <DatePicker selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                </div>
                <div style={{ marginTop: "10px" }}> {/* Adjust position */}
                    <DatePicker selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                </div>
                <button style={{ marginTop: "10px" }} onClick={handleSubmit}>
                    Add Event
                </button>
            </div>
            <Calendar localizer={localizer} events={allNotes.map(note => ({
              subject: note.subject,
              start: new Date(note.start_date),
              end: new Date(note.end_date),
              senderEmail: note.user.email // Add sender's email to the event object
            }))} 
            startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default App;
