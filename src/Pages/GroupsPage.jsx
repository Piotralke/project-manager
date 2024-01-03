import React, { useEffect, useState } from 'react';

import {
    Button,
    Typography,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Select,
    Option,
    List,
    ListItem,
    ListItemSuffix,
    Checkbox,
  } from '@material-tailwind/react';
import MainPageHeader from '../Components/MainPageHeader';
import { useAuth } from '../auth';
import RequestHandler from '../Miscs/RequestHandler';
import ReactPaginate from 'react-paginate';
import GroupOverwiev from '../Components/GroupOverwiev';

export default function GroupsPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState();
    const [subjects, setSubjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleTitleChange = (value) => {
      setTitle(value);
    };

  
    const handleCreateProject = async () => {
      const u = await RequestHandler.get(`/api/users/students`, auth.getToken());
      setUsers(u);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      // Wyczyść dane po zamknięciu dialogu
      setTitle('');
      setSearchQuery('');
      setSelectedMembers([]);
    };
  
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0); // Zresetuj stronę przy zmianie wyszukiwania
      };
    const checkItem = (value) => {
      const isSelected = selectedMembers.includes(value);
      if (isSelected) {
        setSelectedMembers((prevSelected) =>
          prevSelected.filter((id) => id !== value)
        );
      } else {
        setSelectedMembers((prevSelected) => [...prevSelected, value]);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        name: title,
        members: selectedMembers
      }
    const response = await RequestHandler.post(`/api/groups/create-group`,auth.getToken(),data)
      handleCloseDialog();
    };


  const auth = useAuth();

  const fetchGroups = async () => {
    const user = await auth.getUser();
    const response = await RequestHandler.get(`/api/groups/get-teacher-groups/${user.uuid}`, auth.getToken());
    console.log(response);
    setSubjects(response);
  };

  useEffect(() => {
    fetchGroups().catch(console.error);
  }, []);

  const subjectsPerPage = 6;
  const pageCount = Math.ceil(subjects.length / subjectsPerPage);
  const filteredUsers = users.filter((user) =>
  `${user.name} ${user.surname}`.toLowerCase().includes(searchQuery.toLowerCase())
);

const offset = currentPage * 5; // Zakładam, że chcesz wyświetlać 5 użytkowników na stronie
const currentUsers = filteredUsers.slice(offset, offset + 5); // Dostosuj do swoich potrzeb
  return (
    <div className="grid w-full h-full grid-cols-1 lg:grid-cols-4 gap-5 p-5 bg-gray-300 lg:grid-rows-8 grid-rows">
      <MainPageHeader></MainPageHeader>
      <div className="col-span-full">
        <Button color="amber" onClick={handleCreateProject}>
          Utwórz nową grupę
        </Button>
      </div>
      {subjects.length>0?
      <>
      {subjects.map((group, index) => (
      <Card key={index} className="col-span-2 row-span-1">
        <GroupOverwiev data={group}></GroupOverwiev>
      </Card>
    ))}
    {subjects.length>6? <ReactPaginate
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
      <Typography variant="h5" className="self-center col-span-full flex items-center justify-center">Brak przypisanych grup</Typography>
      }
      {/* Dialog do utworzenia nowego projektu */}
      <Dialog open={openDialog} onClose={handleCloseDialog} size="md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>Dodaj grupę</DialogHeader>
          <DialogBody>
            {/* Formularz do tworzenia grupy */}
            <div className="flex flex-col space-y-3">
              <Input
                label="Nazwa"
                variant="outlined"
                margin="normal"
                color="amber"
                fullWidth
                onChange={(e) => handleTitleChange(e.target.value)}
              />

              {/* ... Dodaj inne pola formularza ... */}

              <Typography variant="h6">Członkowie grupy</Typography>
              <Input
                color="amber"
                label="Wyszukaj użytkownika:"
                onChange={handleSearchQueryChange}
              />
              <Card>
                <List>
                  {currentUsers.map((user) => (
                    <ListItem
                      key={user.uuid}
                      value={user.uuid}
                      onClick={() => checkItem(user.uuid)}
                      className={
                        selectedMembers.includes(user.uuid)
                          ? 'font-bold p-1'
                          : 'p-1'
                      }
                    >
                      {user.name + ' ' + user.surname}
                      <ListItemSuffix>
                        <Checkbox
                          color="amber"
                          checked={selectedMembers.includes(user.uuid)}
                        />
                      </ListItemSuffix>
                    </ListItem>
                  ))}
                </List>
              </Card>
              <div className="flex flex-row">
                {users.length > 0 && (
                  <ReactPaginate
                    className="flex flex-row justify-evenly w-full"
                    previousLabel={'poprzednia'}
                    nextLabel={'następna'}
                    breakLabel={''}
                    pageCount={Math.ceil(users.length / 5)} // Dostosuj liczbę użytkowników na stronę
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  />
                )}
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="flex flex-row space-x-3">
            <Button onClick={handleCloseDialog} color="red">
              Anuluj
            </Button>
            <Button color="amber" type="submit" disabled={!title || !selectedMembers.length>0}>
              Utwórz Grupę
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
