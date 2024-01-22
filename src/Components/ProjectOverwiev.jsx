import { useEffect, useState } from "react";
import { Avatar, Spinner, Tooltip, Typography } from "@material-tailwind/react";
import { FaArrowRight, FaRegEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import RequestHandler from "../Miscs/RequestHandler";
import { useAuth } from "../auth";
import { BsFillPinFill } from "react-icons/bs";
import { MdGroup } from "react-icons/md";
export default function ProjectOverview({ isPinned, projectUuid }) {
    const auth = useAuth();
    const [loading, isLoading] = useState(true)
    const [projectMembers, setProjectMembers] = useState([])
    const [projectData, setProjectData] = useState();
    const fetchPics = async (members) => {
        const promises = members.map(async (member) => {
            const pic = await RequestHandler.get(`/api/users/profile-picture?userId=${member.uuid}`, auth.getToken());
            const result = { ...member, pic }
            return result;
        });

        const profilePictures = await Promise.all(promises);
        setProjectMembers([...projectMembers, ...profilePictures]);
    }
    const fetchProject = async () => {
        if (projectUuid) {

            const data = await RequestHandler.get(`/api/projects/${projectUuid}`, auth.getToken())
            setProjectData(data)
            const members = await RequestHandler.get(`/api/projects/${projectUuid}/getProjectMembers`, auth.getToken())
            await fetchPics(members)

        }

    }
    const pinProject = async () => {
        const response = await RequestHandler.put(`/api/users/PinProject/${projectUuid}`, null, auth.getToken())
    }
    useEffect(() => {
        console.log(isPinned)
        fetchProject().catch(console.error)
        isLoading(false)
    }, [])
    if (loading)
        return (
            <Spinner color="amber" className="m-auto"></Spinner>
        )
    if (!projectData) {
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
                                {projectMembers?.map((member, index) => {
                                    // Ustaw maksymalną liczbę użytkowników do wyświetlenia
                                    const maxUsersToShow = 5;
                                    // Sprawdź, czy liczba użytkowników przekracza maksymalną ilość
                                    if (index < maxUsersToShow) {
                                        // Renderuj avatary dla pierwszych 5 użytkowników
                                        return (
                                            <Tooltip content={`${member.name + " " + member.surname}`}>
                                                <Avatar
                                                    key={index}
                                                    src={`data:image/jpeg;base64,${member.pic}`}
                                                    className={`bg-cover bg-center rounded-full border-2 border-black ${index > 0 ? "-ml-2" : ""} relative z-10`}
                                                ></Avatar>
                                            </Tooltip>

                                        );
                                    } else if (index === maxUsersToShow && projectMembers.length > maxUsersToShow) {
                                        // Renderuj avatar z liczbą użytkowników, gdy przekracza 5
                                        const additionalUsersCount = projectMembers.length - maxUsersToShow;
                                        return (
                                            <div key={index} className="relative z-10">
                                                {/* <Avatar src={`data:image/jpeg;base64,${pic}`} className="bg-center bg-cover border-2 border-black rounded-full"></Avatar> */}
                                                <span className="absolute bottom-0 right-0  p-1 -mr-1 text-black bg-white rounded-full">
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
                <section className="flex basis-4/12">
                    <div className="flex flex-col">
                        {/* <div className="flex-grow">TUTAJ BEDZIE POWIADOMIENEI O WYDARZENIU CYZ COS</div> */}
                        {projectData.isPrivate ?
                            <div className="flex flex-row ml-auto">
                                <Typography variant="paragraph">Osobisty</Typography>
                                <FaUser className="w-5 h-5"></FaUser>
                            </div>
                            :
                            <div className="flex flex-row ml-auto space-x-2">
                                <Typography variant="paragraph">Grupowy</Typography>
                                <MdGroup className="w-5 h-5"></MdGroup>
                            </div>
                        }
                    </div>
                </section>
                {!isPinned ? <div className="flex basis-1/12 items-start justify-start h-full p-3">
                    <BsFillPinFill onClick={pinProject} className="w-6 h-6 hover:cursor-pointer"></BsFillPinFill>
                </div> : null}

                <section className="flex items-center justify-center h-full basis-1/12">
                    <Link to={`/projects/${projectData.uuid}`}>
                        <FaArrowRight className="w-10 h-10 m-atuo"></FaArrowRight>
                    </Link>
                </section>
            </div>
        );
}
