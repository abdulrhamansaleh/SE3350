import React,{useState} from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DatePickerComponent = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker/>
    </LocalizationProvider>
  );
}

export default DatePickerComponent




// import React, { useState } from 'react';
// import DatePicker from 'react-date-picker';


// function DatePickerComponent() {
//   const [value, setValue] = useState(new Date());

//   return (
//     <div>
//       <DatePicker onChange={(date)=>setValue(date)} value={value} />
//     </div>
//   );
// }

// export default DatePickerComponent