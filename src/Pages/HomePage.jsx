import { Fragment } from "react";
import { Select, Option, Typography, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import ClockCard from "../Components/ClockCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { BsStack } from "react-icons/bs";

import Calendar from "../Components/YearlyCalendar";
import ProjectOverwiev from "../Components/ProjectOverwiev";

export default function HomePage() {
    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-5 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <section className="flex w-full col-span-full">
                <div className="w-full">
                    <Typography variant="h2" className="font-bold">Hello, user!</Typography>
                </div>
                <div></div>
            </section>
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
                <CardBody className="flex flex-col p-2 w-full">
                    <div className="flex flex-row space-x-4 place-content-center py-2">
                        <MdPushPin className="w-6 h-full" />
                        <Typography variant="h6">Przypięty projekt</Typography>
                    </div>
                    <ProjectOverwiev />
                </CardBody>
            </Card>
            <Card className="col-span-full lg:col-span-2 row-span-4">
                <CardHeader className="flex flex-row space-x-4 place-content-center">
                    <BsStack className="w-8 h-8" />
                    <Typography variant="h3">Projekty</Typography>
                </CardHeader>
                <CardBody>

                </CardBody>
            </Card>
        </div>
    )
}
