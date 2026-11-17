import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Katalog from './pages/Katalog.jsx';
import Register from './pages/Register.jsx'; // 1. Import Register

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/katalog" element={<Katalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* 2. Tambah Rute */}
      </Routes>
    </Router>
  );
}

export default App;