import { Typography, Button, Card, Spinner, Dialog, DialogHeader, DialogBody, DialogFooter, Select,Option, Textarea } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import IncomingEvent from "../../ProjectComponents/IncomingEvents";
import ProjectHeader from "../../Components/ProjectHeader";
import NewestMessage from "../../ProjectComponents/NewestMessage";
import ProjectMembers from "../../ProjectComponents/ProjectMembers";
import WeeklyCalendar from "../../ProjectComponents/WeeklyCalendar";
import ClockCard from "../../Components/ClockCard";
import QuickNote from "../../ProjectComponents/QuickNote";
import RequestHandler from "../../Miscs/RequestHandler";
import { useAuth } from "../../auth";
export default function ProjectMainPage() {

    const { projectId } = useParams();
    const auth = useAuth()
    const [projectData, setProjectData] = useState();
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(true);
    const [open,isOpen]=useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
const [comment, setComment] = useState("");
    const fetchData = async() =>{
        const response = await RequestHandler.get(`/api/projects/${projectId}`,auth.getToken())
        const roleResponse = auth.getRoleFromToken();

        setRole(roleResponse);
        setProjectData(response)
        setLoading(false)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const data = {
            projectUuid: projectId,
            gradeValue: selectedRating.toString(),
            comment: comment
        }
        console.log(data)
        const response = await RequestHandler.post(`/api/projects/RateProject`,auth.getToken(),data)
        location.reload()
    }

    useEffect(()=>{
        fetchData()
    },[])
    if(loading){
        return(
            <Spinner></Spinner>
        )
    }
    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-4 gap-5 p-5 bg-gray-300 lg:grid-rows-4 grid-rows ">
            <ProjectHeader></ProjectHeader>
            <Card className="col-span-full lg:col-span-1 row-span-1">
                <IncomingEvent isEvent={true}></IncomingEvent>
            </Card>
            <Card className="col-span-full lg:col-span-1  row-span-1">
                <IncomingEvent isEvent={false}></IncomingEvent>
            </Card>
            
            <Card className="col-span-full lg:col-span-1 row-span-1">
                {
                    projectData.status ==1 ? <div className="flex items-cetner justify-center h-full">
                    <Typography variant="h5" className="my-auto">Projekt oceniony</Typography>
                </div>:

                    role == "TEACHER"? 
                <div className="flex items-cetner justify-center h-full">
                    <Button color="amber" className="h-[50%] my-auto" onClick={()=>{isOpen(true)}}>Oceń projekt</Button>
                </div>
                : <QuickNote></QuickNote>
                }
                {}

            </Card>
            
            <Card className="col-span-full lg:col-span-1 row-span-3">
                <ProjectMembers isPrivate={projectData.isPrivate} ownerUuid={projectData.ownerUuid}></ProjectMembers>
            </Card>
            
            <Card className="col-span-full lg:col-span-3 row-span-2">
                <WeeklyCalendar></WeeklyCalendar>
            </Card>
           <Dialog open={open}>
            <form onSubmit={handleSubmit}>
            <DialogHeader>Oceń projekt: {projectData.title}</DialogHeader>
            <DialogBody className="flex flex-col space-y-3">
                <Select color="amber" label="Ocena" value={selectedRating} onChange={(e) => setSelectedRating(e)}>
                    <Option value={2.0}>2.0</Option>
                    <Option value={2.5}>2.5</Option>
                    <Option value={3.0}>3.0</Option>
                    <Option value={3.5}>3.5</Option>
                    <Option value={4.0}>4.0</Option>
                    <Option value={4.5}>4.5</Option>
                    <Option value={5.0}>5.0</Option>
                </Select>
                <Textarea label="Komentarz*" color="amber" value={comment} onChange={(e) => setComment(e.target.value)}></Textarea>
            </DialogBody>

            <DialogFooter className="flex flex-row space-x-3">
                <Typography variant="small" className="mr-auto">*opcjonalnie</Typography>
            <Button onClick={()=>isOpen(false)} color="red">
                        Anuluj
                    </Button>
                    <Button
                        color="amber"
                        type="submit"
                        disabled={!selectedRating}
                    >
                        Oceń projekt
                    </Button>
            </DialogFooter>
            </form>
            
           </Dialog>
        </div>
    )
}