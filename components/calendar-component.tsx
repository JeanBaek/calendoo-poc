import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface MyCalendarProps {
  value: Date;
  onChange: (newDate: Date) => void;
}

export const CalendarComponent: React.FC<MyCalendarProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <Calendar
        onClickDay={onChange}
        value={value}
        className="react-calendar"
      />
    </div>
  );
};
