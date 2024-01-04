import { Card, CardBody, CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import MainPageHeader from "../../Components/MainPageHeader";
import RequestHandler from "../../Miscs/RequestHandler";
import { useAuth } from "../../auth";
import { ProjectTable } from "./TeacherProposalsPage";
export default function TeacherSubjectDetailPage() {
    const auth = useAuth();
    const [user, setUser] = useState()
    const [subjectData,setSubjectData] = useState()
    const [groups,setGroups] = useState()
    const [loading, isLoading] = useState(true)
    const {subjectId} = useParams()
    const [proposals,setProposals] = useState()
    const fetchData = async () => {

        const proposalResponse = await RequestHandler.get(`/api/project-proposals/get-by-subject/${subjectId}`,auth.getToken())
        setProposals(proposalResponse);

        const response = await RequestHandler.get(`/api/subjects/${subjectId}`,auth.getToken())
        console.log(response)
        setSubjectData(response)
        const subjectGroups = []

        response.group.forEach(g =>{
            subjectGroups.push(g.group)
        })
        setGroups(subjectGroups)
        isLoading(false)
    }
  
    useEffect(() => {
        fetchData()
         console.log(subjectId)
    }, [])

    if(loading){
        return(
            <div className=" w-full h-full flex justify-center items-center p-5 bg-gray-300 ">
                <Spinner color="amber" className="w-20 h-20"></Spinner>
            </div>
        )
    }

    return (
        <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <Card className="col-span-2 row-span-1 flex items-center justify-center">
                <Typography variant="h4" className="self-center">{subjectData.name}</Typography>

            </Card>
            <Card className="col-span-2 lg:row-start-3 row-span-6 p-2">
                <CardHeader color="amber" className="font-bold flex items-center justify-center">Wymagania projektowe:</CardHeader>
                <Typography variant="small">{subjectData.requirements}</Typography>
            </Card>
            <Card className="col-span-3 row-span-3 p-2">
                <CardHeader color="amber" className="font-bold flex items-center justify-center">Prowadzone grupy</CardHeader>
                {groups.map((group)=>{
                    return(
                        <div className="flex flex-row p-2 even:bg-gray-300 items-center" key={group.uuid}>
                            <Typography variant="h6"className="flex-grow">{group.name}</Typography>
                            <Typography variant="small" className="flex-grow">Liczebność grupy: {group.members.length}</Typography>
                            <Link to={`group/${group.uuid}`}>
                                <FaArrowRight></FaArrowRight>
                            </Link>
                        </div>
                    )
                })}
            </Card>
            <Card className="col-span-3 row-span-4">
                <CardHeader color="amber" className="font-bold flex items-center justify-center">Przesłane propozycje projektowe</CardHeader>
                <CardBody>
                    <ProjectTable data={proposals} count={3}></ProjectTable>
                </CardBody>
            </Card>
        </div>
    )
}
