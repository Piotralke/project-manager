import { Typography, Button, Card } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import IncomingEvent from "../../ProjectComponents/IncomingEvents";
import ProjectHeader from "../../Components/ProjectHeader";
import NewestMessage from "../../ProjectComponents/NewestMessage";
import ProjectMembers from "../../ProjectComponents/ProjectMembers";
import WeeklyCalendar from "../../ProjectComponents/WeeklyCalendar";
import ClockCard from "../../Components/ClockCard";
import QuickNote from "../../ProjectComponents/QuickNote";

export default function ProjectMainPage() {

    const { projectId } = useParams();
    const [projectData, setProjectData] = useState({
        uuid: "123-321-123",
        title: "Project-Manager",
        description: "System do zarządzania projektami studenckimi",
        status: "STARTED",
        createdAt: "2023-10-26 15:16:40.942694+02",
        isPrivate: false,
    });
    useEffect(()=>{
        
    },[])
    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-4 gap-5 p-5 bg-gray-300 lg:grid-rows-4 grid-rows ">
            <ProjectHeader></ProjectHeader>
            <Card className="col-span-full lg:col-span-1 row-span-1">
                <IncomingEvent isEvent={true}></IncomingEvent>
            </Card>
            <Card className="col-span-full lg:col-span-1  row-span-1">
                <IncomingEvent isEvent={false}></IncomingEvent>
            </Card>
            
            <Card className="col-span-full lg:col-span-1 row-span-2">
                <NewestMessage></NewestMessage>
            </Card>
            
            <Card className="col-span-full lg:col-span-1 row-span-3">
                <ProjectMembers></ProjectMembers>
            </Card>
            
            <Card className="col-span-full lg:col-span-2 row-span-2">
                <WeeklyCalendar></WeeklyCalendar>
            </Card>
            <Card className="col-span-full lg:col-span-1 row-span-1">
                <QuickNote></QuickNote>
            </Card>
        </div>
    )
}