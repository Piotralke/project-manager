import React, { useState } from 'react';
import { Card, CardHeader, Typography } from "@material-tailwind/react";
const Calendar = () => {
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const generateMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Ustawić pierwszym dniem poniedziałek

    const daysInMonth = getDaysInMonth(year, month);

    const prevMonthDays = [];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevMonthDay = getDaysInMonth(year, month - 1) - i;
      prevMonthDays.push({
        day: prevMonthDay,
        isCurrentMonth: false
      });
    }

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      return {
        day,
        isCurrentMonth: true
      };
    });

    return [...prevMonthDays, ...currentMonthDays];
  };

  const [tasks, setTasks] = useState([
    { startDate: new Date(2023, 10, 5), endDate: new Date(2023, 10, 10) },
    // Dodaj inne wydarzenia tutaj
  ]);

  const handleDayClick = (date) => {
    console.log(date.toLocaleDateString());
    // Logika obsługi kliknięcia na dzień (do zaimplementowania)
  };

  const generateCalendar = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const today = new Date();
    const months = [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];

    return (
      <div className="grid grid-cols-4 gap-1">
        {months.map((month, monthIndex) => {
          const monthDays = generateMonthDays(currentYear, monthIndex);
          const firstDayOfWeek = (new Date(currentYear, monthIndex, 1).getDay() + 6) % 7;

          return (
            <div key={monthIndex} className="p-1 my-2 border rounded-md">
              <CardHeader color="amber" className="flex items-center justify-center" contentPosition="left">
                <Typography color="white" variant="h6">{month}</Typography>
              </CardHeader>
              <div className="grid grid-cols-7 ">
                {/* Nagłówki dni tygodnia */}
                {['P', 'W', 'Ś', 'C', 'Pt', 'S', 'N'].map((dayName, dayIndex) => (
                  <div key={dayIndex} className="py-1 font-semibold text-center">{dayName}</div>
                ))}
                {/* Dni miesiąca */}
                {monthDays.map(({ day, isCurrentMonth }, dayIndex) => {
                  const currentDate = new Date(currentYear, monthIndex < firstDayOfWeek ? monthIndex + 1 : monthIndex, day);

                  const isToday = currentDate.toDateString() === today.toDateString();
                  const isTaskDay = tasks.some(task =>
                    currentDate >= task.startDate && currentDate <= task.endDate
                  );

                  return (
                    <div
                      key={dayIndex}
                      className={`text-center ${
                        !isCurrentMonth ? 'text-gray-400' : ''} ${
                        isToday && isCurrentMonth ? 'bg-blue-200 cursor-pointer' : ''
                      } ${
                        isTaskDay ? 'bg-yellow-200 cursor-pointer' : 'cursor-pointer'}`}
                      onClick={() => handleDayClick(currentDate)}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="w-full max-w-screen-lg">
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
