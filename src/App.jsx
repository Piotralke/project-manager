import React, { useState } from "react";
import Layout from "./Components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navigation from "./Components/Navigation";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./store";
import MainCalendar from "./Pages/MainCalendar";
import Projects from "./Pages/Projects";
import ProjectMainPage from "./Pages/ProjectPages/ProjectMainPage";
import ProjectTasksPage from "./Pages/ProjectPages/ProjectTasksPage";
import ProjectChat from "./Pages/ProjectPages/ProjectChat";
import { QueryClientProvider, QueryClient } from "react-query";
import LoginPage from "./Pages/LoginPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<LoginPage></LoginPage>}></Route>
              <Route path="/" element={<Layout></Layout>}>
                <Route path="/home" element={<HomePage></HomePage>}></Route>
                <Route path="/calendar" element={<MainCalendar></MainCalendar>}></Route>
                <Route path="/projects" element={<Projects></Projects>}></Route>
                <Route path="/projects/:projectId" element={<ProjectMainPage></ProjectMainPage>}></Route>
                <Route path="/projects/:projectId/tasks" element={<ProjectTasksPage></ProjectTasksPage>}></Route>
                <Route path="/projects/:projectId/chat" element={<ProjectChat></ProjectChat>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>

  );
}

export default App;
