import { Outlet, useLocation} from "react-router-dom";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import ProjectNavigation from "./ProjectNavigation";
export default function Layout() {
  const menuCollapsed = useSelector((state) => state.menu.menuCollapsed);
  const location = useLocation();
  const isProjectPath = location.pathname.startsWith("/projects/");
  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="flex flex-col lg:flex-row">
        {/* Pasek nawigacji */}
        <div
          className={`${
            menuCollapsed ? "lg:w-1/12" : "lg:w-1/6"
          } w-full  z-10 sticky top-0 lg:h-screen h-1/6 bg-gray-900 transition-all ease-linear duration-200`}
        >
          {isProjectPath ? (
            <ProjectNavigation/>
          ) : (
            <Navigation />
          )}
        </div>

        {/* Kontent strony */}
        <div className="z-0 flex-grow w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
