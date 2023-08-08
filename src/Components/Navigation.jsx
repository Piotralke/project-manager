import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Select, Option } from "@material-tailwind/react";
import { toggleMenu } from "../Reducers/menuReducer"; // Importuj akcję kreatora
function NavigationItem(props) {
  return (
    <Link className="flex items-center group " to={props.link}>
          <props.icon className="w-8 h-8 text-white transition-transform duration-100 ease-linear group-hover:text-amber-500 group-hover:scale-125 group-hover:cursor-pointer group-hover:animate-pulse" />
          
          
          <div
            className={`ml-2 transition-opacity duration-500 ease-in-out ${
              !props.collapsed ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
            }`}
          >
            <div className="font-bold text-white truncate text-md group-hover:cursor-pointer group-hover:text-amber-500">
              {props.name}
            </div>
          </div>      
    </Link>
  );
}

export default function Navigation() {
  const menuCollapsed = useSelector((state) => state.menuCollapsed);
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    // Tutaj można dodać logikę obsługi efektu (jeśli jest wymagana)
  }, [menuCollapsed]);

  return (
    <div
      className={`w-full flex flex-col justify-between min-h-full bg-gray-800 ${
        menuCollapsed ? "basis-1/12" : "basis-1/6"
      } transition duration-700 `}
    >
      <div
        className={`menuCollapsed ? "basis-1/12" : "basis-1/6" flex flex-col w-full h-full p-5 space-y-5 transition-all duration-200 ${menuCollapsed?"items-center" : "items-start"}`}
      >
        {menuCollapsed ? (
          <BiArrowToRight
            className="w-10 h-10 text-white transition-transform ease-linear hover:text-amber-500 hover:cursor-pointer hover:animate-pulse hover:scale-125"
            onClick={handleToggleMenu}
          ></BiArrowToRight>
        ) : (
          <BiArrowToLeft
            className="w-10 h-10 text-white transition-transform ease-linear hover:text-amber-500 hover:cursor-pointer hover:animate-pulse hover:scale-125"
            onClick={handleToggleMenu}
          ></BiArrowToLeft>
        )}
        
        <div className="h-0.5 w-full bg-gray-400"></div>
        <NavigationItem
          icon={IoHome}
          name="Strona główna"
          link="/home"
          collapsed={menuCollapsed}
          showText={!menuCollapsed}
        ></NavigationItem>
        <NavigationItem
          icon={FaCalendarDays}
          name="Kalendarz"
          link="/calendar"
          collapsed={menuCollapsed}
          showText={!menuCollapsed}
        ></NavigationItem>
      </div>
    </div>
  );
}
