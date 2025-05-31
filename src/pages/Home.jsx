import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Hero from '../components/Home/hero';
import Categorias from '../components/Home/categorias';
import Trabajos from '../components/Home/Trabajos';
import Navbar from '../components/Navbar';

export default function Home() {
  const theme = useTheme();


  return (
    <>
    <Navbar />

    <Box sx={{ bgcolor: theme.palette.background.default }}>
        {/* HERO */}
        <Hero />
        {/* Categorias */}
        <Categorias />
        <Trabajos />
      </Box>
    </>
  );
}
