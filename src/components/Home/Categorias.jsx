// CategoriesSection.jsx
import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import { useTheme } from '@mui/material/styles';

export default function Categorias() {
  const theme = useTheme();

  const categories = [
    { id: 1, name: 'Plomería', offers: 4, Icon: PlumbingIcon, color: theme.palette.secondary.dark },
    { id: 2, name: 'Ama de casa', offers: 6, Icon: CleaningServicesIcon, color: theme.palette.secondary.dark },
    { id: 3, name: 'Carpintería', offers: 5, Icon: CarpenterIcon, color: theme.palette.secondary.dark },
    { id: 4, name: 'Electricista', offers: 3, Icon: ElectricalServicesIcon, color: theme.palette.secondary.dark },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        px: { xs: 2, md: 10 },
        py: 9,
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
        <Button variant="contained" bgcolor= {theme.palette.secondary.dark}  sx={{ fontWeight: 'bold' }}>
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
        <Box sx={{ width: 10, height: 10, bgcolor: theme.palette.background.paper, borderRadius: '50%' }} />
        <Box sx={{ width: 10, height: 10, bgcolor: theme.palette.secondary.dark, borderRadius: '50%' }} />
        <Box sx={{ width: 10, height: 10, bgcolor: theme.palette.background.paper, borderRadius: '50%' }} />
      </Box>
    </Box>
  );
}
