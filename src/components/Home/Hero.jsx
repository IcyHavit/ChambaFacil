// Hero.jsx
import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ImagenHero from '../../assets/images/Home/ImagenHero.png';
import Trabajadores1 from '../../assets/images/Home/Trabajadores1.png';
import IMG_HERO from '../../assets/images/Home/IMG_HERO.png';
import SearchBar from '../SearchBar';


export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(150deg,#4c9b82,#495a72)',
        px: { xs: 2, md: 12 },
        py: { xs: 10, md: 11 },
      }}
    >

      <Box
        sx={{
          flex: 1,
          mb: { xs: 4, md: 0 },
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              ...theme.typography.bodyLarge,
              fontWeight: 'bold',
              color: theme.palette.tertiary.main,
            }}
          >
            La manera <span style={{ color: theme.palette.background.paper }}>más fácil</span><br />
            de encontrar tu próximo trabajo
          </Typography>
          <Typography
            sx={{
              ...theme.typography.bodySmall,
              color: theme.palette.tertiary.main,
              mt: 2,
              fontWeight: 300,
            }}
          >
            Conecta con empleadores cerca de ti, postúlate sin necesidad de título universitario
            y descubre oportunidades que se adaptan a tus habilidades y disponibilidad.
          </Typography>
        </Box>
        <SearchBar />
      </Box>

      <Box
        component="img"
        img src={IMG_HERO} alt="Ilustración principal"
        sx={{
          maxWidth: '420px',
          width: '90%',
          //filter: 'drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.7))'
        }}
      />
    </Box>
  );
}
