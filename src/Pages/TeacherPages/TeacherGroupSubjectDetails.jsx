import { Fragment, useEffect, useState } from "react";
import { Typography, CardBody, Spinner, Avatar, Badge, Button, Popover, PopoverHandler, PopoverContent, CardHeader } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import ClockCard from "../../Components/ClockCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { BiBell } from "react-icons/bi";
import { FaArrowRight, FaEllipsisH } from "react-icons/fa";
import Calendar from "../../Components/YearlyCalendar";
import ProjectOverwiev from "../../Components/ProjectOverwiev";
import MainPageHeader from "../../Components/MainPageHeader";
import { useAuth } from "../../auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import RequestHandler from "../../Miscs/RequestHandler";
import { ProjectTable } from "./TeacherProposalsPage";
import ReactPaginate from "react-paginate";
import ProjectOverview from "../../Components/ProjectOverwiev";
export default function TeacherGroupSubjectDetails() {
    const auth = useAuth();
    const [user, setUser] = useState()
    const [projects, setProjects] = useState([])
    const [loading, isLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0);
    const { subjectId, groupId } = useParams()
    const projectsPerPage = 6;
    const pageCount = Math.ceil(projects.length / projectsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * projectsPerPage;
    const currentProjects = projects.slice(offset, offset + projectsPerPage);
    const fetchData = async () => {
        const response = await RequestHandler.get(`/api/projects/GetGroupSubjectProjects?GroupId=${groupId}&SubjectId=${subjectId}`, auth.getToken())
        setProjects(response)

        isLoading(false)
    }

    useEffect(() => {
        fetchData()
        console.log(subjectId)
    }, [])


    if (loading) {
        return (
            <div className=" w-full h-full flex justify-center items-center p-5 bg-gray-300 ">
                <Spinner color="amber" className="w-20 h-20"></Spinner>
            </div>
        )
    }

    return (
        <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            {currentProjects.map((project, index) => (
                <Card key={index} className="col-span-2 row-span-1">
                    <ProjectOverview projectUuid={project.uuid} isPinned={true}></ProjectOverview>
                </Card>
            ))}
            <ReactPaginate
                className='col-span-full row-span-1 row-end-7 flex flex-row justify-evenly'
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    )
}
