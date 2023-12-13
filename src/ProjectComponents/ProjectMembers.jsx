import { Avatar, Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Popover, PopoverHandler, PopoverContent, Checkbox, List, ListItem, ListItemSuffix } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth";
import RequestHandler from "../Miscs/RequestHandler";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
export default function ProjectMembers() {
    const auth = useAuth();
    const { projectId } = useParams()
    const [projectMembers, setProjectMembers] = useState([])
    const [addMemberDialogOpen, isAddMemberDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState([]);
    const [memberList, setMemberList] = useState([])
    const handleMemberDialogClose = () => {
        isAddMemberDialogOpen(false);
        setSearchQuery([])
        setMemberList([])
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        memberList.forEach(async(member) => {
            const data = {
                projectUuid: projectId,
                memberUuid: member.id
            }
            await RequestHandler.post(`/api/projects/AddProjectMember`,auth.getToken(),data)
        });
    }
    const handleMemberDialogOpen = () => {
        isAddMemberDialogOpen(true);
    };
    const handleSearch = async (value) => {
        if (value.length > 2) {
            const response = await RequestHandler.get(`/api/users?searchCondition=${value}`, auth.getToken())

            // Filtruj wyniki, usuwając tych, którzy już są w projekcie
            const filteredResults = response.filter((result) => 
                !projectMembers.some((projectMember) => projectMember.uuid === result.id)
            );
            console.log(filteredResults)
            setSearchQuery(filteredResults);

        }
        else {
            setSearchQuery([]);

        }
    }
    const addMember = (member) => {
        // Sprawdź, czy użytkownik nie istnieje już na liście
        if (!memberList.some((existingMember) => existingMember.id === member.id)) {
            setMemberList([...memberList, member]);
        }
    };
    const removeMember = (memberToRemove) => {
        setMemberList((prevMembers) => prevMembers.filter((member) => member !== memberToRemove));
    }
    const fetchPics = async (members) => {
        const promises = members.map(async (member) => {
            const pic = await RequestHandler.get(`/api/users/profile-picture?userId=${member.uuid}`, auth.getToken());
            const data = {
                ...member, pic
            }
            return data;
        });

        const profilePictures = await Promise.all(promises);

        setProjectMembers([...projectMembers, ...profilePictures]);
    }
    const fetchData = async () => {
        const u = await auth.getUser()
        const members = await RequestHandler.get(`/api/projects/${projectId}/getProjectMembers`, auth.getToken())
        await fetchPics(members)
    }
    useEffect(() => {
        fetchData().catch(console.error)
    }, [])
    return (
        <div className="flex flex-col w-full h-full p-3">
            <Typography variant="h5" className="self-center">Członkowie projektu</Typography>

            <div >
                {projectMembers.map((member, index) => {
                    return (
                        <div className="flex flex-row items-center p-2 space-x-2 even:bg-gray-300 rounded-xl" key={index}>
                            <Avatar src={`data:image/jpeg;base64,${member.pic}`}></Avatar>
                            <Typography variant="paragraph" className="font-bold">{member.name} {member.surname}</Typography>
                        </div>
                    )
                })}
            </div>
            <Button color="amber" className="w-1/2 mt-auto ml-auto" onClick={handleMemberDialogOpen}>Dodaj członka</Button>
            <Dialog open={addMemberDialogOpen} size="lg">
                <form onSubmit={handleSubmit}>
                <DialogHeader>
                    Dodaj członka projektu
                </DialogHeader>
                <DialogBody>
                    <div className="flex flex-row">
                        <div className="basis-1/2">
                            <Input label="Wyszukaj użytkownika po imieniu, nazwisku bądź e-mail" color="amber" onChange={(e) => { handleSearch(e.target.value) }}></Input>
                            {searchQuery.length > 0 && (
                                <div className="mt-2 p-2 bg-white border rounded-md shadow-md absolute w-2/3 z-10">
                                    {searchQuery.map((result, index) => (
                                        <div className="flex flex-row items-center">
                                            <div key={result.uuid} className="p-2 flex-grow rounded-md hover:bg-gray-100 truncate">
                                                {result.name} {result.surname} | {result.email}
                                            </div>
                                            <Button size="sm" color="amber" className="hover:bg-amber-600 aspect-square m-1" onClick={() => { addMember(result);setSearchQuery([]); }}>
                                                <IoMdAdd className="w-full h-full p-0"></IoMdAdd>
                                            </Button>
                                        </div>


                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="basis-1/2">
                            {memberList.length > 0 && (
                                <div className="w-full flex flex-col">
                                    <Typography className="self-center" variant="h6">Wybrani członkowie</Typography>
                                    <List>
                                        {memberList.map((member) => {
                                            return (
                                                <ListItem key={member.uuid}>
                                                    {member.name} {member.surname} | {member.email}
                                                    <ListItemSuffix>
                                                        <Button size="sm" color="red" className="hover:bg-red-600 aspect-square" onClick={()=>{removeMember(member)}}>
                                                            <MdDeleteForever  className="w-full h-full p-0"/>
                                                        </Button>
                                                    </ListItemSuffix>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </div>

                            )}
                        </div>
                    </div>



                </DialogBody>

                <DialogFooter className="flex flex-row space-x-3">
                    <Button onClick={handleMemberDialogClose} color="red">
                        Anuluj
                    </Button>
                    <Button
                        color="amber"
                        type="submit"
                        disabled={!memberList.length>0}
                    >
                        Dodaj członków
                    </Button>
                </DialogFooter>
                </form>
                
            </Dialog>
        </div>
    )
}