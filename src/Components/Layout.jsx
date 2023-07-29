import { Outlet, Link } from "react-router-dom";

import { Select, Option } from "@material-tailwind/react";

import { useState } from "react";
import Navigation from "./Navigation";
function ProjectSelect() {
    return (
      <div className="flex flex-row items-center group hover:cursor-pointer">
        <Select className="w-full text-white">
          <Option>Material Tailwind HTML</Option>
          <Option>Material Tailwind React</Option>
          <Option>Material Tailwind Vue</Option>
          <Option>Material Tailwind Angular</Option>
          <Option>Material Tailwind Svelte</Option>
        </Select>
      </div>
    );
  }

export default function Layout() {

    return (
        <div className="flex flex-col min-w-full min-h-screen justify-stretch">
            {/* <div className="flex items-center w-full p-3 bg-gray-800">
                <text className="text-xl font-bold text-white">Project manager</text>
            </div> */}
            <div className="flex flex-row flex-grow w-full p-0 m-0">
                <Navigation></Navigation>
                <Outlet></Outlet>
            </div>
            {/* <div className="h-10 text-center bg-gray-700 basis-1/12">Piotr Dziewięcki 2023</div> */}
        </div>
    );
}
