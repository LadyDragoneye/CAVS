import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, momentLocalizer, dateFnsLocalizer } from "react-big-calendar";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import DatePicker from './DatePicker'; // Assuming DatePicker.js is in the same directory
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { Event } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';


const EventForm = ({ label, value, onChange }) => (
  <input
    type="text"
    placeholder={`Add ${label}`}
    style={{ width: '20%', marginRight: '10px' }}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);




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
  const [newEvent, setNewEvent] = useState({ subject: '', start_date: '', end_date: '', centralComplaint: '', body: '', recipient: '' });
  const [userNotes, setUserNotes] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [changesMade, setChangesMade] = useState(false); // State variable to track changes
  const { authTokens } = useContext(AuthContext);



  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };



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


  // useEffect to fetch user notes only when changes are made
  useEffect(() => {
    if (authTokens && changesMade) { // Fetch only when authTokens and changesMade are true
      fetchUserNotes();
      setChangesMade(false); // Reset changesMade after fetching
    }
  }, [authTokens, changesMade]); // Include authTokens and changesMade in the dependency array

  useEffect(() => {
    if (authTokens) {
      fetchUserReceivedNotes();
    }
  }, [authTokens]); // Include authTokens in the dependency array


  const formatDateObjectToISOString = (dateObject) => {
    // Ensure dateObject is provided and contains required properties
    if (!dateObject || typeof dateObject !== 'object' ||
        !dateObject.year || !dateObject.month || !dateObject.day ||
        !dateObject.hour || !dateObject.minute) {
      return null;
    }
  
    // Construct a Date object using the provided properties
    const date = new Date(
      dateObject.year,
      dateObject.month -1, // Month is 0-indexed, so subtract 1
      dateObject.day,
      dateObject.hour,
      dateObject.minute
    );
  
    // Return the ISO string representation of the Date object
    return date.toISOString();
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!authTokens) {
        console.error('User is not authenticated. Authentication token is missing.');
        throw new Error('Authentication token is missing.');
      } 
      setChangesMade(true);
      console.log('Attempting to create event...');
      console.log('Subject:', newEvent.subject); // Log the title state

      console.log('Central Complaint:', newEvent.centralComplaint); // Log the case number state
      console.log('Body:', newEvent.body); // Log the body state
      console.log('Recipient:', newEvent.recipient); // Log the recipient state
      const startDateISO = formatDateObjectToISOString(newEvent.start_date);
      const endDateISO = formatDateObjectToISOString(newEvent.end_date);
      console.log('Start Date:', startDateISO); // Log the start date state
      console.log('End Date:', endDateISO); // Log the end date state
      const response = await axios.post(
        'http://localhost:8000/app/notes/',
        { 
          subject: newEvent.subject, 
          start_date: startDateISO, // Use ISO string format
          end_date: endDateISO, // Use ISO string format
          centralComplaint: newEvent.centralComplaint, 
          body: newEvent.body, 
          recipient: newEvent.recipient 
        },
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
      console.log('Event created successfully:', response.data);
      setNewEvent({ subject: '', start_date: '', end_date: '', centralComplaint: '', body: '', recipient: '' }); // Reset newEvent state
      fetchUserNotes(); // Fetch user events after creating a new event
      fetchUserNotes(); // Fetch user events after creating a new event

    } catch (error) {
      if (error.message === 'Authentication token is missing.') {
        console.error('User is not authenticated. Authentication token is missing.');
      } else {
        console.error('Error creating event:', error);
      }
    }
  };

  const handleConfirmAttendance = async () => {
    try {
      if (!selectedEvent) {
        console.error('No event selected.');
        return;
      }
  
      const queryParams = new URLSearchParams({ confirmed_attendance: true }); // Construct query parameters
      const response = await axios.patch(`http://localhost:8000/app/notes/${selectedEvent.id}/?${queryParams}`);
  
      console.log('Attendance confirmed successfully:', response.data);
      setSelectedEvent({ ...selectedEvent, confirmed_attendance: true });
    } catch (error) {
      console.error('Error confirming attendance:', error);
    }
  };
  



  const handleDeleteEvent = async (eventId) => {
    try {
      if (!authTokens || !selectedEvent) {
        console.error('User is not authenticated or no event selected.');
        return;
      }

      const response = await axios.delete(`http://localhost:8000/app/notes/${eventId}/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });

      console.log('Event deleted successfully:', response.data);
      fetchUserNotes(); // Fetch user notes after deleting the event
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };


  return (
    <div className="App">
      <h1>Trial Dates</h1>
      <h2>Add a New Date</h2>
      <div>
        <EventForm label="Subject" value={newEvent.subject} onChange={(value) => setNewEvent({ ...newEvent, subject: value })} />
        <EventForm label="Central Complaint" value={newEvent.centralComplaint} onChange={(value) => setNewEvent({ ...newEvent, centralComplaint: value })} />
        <EventForm label="Recipient" value={newEvent.recipient} onChange={(value) => setNewEvent({ ...newEvent, recipient: value })} />
        <textarea
          placeholder="Add Body"
          style={{ width: '20%', height: '150px', marginRight: '10px' }}
          value={newEvent.body}
          onChange={(e) => setNewEvent({ ...newEvent, body: e.target.value })}
        />

        <div style={{ marginTop: '90px' }}>
          <DatePicker selected={newEvent.start_date} onChange={(start_date) => setNewEvent({ ...newEvent, start_date })} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <DatePicker selected={newEvent.end_date} onChange={(end_date) => setNewEvent({ ...newEvent, end_date })} />
        </div>
        <button style={{ marginTop: '10px' }} onClick={handleSubmit}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={userNotes.map((note) => ({
          id: note.id,
          subject: note.subject,
          body: note.body,
          start_date: new Date(note.start_date),
          end_date: new Date(note.end_date),
          senderEmail: note.user,
        }))}
        startAccessor="start_date"
        endAccessor="end_date"
        style={{ height: 500, margin: '10px' }}
        eventPropGetter={(event, start, end, isSelected) => {
          let style = {
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            fontSize: '18px',
            padding: '0px',
          };
          return { style };
        }}
        components={{
          event: ({ event }) => (
            <div className="custom-event" onClick={() => handleSelectEvent(event)}>
              <div className="event-subject">{event.subject}</div>
              <div className="event-time">{`${event.start_date.toLocaleTimeString()} - ${event.end_date.toLocaleTimeString()}`}</div>
              <div className="event-sender">{`From: ${event.senderEmail}`}</div>
            </div>
          )
        }}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <div className="selected-event">
          <h2>Event Details</h2>
          <div className="event-detail">
            <p><strong>Subject:</strong> {selectedEvent.subject}</p>
            <p><strong>Body:</strong> {selectedEvent.body}</p>
            <p><strong>Start:</strong> {selectedEvent.start_date.toLocaleString()}</p>
            <p><strong>End:</strong> {selectedEvent.end_date.toLocaleString()}</p>
            <p><strong>From:</strong> {selectedEvent.senderEmail}</p>
            <p><strong>Confirmed Attendance:</strong> {selectedEvent.confirmed_attendance ? 'Yes' : 'No'}</p> 
          </div>
          <button className="confirm-btn" onClick={() => handleConfirmAttendance(selectedEvent)}>Confirm Attendance</button>
          <button className="delete-btn" onClick={() => handleDeleteEvent(selectedEvent.id)}>Delete Event</button>
          <button className="close-btn" onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};
export default App;