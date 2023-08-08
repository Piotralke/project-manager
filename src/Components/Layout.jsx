import { Outlet, Link } from "react-router-dom";

import { Select, Option } from "@material-tailwind/react";

import { useState } from "react";
import Navigation from "./Navigation";
import { useSelector, useDispatch } from "react-redux";
export default function Layout() {
  const menuCollapsed = useSelector((state) => state.menuCollapsed);

  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="flex flex-row">
        {/* Pasek nawigacji */}
        <div
          className={`${
            menuCollapsed ? "w-1/12" : "w-1/6"
          } sticky top-0 h-screen bg-gray-900 transition-all ease-linear duration-200`}
        >
          <Navigation></Navigation>
        </div>

        {/* Kontent strony */}
        <div className="flex-grow">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
