import { Fragment, useEffect, useState } from "react";
import { Typography, CardBody, Spinner, Avatar, Badge, Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
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
import { useNavigate } from "react-router-dom";
import RequestHandler from "../../Miscs/RequestHandler";
export default function TeacherHomePage() {
    const auth = useAuth();
    const [user, setUser] = useState()
    //  const [loading, isLoading] = useState(true)
    const fetchData = async () => {

      //  isLoading(false)
    }
  
    useEffect(() => {
        fetchData()
         
    }, [])


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


        </div>
    )
}
