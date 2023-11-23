import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, getISOWeek, isWithinInterval } from 'date-fns';
import { Button } from '@material-tailwind/react';
const MonthlyCalendar = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([
    { startDate: new Date(year, month, 5), endDate: new Date(year, month, 10), title: 'Wydarzenie 1' },
    // Dodaj inne wydarzenia tutaj
  ]);
  const [tasks, setTasks] = useState([
    { date: new Date(year, month, 8), title: 'Zadanie 1' },
    // Dodaj inne zadania tutaj
  ]);

  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
  ];

  const daysOfWeek = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];

  const changeMonth = (delta) => {
    let newMonth = month + delta;
    let newYear = year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setYear(newYear);
    setMonth(newMonth);
  };

  const selectDay = (day) => {
    setSelectedDay(day);
  };

  const generateCalendar = () => {
    const firstDayOfMonth = startOfMonth(new Date(year, month, 1));
    const lastDayOfMonth = endOfMonth(new Date(year, month + 1, 0));
    const weeks = [];

    let currentDay = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

    while (currentDay <= lastDayOfMonth) {
      const weekNumber = getISOWeek(currentDay);
      const daysInWeek = Array.from({ length: 7 }, (_, i) => addDays(currentDay, i));
      weeks.push({ weekNumber, daysInWeek });
      currentDay = addDays(currentDay, 7);
    }

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button color="amber" onClick={() => changeMonth(-1)}>
            Poprzedni
          </Button>
          <h2 className="text-xl font-bold">{`${monthNames[month]} ${year}`}</h2>
          <Button color="amber" onClick={() => changeMonth(1)}>
            Następny
          </Button>
        </div>
        <div className="grid grid-cols-8 ">
          <div className="col-span-1"></div>
          {daysOfWeek.map((dayOfWeek, index) => (
            <div key={`dayOfWeek-${index}`} className="text-center font-bold">
              {dayOfWeek}
            </div>
          ))}
          {weeks.map((week, index) => (
            <React.Fragment key={`week-${index}`}>
              <div className="col-span-1 text-right font-bold p-11 ">
                {week.weekNumber}
              </div>
              {week.daysInWeek.map((day, dayIndex) => (
                <div
                  key={`day-${dayIndex}`}
                  className={`col-span-1 text-center font-bold cursor-pointer p-11 ${
                    day && day.getMonth() === month ? 'text-black' : 'text-gray-400'
                  }`}
                  onClick={() => selectDay(day)}
                  style={{
                    background: isWithinInterval(day, { start: events[0].startDate, end: events[0].endDate }) ? '#3490dc' :
                      isWithinInterval(day, { start: tasks[0].date, end: tasks[0].date }) ? '#38a169' : 'transparent',
                  }}
                >
                  {day ? format(day, 'd') : ''}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return generateCalendar();
};

export default MonthlyCalendar;
