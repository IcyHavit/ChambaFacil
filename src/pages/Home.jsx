import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export default function Home() {
  const theme = useTheme();

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
          <Box sx={{ flex: 1, mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                color: theme.palette.tertiary.main,
              }}
            >
              La manera <span style={{ color: theme.palette.background.default }}>más fácil</span><br />
              de encontrar tu próximo trabajo
            </Typography>
            <Typography
              sx={{
                color: theme.palette.tertiary.main,
                mb: 10,
                fontWeight: 300,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
              duis ut labore et dolore magna aliqua.
            </Typography>

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

        {/* Contenido inferior (más secciones aquí) */}
        <Box sx={{ bgcolor: theme.palette.background.default }}>
          {/* Aquí puedes insertar el resto de secciones (categorías, trabajos, etc.) */}
      </Box>
    </Box>
  );
}

