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
        console.log(response)
        setProjectMessages(response)
    }
    useEffect(()=>{
        fetchData()
    },[])
    


    return (
        <div className="grid w-full h-screen grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-3 lg:grid-rows-8 grid-rows ">
            <ProjectHeader></ProjectHeader>
            <Card className="col-span-full row-span-7">
                <CardBody className="h-full p-2 bg-white rounded-xl">
                    <div className="flex flex-col h-full">
                        {projectMessages.length>0 ?
                        (<div className="overflow-y-auto flex flex-col max-h-[94%]">
                        {projectMessages.map((message,index)=>{
                            return(
                                <Message key={message.uuid} messageData = {message}></Message>
                            )
                        })}

                    </div>)
                        
                          :
                        (
                            <div className="overflow-y-auto flex flex-col flex-grow max-h-[94%]"></div>
                        )
                        }
                        <div className="flex-grow"></div>
                        <ChatInput></ChatInput>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}