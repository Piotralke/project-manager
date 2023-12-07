import { useEffect, useState } from "react";
import { AiOutlineSnippets } from "react-icons/ai";
import { Avatar, Typography } from "@material-tailwind/react";
import { FaArrowRight,FaRegEyeSlash  } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RequestHandler from "../Miscs/RequestHandler";
import { useAuth } from "../auth";
export default function ProjectOverview(projectUuid) {
    const auth = useAuth();
    const [projectData, setProjectData] = useState({
        uuid: "123-321-123",
        title: "Project-Manager",
        description: "System do zarządzania projektami studenckimi",
        status: "STARTED",
        createdAt: "2023-10-26 15:16:40.942694+02",
        isPrivate: false,
    });
    useEffect(()=>{

        const fetchProject = async () =>{
            const data = await RequestHandler.get(`/api/projects/${projectUuid}`,auth.getToken())
            setProjectData(projectData)
        }

        if(projectUuid){
            fetchProject().catch(console.error)
        }
    },[projectUuid])
    const avatarUrl = "https://i.pravatar.cc/300";

    return (
        <div className="flex flex-row w-full h-full p-3 border border-gray-400 rounded-xl bg-gray-300 items-center justify-center">
            <section className="flex basis-1/2">
                <div className="flex flex-col">
                    <div className="flex flex-row mb-2">
                        <div className="flex flex-col">
                            <Typography variant="h5">{projectData.title}</Typography>
                            <Typography variant="small">{projectData.description}</Typography>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, index) => (
                                <Avatar
                                    key={index}
                                    src={avatarUrl}
                                   className="bg-cover bg-center rounded-full border-2 border-black -ml-2 relative z-10"
                                ></Avatar>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex basis-5/12">
                <div className="flex flex-col">
                    <div className="flex-grow">TUTAJ BEDZIE POWIADOMIENEI O WYDARZENIU CYZ COS</div>
                    {projectData.isPrivate ? 
                    <div className="flex flex-row ml-auto">
                        <Typography variant="paragraph">Prywatny</Typography>
                        <FaRegEyeSlash className="w-5 h-5"></FaRegEyeSlash>
                    </div> 
                    :
                    <div className="flex flex-row ml-auto space-x-2">
                        <Typography variant="paragraph">Publiczny</Typography>
                        <FaEarthAfrica className="w-5 h-5"></FaEarthAfrica>
                    </div> 
                    }
                </div>
            </section>
            <section className="flex basis-1/12 justify-center items-center h-full">
                <Link to={`/projects/${projectData.uuid}`}>
                  <FaArrowRight className="w-10 h-10 m-atuo"></FaArrowRight>
                </Link>
            </section>
        </div>
    );
}
