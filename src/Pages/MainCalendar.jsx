import {
  Button,
  Typography,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
  Input,
  Select,
  Option,
  List,
  ListItem,
  ListItemSuffix,
  Checkbox,
} from "@material-tailwind/react";
import MonthlyCalendar from "../Components/MonthlyCalendar";
import MainPageHeader from "../Components/MainPageHeader";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useAuth } from "../auth";
import RequestHandler from "../Miscs/RequestHandler";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import ProjectHeader from "../Components/ProjectHeader";
export default function MainCalendar() {
  const { projectId } = useParams()
  const [taskDialog, isTaskDialogOpen] = useState(false);
  const [eventDialog, isEventDialogOpen] = useState(false);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [userProjects, setUserProjects] = useState([]);
  const [startDate, setStartDate] = useState();
  const [projectMembers, setProjectMembers] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [endDate, setEndDate] = useState();
  const [selectedMembers, setSelectedMembers] = useState([])
  const auth = useAuth();
  const ITEMS_PER_PAGE = 3;

  const handleTaskDialogClose = () => {
    isTaskDialogOpen(false);
    resetForm();
  };
  const handleEventDialogClose = () => {
    isEventDialogOpen(false);
    resetForm();
  };
  const handleTaskDialogOpen = () => {
    isTaskDialogOpen(true);
  };
  const handleEventDialogOpen = () => {
    isEventDialogOpen(true);
  };
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const data = {
      title: title,
      description: desc,
      dueTo: type === 0 ? startDate : endDate,
      startTime: type === 0 ? null : startDate,
      type: type,
      projectUuid: selectedProject,
      members: selectedMembers
    }
    console.log(data)
    const response = await RequestHandler.post(`/api/projects/AddProjectEvent`, auth.getToken(), data)
    console.log(response);
    location.reload()

  };
  const handleTitleChange = (value) => {
    setTitle(value);
  };
  const handleDescriptionChange = (value) => {
    setDesc(value);
  };
  const fetchData = async () => {
    const user = await auth.getUser();
    const projects = await RequestHandler.get(
      `/api/projects/get-for-user/${user.uuid}`,
      auth.getToken()
    );
    setUserProjects(projects);
  };
  const fetchProjectMembers = async () => {

    const members = await RequestHandler.get(`/api/projects/${selectedProject}/GetProjectMembers`, auth.getToken()) // tu są same id
    setProjectMembers(members);
    console.log(members)
  }
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const resetForm = () => {
    setTitle("");
    setDesc("");
    if (!projectId)
      setSelectedProject(null);
    setStartDate(null);
    setEndDate(null);
    setProjectMembers([]);
    setCurrentPage(0);
    setSearchQuery("");
    setSelectedMembers([]);
  };
  useEffect(() => {
    fetchProjectMembers();
  }, [currentPage, searchQuery]);
  useEffect(() => {
    if (selectedProject) {

      fetchProjectMembers()
    }
  }, [selectedProject])
  useEffect(() => {
    setSelectedProject(projectId)
    fetchData()
  }, []);
  const filteredMembers = projectMembers?.filter((member) =>
    `${member.name} ${member.surname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageMembers = filteredMembers?.slice(offset, offset + ITEMS_PER_PAGE);
  return (
    <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
      {projectId ? <ProjectHeader></ProjectHeader> : <MainPageHeader></MainPageHeader>}
      <div className="flex flex-row space-x-4">
        <Button
          color="amber"
          className=" min-w-fit"
          onClick={handleTaskDialogOpen}
        >
          Dodaj nowe zadanie
        </Button>
        <Button
          color="amber"
          className=" min-w-fit"
          onClick={handleEventDialogOpen}
        >
          Dodaj nowe wydarzenie
        </Button>
      </div>
      <div className="col-span-full row-span-7">
        <Card>
          <MonthlyCalendar></MonthlyCalendar>
        </Card>
      </div>
      <Dialog open={taskDialog}>
        <form onSubmit={(e) => { handleSubmit(e, 0) }}>
          <DialogHeader>Utwórz nowe zadanie</DialogHeader>
          <DialogBody>
            {/* Formularz do tworzenia projektu */}
            <div className="flex flex-row space-x-2 w-full">
              <div className="flex flex-col flex-grow space-y-3">
                <Input
                  label="Tytuł"
                  variant="outlined"
                  margin="normal"
                  color="amber"
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
                <Textarea
                  label="Opis"
                  color="amber"
                  variant="outlined"
                  margin="normal"
                  rows={4}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                />
                {
                  projectId ? null : <Select color="amber" label="Do jakiego projektu przypisać zadanie?" onChange={(e) => { setSelectedProject(e) }} >
                    {userProjects?.map((project) => (
                      <Option key={project.uuid} value={project.uuid}>
                        {project.title}
                      </Option>
                    ))}
                  </Select>
                }


                <Typography variant="h6">Do kiedy wykonać zadanie?</Typography>
                <ReactDatePicker
                  className="p-2 border border-black rounded-md"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  closeOnScroll={true}
                //     customTimeInput={<ExampleCustomTimeInput />}
                />
              </div>
              <div>
                {projectMembers?.length > 0 ?
                  <>
                    <Typography variant="h6">Do kogo przypisać zadanie?</Typography>
                    <Input
                      color="amber"
                      label="Wyszukaj członka:"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Card >
                      <List>
                        {currentPageMembers.map((member) => (
                          <ListItem key={member.uuid} value={member.uuid} onClick={() => { checkItem(member.uuid) }} className={
                            selectedMembers.includes(member.uuid)
                              ? "font-bold p-1"
                              : "p-1"
                          }>
                            {member.name + " " + member.surname}
                            <ListItemSuffix>
                              <Checkbox color="amber" checked={selectedMembers.includes(member.uuid)}></Checkbox>
                            </ListItemSuffix>
                          </ListItem>
                        ))}
                      </List>
                    </Card>
                    <div className="flex flex-row">
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

                  </>
                  : null}
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="flex flex-row space-x-3">
            <Button onClick={handleTaskDialogClose} color="red">
              Anuluj
            </Button>
            <Button
              color="amber"
              type="submit"
              disabled={!title || !desc || !selectedProject || !startDate || !selectedMembers.length > 0}
            >
              Dodaj zadanie
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      <Dialog open={eventDialog}>
        <form onSubmit={(e) => { handleSubmit(e, 1) }}>
          <DialogHeader>Utwórz nowe wydarzenie</DialogHeader>
          <DialogBody>
            {/* Formularz do tworzenia projektu */}
            <div className="flex flex-row space-x-2 w-full">
              <div className="flex flex-col flex-grow space-y-3">
                <Input
                  label="Tytuł"
                  variant="outlined"
                  margin="normal"
                  color="amber"
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
                <Textarea
                  label="Opis"
                  color="amber"
                  variant="outlined"
                  margin="normal"
                  rows={4}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                />
                {projectId ? null : <Select color="amber" label="Do jakiego projektu przypisać zadanie?" onChange={(e) => { setSelectedProject(e) }} >
                  {userProjects?.map((project) => (
                    <Option key={project.uuid} value={project.uuid}>
                      {project.title}
                    </Option>
                  ))}
                </Select>}

                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col">
                    <Typography variant="h6">Kiedy ma zacząć sie wydarzenie?</Typography>
                    <ReactDatePicker
                      className="p-2 border border-black rounded-md"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      closeOnScroll={true}
                    //     customTimeInput={<ExampleCustomTimeInput />}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6">Do kiedy potrwa wydarzenie?</Typography>
                    <ReactDatePicker
                      className="p-2 border border-black rounded-md"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      closeOnScroll={true}
                    //     customTimeInput={<ExampleCustomTimeInput />}
                    />
                  </div>
                </div >


              </div>
              <div>
                {projectMembers?.length > 0 ?
                  <>
                    <Typography variant="h6">Kto ma uczestniczyć w wydarzeniu?</Typography>
                    <Input
                      color="amber"
                      label="Wyszukaj członka:"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Card >
                      <List>
                        {currentPageMembers.map((member) => (
                          <ListItem key={member.uuid} value={member.uuid} onClick={() => { checkItem(member.uuid) }} className={
                            selectedMembers.includes(member.uuid)
                              ? "font-bold p-1"
                              : "p-1"
                          }>
                            {member.name + " " + member.surname}
                            <ListItemSuffix>
                              <Checkbox color="amber" checked={selectedMembers.includes(member.uuid)}></Checkbox>
                            </ListItemSuffix>
                          </ListItem>
                        ))}
                      </List>
                    </Card>
                    <div className="flex flex-row">
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

                  </>
                  : null}
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="flex flex-row space-x-3">
            <Button onClick={handleEventDialogClose} color="red">
              Anuluj
            </Button>
            <Button
              color="amber"
              type="submit"
              disabled={!title || !desc || !selectedProject || !startDate || !selectedMembers.length > 0 || !endDate}
            >
              Dodaj wydarzenie
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
