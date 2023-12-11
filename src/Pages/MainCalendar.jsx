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
} from "@material-tailwind/react";
import MonthlyCalendar from "../Components/MonthlyCalendar";
import MainPageHeader from "../Components/MainPageHeader";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useAuth } from "../auth";
import RequestHandler from "../Miscs/RequestHandler";

export default function MainCalendar() {
  const [taskDialog, isTaskDialogOpen] = useState(false);
  const [eventDialog, isEventDialogOpen] = useState(false);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [userProjects, setUserProjects] = useState([]);
  const [startDate, setStartDate] = useState();
  const [projectMembers,setProjectMembers]= useState();
  const auth = useAuth();
  const handleTaskDialogClose = () => {
    isTaskDialogOpen(false);
  };
  const handleEventDialogClose = () => {
    isEventDialogOpen(false);
  };
  const handleTaskDialogOpen = () => {
    isTaskDialogOpen(true);
  };
  const handleEventDialogOpen = () => {
    isEventDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: desc,
      dueTo: startDate,
      startTime: null,
      type: 0,
      projectUuid: selectedProject
    }
    console.log(data)
    const response = await RequestHandler.post(`/api/projects/AddProjectEvent`,auth.getToken(),data)
    console.log(response);
    
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
  const fetchProjectMembers = async () =>{
    
    const members = await RequestHandler.get(`/api/projects/${selectedProject}/GetProjectMembers`,auth.getToken()) // tu są same id
    console.log(members)
  }
  useEffect(()=>{
    fetchProjectMembers()
  },[selectedProject])
  useEffect(() => {

    fetchData()
  }, []);
  
  const ExampleCustomTimeInput = ({ date, value, onChange }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-400 rounded-md"
    />
  );
  return (
    <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
      <MainPageHeader></MainPageHeader>
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
        <form onSubmit={handleSubmit}>
          <DialogHeader>Utwórz nowe zadanie</DialogHeader>
          <DialogBody>
            {/* Formularz do tworzenia projektu */}
            <div className="flex flex-col space-y-3">
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
              <Select color="amber" label="Do jakiego projektu przypisać zadanie?" onChange={(e)=>{setSelectedProject(e)}} >
                {userProjects?.map((project) => (
                  <Option key={project.uuid} value={project.uuid}>
                    {project.title}
                  </Option>
                ))}
              </Select>
              <Typography variant="h6">Do kiedy wykonać zadanie?</Typography>

              <ReactDatePicker
                className="p-2 border border-black rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                closeOnScroll={true}
           //     customTimeInput={<ExampleCustomTimeInput />}
              />

              {/* Pozostałe pola formularza (lista użytkowników, czy projekt jest prywatny) */}
            </div>
          </DialogBody>
          <DialogFooter className="flex flex-row space-x-3">
            <Button onClick={handleTaskDialogClose} color="red">
              Anuluj
            </Button>
            <Button
              color="amber"
              type="submit"
              disabled={!title || !desc || !selectedProject || !startDate}
            >
              Dodaj zadanie
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      <Dialog open={eventDialog}></Dialog>
    </div>
  );
}
