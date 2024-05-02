import React, { useState } from 'react';
import { DtPicker } from 'react-calendar-datetime-picker';
import 'react-calendar-datetime-picker/dist/style.css';

const DatePicker = ({ selected, onChange }) => {
  return (
    <DtPicker
      selected={selected}
      onChange={onChange}
      withTime
      showTimeInput
    />
  );
};

export default DatePicker;
