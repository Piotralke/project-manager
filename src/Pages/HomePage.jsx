import { Fragment } from "react";
import { Select, Option, Typography } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";

export default function HomePage() {
    return (
        <div className="grid w-full h-screen grid-cols-7 grid-rows-6 gap-5 p-5 bg-gray-300">
            <section className="flex w-full col-span-7">
                <div className="w-full basis-2/7" >
                    <Typography variant="h2" className="font-bold">Hello, user!</Typography>
                </div>
                <div></div>
            </section>
            <Card className="col-span-3 row-span-2"></Card>
            <Card className="col-span-4 row-span-2"></Card>
            <Card className="col-span-3 row-span-3"></Card>
            <Card className="col-span-2 row-span-3"></Card>
            <Card className="col-span-2 row-span-3"></Card>

        </div>
    )
}