import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import Intelligence from "./pages/Intelligence";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/intelligence" element={<Intelligence />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
