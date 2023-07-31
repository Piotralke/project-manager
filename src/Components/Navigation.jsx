import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";


function NavigationItem(props) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(!props.collapsed);
  }, [props.collapsed]);

  return (
    <Link className="flex items-center group" to={props.link}>
      <props.icon className="w-8 h-8 text-white group-hover:text-amber-500 group-hover:cursor-pointer group-hover:animate-pulse"></props.icon>
      <div
        className={`ml-2 transition-opacity duration-200 ease-in-out ${
          showText && !props.collapsed
            ? "opacity-100 max-w-full"
            : "opacity-0 max-w-0"
        }`}
      >
        <div className="font-bold text-white truncate text-md group-hover:cursor-pointer group-hover:animate-pulse group-hover:text-amber-500">
          {props.name}
        </div>
      </div>
    </Link>
  );
}

export default function Navigation() {
  const [menuCollapsed, isMenuCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col justify-between min-h-full bg-gray-800 ${
        menuCollapsed ? "basis-1/12" : "basis-1/6"
      } transition-all duration-200 `}
    >
      <div className="flex flex-col w-full h-full p-5 space-y-5">
        {/* <ProjectSelect></ProjectSelect> */}
        {menuCollapsed ? (
          <BiArrowToRight
            className="w-10 h-10 text-white hover:text-amber-500 hover:cursor-pointer hover:animate-pulse"
            onClick={() => {
              isMenuCollapsed(false);
            }}
          ></BiArrowToRight>
        ) : (
          <BiArrowToLeft
            className="w-10 h-10 text-white hover:text-amber-500 hover:cursor-pointer hover:animate-pulse"
            onClick={() => {
              isMenuCollapsed(true);
            }}
          ></BiArrowToLeft>
        )}
        <div className="w-full h-0.5 bg-gray-400"></div>
        <NavigationItem
          icon={IoHome}
          name="Strona główna"
          link="/home"
          collapsed={menuCollapsed}
        ></NavigationItem>
        <NavigationItem
          icon={FaCalendarDays}
          name="Kalendarz"
          link="/calendar"
          collapsed={menuCollapsed}
        ></NavigationItem>
      </div>
    </div>
  );
}
