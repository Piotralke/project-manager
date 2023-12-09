import { Avatar, Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth";
import RequestHandler from "../Miscs/RequestHandler";

export default function ProjectMembers() {
    const auth = useAuth();
    const {projectId} = useParams()
    const [projectMembers, setProjectMembers] = useState([])
    const fetchPics = async (members) => {

        members.forEach(async member => {
            const pic = await RequestHandler.get(`/api/users/profile-picture?userId=${member.userUuid}`, auth.getToken())
            console.log(pic)
            const user = await RequestHandler.get(`/api/users/${member.userUuid}`,auth.getToken())
            
            setProjectMembers([...projectMembers, {...user, pic}])
        });
    }
    const fetchData = async () =>{
        const u = await auth.getUser()
        const members = await RequestHandler.get(`/api/projects/${projectId}/getProjectMembers`, auth.getToken())
            await fetchPics(members)
    }
    useEffect(()=>{
        fetchData().catch(console.error)
    },[])
    return(
        <div className="flex flex-col w-full h-full p-3">
            <Typography variant="h5" className="self-center">Członkowie projektu</Typography>
            
            <div >
                {projectMembers.map((member,index)=>{
                    return(
                        <div className="even:bg-gray-300 p-2 rounded-xl space-x-2 flex flex-row items-center" key={index}>
                            <Avatar src={`data:image/jpeg;base64,${member.pic}`}></Avatar>
                            <Typography variant="paragraph" className="font-bold">{member.name} {member.surname}</Typography>
                        </div>
                    )
                })}
            </div>
            <Button color="amber" className="w-1/2 ml-auto mt-auto">Dodaj członka</Button>
        </div>
    )
}