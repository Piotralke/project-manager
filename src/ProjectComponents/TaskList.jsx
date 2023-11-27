import Task from "./Task"

export default function TaskList({taskList}){
    return(
        <div className="overflow-y-auto flex flex-col max-h-full" >
            {taskList.map((t,index)=>{
                return(
                    <Task key={index} taskData={t}></Task>
                )
            })}
        </div>
    )
}