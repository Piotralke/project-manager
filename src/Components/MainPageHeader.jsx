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
            const role = auth.getRoleFromToken()
            console.log(role)
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
                
            </section>
        </section>
    )
}