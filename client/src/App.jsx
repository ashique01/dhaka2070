import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddCity from "./pages/AddCity";
import Layout from "./components/Layout";
import CityDetails from "./pages/CityDetails";
import EditCity from "./pages/EditCity";
import AdminDashboard from "./pages/AdminDashboard";
import AllZones from "./pages/AllZones";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import RegisterAdmin from "./pages/RegisterAdmin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('transition-colors', 'duration-500', 'ease-in-out');

    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Routes wrapped by Layout (includes Navbar and Footer) */}
        <Route path="/" element={<Layout theme={theme} setTheme={setTheme}><Home theme={theme} /></Layout>} />
        <Route path="/add" element={<Layout theme={theme} setTheme={setTheme}><AddCity theme={theme} /></Layout>} />
        <Route path="/city/:id" element={<Layout theme={theme} setTheme={setTheme}><CityDetails theme={theme} /></Layout>} />
        <Route path="/edit/:id" element={<Layout theme={theme} setTheme={setTheme}><EditCity theme={theme} /></Layout>} />
        <Route path="/zone" element={<Layout theme={theme} setTheme={setTheme}><AllZones theme={theme} /></Layout>} />
        <Route path="/about" element={<Layout theme={theme} setTheme={setTheme}><About theme={theme} /></Layout>} />
        <Route path="/contact" element={<Layout theme={theme} setTheme={setTheme}><Contact theme={theme} /></Layout>} />

        <Route path="/login" element={<Layout theme={theme} setTheme={setTheme}><Login theme={theme} /></Layout>} />
        <Route path="/register" element={<Layout theme={theme} setTheme={setTheme}><RegisterAdmin theme={theme} /></Layout>} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Layout theme={theme} setTheme={setTheme}><AdminDashboard theme={theme} /></Layout>
            </PrivateRoute>
          }
        />

        {/* 404 Not Found route - NOT wrapped by Layout */}
        <Route path="*" element={<NotFound theme={theme} />} />
      </Routes>
    </Router>
  );
}