import { Fragment, useEffect, useState } from "react";
import { Typography, CardBody, Spinner, Avatar, Badge, Button, Popover, PopoverHandler, PopoverContent, CardHeader } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import ClockCard from "../../Components/ClockCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { BiBell } from "react-icons/bi";
import { FaArrowRight, FaEllipsisH } from "react-icons/fa";
import Calendar from "../../Components/YearlyCalendar";
import ProjectOverwiev from "../../Components/ProjectOverwiev";
import MainPageHeader from "../../Components/MainPageHeader";
import { useAuth } from "../../auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import RequestHandler from "../../Miscs/RequestHandler";
import { ProjectTable } from "./TeacherProposalsPage";
export default function TeacherGroupSubjectDetails() {
    const auth = useAuth();
    const [user, setUser] = useState()
    const [subjectData,setSubjectData] = useState()
    const [groups,setGroups] = useState()
    const [loading, isLoading] = useState(true)
    const {subjectId,groupId} = useParams()

    const fetchData = async () => {
        const responseOne = await RequestHandler.get(`/api/subjects/${subjectId}`,auth.getToken())
        console.log(responseOne)
        console.log(groupId)
        setSubjectData(responseOne)
        
        isLoading(false)
    }
  
    useEffect(() => {
        fetchData()
         console.log(subjectId)
    }, [])

    
    if(loading){
        return(
            <div className=" w-full h-full flex justify-center items-center p-5 bg-gray-300 ">
                <Spinner color="amber" className="w-20 h-20"></Spinner>
            </div>
        )
    }

    return (
        <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <Card></Card>
        </div>
    )
}
