import React from 'react';
import HomeLayout from './layouts/HomeLayout';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
      </Routes>
    </Router>

  );
}

export default App;
