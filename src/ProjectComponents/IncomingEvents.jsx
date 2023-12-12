import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { useParams } from "react-router-dom";
import RequestHandler from "../Miscs/RequestHandler";

export default function IncomingEvent({ isEvent }) {
  const [event, setEvent] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());
  const auth = useAuth()
  const {projectId} = useParams()
    let days;
    const fetchData = async()=>{
      const user = await auth.getUser();
      const response = await RequestHandler.get(`/api/projects/${projectId}/GetNearestEvent?userId=${user.uuid}&eventType=${isEvent? 1 : 0}`,auth.getToken())
      setEvent(response)
    }
  useEffect(() => {
    fetchData()
  }, [isEvent]); 

  // Function to calculate remaining time
  const calculateRemainingTime = () => {
    
    const dueTime = new Date( isEvent? event?.startTime : event?.dueTo );
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
      {isEvent?<Typography variant="small">
        Rozpoczyna się: {new Date(event?.startTime).toLocaleString()}
      </Typography> : null}
      
      <Typography variant="small"> {isEvent? "Zakończy się:": "Wykonać do:" } {new Date(event?.dueTo).toLocaleString()} </Typography>
      <Typography variant="small">
        Pozostało: {calculateRemainingTime()}
      </Typography>
    </div>
  );
}
