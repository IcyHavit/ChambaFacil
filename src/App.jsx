// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Chat from './pages/Chat';
import Solicitudes from './pages/Solicitudes';
import Register from './pages/Register';
import Search from './pages/Search';
import PublicarServicio from './pages/PublicarServicio';
import Perfil from './pages/Perfil';
import Contraseña from './pages/Contraseña';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/publicar" element={<PublicarServicio />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/contraseña" element={<Contraseña />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
