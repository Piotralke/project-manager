import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { IoSend } from "react-icons/io5";
import { TiAttachment } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth";
import RequestHandler from "../Miscs/RequestHandler";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const {projectId} = useParams();
  const auth = useAuth()
  const handleChange = ({ target }) => setMessage(target.value);

  const handleAttachment = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setAttachments([...attachments, selectedFile]);
    }
  };

  const sendMessage = async ()  => {
    // Wysyłanie wiadomości i załączników
    const user = await auth.getUser()
    console.log("Message:", message);
    console.log("Attachments:", attachments);

    const data = {
      content: message,
      hasAttachment: attachments.length>0? true : false,
      projectUuid: projectId,
      senderUuid: user.uuid
    }
    const response = await RequestHandler.post(`/api/chat/SendMessage`,auth.getToken(),data);
    // Dodaj swoją logikę wysyłania wiadomości i załączników
  };
  const isButtonDisabled = !message && attachments.length === 0;
  return (
    <div className="flex flex-row w-full p-1 space-x-2">
      <label htmlFor="fileInput" className="cursor-pointer">
        <TiAttachment className="w-10 h-10"></TiAttachment>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleAttachment}
        />
      </label>
      <Input
        color="amber"
        label="Wpisz wiadomość"
        onChange={handleChange}
      ></Input>
      <Button color="amber" className="flex items-center justify-center" disabled={isButtonDisabled } onClick={sendMessage}>
        <IoSend></IoSend>
      </Button>
    </div>
  );
}
