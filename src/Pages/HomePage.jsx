import { Fragment } from "react";
import { Select, Option, Typography } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import ClockCard from "../Components/ClockCard";
import Calendar from "../Components/YearlyCalendar";
export default function HomePage() {
    return (
        <div className="grid w-full h-screen grid-cols-5 grid-rows-8 gap-5 p-5 bg-gray-300">
            <section className="flex w-full col-span-6">
                <div className="w-full basis-1/7" >
                    <Typography variant="h2" className="font-bold">Hello, user!</Typography>
                </div>
                <div></div>
            </section>
            <Card className="col-span-3 row-span-7">
                <Calendar></Calendar>
            </Card>
             <ClockCard></ClockCard> 
            <Card className="col-span-2 row-span-2"></Card>
            <Card className="col-span-2 row-span-4"></Card>
        </div>
    )
}