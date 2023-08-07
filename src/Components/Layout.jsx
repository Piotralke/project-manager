import { Outlet, Link } from "react-router-dom";

import { Select, Option } from "@material-tailwind/react";

import { useState } from "react";
import Navigation from "./Navigation";
import { useSelector, useDispatch } from "react-redux";
export default function Layout() {
  const menuCollapsed = useSelector((state) => state.menuCollapsed);

  return (
    <div className="flex min-h-screen">
      {/* Pasek nawigacji */}
      <div className={`${menuCollapsed?"w-1/12":"w-1/6"} sticky top-0 h-screen bg-gray-900 transition-all ease-linear duration-200`}>
        <Navigation></Navigation>
      </div>

      {/* Kontent strony */}
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
    </div>

    // <div className="flex flex-col min-w-full min-h-screen justify-stretch">
    //   <div className="sticky top-0 left-0 z-10 flex w-full p-3 space-x-5 bg-gray-900 space-between row">
    //     <Link to="/home" className="text-xl font-bold text-white">
    //       Project manager
    //     </Link>
    //     <div className="w-1/12">
    //       <Select label="Select project" color="amber">
    //         <Option>Projekt 1</Option>
    //         <Option>Projekt 2</Option>
    //         <Option>Projekt 3</Option>
    //       </Select>
    //     </div>
    //   </div>
    //   <div className="flex flex-row flex-grow w-full min-h-full">
    //   <Navigation></Navigation>
    //   <Outlet></Outlet>
    //   </div>
    //   <div className="h-10 text-center text-white bg-gray-900 basis-1/12">
    //     © Piotr Dziewięcki 2023
    //   </div>
    // </div>
  );
}
