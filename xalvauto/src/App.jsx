import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import Auto from "./component/Auto";
import AutoDetail from "./component/AutoDetail";
import LoginPage from "./component/LoginPage";
import Register from "./component/Register";
import Home from "./component/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
       <Route path="/auto" element={<Auto />} />
        <Route path="/auto/:id" element={<AutoDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
