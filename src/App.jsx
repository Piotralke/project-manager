import React, { useState } from 'react'
import Layout from './Components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navigation from './Components/Navigation'

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route path="/home" element={<HomePage></HomePage>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
