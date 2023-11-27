import { useState } from "react"
import ProjectHeader from "../../Components/ProjectHeader"
import { Button, Card, CardBody, CardHeader, Checkbox, Typography } from "@material-tailwind/react"
import TaskList from "../../ProjectComponents/TaskList"
export default function ProjectTasksPage() {

    const [projectTasks,setProjectTasks] = useState(
        [{
            uuid: "123-321-123",
            title: "Przykladowe zadanie do zrobienia",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-28 15:16:40.942694+02",
            endDate: null,
            status: "PLANNED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
        {
            uuid: "123-321-123",
            title: "Przykladowe zadanie do zrobienia2",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-28 15:16:40.942694+02",
            endDate: null,
            status: "PLANNED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
        {
            uuid: "123-321-123",
            title: "Przykladowe zadanie do zrobienia2",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-28 15:16:40.942694+02",
            endDate: null,
            status: "PLANNED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
        {
            uuid: "123-321-123",
            title: "Przykladowe zadanie do zrobienia2",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-28 15:16:40.942694+02",
            endDate: null,
            status: "PLANNED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
        {
            uuid: "123-321-123",
            title: "Przykladowe zadanie do zrobienia2",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-28 15:16:40.942694+02",
            endDate: null,
            status: "PLANNED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
        {
            uuid: "123-321-123",
            title: "Przykladowe zadanie do zrobienia3",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-29 15:16:40.942694+02",
            endDate: null,
            status: "PLANNED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
        {
            uuid: "123-321-123",
            title: "Przykladowe rozpoczęte zadanie",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-28 15:16:40.942694+02",
            endDate: null,
            status: "STARTED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
        {
            uuid: "123-321-123",
            title: "Przykladowe rozpoczęte zadanie2",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-28 15:16:40.942694+02",
            endDate: null,
            status: "STARTED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
        {
            uuid: "123-321-123",
            title: "Przykladowe zakończone zadanie",
            description: "Opis przykladowego zadania. Trzeba zrobić to i tamto",
            dueTo: "2023-11-28 15:16:40.942694+02",
            endDate: "2023-11-27 15:16:40.942694+02",
            status: "FINISHED", //STARTED/ FINISHED
            type: "TASK", //TASK=0, EVENT=1
            userEvents: [{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              },{
                userUuid: "123-123-123"
              }
            ]
        },
    ]
    )


    return (
        <div className="grid w-full h-screen grid-cols-1 lg:grid-cols-3 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <ProjectHeader></ProjectHeader>
            <section className="col-span-full row-span-1 flex flex-row space-x-3 items-center">
                <Button color="amber">Dodaj nowe zadanie</Button>
                <Checkbox color="amber" label="Wyświetl tylko zadania przypisane do mnie"></Checkbox>
            </section>
            <Card className="col-span-full lg:col-span-1 row-span-6">
                <CardHeader color="amber" className="text-center">
                    <Typography variant="h5">Do zrobienia</Typography>
                </CardHeader>
                <CardBody className="h-full">
                    <TaskList taskList={projectTasks.filter(x=>x.status==="PLANNED")}></TaskList>
                </CardBody>
            </Card>
            <Card className="col-span-full lg:col-span-1 row-span-6">
                <CardHeader color="amber" className="text-center">
                    <Typography variant="h5">W trakcie</Typography>
                </CardHeader>
                <CardBody className=" h-full">
                    <TaskList taskList={projectTasks.filter(x=>x.status==="STARTED")}></TaskList>
                </CardBody>
            </Card>
            <Card className="col-span-full lg:col-span-1 row-span-6">
                <CardHeader color="amber" className="text-center">
                    <Typography variant="h5">Zakończone</Typography>
                </CardHeader>
                <CardBody className=" h-full">
                    <TaskList taskList={projectTasks.filter(x=>x.status==="FINISHED")}></TaskList>
                </CardBody>
            </Card>
        </div>
    )
}