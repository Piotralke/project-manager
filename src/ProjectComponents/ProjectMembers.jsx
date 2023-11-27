import { Avatar, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectMembers() {
    const {projectId} = useParams();

    const [members, setMembers] = useState([
        {
            uuid: "123-321-321",
            name: "John",
            surname: "Doe",
            ProfileImageFileName: "https://i.pravatar.cc/300"
        },
        {
            uuid: "123-321-321",
            name: "Twój",
            surname: "Stary",
            ProfileImageFileName: "https://i.pravatar.cc/300"
        },
        {
            uuid: "123-321-321",
            name: "Kiljam",
            surname: "Mekambe",
            ProfileImageFileName: "https://i.pravatar.cc/300"
        },

    ])

    return(
        <div className="flex flex-col w-full h-full p-3">
            <Typography variant="h5" className="self-center">Członkowie projektu</Typography>
            <div >
                {members.map((member,index)=>{
                    return(
                        <div className="even:bg-gray-300 p-2 rounded-xl flex flex-row items-center" key={index}>
                            <Avatar src={member.ProfileImageFileName}></Avatar>
                            <Typography variant="paragraph" className="font-bold">{member.name} {member.surname}</Typography>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}