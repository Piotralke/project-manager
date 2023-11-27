import { useState } from "react";
import { useParams } from "react-router-dom";
import { TbMessageCirclePlus } from "react-icons/tb";
import { Avatar, Typography } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Message from "./Message";
import ChatInput from "./ChatInput";
export default function NewestMessage () {
    const {projectId} = useParams()

    const [message, setMessage]= useState({
        uuid:"123-321-321",
        content: "Przesyłam plik",
        hasAttachment: true,
        messageAttachment: {
            uuid: "123-123",
            fileName: "plik",
            fileType: "docx",
            filePath: "files/plik.docx"
        },
        sender: {
            uuid: "123-321-321",
            name: "John",
            surname: "Doe",
            ProfileImageFileName: "123-321-321_profile_pic.jpg"
        }
    })

    return(
        <div className="flex flex-col text-center p-4 space-y-2 h-full">
            <div className="flex flex-row self-center space-x-2">
                <TbMessageCirclePlus className="w-7 h-7"></TbMessageCirclePlus>
                <Typography variant="h5">Najnowsza wiadomość</Typography>
            </div>
            <div className="flex flex-col bg-gray-300 rounded-xl p-3 flex-grow">
                <BsThreeDotsVertical className="w-10 h-10 self-center flex-grow"></BsThreeDotsVertical>
                <Message></Message>
                <ChatInput></ChatInput>
            </div>
        </div>
    )
}