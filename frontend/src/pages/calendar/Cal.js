
// Filename - pages/Cal.js
 
import React, { useState } from 'react';
import Calendar from 'react-calendar';


export default function CalendarGfg() {
    const [value, onChange] = useState(new Date());
 
    return (
        <div>
            <h1>Calendar</h1>
            <Calendar
                onChange={onChange}
                value={value}
            />
        </div>
    );
}