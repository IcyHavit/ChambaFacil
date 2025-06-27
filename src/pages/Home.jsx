import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Hero from '../components/Home/Hero';
import Categorias from '../components/Home/Categorias';
import Trabajos from '../components/Home/Trabajos';
import Ofrecer from '../components/Home/OfrecerServicios';

export default function Home() {
  const theme = useTheme();
  const role = localStorage.getItem('role');

  return (
    <>
      {/* HERO */}
      <Hero />

      <Categorias />
      <Trabajos />
      {role === 'cliente' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(4) }}>
          <Ofrecer />
        </Box>
      )}
    </>
  );
}
