import React from 'react';
import HomeLayout from './layouts/HomeLayout';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Faq from './pages/Faq';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './layouts/AuthLayout';
import AuthLayout from './layouts/AuthLayout';
import { ProtectedRoute } from './router/ProtectedRoute';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
