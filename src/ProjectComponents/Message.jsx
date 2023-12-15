import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Dialog, Transition, Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { FaFile } from "react-icons/fa";

export default function Message(messageData) {
    const { projectId } = useParams();
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    useEffect(()=>{
        setMessage(messageData)
    },[messageData])
    const [message, setMessage] = useState();

    const attachmentContainerClass = () => {
        const attachmentCount = message.messageAttachment.length;

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
        return ['jpg', 'jpeg', 'png'].includes(fileType.toLowerCase());
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

    return (
        <div className="flex flex-row">
            <Avatar className="mt-auto" src="https://i.pravatar.cc/300"></Avatar>
            <div className="flex flex-col p-1 mt-auto space-y-1 text-left">
                <Typography variant="small">{message.sender.name} {message.sender.surname}</Typography>
                <div className="p-2 bg-white rounded-xl">
                    <Typography variant="small">{message.content}</Typography>
                </div>
                {message.hasAttachment ?
                    <div className="grid grid-cols-3 gap-1">
                        {message.messageAttachment.map((attachment, index) => (
                            isImageFile(attachment.fileType) ?
                                <img
                                    key={index}
                                    src={attachment.filePath}
                                    alt={`${attachment.fileName}.${attachment.fileType}`}
                                    className={`${attachmentContainerClass()} h-full rounded-xl cursor-pointer object-cover`}
                                    onClick={() => handleClickImage(attachment.filePath)}
                                />
                                :
                                <div key={index} className={`rounded-xl bg-white p-2  ${attachmentContainerClass()}`}>
                                    <div className="flex flex-row items-center col-span-1 hover:cursor-pointer" onClick={() => downloadFile(attachment.filePath)}>
                                        <FaFile className="w-8 h-8"></FaFile>
                                        <Typography variant="small" className="ml-1 font-bold">{attachment.fileName}.{attachment.fileType}</Typography>
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
