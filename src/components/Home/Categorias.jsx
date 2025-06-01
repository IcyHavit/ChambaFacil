// CategoriesSection.jsx
import React from 'react';
import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import HandymanIcon from '@mui/icons-material/Handyman';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import ButtonMod from '../../components/ButtonMod';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

export default function Categorias() {
  const theme = useTheme();

  const categorias = [
    { id: 1, name: 'Plomería', offers: 4, Icon: PlumbingIcon, color: theme.palette.secondary.dark },
    { id: 2, name: 'Impermeabilización', offers: 6, Icon: CleaningServicesIcon, color: theme.palette.secondary.dark },
    { id: 3, name: 'Carpintería', offers: 5, Icon: HandymanIcon, color: theme.palette.secondary.dark },
    { id: 4, name: 'Soldadura', offers: 3, Icon: ElectricalServicesIcon, color: theme.palette.secondary.dark },
    { id: 5, name: 'Electricista', offers: 4, Icon: PlumbingIcon, color: theme.palette.secondary.dark },
    { id: 6, name: 'Limpieza del hogar', offers: 6, Icon: CleaningServicesIcon, color: theme.palette.secondary.dark },
    { id: 7, name: 'Cuidado de mascotas', offers: 5, Icon: HandymanIcon, color: theme.palette.secondary.dark },
    { id: 8, name: 'Jardinería', offers: 3, Icon: ElectricalServicesIcon, color: theme.palette.secondary.dark },
    { id: 9, name: 'Albañilería', offers: 4, Icon: PlumbingIcon, color: theme.palette.secondary.dark },
    { id: 10, name: 'Costura', offers: 6, Icon: CleaningServicesIcon, color: theme.palette.secondary.dark },
    { id: 11, name: 'Cuidado de niños', offers: 5, Icon: HandymanIcon, color: theme.palette.secondary.dark },
    { id: 12, name: 'Instalaciones', offers: 3, Icon: ElectricalServicesIcon, color: theme.palette.secondary.dark },
  ];

  const [paginaActual, setPaginaActual] = useState(0);
  const itemsPorPagina = 4;
  const totalPaginas = Math.ceil(categorias.length / itemsPorPagina);

  const categoriasVisibles = categorias.slice(
  paginaActual * itemsPorPagina,
  (paginaActual + 1) * itemsPorPagina
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        px: { xs: 2, md: 10 },
        py: 7,
        bgcolor: theme.palette.background.default,
        flexWrap: 'wrap',
        gap: 4,
      }}
    >
      {/* Texto y botón lado izquierdo */}
      <Box sx={{ maxWidth: 800 }}>
        <Typography color={theme.palette.primary.main} variant="h5" fontWeight="bold" mb={2}>
          Explora categorías de servicios disponibles cerca de ti.
        </Typography>
        <Typography color={theme.palette.secondary.dark} mb={4}>
          Busca fácilmente lo que necesitas: plomería, carpintería, electricidad y más.
          Encuentra personas confiables con experiencia, listas para ayudarte cuando más lo necesites.
        </Typography>
        <ButtonMod
          variant="principal"
          textCont="Ver más"
          width="auto"
          height="2.5rem"
          type="submit"
        />
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
        {categoriasVisibles.map(({ id, name, offers, Icon, color }) => (
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

      {/* Navegación con flechas y puntos */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          mt: 3,
        }}
      >
        <IconButton onClick={() => setPaginaActual(p => Math.max(p - 1, 0))} disabled={paginaActual === 0}>
          <ChevronLeftIcon />
        </IconButton>

        {[...Array(totalPaginas)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: i === paginaActual ? theme.palette.primary.main : theme.palette.background.paper,
            }}
          />
        ))}

        <IconButton onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas - 1))} disabled={paginaActual === totalPaginas - 1}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
