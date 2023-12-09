import { Fragment, useEffect, useState } from "react";
import { Typography, CardBody, Spinner, Avatar, Badge, Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
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
import { useNavigate } from "react-router-dom";
import RequestHandler from "../Miscs/RequestHandler";
export default function HomePage() {
    const auth = useAuth();
    const [user, setUser] = useState()
    //  const [loading, isLoading] = useState(true)
    const fetchData = async () => {
        const u = await auth.getUser()
        setUser(u)
        const projects = await RequestHandler.get(`/api/projects/get-for-user/${u.uuid}`,auth.getToken())
        let topItems = projects.slice(0,4)
       setUserProjects(topItems)
        isLoading(false)
    }
    const getProjects = async () => {
        
    }
    useEffect(() => {
        fetchData()
         
    }, [])
    const [userProjects, setUserProjects] = useState([]);
    const navigate = useNavigate();

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
                    {user? <ProjectOverwiev projectUuid={ user.pinnedProjectUuid} />:null}
                </CardBody>
            </Card>
            <Card className="col-span-full lg:col-span-2 row-span-4">
                <CardBody>
                    <div className="flex flex-row space-x-4 place-content-center py-2">
                        <BsStack className="w-6 h-6" />
                        <Typography variant="h6">Projekty</Typography>
                    </div>
                    {userProjects.length>0? 
                    <div className="border border-gray-400 rounded-xl w-full overflow-hidden divide-y divide-gray-400 my-4">
                    { userProjects.map((project, index) => (
                        <Fragment key={index}>
                            <div
                                className={`p-4 flex flex-row space-x-2 odd:bg-gray-200 `}
                            >
                                <Typography variant="h5" className="font-bold mb-2 basis-5/12">
                                    {project.title}
                                </Typography>
                                <Typography variant="p" className="basis-1/2">{project.description}</Typography>
                                <button onClick={()=>navigate(`/projects/${project.uuid}`)} className="flex items-center justify-end m-auto basis-1/12">
                                    <FaArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </Fragment>
                    ))}
                    <button className="flex flex-grow w-full hover:bg-gray-100 flex-row space-x-4 place-content-center items-center justify-center py-2" onClick={() => navigate('/projects')}>
                        <FaEllipsisH className="w-6 h-6" />
                        <Typography variant="h6">Wszystkie projekty</Typography>
                    </button>
                </div>
                    : 
                    <button className="border border-gray-400 rounded-xl flex flex-grow w-full hover:bg-gray-100 flex-row space-x-4 place-content-center items-center justify-center py-2" onClick={() => navigate('/projects')}>
                        <Typography variant="h6">Brak projektów, przejdź tutaj aby dodać projekt</Typography>
                    </button>
                    }
                    
                </CardBody>
            </Card>

        </div>
    )
}
