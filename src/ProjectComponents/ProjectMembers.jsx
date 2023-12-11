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
            const pic = await RequestHandler.get(`/api/users/profile-picture?userId=${member.uuid}`, auth.getToken())
            console.log(pic)
            
            setProjectMembers([...projectMembers, {...member, pic}])
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
                        <div className="flex flex-row items-center p-2 space-x-2 even:bg-gray-300 rounded-xl" key={index}>
                            <Avatar src={`data:image/jpeg;base64,${member.pic}`}></Avatar>
                            <Typography variant="paragraph" className="font-bold">{member.name} {member.surname}</Typography>
                        </div>
                    )
                })}
            </div>
            <Button color="amber" className="w-1/2 mt-auto ml-auto">Dodaj członka</Button>
        </div>
    )
}