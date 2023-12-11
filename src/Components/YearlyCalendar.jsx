import React, { useState, useEffect } from 'react';
import { CardHeader, Tooltip, Typography } from "@material-tailwind/react";
import { isSameDay, isWithinInterval } from 'date-fns';
import { useAuth } from '../auth';
import RequestHandler from '../Miscs/RequestHandler';
const Calendar = () => {
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const auth = useAuth()
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

  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([

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
    fetchData()
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const fetchData = async () => {
    const user = await auth.getUser()
    const request = `/api/user-events/get-events-for-user/${user.uuid}`;
    const response = await RequestHandler.get(request, auth.getToken());
    const taskEvents = response.filter(event => event.type === 0);
    const regularEvents = response.filter(event => event.type === 1);
    console.log(taskEvents)
    console.log(regularEvents)
    setTasks(taskEvents);
    setEvents(regularEvents);
  }

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
  const contentForDay = (eventForDay, tasksForDay) => {
    return (
      <div className='flex flex-row space-x-2 divide-x-2 divide-gray-300'>
        {eventForDay?.length > 0 ? <div className='flex flex-col p-2'>
          <Typography className="font-bold" variant="paragraph">Wydarzenia:</Typography>
          {eventForDay?.map((event, index_e) => {
            return (
              <Typography key={index_e} >{event.title}</Typography>
            )
          })}
        </div> : null}
        {tasksForDay?.length > 0 ? <div className='flex flex-col p-2'>
          <Typography className="font-bold" variant="paragraph">Zadania:</Typography>
          {tasksForDay?.map((task, index_t) => {
            return (
              <Typography key={index_t} >{task.title}</Typography>
            )
          })}
        </div> : null}


      </div>
    )
  }
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
                const currentDate = new Date(currentVisibleYear, monthIndex < firstDayOfWeek ? monthIndex + 1 : monthIndex, day);
                const isToday = currentDate.toDateString() === today.toDateString();
                const tasksForDay = tasks.filter(task => isSameDay(currentDate, new Date(task.dueTo)));
                const eventForDay = events.filter(event => {
                  const startDay = new Date(event.startTime);
                  startDay.setHours(0, 0, 0, 0);
                  const endDay = new Date(event.dueTo);
                  endDay.setHours(23, 59, 59, 99);
                  return isWithinInterval(currentDate, { start: startDay, end: endDay });
                });
                if (tasksForDay.length > 0) {
                  console.log(tasksForDay)
                }
                if (eventForDay.length > 0) {
                  console.log(eventForDay)
                }
                return (
                  <Tooltip className={`${eventForDay?.length > 0 || tasksForDay?.length > 0 ? "" : "hidden"}`} content={contentForDay(eventForDay, tasksForDay)}>
                    <div
                      key={dayIndex}
                      className={`hover:cursor-pointer text-center px-1 ${!isCurrentMonth ? 'text-gray-400 ' : ''} ${isToday && isCurrentMonth ? 'border border-red-400 rounded-md cursor-pointer ' : ''
                        } `}
                      onClick={() => handleDayClick(currentDate)}
                      style={{
                        background: eventForDay.length > 0 && tasksForDay.length > 0
                          ? 'linear-gradient(#3490dc, #38a169)'
                          : eventForDay.length > 0 ? '#3490dc' : tasksForDay.length > 0 ? '#38a169' : 'transparent',
                      }}
                    >
                      {day}
                    </div>
                  </Tooltip>

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
                    const tasksForDay = tasks.filter(task => isSameDay(currentDate, new Date(task.dueTo)));
                    const eventForDay = events.filter(event => {
                      const startDay = new Date(event.startTime);
                      startDay.setHours(0, 0, 0, 0);
                      const endDay = new Date(event.dueTo);
                      endDay.setHours(23, 59, 59, 99);
                      return isWithinInterval(currentDate, { start: startDay, end: endDay });
                    });
                    return (
                      <Tooltip className={`${eventForDay?.length > 0 || tasksForDay?.length > 0 ? "" : "hidden"}`} content={contentForDay(eventForDay, tasksForDay)}>
                        <div
                          key={dayIndex}
                          className={`hover:cursor-pointer text-center px-1 ${!isCurrentMonth ? 'text-gray-400 ' : ''} ${isToday && isCurrentMonth ? 'border border-red-400 rounded-md cursor-pointer ' : ''
                            } `}
                          onClick={() => handleDayClick(currentDate)}
                          style={{
                            background: eventForDay.length > 0 && tasksForDay.length > 0
                              ? 'linear-gradient(#3490dc, #38a169)'
                              : eventForDay.length > 0 ? '#3490dc' : tasksForDay.length > 0 ? '#38a169' : 'transparent',
                          }}
                        >
                          {day}
                        </div>
                      </Tooltip>

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
