import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Dialog, Transition, Button, Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { FaFile } from "react-icons/fa";
import { useAuth } from '../auth';
import RequestHandler from '../Miscs/RequestHandler';
export default function Message({messageData}) {
    const { projectId } = useParams();
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [userPic,setUserPic] = useState();
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [isLoading,setLoading] = useState(true)
    const auth = useAuth();
    const [userMessage,isUserMessage] = useState(false)
    const[attachmentInfo,setAttachmentInfo]=useState([]);
    const fetchUserPic = async () =>{
        const u = await auth.getUser();
        console.log(u)
        if(messageData.senderUuid === u.uuid)
            isUserMessage(true)
        const pic = await RequestHandler.get(`/api/users/profile-picture?userId=${messageData.senderUuid}`, auth.getToken());
        setUserPic(pic);
        setLoading(false)
    }
    const fetchPicsData = async () =>{
        console.log(messageData.messageAttachments)
        
        messageData.messageAttachments.map(async (attachment)=> {
            console.log(attachment)
            const response = await RequestHandler.get(`/api/chat/GetAttachmentContext`,auth.getToken(),attachment)
            setAttachmentInfo([...attachmentInfo,response])
        })
    }
    useEffect(()=>{ 
        
        setMessage(messageData)
        fetchUserPic()
        fetchPicsData()
        
    },[messageData])
    const [message, setMessage] = useState();

    const attachmentContainerClass = () => {
        const attachmentCount = message.messageAttachments.length;

        if (attachmentCount === 1) {
            return "col-span-full";
        } else {
            return "col-span-1";
        }
    };

    function downloadFile(filePath) {
        console.log("pobieranie pliku");
    }

    function isImageFile(fileType) {
        return ['.jpg', '.jpeg', '.png'].includes(fileType.toLowerCase());
    }

    const handleClickImage = (imagePath) => {
        setSelectedImage(imagePath);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedImage(null);
        setOpen(false);
    };

    useEffect(() => {
        const image = new Image();
        image.src = selectedImage;
        image.onload = () => {
            setImageSize({ width: image.width, height: image.height });
        };
    }, [selectedImage]);
    if(isLoading)
    return(
        <Spinner color="amber"></Spinner>
    )
    return (
        <div className="flex flex-row">
            {userMessage? null :<Avatar className="mt-auto" src={`data:image/jpeg;base64,${userPic}`}></Avatar> }
            
            <div className={`flex flex-col p-1 mt-auto space-y-1 text-left ${userMessage ? "ml-auto": null}`}>
                {userMessage? null:<Typography variant="small">{message?.sender?.name} {message?.sender?.surname}</Typography>}
                <div className={`p-2 ${userMessage? "bg-amber-300" : "bg-gray-300"} rounded-xl`}>
                    <Typography variant="small">{message?.content}</Typography>
                </div>
                {message?.hasAttachment ?
                    <div className="grid grid-cols-3 gap-1">
                        {message?.messageAttachments.map((attachment, index) => (
                            isImageFile(attachment.fileType) ?
                                <img
                                    key={index}
                                    src={`data:image/jpeg;base64,${attachmentInfo[index]}`}
                                    alt={`${attachment.fileName}${attachment.fileType}`}
                                    className={`${attachmentContainerClass()} h-full rounded-xl cursor-pointer object-cover`}
                                    onClick={() => handleClickImage(attachment.filePath)}
                                />
                                :
                                <div key={index} className={`rounded-xl bg-gray-300 p-2  ${attachmentContainerClass()}`}>
                                    <div className="flex flex-row items-center col-span-1 hover:cursor-pointer" onClick={() => downloadFile(attachment.filePath)}>
                                        <FaFile className="w-8 h-8"></FaFile>
                                        <Typography variant="small" className="ml-1 font-bold">{attachment.fileName}{attachment.fileType}</Typography>
                                    </div>
                                </div>
                        ))}
                    </div>
                    : null}
            </div>
            <Dialog size="xl" open={open} handler={() => setOpen(!open)} onClick={handleClose} onClose={handleClose} className={`flex content-center bg-transparent items-center justify-center shadow-none`}>
                <img src={selectedImage} alt="Preview" className={`flex w-[${imageSize.width}] h-[${imageSize.height}] self-center`} onClick={handleClose} />
            </Dialog>
        </div>
    );
}
