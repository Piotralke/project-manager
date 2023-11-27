import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function IncomingEvent({ isEvent }) {
  const [event, setEvent] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());
    let days;
  useEffect(() => {
    // Pobieranie zbliżającego się eventu
    if (isEvent === true) {
      setEvent({
        uuid: "321-321-321",
        title: "Zrobienie bazy danych",
        description: "Jakistam opis",
        dueTo: "2023-11-26T15:18:40.942694+02:00",
        startTime: "2023-11-26T15:16:40.942694+02:00",
        type: "EVENT", // "TASK"
        
      });
    } else {
      setEvent({
        uuid: "321-321-321",
        title: "Zrobienie bazy danych",
        description: "Jakistam opis",
        dueTo: "2023-11-26T15:16:40.942694+02:00",
        startTime: "2023-12-26T15:16:40.942694+02:00",
        type: "TASK", // "TASK"
        
      });
    }
  }, [isEvent]); 

  // Function to calculate remaining time
  const calculateRemainingTime = () => {
    const dueTime = new Date(event?.startTime);
    const timeDifference = dueTime - currentTime;

    if (timeDifference <= 0) {
      return "Time's up!";
    }

    days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return  <span className={`${days>=1? null:"text-red-400 font-bold"}`}>{`${days} d, ${hours} h, ${minutes} m, ${seconds}s`}</span>
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col text-center p-4 space-y-2">
      {isEvent === true ? (
        <Typography variant="h5" color="red">
          Zbliżające się wydarzenie
        </Typography>
      ) : (
        <Typography color="blue" variant="h5">
          Najbliższe zadanie do wykonania
        </Typography>
      )}
      <Typography variant="paragraph">{event?.description}</Typography>
      <Typography variant="small">
        {isEvent ? "Rozpoczyna się:" : "Wykonać do:"} {new Date(event?.startTime).toLocaleString()}
      </Typography>
      {isEvent===true && (<Typography variant="small">Zakończy się: {new Date(event?.dueTo).toLocaleString()} </Typography>) }
      <Typography variant="small">
        Pozostało: {calculateRemainingTime()}
      </Typography>
    </div>
  );
}
