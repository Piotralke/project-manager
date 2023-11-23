import React, { useState } from "react";
import Layout from "./Components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navigation from "./Components/Navigation";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./store";
import MainCalendar from "./Pages/MainCalendar";
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout></Layout>}>
              <Route path="/home" element={<HomePage></HomePage>}></Route>
              <Route path="/calendar" element={<MainCalendar></MainCalendar>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
