import { Fragment } from "react";
import { Select, Option } from "@material-tailwind/react";


export default function HomePage() {
    return (
        <Fragment className="flex flex-col md:flex-row">
            <div className="w-full h-full bg-blue-300">
                <Select color="amber" className="w-full text-white">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                </Select>
            </div>
        </Fragment>
    )
}