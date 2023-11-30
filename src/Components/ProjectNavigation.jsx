import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BiArrowToRight,
  BiArrowToLeft,
  BiSolidArrowToRight,
  BiTask
} from "react-icons/bi";
import { BsStack } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { LuMessagesSquare } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { FaChartGantt } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { toggleMenu, setMenuState } from "../Reducers/menuReducer"; // Importuj akcję kreatora
function NavigationItem(props) {
  return (
    <Link className="flex items-center group " to={props.link}>
      <props.icon className="w-8 h-8 text-white transition-transform duration-100 ease-linear group-hover:text-amber-500 group-hover:scale-125 group-hover:cursor-pointer group-hover:animate-pulse" />

      <div
        className={`ml-2 transition-opacity duration-500 ease-in-out ${!props.collapsed || props.inDrawer
            ? "opacity-100 max-w-full"
            : "opacity-0 max-w-0"
          }`}
      >
        <div className="font-bold text-white truncate text-md group-hover:cursor-pointer group-hover:text-amber-500">
          {props.name}
        </div>
      </div>
    </Link>
  );
}


export default function ProjectNavigation() {
  const menuCollapsed = useSelector((state) => state.menuCollapsed);
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };
  function NavigationContent(props) {
    return (
      <>
        <NavigationItem
          icon={BsStack}
          name="Przegląd"
          link={`/projects/${projectId}`}
          collapsed={menuCollapsed}
          showText={!menuCollapsed}
          inDrawer={windowWidth < 960}
        ></NavigationItem>
        <NavigationItem
          icon={BiTask}
          name="Zadania"
          link={`/projects/${projectId}/tasks`}
          collapsed={menuCollapsed}
          showText={!menuCollapsed}
          inDrawer={windowWidth < 960}
        ></NavigationItem>
        <NavigationItem
          icon={LuMessagesSquare}
          name="Dyskusja"
          link={`/projects/${projectId}/chat`}
          collapsed={menuCollapsed}
          showText={!menuCollapsed}
          inDrawer={windowWidth < 960}
        ></NavigationItem>
         <NavigationItem
          icon={FaCalendarDays}
          name="Kalendarz"
          link={`/projects/${projectId}/calendar`}
          collapsed={menuCollapsed}
          showText={!menuCollapsed}
          inDrawer={windowWidth < 960}
        ></NavigationItem>
        <NavigationItem
          icon={FaChartGantt}
          name="Wykres Gantta"
          link={`/projects/${projectId}/gannt`}
          collapsed={menuCollapsed}
          showText={!menuCollapsed}
          inDrawer={windowWidth < 960}
        ></NavigationItem>
        <NavigationItem
          icon={IoMdSettings}
          name="Ustawienia projektu"
          link={`/projects/${projectId}/settings`}
          collapsed={menuCollapsed}
          showText={!menuCollapsed}
          inDrawer={windowWidth < 960}
        ></NavigationItem>
      </>
    );
  }
  const handleResize = () => {
    console.log(window.innerWidth);
    if (window.innerWidth < 1140) dispatch(setMenuState(true));
    else dispatch(setMenuState(false));
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <>
      {windowWidth >= 960 ? (
        <div
          className={`menuCollapsed ? "basis-1/12" : "basis-1/6" flex flex-col w-full h-full p-5 space-y-5 transition-all duration-200 ${menuCollapsed ? "items-center" : "items-start"
            }`}
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
          <NavigationItem
            icon={IoHome}
            name="Strona główna"
            link="/home"
            collapsed={menuCollapsed}
            showText={!menuCollapsed}
            inDrawer={windowWidth < 960}
          ></NavigationItem>
          <div className="h-0.5 w-full bg-gray-400"></div>
          <NavigationContent></NavigationContent>
          <Button className="w-full" color="red">Wyloguj</Button>
        </div>
      ) : (
        <React.Fragment>
          <BiSolidArrowToRight onClick={openDrawer} className="w-10 h-10 text-white transition-transform ease-linear hover:text-amber-500 hover:cursor-pointer hover:animate-pulse hover:scale-125"></BiSolidArrowToRight>
          <Drawer className="bg-gray-800" open={open} onClose={closeDrawer}>
            <div
              className={`flex flex-col w-full bg-gray-800 h-full p-5 space-y-5 transition-all duration-200 
              "items-start"
          `}
            >
              <BiArrowToLeft
                className="w-10 h-10 text-white transition-transform ease-linear hover:text-amber-500 hover:cursor-pointer hover:animate-pulse hover:scale-125"
                onClick={closeDrawer}
              ></BiArrowToLeft>
              <NavigationItem
                icon={IoHome}
                name="Strona główna"
                link="/home"
                collapsed={menuCollapsed}
                showText={!menuCollapsed}
                inDrawer={windowWidth < 960}
              ></NavigationItem>
              <div className="h-0.5 w-full bg-gray-400"></div>
              <NavigationContent></NavigationContent>
            </div>
          </Drawer>
        </React.Fragment>
      )}
    </>
  );
}
