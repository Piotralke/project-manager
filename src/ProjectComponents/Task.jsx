import { Avatar, Button, Card, Tooltip, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import RequestHandler from "../Miscs/RequestHandler";
import { useAuth } from "../auth";
export default function Task({ taskData }) {
  const auth=useAuth()
  const [currentTime, setCurrentTime] = useState(new Date());
  const [members, setMembers] = useState([]);
  const fetchPics = async (users) => {
    const promises = users.map(async (member) => {
        const pic = await RequestHandler.get(`/api/users/profile-picture?userId=${member.uuid}`, auth.getToken());
        const result = {...member,pic}
        console.log(result)
        return result;
    });

    const profilePictures = await Promise.all(promises);
    console.log(profilePictures)
    setMembers([...members, ...profilePictures]);
}
  const fetchData = async () =>{
    const users = await RequestHandler.get(`/api/user-events/get-users-for-event/${taskData.uuid}`, auth.getToken())
    await fetchPics(users)

  }
  useEffect(() => {
    fetchData()
  }, [taskData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const calculateRemainingTime = (date) => {
    const dueTime = new Date(date);
    const timeDifference = dueTime - currentTime;

    if (timeDifference <= 0) {
      return "Time's up!";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return (
      <span className={`${days >= 1 ? null : "text-red-400 font-bold"}`}>
        {`${days} d, ${hours} h, ${minutes} m, ${seconds}s`}
      </span>
    );
  };

  return (
    <Card shadow={true} className="p-2 my-2">
      <Typography variant="h5">{taskData.title}</Typography>
      <Typography variant="paragraph">{taskData.description}</Typography>
      <Typography variant="small" className="font-bold">
        {taskData.status === "FINISHED"
          ? `Zakończono: ${new Date(taskData.endDate).toLocaleString()}`
          : `Wykonać do: ${new Date(taskData.dueTo).toLocaleString()}`}
      </Typography>
      {taskData.status !== "FINISHED" && (
        <Typography variant="small">
          {calculateRemainingTime(taskData.dueTo)}
        </Typography>
      )}
      <div className="flex flex-row space-x-1">
        {members.map((member, index) => {
          return (
            <Tooltip content={`${member.name} ${member.surname}`}>
              <Avatar src={`data:image/jpeg;base64,${member.pic}`}></Avatar>
            </Tooltip>
          );
        })}
      </div>
      {taskData.status === 0 && (
        <Button color="green" size="sm" className="ml-auto">
          Rozpocznij
        </Button> //po kliknięciu zmiana statusu zadania na rozpoczęte
      )}
      {taskData.status === 1 && (
        <Button color="red" size="sm" className="ml-auto">
          Zakończ
        </Button> //po kliknięciu zmiana statusu zadania na zakończone
      )}
    </Card>
  );
}
