import React from 'react';
import {  HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import FamilyTree from './pages/FamilyTree';

function App() {


  return (
    <>
      <Router>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/family-tree">Семейное дерево</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/family-tree" element={<FamilyTree />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
