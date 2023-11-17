import { Fragment } from "react";
import { Select, Option, Typography, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import ClockCard from "../Components/ClockCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { AiOutlineSnippets } from "react-icons/ai";
import Calendar from "../Components/YearlyCalendar";
export default function HomePage() {
    return (
        <div className="grid w-full h-screen grid-cols-5 gap-5 p-5 bg-gray-300 grid-rows-8">
            <section className="flex w-full col-span-6">
                <div className="w-full " >
                    <Typography variant="h2" className="font-bold">Hello, user!</Typography>
                </div>
                <div></div>
            </section>
            <Card className="col-span-3 row-span-7">
                <CardHeader  className="flex flex-row space-x-4 place-content-center">
                    <FaCalendarAlt className="w-8 h-full"/>
                    <Typography variant="h2" >Kalendarz</Typography>
                </CardHeader>
                <CardBody>
                    <Calendar></Calendar>
                </CardBody>
            </Card>
             <ClockCard></ClockCard> 
            <Card className="col-span-2 row-span-2">
                <CardHeader className="flex flex-row space-x-4 place-content-center">
                <MdPushPin className="w-8 h-8"/>
                    <Typography variant="h3">Przypięty projekt</Typography>
                </CardHeader>
                <CardBody className="flex flex-row">
                    <AiOutlineSnippets className="w-full h-full basis-1/3"></AiOutlineSnippets>
                    <div className="flex flex-col">
                        <Typography variant="h5">Project-Menager</Typography>
                        <Typography variant="paragraph">System do zarządzania projektami studenckimi</Typography>
                        <Typography variant="paragraph" className="font-bold">Przejdź do projektu</Typography>
                    </div>
                </CardBody>
            </Card>
            <Card className="col-span-2 row-span-4">
            <CardHeader className="flex flex-row space-x-4 place-content-center">
                <BsStack className="w-8 h-8"/>
                    <Typography variant="h3">Projekty</Typography>
                </CardHeader>
                <CardBody></CardBody>
            </Card>
        </div>
    )
}