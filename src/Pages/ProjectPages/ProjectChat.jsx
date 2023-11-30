import ProjectHeader from "../../Components/ProjectHeader"
import { Button, Checkbox, Card, CardBody } from "@material-tailwind/react"
import Message from "../../ProjectComponents/Message"
import ChatInput from "../../ProjectComponents/ChatInput"
export default function ProjectChat() {
    return (
        <div className="grid w-full h-screen grid-cols-1 lg:grid-cols-3 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <ProjectHeader></ProjectHeader>
            <Card className="col-span-full row-span-7">
                <CardBody className="h-full bg-gray-300 p-2 rounded-xl">
                    <div className="h-full">
                        <div className="overflow-y-auto flex flex-col max-h-[94%]">
                            <Message></Message>
                            <Message></Message>
                            <Message></Message>

                        </div>
                        <ChatInput></ChatInput>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}