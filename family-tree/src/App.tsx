import React from 'react';
import {  HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FamilyTree from './pages/FamilyTree';

import Header from './components/Header';
function App() {


  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/family-tree" element={<FamilyTree />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
