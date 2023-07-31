import { Outlet, Link } from "react-router-dom";

import { Select, Option } from "@material-tailwind/react";

import { useState } from "react";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="flex flex-col min-w-full min-h-screen overflow-hidden justify-stretch">
      <div className="flex w-full p-3 space-x-5 bg-gray-900 space-between row">
        <Link to="/home" className="text-xl font-bold text-white">Project manager</Link>
        <div className="w-1/12">
          <Select label="Select project" color="amber">
            <Option>Projekt 1</Option>
            <Option>Projekt 2</Option>
            <Option>Projekt 3</Option>
          </Select>
        </div>
      </div>
      <div className="flex flex-row flex-grow w-full p-0 m-0">
        <Navigation></Navigation>
        <Outlet></Outlet>
      </div>
      <div className="h-10 text-center text-white bg-gray-900 basis-1/12">
        © Piotr Dziewięcki 2023
      </div>
    </div>
  );
}
