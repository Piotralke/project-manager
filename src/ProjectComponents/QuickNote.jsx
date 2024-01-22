import { Button, Textarea, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RequestHandler from "../Miscs/RequestHandler";
import { useAuth } from "../auth";

export default function QuickNote() {

    const [noteData, setNoteData] = useState()
    const { projectId } = useParams();
    const auth = useAuth()
    const fetchNote = async () => {
        const user = await auth.getUser()
        
        const note = await RequestHandler.get(`/api/notes?projectId=${projectId}&userId=${user.uuid}`, auth.getToken())
        console.log(note)
        setNoteData(note.value);
    }
    useEffect(() => {
        fetchNote()
    }, [])

    const handleSaveNote = async () => {
        const user = await auth.getUser();
        const requestBody = {
            userUuid: user.uuid,
            projectUuid: projectId,
            value: noteData,
        };
        // Wysyłanie zapytania PUT do zaktualizowania notatki
        const response = await RequestHandler.put("/api/notes", requestBody, auth.getToken());
        location.reload()
    };

    return (
        <div className="p-3 w-full h-full flex flex-col">
            <Typography variant="h5" className="font-bold self-center">Szybka notatka</Typography>
            <Textarea color="amber" rows={4} className="w-full h-full max-h-full" value={noteData}
                onChange={(e) => setNoteData(e.target.value)} ></Textarea>
            <Button className="flex  ml-auto mt-auto" size="sm" color="amber" onClick={handleSaveNote}>Zapisz</Button>
        </div>
    )
}