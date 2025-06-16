// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Chat from './pages/Chat';
import Solicitudes from './pages/Solicitudes';
import Register from './pages/Register';
import Search from './pages/Search';
import PublicarServicio from './pages/PublicarServicio';
import InitialForm from './pages/InitialForm'
import Perfil from './pages/Perfil';
import Contraseña from './pages/Contraseña';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/publicar" element={<PublicarServicio />} />
        <Route path='/datos' element={<InitialForm/>} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/contraseña" element={<Contraseña />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
