import React, { useState,useEffect } from 'react';
import { format, addDays, startOfWeek, getISOWeek, isToday, isWithinInterval,isSameDay } from 'date-fns';
import { Button,Typography,Tooltip } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth';
import RequestHandler from '../Miscs/RequestHandler';
const WeeklyCalendar = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const { projectId } = useParams()
  const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = [];
  const auth = useAuth()
  const [events, setEvents] = useState([

  ]);
  const [tasks, setTasks] = useState([

  ]);
  let currentDay = firstDayOfWeek;
  for (let i = 0; i < 7; i++) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
  ];
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
  const daysOfWeek = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];
  const weekNumber = getISOWeek(firstDayOfWeek);
  const fetchData = async () => {
    const request = `/api/projects/${projectId}/GetProjectEvents`;;
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
          const eventForDay = events.filter(event => {
            const startDay = new Date(event.startTime)
            startDay.setHours(0, 0, 0, 0);
            const endDay = new Date(event.dueTo)
            endDay.setHours(23, 59, 59, 99);
            return isWithinInterval(day,{start:startDay,end:endDay} )
          }
          );
          const tasksForDay = tasks.filter(task =>
            isSameDay(day, new Date(task.dueTo))
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
            <Tooltip className={`${eventForDay?.length > 0 || tasksForDay?.length > 0 ? "" : "hidden"}`} content={contentForDay(eventForDay, tasksForDay)}>
              <div
                key={`day-${dayIndex}`}
                className={`flex justify-center items-center col-span-1 self-center font-bold text-center cursor-pointer p-11 ${day && day.getMonth() === month ? 'text-black' : 'text-gray-400'
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
      </div>
    </div>
  );

  return generateCalendar();
};

export default WeeklyCalendar;
