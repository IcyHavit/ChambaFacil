// Hero.jsx
import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import { useTheme } from '@mui/material/styles';
import ImagenHero from '../../assets/images/Home/ImagenHero.png';


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
        px: { xs: 2, md: 10 },
        py: { xs: 10, md: 16 },
      }}
    >
      {/* Left side - Text and search */}
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

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ bgcolor: theme.palette.tertiary.main, p: 1, borderRadius: 2 }}
        >
          <TextField
            variant="standard"
            placeholder="Industria"
            InputProps={{ startAdornment: <BusinessIcon sx={{ mr: 1 }} /> }}
            sx={{ flex: 0.7 }}
          />
          <TextField
            variant="standard"
            placeholder="Dirección"
            InputProps={{ startAdornment: <LocationOnIcon sx={{ mr: 1 }} /> }}
            sx={{ flex: 0.7}}
          />
          <TextField
            variant="standard"
            placeholder="Keywords"
            sx={{ flex: 0.7 }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.tertiary.main,
              fontWeight: 'bold',
              px: 2.5,
              py: 1.5,
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
              },
            }}
            startIcon={<SearchIcon />}
          >
            Buscar
          </Button>
        </Stack>
      </Box>

      {/* Right side - Illustration */}
      <Box
        component="img"
        img src={ImagenHero} alt="Ilustración principal"
        sx={{
          maxWidth: '250px',
          width: '50%',
        }}
      />
    </Box>
  );
}
