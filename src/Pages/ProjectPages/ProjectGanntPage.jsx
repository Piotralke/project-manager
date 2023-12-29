import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Radio,Input,Textarea,Option, Typography, Checkbox, Select } from "@material-tailwind/react";
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useState } from "react";
import ProjectHeader from "../../Components/ProjectHeader";
import ReactDatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
export default function ProjectGanntPage() {
  const [type, setType] = useState("Day")
  const [dialog, openDialog] = useState(false);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [startDate, setStartDate] = useState();
  const [end, setEndDate] = useState();
  const {projectId} = useParams()
  const [projectTasks,setProjectTasks] = useState([])
  const [selectedType,setSelectedType] = useState();
  const handleDialogClose = () => {
    openDialog(false);
    resetForm();
  };
  const handlekDialogOpen = () => {
    openDialog(true);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();

  }
  const handleTitleChange = (value) => {
    setTitle(value);
  };
  const handleDescriptionChange = (value) => {
    setDesc(value);
  };
 
  const sampleTasks = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type: 'task',
      progress: 100,
      description: 'chuj dupa',
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      dependencies: [], // Zadanie 0 poprzedza Zadanie 1
    },
    {
      start: new Date(2020, 1, 3),
      end: new Date(2020, 1, 4),
      name: 'Task 1',
      id: 'Task 1',
      type: 'task',
      progress: 100,
      description: 'chuj dupa',
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      dependencies: ["Task 0"], // Zadanie 1 nie ma poprzedników
    },


    // Dodaj inne zadania w podobny sposób
  ];

  function Tooltip({ task }) {
    return (
      <div>
        {task.description}
      </div>
    )
  }
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
        <Gantt columnWidth={200} ganttHeight={500} listCellWidth={""} TooltipContent={Tooltip} className="w-full h-full" tasks={sampleTasks} viewMode={type}></Gantt>
      </div>
      <Dialog open={dialog}>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
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
                <Select label="Wybierz typ" color="amber" onChange={(e) =>  {setSelectedType(e)}} >
                  <Option key="task" value="task">Zadanie</Option>
                  <Option key="milestone" value="milestone">Kamień milowy</Option>
                </Select>
                
                <div className="flex flex-row place-content-evenly">
                <div className="flex flex-col">
                
                <Typography variant="h6">Data {selectedType=="milestone"? "" :"rozpoczęcia"}</Typography>
                <ReactDatePicker
                  className="p-2 border border-black rounded-md"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  closeOnScroll={true}
                />
                </div>
                <div className="flex flex-col">
            
                <Typography variant="h6" className={`${selectedType=="milestone" ?"text-gray-400 cursor-default" : null}`} >Data zakończenia</Typography>
                <ReactDatePicker
                disabled = {selectedType=="milestone"}
                  className="p-2 border border-black rounded-md"
                  selected={end}
                  onChange={(date) => setEndDate(date)}
                  closeOnScroll={true}
                />
                </div>
                </div>
              </div>
            </div>
              <div className="flex flex-col">
                <Checkbox color="amber" label="Zawiera poprzedzające zadanie?"></Checkbox>
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