import ProjectHeader from "../../Components/ProjectHeader"
import { Button, Checkbox, Card, CardBody } from "@material-tailwind/react"
import Message from "../../ProjectComponents/Message"
import ChatInput from "../../ProjectComponents/ChatInput"
import { useState, useEffect } from "react"
import { useAuth } from "../../auth"
import RequestHandler from "../../Miscs/RequestHandler"
import { useParams } from "react-router-dom"
export default function ProjectChat() {


    const [projectMessages, setProjectMessages] = useState([])
    const auth = useAuth()
    const {projectId} = useParams()
    const fetchData = async () =>{
        const response = await RequestHandler.get(`/api/chat/GetProjectMessages/${projectId}`, auth.getToken())
        setProjectMessages(response)
    }
    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className="grid w-full h-screen grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-3 lg:grid-rows-8 grid-rows ">
            <ProjectHeader></ProjectHeader>
            <Card className="col-span-full row-span-7">
                <CardBody className="h-full p-2 bg-gray-300 rounded-xl">
                    <div className="h-full">
                        <div className="overflow-y-auto flex flex-col max-h-[94%]">
                            {projectMessages.map((message,index)=>{
                                return(
                                    <Message key={message.uuid} messageData = {message}></Message>
                                )
                            })}

                        </div>
                        <ChatInput></ChatInput>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}