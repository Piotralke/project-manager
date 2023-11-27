import React, { useState } from 'react';
import { format, addDays, startOfWeek, getISOWeek, isToday, isWithinInterval } from 'date-fns';
import { Button } from '@material-tailwind/react';

const WeeklyCalendar = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = [];

  let currentDay = firstDayOfWeek;
  for (let i = 0; i < 7; i++) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
  ];

  const daysOfWeek = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];
  const weekNumber = getISOWeek(firstDayOfWeek);

  const events = [
    { startDate: new Date(year, month, 28), endDate: new Date(year, month, 30), title: 'Wydarzenie 1' },
    // Dodaj inne wydarzenia tutaj
  ];

  const tasks = [
    { date: new Date(year, month, 8), title: 'Zadanie 1' },
    { date: new Date(year, month, 29), title: 'Zadanie 2' },
    // Dodaj inne zadania tutaj
  ];

  const generateCalendar = () => (
    <div className="p-4">
      <div className="flex justify-center items-center mb-4">
        <div className="text-xl font-bold">{`${monthNames[month]} ${year}`}</div>
      </div>
      <div className="grid grid-cols-8 ">
        <div className="col-span-1 flex justify-center items-center mx-auto font-bold p-11">
          Tyg
        </div>
        {daysOfWeek.map((dayOfWeek, index) => (
          <div key={`dayOfWeek-${index}`} className="flex justify-center items-center mx-auto font-bold">
            {dayOfWeek}
          </div>
        ))}
        
        <div className='col-span-1 text-center font-bold p-11 '>{weekNumber}</div>
        {days.map((day, dayIndex) => {
          const formattedDay = format(day, 'd');
          const isTodayFlag = isToday(day);
          const eventForDay = events.find(event =>
            isWithinInterval(day, { start: event.startDate, end: event.endDate })
          );
          const tasksForDay = tasks.filter(task =>
            isWithinInterval(day, { start: task.date, end: task.date })
          );

          const backgroundColor = () => {
            if (eventForDay && tasksForDay.length > 0) {
              return 'linear-gradient(#3490dc, #38a169)';
            } else if (eventForDay) {
              return '#3490dc';
            } else if (tasksForDay.length > 0) {
              return '#38a169';
            } else {
              return 'transparent';
            }
          };

          return (
            <div
              key={`day-${dayIndex}`}
              className={`flex justify-center items-center col-span-1 self-center font-bold text-center cursor-pointer p-11 ${
                day.getMonth() === month ? 'text-black' : 'text-gray-400'
              } ${isTodayFlag ? 'border rounded-xl border-red-500' : ''}`}
              onClick={() => setSelectedDay(day)}
              style={{ background: backgroundColor() }}
            >
              {formattedDay}
            </div>
          );
        })}
      </div>
    </div>
  );

  return generateCalendar();
};

export default WeeklyCalendar;
