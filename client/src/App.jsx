import React from "react";
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

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCity />} />
          <Route path="/city/:id" element={<CityDetails />} />
          <Route path="/edit/:id" element={<EditCity />} />
          <Route path="/zone" element={<AllZones />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterAdmin />} />

          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
