import React, { useEffect, useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, getISOWeek, isWithinInterval, isToday, isSameDay } from 'date-fns';
import { Button, Tooltip, Typography } from '@material-tailwind/react';
import { useAuth } from '../auth';
import RequestHandler from '../Miscs/RequestHandler';
import { useParams } from 'react-router';
import { isDate } from 'date-fns/fp';

const MonthlyCalendar = () => {
  const currentDate = new Date();
  const { projectId } = useParams()
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([

  ]);
  const [tasks, setTasks] = useState([

  ]);

  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
  ];
  const auth = useAuth();
  const daysOfWeek = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];
  const fetchData = async () => {
    const user = await auth.getUser()
    let request;
    if (projectId) {
      request = `/api/projects/${projectId}/GetProjectEvents`;
    }
    else {
      request = `/api/user-events/get-events-for-user/${user.uuid}`;
    }
    const response = await RequestHandler.get(request, auth.getToken());
    const taskEvents = response.filter(event => event.type === 0);
    const regularEvents = response.filter(event => event.type === 1);
    console.log(taskEvents)
    console.log(regularEvents)
    setTasks(taskEvents);
    setEvents(regularEvents);
  }
  useEffect(() => {
    fetchData()
  }, [])
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
        <div className="flex items-center justify-between mb-4">
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
            <div key={`dayOfWeek-${index}`} className="font-bold text-center">
              {dayOfWeek}
            </div>
          ))}
          {weeks.map((week, index) => (
            <React.Fragment key={`week-${index}`}>
              <div className="col-span-1 font-bold text-right p-11 ">
                {week.weekNumber}
              </div>
              {week.daysInWeek.map((day, dayIndex) => {
                const eventForDay = events.filter(event => {
                  const startDay = new Date(event.startTime)
                  startDay.setHours(0, 0, 0, 0);
                  const endDay = new Date(event.dueTo)
                  endDay.setHours(23, 59, 59, 99);
                  return isWithinInterval(day, { start: startDay, end: endDay })
                }
                );
                const tasksForDay = tasks.filter(task =>
                  isSameDay(day, new Date(task.dueTo))
                );

                return (
                  <Tooltip className={`${eventForDay?.length > 0 || tasksForDay?.length > 0 ? "" : "hidden"}`} content={contentForDay(eventForDay, tasksForDay)}>
                    <div
                      key={`day-${dayIndex}`}
                      className={`col-span-1 text-center font-bold cursor-pointer p-11 ${day && day.getMonth() === month ? 'text-black' : 'text-gray-400'
                        } ${isToday(day) ? 'border border-red-500 rounded-xl' : ''}`}
                      onClick={() => selectDay(day)}
                      style={{
                        background: eventForDay.length > 0 && tasksForDay.length > 0
                          ? 'linear-gradient(#3490dc, #38a169)'
                          : eventForDay.length > 0 ? '#3490dc' : tasksForDay.length > 0 ? '#38a169' : 'transparent',
                      }}
                    >
                      {day ? format(day, 'd') : ''}
                    </div>
                  </Tooltip>

                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return generateCalendar();
};

export default MonthlyCalendar;
