// Hero.jsx
import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IMG_HERO from '../../assets/images/Home/IMG_HERO.png';
import SearchBar from '../SearchBar';
import { useNavigate } from 'react-router-dom';


export default function Hero() {
  const navigate = useNavigate();
  const handleBuscar = (trabajo, alcaldia) => {
    const query = new URLSearchParams();
    if (trabajo) query.set('trabajo', trabajo);
    if (alcaldia) query.set('alcaldia', alcaldia);
    navigate(`/search?${query.toString()}`);
  };

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
            Soluciona lo que necesitas, <span style={{ color: theme.palette.secondary.dark }}>sin</span><br />
            complicaciones
          </Typography>
          <Typography
            sx={{
              ...theme.typography.bodySmall,
              color: theme.palette.tertiary.main,
              mt: 2,
              fontWeight: 300,
            }}
          >
            ¿Una fuga, una instalación eléctrica o un arreglo de carpintería? <br />
            Aquí encuentras personas confiables cerca de ti, listas para ayudarte cuando lo necesites.
          </Typography>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 750, alignSelf: 'auto' }}>
          <SearchBar handleBuscar={handleBuscar} />
        </Box>
      </Box>

      <Box
        component="img"
        src={IMG_HERO} alt="Ilustración principal"
        sx={{
          maxWidth: '420px',
          width: '90%',
          //filter: 'drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.7))'
        }}
      />
    </Box>
  );
}
