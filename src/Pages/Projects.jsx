import React, { useEffect, useState } from 'react';
import { BsStack } from "react-icons/bs";
import ProjectOverview from "../Components/ProjectOverwiev";
import { Dialog, Button, Typography, Card, DialogBody, DialogHeader, DialogFooter, Input, Textarea, Checkbox } from "@material-tailwind/react";
import MainPageHeader from "../Components/MainPageHeader";
import { useAuth } from '../auth';
import RequestHandler from '../Miscs/RequestHandler';

export default function Projects() {
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [isPrivate, setIsPrivate] = useState(false);
    const [projects, setProjects] = useState();
    
    const auth = useAuth()

    

    const handleTitleChange = (value) => {
        setTitle(value);
    };
    const handleDescriptionChange = (value) => {
        setDesc(value);
    };
    const handleCreateProject = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleCheckboxChange = (checked) => {
        setIsPrivate(checked);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await auth.getUser()
        const payload = {
            title: title,
            description: desc,
            ownerUuid: user.uuid,
            members: [],    //dorobienie listy członków
            isPrivate: isPrivate
        }
        const response = await RequestHandler.post("/api/projects", auth.getToken(), payload)
        console.log(response)
    }

    const fetchProjects = async () => {
        const user = await auth.getUser()
        const response = await RequestHandler.get(`/api/projects/get-for-user/${user.uuid}`, auth.getToken())
        console.log(response)
        setProjects(response);
    }
    useEffect(() => {
        fetchProjects().catch(console.error)
    }, [])


    return (
        <div className="grid w-full h-full grid-cols-1 lg:grid-cols-4 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <div className="col-span-full">
                <Button color="amber" onClick={handleCreateProject}>Utwórz nowy projekt</Button>
            </div>
            {projects?.map((project, index) => {
                return (
                    <Card key={index} className="col-span-2 row-span-2">
                        <ProjectOverview projectUuid={project.uuid}></ProjectOverview>
                    </Card>
                )
            })}
            {/* Dialog do utworzenia nowego projektu */}
            <Dialog open={openDialog} onClose={handleCloseDialog} size="md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>Utwórz nowy projekt</DialogHeader>
                    <DialogBody>
                        {/* Formularz do tworzenia projektu */}
                        <div className='flex flex-col space-y-3'>
                            <Input
                                label="Tytuł"
                                variant="outlined"
                                margin="normal"
                                color='amber'
                                fullWidth
                                onChange={(e) => handleTitleChange(e.target.value)}
                            />
                            <Textarea
                                label="Opis"
                                color='amber'
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={4}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                            />

                            <Checkbox color='amber' label="Projekt prywatny" checked={isPrivate}
                                onChange={(e) => handleCheckboxChange(e.target.checked)}>
                            </Checkbox>
                            {/* Pozostałe pola formularza (lista użytkowników, czy projekt jest prywatny) */}
                        </div>
                    </DialogBody>
                    <DialogFooter className='flex flex-row space-x-3'>
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
