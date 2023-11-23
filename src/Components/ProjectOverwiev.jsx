import { useState } from "react";
import { AiOutlineSnippets } from "react-icons/ai";
import { Typography } from "@material-tailwind/react";

export default function ProjectOverview() {
  const [projectData, setProjectData] = useState({
    uuid: "123-321-123",
    title: "Project-Manager",
    description: "System do zarządzania projektami studenckimi",
    status: "STARTED",
    createdAt: "2023-10-26 15:16:40.942694+02",
    isPrivate: false,
  });

  const avatarUrl = "https://i.pravatar.cc/300";

  return (
    <div className="flex flex-row w-full h-full p-2">
      <section className="flex basis-1/2">
        <div className="flex flex-col">
          <div className="flex flex-row mb-2">
            <div className="flex flex-col">
              <Typography variant="h5">{projectData.title}</Typography>
              <Typography variant="small">{projectData.description}</Typography>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-cover bg-center rounded-full border-2 border-black -ml-2 relative z-10"
                  style={{
                    backgroundImage: `url(${avatarUrl})`,
                    transform: `translateX(${index * -6}px)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="flex basis-1/2"></section>
    </div>
  );
}
