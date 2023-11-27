import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { IoSend } from "react-icons/io5";
import { TiAttachment } from "react-icons/ti";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleChange = ({ target }) => setMessage(target.value);

  const handleAttachment = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setAttachments([...attachments, selectedFile]);
    }
  };

  const sendMessage = () => {
    // Wysyłanie wiadomości i załączników
    console.log("Message:", message);
    console.log("Attachments:", attachments);
    // Dodaj swoją logikę wysyłania wiadomości i załączników
  };
  const isButtonDisabled = !message && attachments.length === 0;
  return (
    <div className="flex flex-row w-full m-1 space-x-2 p-1">
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
      <Button color="amber" disabled={isButtonDisabled } onClick={sendMessage}>
        <IoSend></IoSend>
      </Button>
      
    </div>
  );
}
