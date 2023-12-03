import { Fragment, useEffect, useState } from "react";
import { Typography, CardBody, Avatar, Badge, Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import ClockCard from "../Components/ClockCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { BiBell } from "react-icons/bi";
import { FaArrowRight, FaEllipsisH } from "react-icons/fa";
import Calendar from "../Components/YearlyCalendar";
import ProjectOverwiev from "../Components/ProjectOverwiev";
import MainPageHeader from "../Components/MainPageHeader";
import { useAuth } from "../auth";
export default function HomePage() {
    const auth = useAuth();
    
    useEffect(()=>{
        
        console.log(auth.getUser())

    },[])
    const [userProjects, setUserProjects] = useState([{
        uuid: "123-321-123",
        title: "Project-Manager",
        description: "System do zarządzania projektami studenckimi",
        status: "STARTED",
        createdAt: "2023-10-26 15:16:40.942694+02",
        isPrivate: false,
    },
    {
        uuid: "123-321-123",
        title: "Project-Manager2",
        description: "System do zarządzania projektami studenckimi huhu hehe",
        status: "STARTED",
        createdAt: "2023-10-26 15:16:40.942694+02",
        isPrivate: true,
    },
    {
        uuid: "123-321-123",
        title: "Project-Manager3",
        description: "System do zarządzania projektami studenckimi huhu hehe",
        status: "STARTED",
        createdAt: "2023-10-26 15:16:40.942694+02",
        isPrivate: true,
    }]);
    
    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-5 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <Card className="col-span-full lg:col-span-3 row-span-7">
                <div className="flex flex-row space-x-4 place-content-center py-2">
                    <FaCalendarAlt className="w-8 h-full" />
                    <Typography variant="h2">Kalendarz</Typography>
                </div>
                <CardBody className="m-auto lg:h-full"> {/* Dodana klasa lg:h-full */}
                    <Calendar></Calendar>
                </CardBody>
            </Card>
            <ClockCard className="col-span-full lg:col-span-2"></ClockCard>
            <Card className="col-span-full lg:col-span-2 row-span-2">
                <CardBody className="flex flex-col p-2 w-full h-full">
                    <div className="flex flex-row space-x-4 place-content-center py-2">
                        <MdPushPin className="w-6 h-6" />
                        <Typography variant="h6">Przypięty projekt</Typography>
                    </div>
                    <ProjectOverwiev />
                </CardBody>
            </Card>
            <Card className="col-span-full lg:col-span-2 row-span-4">
                <CardBody>
                    <div className="flex flex-row space-x-4 place-content-center py-2">
                        <BsStack className="w-6 h-6" />
                        <Typography variant="h6">Projekty</Typography>
                    </div>
                    <div className="border border-gray-400 rounded-xl w-full overflow-hidden divide-y divide-gray-400 my-4">
                        {userProjects.map((project, index) => (
                            <Fragment key={index}>
                                <div
                                    className={`p-4 flex flex-row space-x-2 odd:bg-gray-200 `}
                                >
                                    <Typography variant="h5" className="font-bold mb-2 basis-5/12">
                                        {project.title}
                                    </Typography>
                                    <Typography variant="p" className="basis-1/2">{project.description}</Typography>
                                    <div className="flex items-center justify-end m-auto basis-1/12">
                                        <FaArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                        <div className="flex flex-grow flex-row space-x-4 place-content-center items-center justify-center py-2">
                            <FaEllipsisH className="w-6 h-6" />
                            <Typography variant="h6">Wszystkie projekty</Typography>
                        </div>
                    </div>
                </CardBody>
            </Card>
        
        </div>
    )
}
