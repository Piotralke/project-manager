import { Button, 
  Dialog, 
  DialogBody, 
  DialogFooter, 
  DialogHeader, 
  Radio, 
  Input, 
  Textarea, 
  Option, 
  Typography, 
  Checkbox, 
  Select, 
  Spinner,
  Card,
List, ListItem, ListItemSuffix } from "@material-tailwind/react";
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from "react";
import ProjectHeader from "../../Components/ProjectHeader";
import ReactDatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth";
import RequestHandler from "../../Miscs/RequestHandler";
import ReactPaginate from "react-paginate";
export default function ProjectGanntPage() {
  const [type, setType] = useState("Day")
  const [dialog, openDialog] = useState(false);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [startDate, setStartDate] = useState();
  const [end, setEndDate] = useState();
  const { projectId } = useParams()
  const [projectTasks, setProjectTasks] = useState([])
  const [selectedType, setSelectedType] = useState();
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTasks,setSelectedTasks] = useState([])
  const auth = useAuth()
  const ITEMS_PER_PAGE = 3;

  const handleTaskSelection = (taskId) => {
    const isSelected = selectedTasks.includes(taskId);
    if(isSelected){
      setSelectedTasks((prev)=>prev.filter((id)=>id!==taskId))
    }
    else{
      setSelectedTasks((prev)=>[...prev,taskId])
    }
  };

  const handleCheckboxChange = (taskId) => {
    handleTaskSelection(taskId);
  };
  const handleDialogClose = () => {
    openDialog(false);
    resetForm();
  };
  const handlekDialogOpen = () => {
    openDialog(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: desc,
      startDate: startDate,
      endDate: end,
      projectUuid: projectId,
      type: selectedType,
      previousTasksGuids: selectedTasks
    }
    const response = await RequestHandler.post(`/api/projects/AddGanttTask`, auth.getToken(), data)
    location.reload()
  }
  const handleTitleChange = (value) => {
    setTitle(value);
  };
  const handleDescriptionChange = (value) => {
    setDesc(value);
  };
  const fetchData = async () => {
    const response = await RequestHandler.get(`/api/projects/GetProjectGanttTasks/${projectId}`, auth.getToken())
    console.log(response)
    const tasksWithProgress = response.map(task => ({
      ...task,
      start: new Date(task.start),
      end: new Date(task.end),
      progress: 100, // Default progress value
    }));
    setProjectTasks(tasksWithProgress)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  function Tooltip({ task }) {
    return (
      <div>
        {task.description}
      </div>
    )
  }
  if (loading) {
    return (
      <Spinner></Spinner>
    )
  }
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageTasks = projectTasks.slice(offset, offset + ITEMS_PER_PAGE);
  return (
    <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
      <ProjectHeader></ProjectHeader>

      <section className="col-span-full row-span-1 flex flex-row space-x-3 items-center">
        <Button color="amber" onClick={handlekDialogOpen}>Dodaj zadanie gantt'a</Button>
        <Typography>Wariant wykresu gantt'a:</Typography>
        <Radio name="type" color="amber" defaultChecked label="Dniowy" onChange={() => setType("Day")}></Radio>
        <Radio name="type" color="amber" label="Tygodniowy" onChange={() => setType("Week")}></Radio>
        <Radio name="type" color="amber" label="Miesęczny" onChange={() => setType("Month")}></Radio>
      </section>
      <div className="col-span-full row-span-6 w-full h-full">
        <Gantt  barProgressColor="#FFC107" barProgressSelectedColor="#FFC107" columnWidth={200} ganttHeight={500} listCellWidth={""} TooltipContent={Tooltip} className="w-full h-full" tasks={projectTasks} viewMode={type}></Gantt>
      </div>
      <Dialog open={dialog}>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <DialogHeader>
            <Typography>Dodaj zadanie gantt'a!</Typography>
          </DialogHeader>
          <DialogBody>
            <div className="flex flex-row space-x-2 w-full">
              <div className="flex flex-row">
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
                  <Select label="Wybierz typ" color="amber" onChange={(e) => { setSelectedType(e) }} >
                    <Option key="task" value="task">Zadanie</Option>
                    <Option key="milestone" value="milestone">Kamień milowy</Option>
                  </Select>

                  <div className="flex flex-row place-content-evenly">
                    <div className="flex flex-col">

                      <Typography variant="h6">Data {selectedType == "milestone" ? "" : "rozpoczęcia"}</Typography>
                      <ReactDatePicker
                        className="p-2 border border-black rounded-md"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        closeOnScroll={true}
                      />
                    </div>
                    <div className="flex flex-col">

                      <Typography variant="h6" className={`${selectedType == "milestone" ? "text-gray-400 cursor-default" : null}`} >Data zakończenia</Typography>
                      <ReactDatePicker
                        disabled={selectedType == "milestone"}
                        className="p-2 border border-black rounded-md"
                        selected={end}
                        onChange={(date) => setEndDate(date)}
                        closeOnScroll={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center flex-grow">
                <Typography>Poprzedzające zadania/e</Typography>
                <Card>
                  <List>
                    {currentPageTasks.map((task) => (
                      <ListItem
                        key={task.id}
                        value={task.id}
                        onClick={() => handleTaskSelection(task.id)}
                        className={
                          // Add styling for selected tasks
                          // You can conditionally apply styles based on task selection
                          task.isSelected ? "font-bold p-1" : "p-1"
                        }
                      >
                        {task.name}
                        <ListItemSuffix>
                          <Checkbox
                            color="amber"
                            checked={task.isSelected}
                            onChange={() => handleCheckboxChange(task.id)}
                          ></Checkbox>
                        </ListItemSuffix>
                      </ListItem>
                    ))}
                  </List>
                </Card>
                <div className="flex flex-row">
                  {projectTasks.length > ITEMS_PER_PAGE && (
                    <ReactPaginate
                      className="flex flex-row justify-evenly w-full"
                      previousLabel={"poprzednia"}
                      nextLabel={"następna"}
                      breakLabel={""}
                      pageCount={Math.ceil(projectTasks.length / ITEMS_PER_PAGE)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={handlePageChange}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  )}
                </div>

              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={handleDialogClose} color="red">
              Anuluj
            </Button>
            <Button
              color="amber"
              type="submit"

            >
              Dodaj zadanie
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  )
}