import { BsStack } from "react-icons/bs";
import ProjectOverview from "../Components/ProjectOverwiev";
import { Typography, Button, Card } from "@material-tailwind/react";
import MainPageHeader from "../Components/MainPageHeader";
export default function Projects() {

    //utworzyc tutaj pobieranie wszysktich projektów i w tabeli w petli renderowac overwiev. Samo overwiew jako propsa powinno przyjac dane o projekcie

    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-4 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <div className="col-span-full">
                <Button color="amber" >Utwórz nowy projekt</Button>
            </div>
            <Card className="col-span-2 row-span-2">
                <ProjectOverview></ProjectOverview>
            </Card>
            <Card className="col-span-2 row-span-2">
                <ProjectOverview></ProjectOverview>
            </Card>
            <Card className="col-span-2 row-span-2">
                <ProjectOverview></ProjectOverview>
            </Card>
            <Card className="col-span-2 row-span-2">
                <ProjectOverview></ProjectOverview>
            </Card>
            <Card className="col-span-2 row-span-2">
                <ProjectOverview></ProjectOverview>
            </Card>
            <Card className="col-span-2 row-span-2">
                <ProjectOverview></ProjectOverview>
            </Card>

        </div>
    )
}
