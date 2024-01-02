import React, { useEffect, useState } from 'react';
import { BsStack } from 'react-icons/bs';
import ProjectOverview from '../Components/ProjectOverwiev';
import { Dialog, Button, Typography, Card, DialogBody, DialogHeader, DialogFooter, Input, Textarea, Checkbox } from '@material-tailwind/react';
import MainPageHeader from '../Components/MainPageHeader';
import { useAuth } from '../auth';
import RequestHandler from '../Miscs/RequestHandler';
import ReactPaginate from 'react-paginate';

export default function Projects() {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const auth = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await auth.getUser();
    const payload = {
      title: title,
      description: desc,
      ownerUuid: user.uuid,
      members: [],
      isPrivate: true,
    };
    const response = await RequestHandler.post('/api/projects', auth.getToken(), payload);
    console.log(response);
    fetchProjects();
    handleCloseDialog();
  };

  const fetchProjects = async () => {
    const user = await auth.getUser();
    const response = await RequestHandler.get(`/api/projects/get-for-user/${user.uuid}`, auth.getToken());
    console.log(response);
    setProjects(response);
  };

  useEffect(() => {
    fetchProjects().catch(console.error);
  }, []);

  const projectsPerPage = 6;
  const pageCount = Math.ceil(projects.length / projectsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * projectsPerPage;
  const currentProjects = projects.slice(offset, offset + projectsPerPage);

  return (
    <div className="grid w-full h-full grid-cols-1 lg:grid-cols-4 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows">
      <MainPageHeader></MainPageHeader>
      <div className="col-span-full">
        <Button color="amber" onClick={handleCreateProject}>
          Utwórz nowy projekt
        </Button>
      </div>
      {currentProjects.map((project, index) => (
        <Card key={index} className="col-span-2 row-span-1">
          <ProjectOverview projectUuid={project.uuid}></ProjectOverview>
        </Card>
      ))}
      <ReactPaginate
      className='col-span-full row-span-1 row-end-7 flex flex-row justify-evenly'
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
      />

      {/* Dialog do utworzenia nowego projektu */}
      <Dialog open={openDialog} onClose={handleCloseDialog} size="md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>Utwórz nowy projekt</DialogHeader>
          <DialogBody>
            {/* Formularz do tworzenia projektu */}
            <div className="flex flex-col space-y-3">
              <Input label="Tytuł" variant="outlined" margin="normal" color="amber" fullWidth onChange={(e) => handleTitleChange(e.target.value)} />
              <Textarea
                label="Opis"
                color="amber"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                onChange={(e) => handleDescriptionChange(e.target.value)}
              />
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
