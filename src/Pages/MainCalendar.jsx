import { Button, Typography,Card } from "@material-tailwind/react"
import MonthlyCalendar from "../Components/MonthlyCalendar"

export default function MainCalendar () {
    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-5 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <section className="flex w-full col-span-full">
                <div className="w-full">
                    <Typography variant="h2" className="font-bold">Hello, user!</Typography>
                    <div className="space-x-4">
                    <Button color="amber" >Dodaj nowe zadanie</Button>
                    <Button color="amber">Dodaj nowe wydarzenie</Button>
                    </div>
                </div>              
            </section>
            <div className="col-span-full row-span-7">
                <Card>

                    <MonthlyCalendar></MonthlyCalendar>
                </Card>
            </div>

        </div>
    )
}