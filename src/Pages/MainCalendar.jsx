import { Button, Typography, Card } from "@material-tailwind/react"
import MonthlyCalendar from "../Components/MonthlyCalendar"
import MainPageHeader from "../Components/MainPageHeader"

export default function MainCalendar() {
    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-5 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <div className="flex flex-row space-x-4">
                <Button color="amber"  >Dodaj nowe zadanie</Button>
                <Button color="amber" >Dodaj nowe wydarzenie</Button>
            </div>
            <div className="col-span-full row-span-7">
                <Card>
                    <MonthlyCalendar></MonthlyCalendar>
                </Card>
            </div>

        </div>
    )
}