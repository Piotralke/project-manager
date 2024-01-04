import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Button, Card, CardBody, CardHeader, Typography, Spinner, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import MainPageHeader from "../../Components/MainPageHeader";
import { FaEye } from "react-icons/fa";
import RequestHandler from "../../Miscs/RequestHandler";
import { useAuth } from "../../auth";
import format from "date-fns/format";
export function ProjectTable({ data, count = 6 }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [open, isOpen] = useState(false)
    const [selectedProposal, setSelectedProposal] = useState()
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const auth = useAuth()
    const offset = currentPage * count;
    const currentPageData = data.slice(offset, offset + count);


    const statusType = (value) => {
        switch (value) {
            case 0:
                return "Nowy"
            case 1:
                return "Przyjęty"
            case 2:
                return "Odrzucony"
            case 3:
                return "Wysłany ponownie"
        }
    }
    const handleSubmit = async (e,newStatus) =>{
        e.preventDefault();
        
        const data = {
            uuid: selectedProposal.uuid,
            state: newStatus
        }
        let groupSubjectId;
        const updateProposalResponse = await RequestHandler.put(`/api/project-proposals`,data,auth.getToken())
        if(newStatus==1)
        {
            selectedProposal.subject.group.forEach(groupObject => {
                const groupSubjectUuid = groupObject.uuid;
        
                // Iterujemy przez członków grupy
                groupObject.group.members.forEach(member => {
                    const userUuid = member.userUuid;
        
                    // Sprawdzamy, czy userUuid istnieje w proposalSquad
                    if (selectedProposal.proposalSquad.some(squadMember => squadMember.userUuid === userUuid)) {
                        // Tutaj masz prawidłowe GroupSubjectUuid do dalszego użycia
                        groupSubjectId = groupSubjectUuid;
                    }
                });
            });
            const teacher = await auth.getUser()
            const members = selectedProposal.proposalSquad.map(m=>m.userUuid)
            const projectData = {
                title: selectedProposal.title,
                description: selectedProposal.description,
                ownerUuid: teacher.uuid,
                members: members,
                isPrivate: false,
                groupSubjectUuid: groupSubjectId
                
            }
           const makeProjectResponse = await RequestHandler.post(`/api/projects`, auth.getToken(),projectData)
        }
        location.reload();
    }
    const handleDetailCheck = (proposal) => {
        setSelectedProposal(proposal);
        isOpen(true);
    }
    const handleEventDialogClose = () => {
        isOpen(false);
        setSelectedProposal(null)
      };

    return (
        <div className="flex flex-col justify-items-end" >
            <Card className="">
                <table className="w-full table-fixed text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((proposal, index) => {
                            const isLast = index === data.length - 1;
                            const classes = isLast ? `p-4 ` : `p-4 border-b border-blue-gray-50`
                            console.log(classes)
                            return (
                                <tr key={proposal.uuid}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${proposal.state == 0 ? "font-bold" : "font-normal"}`}
                                        >
                                            {proposal.title}
                                        </Typography>
                                    </td>
                                    <td className={classes + "truncate"}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${proposal.state == 0 ? "font-bold" : "font-normal"}`}
                                        >
                                            {proposal.description}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${proposal.state == 0 ? "font-bold" : "font-normal"}`}
                                        >
                                            {format(new Date(proposal.cretedAt), "dd-MM-yyyy HH:mm:ss")}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${proposal.state == 0 ? "font-bold" : "font-normal"}`}
                                        >
                                            {proposal.editedAt ? format(new Date(proposal.editedAt), "dd-MM-yyyy HH:mm:ss") : "Nie edytowano"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${proposal.state == 0 ? "font-bold" : "font-normal"}`}
                                        >
                                            {proposal.subject.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${proposal.state == 0 ? "font-bold" : "font-normal"}`}
                                        >
                                            {statusType(proposal.state)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Button color="amber" onClick={() => { handleDetailCheck(proposal) }} className="aspect-square"><FaEye></FaEye></Button>
                                    </td>
                                </tr>
                            );

                        })}
                    </tbody>
                </table>
                {selectedProposal ?
                    <Dialog open={open}>
                        <form>
                        <DialogHeader>Przedmiot: {selectedProposal.subject.name}</DialogHeader>
                        <DialogBody>
                        <div className="flex flex-row space-x-2 w-full h-full">
                            <div className="flex flex-col flex-grow space-y-3 basis-3/4">
                                <Typography variant="h6"> Utworzono: {format(new Date(selectedProposal.cretedAt), "dd-MM-yyyy HH:mm:ss")}</Typography>
                                {selectedProposal.editedAt? <Typography variant="h6">{statusType(selectedProposal.state)}: {selectedProposal.editedAt ? format(new Date(selectedProposal.editedAt), "dd-MM-yyyy HH:mm:ss") : "Nie edytowano"}</Typography>:null}
                                <Typography variant="h6">Temat projektu: {selectedProposal.title}</Typography>
                                <Typography>{selectedProposal.description}</Typography>
                            </div>
                            <div className="h-full flex flex-col flex-grow space-y-3 basis-1/4">
                                <Typography variant="h6">Skład zespołu:</Typography>
                                {selectedProposal.proposalSquad.map(squadMember=>{
                                    return(
                                        <Typography>{squadMember.user.name} {squadMember.user.surname}</Typography>
                                    )
                                })}                      
                            </div>
                        </div>
                        </DialogBody>
                        <DialogFooter className="flex flex-row space-x-3">
                            <Button className="mr-auto" onClick={handleEventDialogClose} color="red">
                                Zamknij
                            </Button>
                            {(selectedProposal.state == 0 || selectedProposal.state == 3) ?
                            <>
                            <Button
                                    color="amber"
                                    type="submit"
                                    onClick={(e)=>handleSubmit(e,1)}
                                >
                                    Przyjmij
                                </Button>
                                <Button
                                    color="red"
                                    type="submit"
                                    onClick={(e)=>{handleSubmit(e,2)}}
                                >
                                    Odrzuć
                                </Button>
                            </>
                                : null}

                        </DialogFooter>
                        </form>
                    </Dialog>
                    : null}

            </Card>
            {data.length > count && (
                <div className="flex flex-grow w-full h-full">
                    <ReactPaginate
                        className="flex flex-row w-full justify-evenly "
                        previousLabel={"poprzednia"}
                        nextLabel={"następna"}
                        breakLabel={""}
                        pageCount={Math.ceil(data.length / count)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </div>



            )}
        </div>


    );
}


const TABLE_HEAD = ["Tytuł projektu", "Opis projektu", "Data utworzenia", "Data edycji", "Przedmiot", "Status", "Szczegóły"];



export default function TeacherProposalPage() {
    const [proposals, setProposals] = useState()
    const [loading, setLoading] = useState(true);
    const auth = useAuth()
    const fetchData = async () => {
        const user = await auth.getUser();
        const response = await RequestHandler.get(`/api/project-proposals/get-all-teacher-proposals/${user.uuid}`, auth.getToken())
        console.log(response)
        setProposals(response)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])
    if (loading)
        return (
            <Spinner color="amber" className="m-auto"></Spinner>
        )
    return (
        <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <Card className="col-span-full row-span-7">
                <CardHeader color="amber" className="text-center">
                    <Typography variant="h5">Propozycje projektowe</Typography>
                </CardHeader>
                <CardBody>
                    <ProjectTable data={proposals}></ProjectTable>
                </CardBody>
            </Card>

        </div>
    )
}