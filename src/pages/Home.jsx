import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Stack, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export default function Home() {
  const theme = useTheme();

  // Datos para categorías
  const categories = [
    { id: 1, name: 'Plomería', offers: 4, Icon: PlumbingIcon, color: 'warning.main' },
    { id: 2, name: 'Ama de casa', offers: 6, Icon: CleaningServicesIcon, color: 'warning.main' },
    { id: 3, name: 'Carpintería', offers: 5, Icon: CarpenterIcon, color: 'warning.main' },
    { id: 4, name: 'Electricista', offers: 3, Icon: ElectricalServicesIcon, color: 'warning.main' },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* Banda blanca arriba del Hero */}
      <Box sx={{ height: '50px', bgcolor: theme.palette.background.default }} />

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: theme.palette.primary.main,
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
                fontWeight: 'bold',
                color: theme.palette.tertiary.main,
              }}
            >
              La manera <span style={{ color: theme.palette.secondary.main }}>más fácil</span><br />
              de encontrar tu próximo trabajo
            </Typography>
            <Typography
              sx={{
                color: theme.palette.tertiary.main,
                mt: 2,
                fontWeight: 300,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
              duis ut labore et dolore magna aliqua.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ bgcolor: theme.palette.tertiary.main, p: 1.5, borderRadius: 2 }}
          >
            <TextField
              variant="standard"
              placeholder="Industria"
              InputProps={{ startAdornment: <BusinessIcon sx={{ mr: 1 }} /> }}
              sx={{ flex: 1 }}
            />
            <TextField
              variant="standard"
              placeholder="Dirección"
              InputProps={{ startAdornment: <LocationOnIcon sx={{ mr: 1 }} /> }}
              sx={{ flex: 1 }}
            />
            <TextField
              variant="standard"
              placeholder="Keywords"
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.tertiary.main,
                fontWeight: 'bold',
                px: 4,
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
          src="/img/hiring-illustration.png"
          alt="We are hiring illustration"
          sx={{
            maxWidth: '400px',
            width: '100%',
          }}
        />
      </Box>

      {/* Sección Categorías */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          px: { xs: 2, md: 10 },
          py: 6,
          bgcolor: theme.palette.background.default,
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {/* Texto y botón lado izquierdo */}
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Explora nuestras categorías
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, duis ut labore et dolore magna aliqua.
          </Typography>
          <Button variant="contained" color="warning" sx={{ fontWeight: 'bold' }}>
            Ver más
          </Button>
        </Box>

        {/* Tarjetas lado derecho */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
            maxWidth: 600,
            flex: 1,
          }}
        >
          {categories.map(({ id, name, offers, Icon, color }) => (
            <Paper
              key={id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                cursor: 'pointer',
                '&:hover': { boxShadow: 4 },
              }}
              elevation={2}
            >
              <Icon sx={{ fontSize: 40, color: color, mr: 2 }} />
              <Box>
                <Typography sx={{ color: color, fontWeight: 'bold' }}>{name}</Typography>
                <Typography color="text.secondary" fontSize={14}>
                  {offers} nuevas ofertas
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Indicadores (dots) */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignSelf: 'flex-end',
            mt: 3,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: 10, height: 10, bgcolor: 'grey.400', borderRadius: '50%' }} />
          <Box sx={{ width: 10, height: 10, bgcolor: 'warning.main', borderRadius: '50%' }} />
          <Box sx={{ width: 10, height: 10, bgcolor: 'grey.400', borderRadius: '50%' }} />
        </Box>
      </Box>
    </Box>
  );
}

