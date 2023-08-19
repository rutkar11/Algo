import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import 'font-awesome/css/font-awesome.min.css'

import Homepage from './Homepage'
import Nav from './Navbar'
import Footer from "./Footer"
import Sortingalgo from "./algos/sortingalgo/Sortingalgo"
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer"

function App() {
  document.title = 'Algorithm Visualizer'
  return (
    <>
      <Nav />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route
            path='/sortingalgo'
            element={<Sortingalgo />}
          />
        <Route
            path='/PathfindingVisualizer'
            element={<PathfindingVisualizer/>}
          />
        </Routes>
      <Footer />
    </>
  )
}

export default App
