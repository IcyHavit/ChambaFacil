// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Solicitudes from './pages/Solicitudes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
