import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import Auto from "./component/Auto";
import AutoDetail from "./component/AutoDetail";
import LoginPage from "./component/LoginPage";
import Register from "./component/Register";
import Home from "./component/Home";
import Noleggio from "./component/Noleggio";
import AdminDashboard from "./component/AdminDashboard";
import AdminPrenotazioni from "./component/AdminPrenotazioni";
import ProtectedAdminRoute from "./component/ProtectedAdminRoute";
import Servizi from "./component/Servizi";
import FloatingContactBar from "./component/FloatingContactBar";

import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/auto/:id" element={<AutoDetail />} />
        <Route path="/noleggio" element={<Noleggio />} />
        <Route path="/servizi" element={<Servizi />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/prenotazioni"
          element={
            <ProtectedAdminRoute>
              <AdminPrenotazioni />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      <FloatingContactBar />
      <Footer />
    </Router>
  );
}

export default App;