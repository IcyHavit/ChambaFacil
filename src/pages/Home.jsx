import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Hero from '../components/Home/hero';
import Categorias from '../components/Home/categorias';

export default function Home() {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      <Box sx={{ height: '50px', bgcolor: theme.palette.background.default }} />
      <Hero />
      <Categorias />
      {/* Aquí más secciones futuras */}
    </Box>
  );
}
