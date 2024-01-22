import { Typography, CardBody, Avatar, Badge, Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { BiBell } from "react-icons/bi";
import { useAuth } from "../auth";
import { useState,useEffect } from "react";
import RequestHandler from "../Miscs/RequestHandler";
import { useParams } from "react-router-dom";
export default function ProjectHeader() {
    const [userData, setUserData] = useState({});
    const [userPic,setUserPic] = useState();
    const auth = useAuth();
    const [projectData, setProjectData] = useState()
    const [grade,setGrade] = useState()
    const {projectId} = useParams()
    useEffect(() => {
        const fetchUser = async () => {
            const user = await auth.getUser()
            console.log(user)
            setUserData(user)
            const profilePic = await RequestHandler.get(`/api/users/profile-picture?userId=${user.uuid}`,auth.getToken())
            setUserPic(profilePic)
            }
        const fetchProject = async() =>{
            const response = await RequestHandler.get(`/api/projects/${projectId}`,auth.getToken())
            if(response.status==1)
            {
                const projectGrade = await RequestHandler.get(`/api/projects/GetProjectGrade/${projectId}`,auth.getToken())
                setGrade(projectGrade);
            }
            setProjectData(response)
        }
        fetchUser().catch(console.error)
        fetchProject()

    }, [])
    const [notifications, setNotifications] = useState([
        {
            uuid: "123-321",
            title: "Nowa wiadomość",
            description: "Nowa wiadomość w dyskusji projektu Project-Menagers"
        },
        {
            uuid: "123-321",
            title: "Nowa wiadomość",
            description: "Nowa wiadomość w dyskusji projektu Project-Menagers"
        }
    ])
    return (
        <section className="flex w-full col-span-full">
            <div className="flex-grow">
                <Typography variant="h2" className="font-bold">{projectData?.title}</Typography>
                <Typography variant="paragraph">{projectData?.description}</Typography>
                {grade?<>
                    <Typography variant="h2">Projekt oceniony na ocenę: {grade.value}</Typography>
                {grade.comment? <Typography variant="h5">Komentarz: {grade.comment}</Typography>:null}
                </>  :null}
            </div>
            <section className="flex flex-row space-x-3">
                <Typography variant="lead">{userData?.name + " " +userData?.surname}</Typography>
                <Avatar src={`data:image/jpeg;base64,${userPic}`}></Avatar>
                
            </section>
        </section>
    )
}