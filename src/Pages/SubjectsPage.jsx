import React, { useEffect, useState } from 'react';

import { Dialog, Button, Typography, List, ListItem, Card, DialogBody, ListItemSuffix, DialogHeader, DialogFooter, Input, Textarea, Checkbox } from '@material-tailwind/react';
import MainPageHeader from '../Components/MainPageHeader';
import { useAuth } from '../auth';
import RequestHandler from '../Miscs/RequestHandler';
import ReactPaginate from 'react-paginate';
import SubjectOverwiev from '../Components/SubjectOverwiev';

export default function SubjectsPage() {
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
        const response = await RequestHandler.get(`/api/subjects/get-student-subjects/${user.uuid}`, auth.getToken());
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
            {subjects.length > 0 ?
                <>
                    {currentsubjects.map((subject, index) => (
                        <Card key={index} >
                            <SubjectOverwiev data={subject}></SubjectOverwiev>

                            
                        </Card>
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
        </div>
    );
}
