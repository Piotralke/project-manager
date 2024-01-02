import React, { useState } from "react";
import ReactPaginate from "react-paginate";


import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import MainPageHeader from "../../Components/MainPageHeader";
import { FaEye } from "react-icons/fa";
const ITEMS_PER_PAGE = 6; // Ustal liczbę elementów na stronie

export function ProjectTable({ data }) {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = data.slice(offset, offset + ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col justify-items-end" >
            <Card className="">
                <table className="w-full  table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map(({ title, description, createdDate, editedDate, teamMembers, group, subject, status }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={title}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {title}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {description}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {createdDate}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {editedDate}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {teamMembers}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {group}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {subject}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {status}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Button color="amber" className=" aspect-square"><FaEye></FaEye></Button>


                                    </td>
                                </tr>
                            );

                        })}
                    </tbody>
                </table>

            </Card>
            {data.length > ITEMS_PER_PAGE && (
                <div className="flex flex-grow w-full h-full">
                    <ReactPaginate
                        className="flex flex-row w-full justify-evenly "
                        previousLabel={"poprzednia"}
                        nextLabel={"następna"}
                        breakLabel={""}
                        pageCount={Math.ceil(data.length / ITEMS_PER_PAGE)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </div>



            )}
        </div>


    );
}


const TABLE_HEAD = ["Tytuł projektu", "Opis projektu", "Data utworzenia", "Data edycji", "Skład zespołu", "Grupa", "Przedmiot", "Status", "Szczegóły"];

const TABLE_ROWS = [
    {
        title: "Projekt A",
        description: "Opis projektu A",
        createdDate: "01/01/2022",
        editedDate: "05/02/2022",
        teamMembers: "Imię Nazwisko, Imię Nazwisko",
        group: "Grupa 1",
        subject: "Przedmiot XYZ",
        status: "W trakcie",
    },
    {
        title: "Projekt A",
        description: "Opis projektu A",
        createdDate: "01/01/2022",
        editedDate: "05/02/2022",
        teamMembers: "Imię Nazwisko, Imię Nazwisko",
        group: "Grupa 1",
        subject: "Przedmiot XYZ",
        status: "NOWE",
    },
    {
        title: "Projekt A",
        description: "Opis projektu A",
        createdDate: "01/01/2022",
        editedDate: "05/02/2022",
        teamMembers: "Imię Nazwisko, Imię Nazwisko",
        group: "Grupa 1",
        subject: "Przedmiot XYZ",
        status: "NOWE",
    },
    {
        title: "Projekt A",
        description: "Opis projektu A",
        createdDate: "01/01/2022",
        editedDate: "05/02/2022",
        teamMembers: "Imię Nazwisko, Imię Nazwisko",
        group: "Grupa 1",
        subject: "Przedmiot XYZ",
        status: "NOWE",
    },
    {
        title: "Projekt A",
        description: "Opis projektu A",
        createdDate: "01/01/2022",
        editedDate: "05/02/2022",
        teamMembers: "Imię Nazwisko, Imię Nazwisko",
        group: "Grupa 1",
        subject: "Przedmiot XYZ",
        status: "NOWE",
    },
    {
        title: "Projekt A",
        description: "Opis projektu A",
        createdDate: "01/01/2022",
        editedDate: "05/02/2022",
        teamMembers: "Imię Nazwisko, Imię Nazwisko",
        group: "Grupa 1",
        subject: "Przedmiot XYZ",
        status: "NOWE",
    },
    {
        title: "Projekt A",
        description: "Opis projektu A",
        createdDate: "01/01/2022",
        editedDate: "05/02/2022",
        teamMembers: "Imię Nazwisko, Imię Nazwisko",
        group: "Grupa 1",
        subject: "Przedmiot XYZ",
        status: "NOWE",
    },
    {
        title: "Projekt A",
        description: "Opis projektu A",
        createdDate: "01/01/2022",
        editedDate: "05/02/2022",
        teamMembers: "Imię Nazwisko, Imię Nazwisko",
        group: "Grupa 1",
        subject: "Przedmiot XYZ",
        status: "NOWE",
    },

    // Dodaj więcej wierszy w razie potrzeby
];

export default function TeacherProposalPage() {
    return (
        <div className="grid w-full h-full grid-cols-1 gap-5 p-5 bg-gray-300 lg:grid-cols-5 lg:grid-rows-8 grid-rows ">
            <MainPageHeader></MainPageHeader>
            <Card className="col-span-full row-span-7">
                <CardHeader color="amber" className="text-center">
                    <Typography variant="h5">Propozycje projektowe</Typography>
                </CardHeader>
                <CardBody>
                    <ProjectTable data={TABLE_ROWS}></ProjectTable>
                </CardBody>
            </Card>

        </div>
    )
}