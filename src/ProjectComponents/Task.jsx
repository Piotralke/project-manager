import { Avatar, Button, Card, Tooltip, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function Task({ taskData }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { userUuids } = taskData.userEvents;
  const [members, setMembers] = useState([
    {
      uuid: "123-321-321",
      name: "John",
      surname: "Doe",
      ProfileImageFileName: "https://i.pravatar.cc/300",
    },
    {
      uuid: "123-321-321",
      name: "Twój",
      surname: "Stary",
      ProfileImageFileName: "https://i.pravatar.cc/300",
    },
    {
      uuid: "123-321-321",
      name: "Kiljam",
      surname: "Mekambe",
      ProfileImageFileName: "https://i.pravatar.cc/300",
    },
  ]);
  useEffect(() => {
    //fetch user data
  }, []);

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
              <Avatar src={member.ProfileImageFileName}></Avatar>
            </Tooltip>
          );
        })}
      </div>
      {taskData.status === "PLANNED" && (
        <Button color="green" size="sm" className="ml-auto">
          Rozpocznij
        </Button> //po kliknięciu zmiana statusu zadania na rozpoczęte
      )}
      {taskData.status === "STARTED" && (
        <Button color="red" size="sm" className="ml-auto">
          Zakończ
        </Button> //po kliknięciu zmiana statusu zadania na zakończone
      )}
    </Card>
  );
}
