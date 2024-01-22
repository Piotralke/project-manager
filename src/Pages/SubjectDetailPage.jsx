import { Button, Card, DialogBody, DialogFooter, DialogHeader, Input, Textarea, CardBody, CardHeader, Dialog, Spinner, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainPageHeader from "../Components/MainPageHeader";
import RequestHandler from "../Miscs/RequestHandler";
import { useAuth } from "../auth";
import {
    List,
    ListItem,
    ListItemSuffix,
    Checkbox
} from "@material-tailwind/react";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import ProjectOverview from "../Components/ProjectOverwiev";
const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

export default function SubjectDetailPage() {
    const auth = useAuth();
    const [user, setUser] = useState();
    const [subjectData, setSubjectData] = useState();
    const [loading, isLoading] = useState(true);
    const { subjectId } = useParams();
    const [dialogOpen, isDialogOpen] = useState(false);
    const [userGroup, setUserGroup] = useState();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [groupMembers, setGroupMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageMembers, setCurrentPageMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [proposal, setProposal] = useState(null)
    const [subjectProject, setSubjectProject] = useState();
    useEffect(() => {
        const offset = currentPage * ITEMS_PER_PAGE;
        const currentMembers = filteredMembers.slice(offset, offset + ITEMS_PER_PAGE);
        setCurrentPageMembers(currentMembers);
    }, [currentPage, filteredMembers]);

    useEffect(() => {
        const updatedFilteredMembers = groupMembers?.filter((member) =>
            `${member.name} ${member.surname}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMembers(updatedFilteredMembers);
    }, [searchQuery, groupMembers]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    // ... Existing functions ...

    const checkItem = (value) => {
        const isSelected = selectedMembers.includes(value);
        if (isSelected) {
            setSelectedMembers((prevSelected) =>
                prevSelected.filter((id) => id !== value)
            );
        } else {
            setSelectedMembers((prevSelected) => [...prevSelected, value]);
        }
    }
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleTitleChange = (value) => {
        setTitle(value);
    };

    const handleDescriptionChange = (value) => {
        setDesc(value);
    };

    const handleCreateProject = () => {
        isDialogOpen(true);
    };

    const handleCloseDialog = () => {
        isDialogOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedMembers)
        if(proposal.state==2)
        {
            const data = 
            {
                uuid: proposal.uuid,
                title: title,
                description: desc,
                MembersIds: selectedMembers
            }
            const response = await RequestHandler.put(`/api/project-proposals`,data,auth.getToken());
        }
        else
        {
            const data =
            {
                SubjectUuid: subjectId,
                Title: title,
                Description: desc,
                MembersIds: selectedMembers
            }
            console.log(data)
            const response = await RequestHandler.post(`/api/project-proposals`, auth.getToken(), data)
        }
        
        location.reload();
        // Your submission logic here
    };

    const fetchData = async () => {
        try {
            const response = await RequestHandler.get(`/api/subjects/${subjectId}`, auth.getToken());
            const user = await auth.getUser();
            const proposal = await RequestHandler.get(`/api/project-proposals/get-user-proposal-for-subject/?subjectId=${subjectId}&userId=${user.uuid}`)
            setProposal(proposal)
            console.log(proposal)
            if (proposal.state == 1) {
                const projectResponse = await RequestHandler.get(`/api/projects/GetUserProjectForSubject/?subjectId=${subjectId}&userId=${user.uuid}`, auth.getToken())
                console.log(projectResponse)
                setSubjectProject(projectResponse)
            }
            setUser(user)
            response.group.forEach((g) => {
                const result = g.group.members.filter((x) => x.userUuid == user.uuid);
                if (result.length > 0) {
                    const tab = [];
                    g.group.members.forEach((member) => {
                        tab.push(member.user);
                    });
                    setGroupMembers(tab);
                    setUserGroup(g.group);
                }
            });

            setSubjectData(response);
            isLoading(false);
        } catch (error) {
            console.error(error)
        }

    };
    const handleEditProposal = () => {
        if (proposal && proposal.state === 2) {
            setTitle(proposal.title);
            setDesc(proposal.description);
            const memberIds = proposal.proposalSquad.map(member => member.user.id);
            setSelectedMembers(memberIds);
            isDialogOpen(true);
        }
    };
    const statusText = (status) => {
        switch (status) {
            case 0:
                return "Wysłano"
            case 1:
                return "Przyjęto"
            case 2:
                return "Odrzucono"
            case 3:
                return "Wysłano ponownie"
        }
    }
    useEffect(() => {
        fetchData();
        console.log(subjectId);
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center p-5 bg-gray-300 ">
                <Spinner color="amber" className="w-20 h-20"></Spinner>
            </div>
        );
    }

    return (
        <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <Card className="col-span-2 row-span-1 flex items-center justify-center">
                <Typography variant="h4" className="self-center">{subjectData.name}</Typography>
            </Card>
            <Card className="col-span-3 row-span-1 flex items-center justify-center">
                <Typography variant="h4" className="self-center">Prowadzący: {subjectData.teacher.name} {subjectData.teacher.surname}</Typography>
                <Typography variant="small">email: {subjectData.teacher.email}</Typography>
            </Card>
            <Card className="col-span-2 lg:row-start-3 row-span-6 p-2">
                <CardHeader color="amber" className="font-bold flex items-center justify-center">Wymagania projektowe:</CardHeader>
                <Typography variant="small">{subjectData.requirements}</Typography>
            </Card>
            <Card className="col-span-3 row-span-3 p-2">
                <CardHeader color="amber" className="font-bold flex items-center justify-center">Twój projekt</CardHeader>
                <CardBody className="flex my-auto">
                    {subjectProject? <ProjectOverview projectUuid={subjectProject.uuid} isPinned={true}></ProjectOverview>:<Typography className="flex items-center justify-center" variant="h5">Brak projektu</Typography>}
                    
                </CardBody>
            </Card>
            <Card className="col-span-3 row-span-3">
                <CardHeader color="amber" className="font-bold flex items-center justify-center">Propozycja projektowa</CardHeader>
                <CardBody>
                    {proposal ?
                        <div className="flex flex-row w-full h-full space-x-2">
                            <div className="flex flex-col basis-1/2">
                                <Typography variant="h5">Tytuł: {proposal.title}</Typography>
                                <Typography variant="h5">Opis:</Typography>
                                <Typography variant="small">{proposal.description}</Typography>
                            </div>
                            <div className="flex flex-col basis-1/3">
                                <Typography variant="h6">Przesłano: {format(new Date(proposal.cretedAt), "dd-MM-yyyy HH:mm:ss")}</Typography>
                                <Typography variant="h6">Skład zespołu:</Typography>
                                {proposal.proposalSquad.map(member => {
                                    return <Typography variant="small">{member.user.name} {member.user.surname}</Typography>
                                })}
                            </div>
                            <div className="flex flex-col basis-1/6">
                                <Typography variant="h6">Status</Typography>
                                <Typography>{statusText(proposal.state)}</Typography>
                                {proposal.state==2? <Button color="amber" onClick={handleEditProposal}>EDYTUJ</Button>:null}
                            </div>
                        </div>
                        :
                        <Button color="amber" onClick={handleCreateProject}>ZŁÓŻ PROPOZYCJĘ PROJEKTOWĄ</Button>
                    }

                </CardBody>
            </Card>

            <Dialog open={dialogOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>Dodaj propozycję projektową</DialogHeader>
                    <DialogBody>
                        <div className="flex flex-col space-y-3">
                            <Input
                                label="Tytuł"
                                variant="outlined"
                                margin="normal"
                                color="amber"
                                fullWidth
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                            />
                            <Textarea
                                label="Opis"
                                color="amber"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={4}
                                value={desc}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                            />
                            {/* List with pagination */}
                            <Input
                                color="amber"
                                label="Wyszukaj członka:"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Card >
                                <List>
                                    {currentPageMembers.map((member) => (
                                        <ListItem key={member.id} value={member.id} onClick={() => { checkItem(member.id) }} className={
                                            selectedMembers.includes(member.id)
                                                ? "font-bold p-1"
                                                : "p-1"
                                        }>
                                            {member.name + " " + member.surname}
                                            <ListItemSuffix>
                                                <Checkbox color="amber" checked={selectedMembers.includes(member.id)}></Checkbox>
                                            </ListItemSuffix>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                            {filteredMembers?.length > ITEMS_PER_PAGE && (
                                <ReactPaginate
                                    className="flex flex-row justify-evenly w-full"
                                    previousLabel={"poprzednia"}
                                    nextLabel={"następna"}
                                    breakLabel={""}
                                    pageCount={Math.ceil(filteredMembers?.length / ITEMS_PER_PAGE)}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageChange}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                />
                            )}
                        </div>
                    </DialogBody>
                    <DialogFooter className="flex flex-row space-x-3">
                        <Button onClick={handleCloseDialog} color="red">
                            Anuluj
                        </Button>
                        <Button color="amber" type="submit" disabled={!title || !desc || !selectedMembers.length > 0}>
                            Prześlij propozycję
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </div>
    );
}
