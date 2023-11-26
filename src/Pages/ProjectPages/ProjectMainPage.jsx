import { Typography, Button, Card } from "@material-tailwind/react"
import { useState } from "react"
import { useParams } from "react-router-dom";
import IncomingEvent from "../../ProjectComponents/IncomingEvents";
import ProjectHeader from "../../Components/ProjectHeader";
import NewestMessage from "../../ProjectComponents/NewestMessage";

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

    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-4 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <ProjectHeader></ProjectHeader>
            <Card className="col-span-1 row-span-2">
                <IncomingEvent isEvent={true}></IncomingEvent>
            </Card>
            <Card className="col-span-1 row-span-2">
                <IncomingEvent isEvent={false}></IncomingEvent>
            </Card>
            <Card className="col-span-1 row-span-4">
                <NewestMessage></NewestMessage>
            </Card>
            <Card className="col-span-1 row-span-7">
                dupa2
            </Card>
            <Card className="col-span-2 row-span-2">
                dupa3
            </Card>
            <Card className="col-span-3 row-span-3">
                dupa4
            </Card>
        </div>
    )
}