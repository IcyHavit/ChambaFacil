import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Hero from '../components/Home/hero';
import Categorias from '../components/Home/categorias';
import Navbar from '../components/Navbar';

export default function Home() {
  const theme = useTheme();

  return (
    <>
    <Navbar />

    <Box sx={{ bgcolor: theme.palette.background.default }}>
        {/* Espacio superior adicional */}
      <Box sx={{ height: '15px', bgcolor: theme.palette.background.default }} />
        {/* Secciones de la página */}
        <Hero />
        <Categorias />
      </Box>
    </>
  );
}
