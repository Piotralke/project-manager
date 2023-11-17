import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

export default function ClockCard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect once on mount

  const formattedTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const day = currentTime.getDate().toString().padStart(2, "0");
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = currentTime.getFullYear();

    return `${hours}:${minutes}:${seconds} / ${day}.${month}.${year}`;
  };

  return (
    <Card className="flex items-center justify-center col-span-2 row-span-1 p-5">
      <Typography className="text-2xl font-bold text-center truncate">{formattedTime()}</Typography>
    </Card>
  );
}
