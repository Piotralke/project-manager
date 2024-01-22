import { useEffect, useState } from "react"
import ProjectHeader from "../../Components/ProjectHeader"
import { Button, Card, CardBody, CardHeader, Checkbox, Typography } from "@material-tailwind/react"
import TaskList from "../../ProjectComponents/TaskList"
import { useParams } from "react-router-dom"
import { useAuth } from "../../auth"
import RequestHandler from "../../Miscs/RequestHandler"
export default function ProjectTasksPage() {
    const { projectId } = useParams()
    const [onlyUser, isOnlyUser] = useState(false)
    const auth = useAuth();
    const [userTasks, setUserTasks] = useState([])
    const [projectTasks, setProjectTasks] = useState([])
    const fetchData = async () => {
        const user = await auth.getUser()
        const requestUser = `/api/user-events/get-events-for-user/${user.uuid}`;
        const requestProject = `/api/projects/${projectId}/GetProjectEvents?eventType=0`
        const userResponse = await RequestHandler.get(requestUser, auth.getToken());
        const projectResponse = await RequestHandler.get(requestProject, auth.getToken())
        const userTasks = projectResponse.filter(projectEvent =>
            userResponse.some(userEvent => userEvent.uuid === projectEvent.uuid)
        );
        setUserTasks(userTasks);
        setProjectTasks(projectResponse);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="grid w-full h-screen grid-cols-1 lg:grid-cols-3 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <ProjectHeader></ProjectHeader>
            <section className="col-span-full row-span-1 flex flex-row space-x-3 items-center">
                {/* <Button color="amber">Dodaj nowe zadanie</Button> */}
                <Checkbox checked={onlyUser} onChange={() => { isOnlyUser(prev => !prev) }} color="amber" label="Wyświetl tylko zadania przypisane do mnie"></Checkbox>
            </section>
            <Card className="col-span-full lg:col-span-1 row-span-6">
                <CardHeader color="amber" className="text-center">
                    <Typography variant="h5">Do zrobienia</Typography>
                </CardHeader>
                <CardBody className="h-full">
                    {(onlyUser === true ? userTasks?.filter(x => x.status === 0).length > 0 : projectTasks?.filter(x => x.status === 0).length > 0 )?
                        <TaskList taskList={onlyUser === true ? userTasks?.filter(x => x.status === 0) : projectTasks?.filter(x => x.status === 0)}></TaskList> :
                        <Typography className="text-center justify-center items-center" variant="h6">Brak zadań</Typography>
                    }

                </CardBody>
            </Card>
            <Card className="col-span-full lg:col-span-1 row-span-6">
                <CardHeader color="amber" className="text-center">
                    <Typography variant="h5">W trakcie</Typography>
                </CardHeader>
                <CardBody className=" h-full">
                    {(onlyUser === true ? userTasks?.filter(x => x.status === 1).length > 0 : projectTasks?.filter(x => x.status === 1).length > 0) ?
                        <TaskList taskList={onlyUser === true ? userTasks?.filter(x => x.status === 1) : projectTasks?.filter(x => x.status === 1)}></TaskList> :
                        <Typography className="text-center justify-center items-center" variant="h6">Brak zadań</Typography>
                    }
                </CardBody>
            </Card>
            <Card className="col-span-full lg:col-span-1 row-span-6">
                <CardHeader color="amber" className="text-center">
                    <Typography variant="h5">Zakończone</Typography>
                </CardHeader>
                <CardBody className=" h-full">
                    {(onlyUser === true ? userTasks?.filter(x => x.status === 2).length > 0 : projectTasks?.filter(x => x.status === 2).length > 0) ?
                        <TaskList taskList={onlyUser === true ? userTasks?.filter(x => x.status === 2) : projectTasks?.filter(x => x.status === 2)}></TaskList> :
                        <Typography className="text-center justify-center items-center" variant="h6">Brak zadań</Typography>
                    }
                </CardBody>
            </Card>
        </div>
    )
}