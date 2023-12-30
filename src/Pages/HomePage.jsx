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
      //  isLoading(false)
    }
  
    useEffect(() => {
        fetchData()
         
    }, [])
    const [userProjects, setUserProjects] = useState([]);
    const navigate = useNavigate();

    return (
        <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <Card className="col-span-full lg:col-span-3 row-span-7">
                <div className="flex flex-row py-2 space-x-4 place-content-center">
                    <FaCalendarAlt className="w-8 h-full" />
                    <Typography variant="h2">Kalendarz</Typography>
                </div>
                <CardBody className="m-auto lg:h-full"> {/* Dodana klasa lg:h-full */}
                    <Calendar></Calendar>
                </CardBody>
            </Card>
            <ClockCard className="col-span-full lg:col-span-2"></ClockCard>
            <Card className="row-span-2 col-span-full lg:col-span-2">
                <CardBody className="flex flex-col w-full h-full p-2">
                    <div className="flex flex-row py-2 space-x-4 place-content-center">
                        <MdPushPin className="w-6 h-6" />
                        <Typography variant="h6">Przypięty projekt</Typography>
                    </div>
                    {user? <ProjectOverwiev isPinned={true} projectUuid={ user.pinnedProjectUuid} />:null}
                </CardBody>
            </Card>
            <Card className="row-span-4 col-span-full lg:col-span-2">
                <CardBody>
                    <div className="flex flex-row py-2 space-x-4 place-content-center">
                        <BsStack className="w-6 h-6" />
                        <Typography variant="h6">Projekty</Typography>
                    </div>
                    {userProjects.length>0? 
                    <div className="w-full my-4 overflow-hidden border border-gray-400 divide-y divide-gray-400 rounded-xl">
                    { userProjects.map((project, index) => (
                        <Fragment key={index}>
                            <div
                                className={`p-4 flex flex-row space-x-2 odd:bg-gray-200 `}
                            >
                                <Typography variant="h5" className="mb-2 font-bold basis-5/12">
                                    {project.title}
                                </Typography>
                                <Typography variant="paragraph" className="basis-1/2">{project.description}</Typography>
                                <button onClick={()=>navigate(`/projects/${project.uuid}`)} className="flex items-center justify-end m-auto basis-1/12">
                                    <FaArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </Fragment>
                    ))}
                    <button className="flex flex-row items-center justify-center flex-grow w-full py-2 space-x-4 hover:bg-gray-100 place-content-center" onClick={() => navigate('/projects')}>
                        <FaEllipsisH className="w-6 h-6" />
                        <Typography variant="h6">Wszystkie projekty</Typography>
                    </button>
                </div>
                    : 
                    <button className="flex flex-row items-center justify-center flex-grow w-full py-2 space-x-4 border border-gray-400 rounded-xl hover:bg-gray-100 place-content-center" onClick={() => navigate('/projects')}>
                        <Typography variant="h6">Brak projektów, przejdź tutaj aby dodać projekt</Typography>
                    </button>
                    }
                    
                </CardBody>
            </Card>

        </div>
    )
}
