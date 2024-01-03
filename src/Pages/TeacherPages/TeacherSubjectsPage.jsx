import React, { useEffect, useState } from 'react';
import { BsStack } from 'react-icons/bs';
import ProjectOverview from '../../Components/ProjectOverwiev';
import { Dialog, Button, Typography, List, ListItem, Card, DialogBody, ListItemSuffix, DialogHeader, DialogFooter, Input, Textarea, Checkbox } from '@material-tailwind/react';
import MainPageHeader from '../../Components/MainPageHeader';
import { useAuth } from '../../auth';
import RequestHandler from '../../Miscs/RequestHandler';
import ReactPaginate from 'react-paginate';
import SubjectOverwiev from '../../Components/SubjectOverwiev';

export default function TeacherSubjectPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [subjects, setSubjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [groups, setGroups] = useState([])

    const auth = useAuth();

    const handleTitleChange = (value) => {
        setTitle(value);
    };
    const handlePageClickGroups = ({ selected }) => {
        setCurrentPage(selected);
    };
    const handleDescriptionChange = (value) => {
        setDesc(value);
    };
    const [selectedGroups, setSelectedGroups] = useState([]);

    const handleSelectGroup = (groupId) => {
        const isSelected = selectedGroups.includes(groupId);
        if (isSelected) {
            setSelectedGroups((prevSelected) =>
                prevSelected.filter((id) => id !== groupId)
            );
        } else {
            setSelectedGroups((prevSelected) => [...prevSelected, groupId]);
        }
    };
    const handleCreateProject = async () => {
        const response = await RequestHandler.get(`/api/groups/get-all`, auth.getToken())
        console.log(response)
        setGroups(response);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSearchQuery('')
        setTitle("");
        setDesc("")
        setOpenDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await auth.getUser()
        console.log(user)
        const payload = {
            Name: title,
            TeacherUuid: user.uuid,
            Requirements: desc,
            GroupUuids: selectedGroups
        };
        console.log(payload)
        const response = await RequestHandler.post('/api/subjects', auth.getToken(), payload);
        console.log(response);
        fetchsubjects();
        handleCloseDialog();
    };
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredGroups = groups.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const groupsPerPage = 6;
    const pageCountGroups = Math.ceil(groups.length / groupsPerPage);

    const offsetGroups = currentPage * groupsPerPage;
    const currentGroups = groups.slice(offsetGroups, offsetGroups + groupsPerPage);

    const fetchsubjects = async () => {
        const user = await auth.getUser();
        const response = await RequestHandler.get(`/api/subjects/get-teacher-subjects/${user.uuid}`, auth.getToken());
        console.log(response);
        setSubjects(response);
    };

    useEffect(() => {
        fetchsubjects().catch(console.error);
    }, []);

    const subjectsPerPage = 6;
    const pageCount = Math.ceil(subjects.length / subjectsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * subjectsPerPage;
    const currentsubjects = subjects.slice(offset, offset + subjectsPerPage);

    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-4 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows">
            <MainPageHeader></MainPageHeader>
            <div className="col-span-full row-span-1">
                <Button color="amber" onClick={handleCreateProject}>
                    Dodaj nowe zajęcia
                </Button>
            </div>
            {subjects.length > 0 ?
                <>
                    {currentsubjects.map((subject, index) => (
                        <>
                        <Card className='col-span-2 row-span-1' key={index} >
                            <SubjectOverwiev data={subject}></SubjectOverwiev>
                        </Card>
                        </>                    
                    ))}
                    {subjects.length > 6 ? <ReactPaginate
                        className='col-span-full row-span-1 row-start-7  flex flex-row justify-evenly'
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    /> : null}
                </>
                :
                <Typography variant="h5" className="self-center col-span-full flex items-center justify-center">Brak przypisanych przedmiotów</Typography>
            }
            {/* Dialog do utworzenia nowego projektu */}
            <Dialog open={openDialog} onClose={handleCloseDialog} size="md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>Dodaj zajęcia</DialogHeader>
                    <DialogBody>
                        {/* Formularz do tworzenia projektu */}
                        <div className="flex flex-col space-y-3">
                            <Input label="Nazwa przedmiotu projektowego" variant="outlined" margin="normal" color="amber" fullWidth onChange={(e) => handleTitleChange(e.target.value)} />
                            <Textarea
                                label="Wymagania projektowe"
                                color="amber"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={4}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                            />
                            <div className="col-span-full">
                                <Input
                                    label="Wyszukaj grupę"
                                    variant="outlined"
                                    margin="normal"
                                    color="amber"
                                    fullWidth
                                    onChange={handleSearchQueryChange}
                                />
                            </div>
                            <Typography variant="h6">Jakiej grupie dodać zajęcia?</Typography>

                            <Card>
                                <List>
                                    {filteredGroups.map((group) => (
                                        <ListItem
                                            key={group.uuid}
                                            value={group.uuid}
                                            onClick={() => handleSelectGroup(group.uuid)}
                                            className={
                                                selectedGroups.includes(group.uuid)
                                                    ? 'font-bold p-1'
                                                    : 'p-1'
                                            }
                                        >
                                            {group.name}
                                            <ListItemSuffix>
                                                <Checkbox
                                                    color="amber"
                                                    checked={selectedGroups.includes(group.uuid)}
                                                />
                                            </ListItemSuffix>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                            <div className="flex flex-row">
                                {groups.length > 6 && (
                                    <ReactPaginate
                                        className="flex flex-row justify-evenly w-full"
                                        previousLabel={'poprzednia'}
                                        nextLabel={'następna'}
                                        breakLabel={''}
                                        pageCount={pageCountGroups}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClickGroups}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />
                                )}
                            </div>
                            {/* Pozostałe pola formularza (lista użytkowników, czy projekt jest prywatny) */}
                        </div>
                    </DialogBody>
                    <DialogFooter className="flex flex-row space-x-3">
                        <Button onClick={handleCloseDialog} color="red">
                            Anuluj
                        </Button>
                        <Button color="amber" type="submit" disabled={!title || !desc}>
                            Utwórz projekt
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </div>
    );
}
