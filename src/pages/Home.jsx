import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Hero from '../components/Home/Hero';
import Categorias from '../components/Home/Categorias';
import Trabajos from '../components/Home/Trabajos';
import Navbar from '../components/Navbar';
import Ofrecer from '../components/Home/OfrecerServicios';
import Footer from '../components/Footer';

export default function Home() {
  const theme = useTheme();


  return (
    <>
    <Navbar />
        {/* HERO */}
        <Hero />

        <Categorias />
        <Trabajos />
        <Ofrecer /> <br /><br />
        <Footer />
    </>
  );
}
