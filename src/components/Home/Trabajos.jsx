import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HouseIcon from '@mui/icons-material/House';
import HandymanIcon from '@mui/icons-material/Handyman';
import PetsIcon from '@mui/icons-material/Pets';
import { useTheme } from '@mui/material/styles';


const CATEGORY_LIST = [
  { id: 'plomero',    label: 'Plomero',       icon: <PlumbingIcon /> },
  { id: 'ama',        label: 'Ama de casa',   icon: <HouseIcon   /> },
  { id: 'carpinteria',label: 'Carpintería',   icon: <HandymanIcon/> },
];

const JOBS = [
  {
    id: 1,
    category: 'ama',
    categoryLabel: 'Ama de casa',
    title: 'Niñera de tiempo completo',
    location: 'Condesa, CDMX',
    type: 'Full time',
    postedAgo: 'Hace 2 días',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua...',
  },
  {
    id: 2,
    category: 'paseador',
    categoryLabel: 'Paseador de perros',
    title: 'Paseador de perros',
    location: 'Condesa, CDMX',
    type: 'Part time',
    postedAgo: 'Hace 1 día',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua...',
    icon: <PetsIcon />,            // icono específico distinto a la lista
  },
  {
    id: 3,
    category: 'carpinteria',
    categoryLabel: 'Carpintería',
    title: 'Carpintero fines de semana',
    location: 'Condesa, CDMX',
    type: 'Full time',
    postedAgo: 'Hace 2 días',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua...',
  },
];


export default function Trabajos() {
  const theme = useTheme();
  const [activeCat, setActiveCat] = useState('ama');          // categoría activa

  
  const filteredJobs =
    activeCat === 'all'
      ? JOBS
      : JOBS.filter(
          j =>
            j.category === activeCat ||
            j.categoryLabel.toLowerCase().includes(activeCat)
        );

  
  return (
    <Box sx={{ pt: 1, pb: 6, textAlign: 'center' }}>
      {/* Encabezado */}
      <Typography variant="h4" fontWeight={700}>
        Trabajos del día
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mt: 1 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, dunt ut labore
        et dolore magna aliqua.
      </Typography>

      {/* Filtros de categoría */}
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 4, flexWrap: 'wrap' }}
      >
        {CATEGORY_LIST.map(cat => (
          <Button
            key={cat.id}
            variant={activeCat === cat.id ? 'contained' : 'outlined'}
            startIcon={cat.icon}
            onClick={() => setActiveCat(cat.id)}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              ...(activeCat === cat.id
                ? {
                    bgcolor: theme.palette.primary.main,
                    '&:hover': { bgcolor: theme.palette.primary.dark },
                  }
                : {}),
            }}
          >
            {cat.label}
          </Button>
        ))}
      </Stack>

      {/* Tarjetas */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          {filteredJobs.map(job => (
            <Grid item xs={12} sm={10} md={6} lg={4} key={job.id}>
              <Card
                elevation={3}
                sx={{
                  maxWidth: 360,
                  mx: 'auto',
                  bgcolor: 'common.white',      // ← cambia aquí el color de fondo
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Badge de categoría */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    icon={
                      job.icon ??
                      CATEGORY_LIST.find(c => c.id === job.category)?.icon
                    }
                    label={job.categoryLabel}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.primary.light,
                      color: 'common.white',
                      mb: 2,
                      fontWeight: 600,
                    }}
                  />

                  {/* Título */}
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {job.title}
                  </Typography>

                  {/* Ubicación + tipo */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={1}
                  >
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2">{job.location}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ ml: 'auto', fontWeight: 500 }}
                    >
                      {job.type}
                    </Typography>
                  </Stack>

                  {/* Descripción */}
                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>
                </CardContent>

                {/* Pie de la tarjeta */}
                <CardActions
                  sx={{
                    px: 2,
                    pb: 2,
                    pt: 0,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="caption">{job.postedAgo}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      borderRadius: 2,
                      px: 3,
                      '&:hover': { bgcolor: theme.palette.secondary.dark },
                    }}
                  >
                    Ver más
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

