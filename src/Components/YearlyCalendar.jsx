import React, { useState, useEffect } from 'react';
import { CardHeader, Typography } from "@material-tailwind/react";

const Calendar = () => {
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const generateMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;

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

  const today = new Date();

  const handleDayClick = (date) => {
    console.log(date.toLocaleDateString());
    // Logika obsługi kliknięcia na dzień (do zaimplementowania)
  };
  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  const [currentVisibleYear, setCurrentVisibleYear] = useState(new Date().getFullYear());
  const [currentVisibleMonth, setCurrentVisibleMonth] = useState(new Date().getMonth());
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrevMonth = () => {
    setCurrentVisibleMonth((prev) => {
      const newYear = prev === 0 ? currentVisibleYear - 1 : currentVisibleYear;
      setCurrentVisibleYear(newYear);
      return prev === 0 ? 11 : prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentVisibleMonth((prev) => {
      const newYear = prev === 11 ? currentVisibleYear + 1 : currentVisibleYear;
      setCurrentVisibleYear(newYear);
      return prev === 11 ? 0 : prev + 1;
    });
  };


  const handlePrevYear = () => {
    setCurrentVisibleYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    setCurrentVisibleYear((prev) => prev + 1);
  };

  const generateCalendar = () => {
    const yearMonths = Array.from({ length: 12 }, (_, monthIndex) => {
      return generateMonthDays(currentVisibleYear, monthIndex);
    });

    if (isSmallScreen) {
      const currentMonth = generateMonthDays(currentVisibleYear, currentVisibleMonth);
      const firstDayOfWeek = (new Date(currentVisibleYear, currentVisibleMonth, 1).getDay() + 6) % 7;

      return (
        <div className="grid grid-cols-1 gap-1">
          <div key={currentVisibleMonth} className="p-1 my-2 border rounded-md">
            <CardHeader color="amber" className="flex items-center justify-center" contentPosition="left">
              <Typography color="white" variant="h6">{monthNames[currentVisibleMonth]} </Typography>
            </CardHeader>
            <div className="grid grid-cols-7">
              {['P', 'W', 'Ś', 'C', 'Pt', 'S', 'N'].map((dayName, dayIndex) => (
                <div key={dayIndex} className="font-semibold text-center">{dayName}</div>
              ))}
              {currentMonth.map(({ day, isCurrentMonth }, dayIndex) => {
                const currentDate = new Date(currentVisibleYear, currentVisibleMonth < firstDayOfWeek ? currentVisibleMonth + 1 : currentVisibleMonth, day);
                const isToday = currentDate.toDateString() === today.toDateString();
                const isTaskDay = tasks.some(task => currentDate >= task.startDate && currentDate <= task.endDate);

                return (
                  <div
                    key={dayIndex}
                    className={`text-center px-1 ${!isCurrentMonth ? 'text-gray-400 ' : ''} ${isToday && isCurrentMonth ? 'border border-red-400 rounded-md cursor-pointer ' : ''
                      } ${isTaskDay ? 'bg-yellow-200 cursor-pointer' : 'cursor-pointer'}`}
                    onClick={() => handleDayClick(currentDate)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {yearMonths.map((monthDays, monthIndex) => {
            const firstDayOfWeek = (new Date(currentVisibleYear, monthIndex, 1).getDay() + 6) % 7;

            return (
              <div
                key={monthIndex}
                className={`p-1 my-2 border rounded-md`}
              >
                <CardHeader color="amber" className="flex items-center justify-center" contentPosition="left">
                  <Typography color="white" variant="h6">{monthNames[monthIndex]}</Typography>
                </CardHeader>
                <div className="grid grid-cols-7">
                  {['P', 'W', 'Ś', 'C', 'Pt', 'S', 'N'].map((dayName, dayIndex) => (
                    <div key={dayIndex} className="font-semibold text-center">{dayName}</div>
                  ))}
                  {monthDays.map(({ day, isCurrentMonth }, dayIndex) => {
                    const currentDate = new Date(currentVisibleYear, monthIndex < firstDayOfWeek ? monthIndex + 1 : monthIndex, day);
                    const isToday = currentDate.toDateString() === today.toDateString();
                    const isTaskDay = tasks.some(task => currentDate >= task.startDate && currentDate <= task.endDate);

                    return (
                      <div
                        key={dayIndex}
                        className={`text-center px-1 ${!isCurrentMonth ? 'text-gray-400 ' : ''} ${isToday && isCurrentMonth ? 'border border-red-400 rounded-md  cursor-pointer ' : ''
                          } ${isTaskDay ? 'bg-yellow-200 cursor-pointer' : 'cursor-pointer'}`}
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
    }
  };

  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="w-full max-w-screen-lg">
        <CardHeader color="amber" className="flex items-center justify-center" contentPosition="left">
          <Typography color="white" variant="h6">{currentVisibleYear}</Typography>
        </CardHeader>
        <div className="col-span-4 md:col-span-1 p-1 my-2 border rounded-md flex justify-between items-center">
          {!isSmallScreen ? (
            <>
              <button onClick={handlePrevYear}>&lt; Poprzedni rok</button>
              <button onClick={handleNextYear}>Następny rok &gt;</button>
            </>
          ) : <>
            <button onClick={handlePrevMonth}>&lt; Poprzedni</button>
            <button onClick={handleNextMonth}>Następny &gt;</button>
          </>}

        </div>
        <div>
          {generateCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
