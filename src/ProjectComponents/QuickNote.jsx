import { Button, Textarea, Typography } from "@material-tailwind/react";

export default function QuickNote () {
    return ( 
        <div className="p-3 w-full h-full flex flex-col">
            <Typography variant="h5" className="font-bold self-center">Szybka notatka</Typography>
            <Textarea color="amber" rows={4} className="w-full h-full max-h-full" ></Textarea>
            <Button className="flex  ml-auto mt-auto" size="sm" color="amber">Zapisz</Button>
        </div>
    )
}