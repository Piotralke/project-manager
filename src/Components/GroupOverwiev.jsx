import { Typography } from "@material-tailwind/react";

export default function GroupOverwiev({data}){
    return(
        <div className="w-full h-full p-2 flex flex-row space-x-3">
           <Typography variant="h5">{data.name}</Typography>
            <Typography>Wielkość grupy: {data.members.length}</Typography>
            <Typography>Przypisana do przedmiotów: 
            </Typography>
            {data.subjects.map(element => {
                
                    return(
                        <span>{element.subject.name}, 
                        </span>
                    )
                })}
        </div>
    )
}