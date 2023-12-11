import { useEffect, useState } from "react";
import { AiOutlineSnippets } from "react-icons/ai";
import { Avatar, Spinner, Typography } from "@material-tailwind/react";
import { FaArrowRight, FaRegEyeSlash } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RequestHandler from "../Miscs/RequestHandler";
import { useAuth } from "../auth";
export default function ProjectOverview({ projectUuid }) {
    const auth = useAuth();
    const [loading, isLoading] = useState(true)
    const [projectMembers, setProjectMembers] = useState([])
    const [projectData, setProjectData] = useState(
        //     {
        //     uuid: "123-321-123",
        //     title: "Project-Manager",
        //     description: "System do zarządzania projektami studenckimi",
        //     status: "STARTED",
        //     createdAt: "2023-10-26 15:16:40.942694+02",
        //     isPrivate: false,
        // }
    );
    const fetchPics = async (members) => {

        members.forEach(async member => {
            const pic = await RequestHandler.get(`/api/users/profile-picture?userId=${member.uuid}`, auth.getToken())
            console.log(pic)
            setProjectMembers([...projectMembers, pic])
        });
    }
    const fetchProject = async () => {
        if (projectUuid) {
            console.log("juhu")

            const data = await RequestHandler.get(`/api/projects/${projectUuid}`, auth.getToken())
            console.log(data)
            setProjectData(data)
            const members = await RequestHandler.get(`/api/projects/${projectUuid}/getProjectMembers`, auth.getToken())
            await fetchPics(members)
  
        }
        
    }
    useEffect(() => {
        console.log(projectUuid)
        fetchProject().catch(console.error)
        isLoading(false)
    }, [])
    if (loading)
        return (
            <Spinner color="amber" className="m-auto"></Spinner>
        )
    if(!projectData)
    {
        return (
            <div className="flex items-center justify-center w-full h-full ">

                <Typography variant="h5">Brak przypiętego projektu.</Typography>
            </div>
        )
    }
    else
    return (
        <div className="flex flex-row items-center justify-center w-full h-full p-3 bg-gray-300 border border-gray-400 rounded-xl">
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
                            {projectMembers?.map((pic, index) => {
                                // Ustaw maksymalną liczbę użytkowników do wyświetlenia
                                const maxUsersToShow = 5;

                                // Sprawdź, czy liczba użytkowników przekracza maksymalną ilość
                                if (index < maxUsersToShow) {
                                    // Renderuj avatary dla pierwszych 5 użytkowników
                                    return (
                                        <Avatar
                                            key={index}
                                            src={`data:image/jpeg;base64,${pic}`}
                                            className={`bg-cover bg-center rounded-full border-2 border-black ${index > 0 ? "-ml-2" : ""} relative z-10`}
                                        ></Avatar>
                                    );
                                } else if (index === maxUsersToShow) {
                                    // Renderuj avatar z liczbą użytkowników, gdy przekracza 5
                                    const additionalUsersCount = projectMembers.length - maxUsersToShow;
                                    return (
                                        <div key={index} className="relative z-10">
                                            <Avatar src={`data:image/jpeg;base64,${pic}`} className="bg-center bg-cover border-2 border-black rounded-full"></Avatar>
                                            <span className="absolute bottom-0 right-0 p-1 -mr-1 text-black bg-white rounded-full">
                                                {`+${additionalUsersCount}`}
                                            </span>
                                        </div>
                                    );
                                }
                                // Pomijaj renderowanie dla użytkowników poza pierwszymi 5 i dodatkowym z liczbą
                                return null;
                            })}
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
            <section className="flex items-center justify-center h-full basis-1/12">
                <Link to={`/projects/${projectData.uuid}`}>
                    <FaArrowRight className="w-10 h-10 m-atuo"></FaArrowRight>
                </Link>
            </section>
        </div>
    );
}
