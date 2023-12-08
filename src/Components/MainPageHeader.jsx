import { Typography, CardBody, Avatar, Badge, Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { useAuth } from "../auth";
import RequestHandler from "../Miscs/RequestHandler";
export default function MainPageHeader() {

    const [userData, setUserData] = useState({});
    const [userPic,setUserPic] = useState();
    const auth = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await auth.getUser()
            setUserData(user)
            const profilePic = await RequestHandler.get(`/api/users/profile-picture?userId=${user.uuid}`,auth.getToken())
            setUserPic(profilePic)
            }
        
        fetchUser().catch(console.error)
        

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
                <Typography variant="h2" className="font-bold">Witaj, {userData?.name + " " + userData?.surname}</Typography>
            </div>
            <section className="flex flex-row space-x-3">
                <Typography variant="lead">{userData?.name + " " + userData?.surname}</Typography>
                <Avatar src={`data:image/jpeg;base64,${userPic}`}></Avatar>
                <Badge content={`${notifications.length}`} className={`${notifications.length > 0 ? null : "hidden"}`}>
                    <Popover placement="bottom-start">
                        <PopoverHandler>
                            <Button className="flex bg-amber-400 rounded-full w-16 h-16 place-content-center items-center justify-center">
                                <BiBell className="w-8 h-8 text-black"></BiBell>
                            </Button>
                        </PopoverHandler>
                        <PopoverContent className="w-1/4 space-y-2 m-2">
                            {notifications.map((not, index) => {
                                return (
                                    <div key={index} className="w-full flex flex-row divide-x divide-gray-400 space-x-2 even:bg-gray-300 rounded-lg p-2">
                                        <Typography variant="h6">{not.title}</Typography>
                                        <Typography className="p-2" variant="small">{not.description}</Typography>
                                    </div>

                                )

                            })}
                        </PopoverContent>
                    </Popover>
                </Badge>
            </section>
        </section>
    )
}