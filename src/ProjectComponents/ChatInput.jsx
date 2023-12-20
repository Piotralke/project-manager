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
  const { projectId } = useParams();
  const auth = useAuth()
  const handleChange = ({ target }) => setMessage(target.value);

  const handleAttachment = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setAttachments([...attachments, selectedFile]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault()
    // Wysyłanie wiadomości i załączników
    const user = await auth.getUser()
    console.log("Message:", message);
    console.log("Attachments:", attachments);

    const formData = new FormData();
    formData.append("content", message);
    formData.append("hasAttachment", attachments.length > 0 ? "true" : "false");
    formData.append("projectUuid", projectId);
    formData.append("senderUuid", user.uuid);
    attachments.forEach((file, index) => {
      formData.append("messageAttachments", file, file.name);
    });
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(formData)
    const response = await RequestHandler.post(
      `/api/chat/SendMessage`,
      auth.getToken(),
      formData,
      // {"Content-Type": "multipart/form-data",Authorization: `Bearer ${auth.getToken()}`}
    );
  };
  const isButtonDisabled = !message && attachments.length === 0;
  return (
    <form onSubmit={(e)=>{sendMessage(e)}} enctype="multipart/form-data">
      <div className="flex flex-row mt-auto w-full p-1 space-x-2">
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
        <Button color="amber" className="flex items-center justify-center" disabled={isButtonDisabled} type="submit">
          <IoSend></IoSend>
        </Button>
      </div>
    </form>

  );
}
