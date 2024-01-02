import { useEffect, useState } from "react";
import { Avatar, Spinner, Tooltip, Typography } from "@material-tailwind/react";
import { FaArrowRight, FaRegEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import RequestHandler from "../Miscs/RequestHandler";
import { useAuth } from "../auth";
import { BsFillPinFill } from "react-icons/bs";
import { MdGroup } from "react-icons/md";
export default function SubjectOverwiev({data}) {
    const auth = useAuth();
    const [loading, isLoading] = useState(true)
    const [subjectData, setSubjectData] = useState();
    
   
    useEffect(() => {
        setSubjectData(data)
        isLoading(false)
    }, [])
    if (loading)
        return (
            <Spinner color="amber" className="m-auto"></Spinner>
        )

    else
        return (
            <div className="flex flex-row items-center justify-center w-full h-full p-3 bg-gray-300 border border-gray-400 rounded-xl">
                <section className="flex basis-1/2">
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-2">
                            <div className="flex flex-col">
                                <Typography variant="h5">{subjectData.name}</Typography>
                                <Typography variant="small">{subjectData.requirements}</Typography>
                            </div>
                        </div>
                    </div>
                </section>
               
               

                <section className="flex items-center justify-center h-full basis-1/12">
                    <Link to={`/tsubjects/${subjectData.uuid}`}>
                        <FaArrowRight className="w-10 h-10 m-atuo"></FaArrowRight>
                    </Link>
                </section>
            </div>
        );
}
