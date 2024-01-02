import React, { useEffect, useState } from "react";
import Layout from "./Components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navigation from "./Components/Navigation";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import MainCalendar from "./Pages/MainCalendar";
import Projects from "./Pages/Projects";
import ProjectMainPage from "./Pages/ProjectPages/ProjectMainPage";
import ProjectTasksPage from "./Pages/ProjectPages/ProjectTasksPage";
import ProjectChat from "./Pages/ProjectPages/ProjectChat";
import { QueryClientProvider, QueryClient } from "react-query";
import LoginPage from "./Pages/LoginPage";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import ProjectGanntPage from "./Pages/ProjectPages/ProjectGanntPage";

import TeacherHomePage from "./Pages/TeacherPages/TeacherHomePage";
import TeacherProposalPage from "./Pages/TeacherPages/TeacherProposalsPage";
import TeacherSubjectPage from "./Pages/TeacherPages/TeacherSubjectsPage";
import TeacherGroupsPage from "./Pages/TeacherPages/TeacherGroupsPage";


function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const auth = useAuth()
  const fetchAuth = async () => {
    const authStatus = await auth.isAuthenticated()
    setIsAuthenticated(authStatus)
  }
  useEffect(() => {
    fetchAuth()
    const authInterval = setInterval(() => {
      fetchAuth();
    }, 5000); // Sprawdzaj co 60 sekund (możesz dostosować czas do własnych potrzeb)

    // Zatrzymaj interwał po odmontowaniu komponentu
    return () => clearInterval(authInterval);
  }, [auth])
  if (isAuthenticated === undefined) {
    // Oczekuj na sprawdzenie autoryzacji przed wyrenderowaniem strony
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? (<Layout></Layout>) : (
        <Navigate to="/login"></Navigate>
      )}>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/calendar" element={<MainCalendar></MainCalendar>}></Route>
        <Route path="/projects" element={<Projects></Projects>}></Route>
        <Route path="/projects/:projectId" element={<ProjectMainPage></ProjectMainPage>}></Route>
        <Route path="/projects/:projectId/tasks" element={<ProjectTasksPage></ProjectTasksPage>}></Route>
        <Route path="/projects/:projectId/chat" element={<ProjectChat></ProjectChat>}></Route>
        <Route path="/projects/:projectId/calendar" element={<MainCalendar></MainCalendar>}></Route>
        <Route path="/projects/:projectId/gannt" element={<ProjectGanntPage></ProjectGanntPage>}></Route>
        <Route path="/thome" element={<TeacherHomePage></TeacherHomePage>}></Route>
        <Route path="/tcalendar" element={<MainCalendar></MainCalendar>}></Route>
        <Route path="/tsubjects" element={<TeacherSubjectPage></TeacherSubjectPage>}></Route>
        {/* <Route path="/tsubjects/:subjectId" element={<TeacherSubjectDetails></TeacherSubjectDetails>}></Route> */}

        <Route path="/tgroups" element={<TeacherGroupsPage></TeacherGroupsPage>}></Route>
        <Route path="/tproposals" element={<TeacherProposalPage></TeacherProposalPage>}></Route>
      </Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    </Routes>
  )
}




function App() {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes></AppRoutes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>

  );
}

export default App;

