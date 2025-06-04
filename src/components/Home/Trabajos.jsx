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
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HouseIcon from '@mui/icons-material/House';
import { useTheme } from '@mui/material/styles';


const CATEGORY_LIST = [
  { id: 'plomeria',    label: 'Plomería',       icon: <PlumbingIcon color="inherit" /> },
  { id: 'electricidad',        label: 'Electricidad',   icon: <ElectricalServicesIcon   color="inherit" /> },
  { id: 'Hogar',label: 'Limpieza y cuidados',   icon: <HouseIcon color="inherit" /> },
];

const JOBS = [
  {
    id: 1,
    category: 'Hogar',
    categoryLabel: 'Niñera',
    title: 'Niñera de tiempo completo',
    location: 'Condesa, CDMX',
    type: 'Full time',
    postedAgo: 'Hoy',
    description:
      'Soy una niñera con experiencia en el cuidado de bebés y niños pequeños. Ofrezco atención personalizada, actividades didácticas y apoyo básico en casa. Comprometida, responsable y con referencias disponibles....',
  },
  {
    id: 2,
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    title: 'Electricista',
    location: 'Gustavo A. Madero, CDMX',
    type: 'Medio tiempo',
    postedAgo: 'Hace 1 día',
    description:
      'Electricista con experiencia en instalaciones, reparaciones, mantenimiento de contactos, apagadores, luminarias y más. Trabajo limpio, seguro y con atención a los detalles. Ideal para casas, departamentos y negocios....',
    icon: <ElectricalServicesIcon />,
  },
  {
    id: 3,
    category: 'plomeria',
    categoryLabel: 'Plomería',
    title: 'Plomero fines de semana',
    location: 'Coyoacán, CDMX',
    type: 'Fines de semana',
    postedAgo: 'Hace 1 día',
    description:
      'Plomero con más de 20 años de experiencia, ...',
  },
  {
    id: 4,
    category: 'Hogar',
    categoryLabel: 'Mascotas',
    title: 'Cuidador de mascotas',
    location: 'Benito Juárez, CDMX',
    type: 'Tiempo completo',
    postedAgo: 'Hace 1 día',
    description:
      'Ofrezco servicios de cuidado para perros y gatos: paseos, alimentación, juego y compañía. Atención amorosa, responsable y con experiencia en diferentes razas. También disponible para visitas a domicilio durante ausencias.....',
  },
  {
    id: 5,
    category: 'Hogar',
    categoryLabel: 'Jardinería',
    title: 'Jardinero',
    location: 'Iztapalapa, CDMX',
    type: 'Medio tiempo',
    postedAgo: 'Hace 2 días',
    description:
      'Ofrezco servicios de jardinería como corte de pasto, poda de arbustos, plantado de flores, limpieza de áreas verdes y mantenimiento general. Trabajo con responsabilidad y atención al detalle para que tu jardín luzca siempre bien cuidado......',
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
    <Box sx={{ pt: 0.5, pb: 6, textAlign: 'center' }}>
      {/* Encabezado */}
      <Typography variant="h4" fontWeight={700}>
        Trabajos nuevos todos los días, soluciones al instante.
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mt: 1 }}>
        Estas son las oportunidades que se han publicado hoy.
        Encuentra personas listas para ayudarte y soluciona lo que necesitas de forma rápida y confiable.
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

      {/* Sección de las tarjetas */}
        <Grid container
          spacing={4}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          {filteredJobs.map(job => (
            <Grid size={{ xs: 12, sm: 10, md: 6, lg: 3 }} key={job.id}>
              <Card
                elevation={3}
                sx={{
                  maxWidth: 360,
                  mx: 'auto',
                  bgcolor: 'common.white',
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Badge de categoría */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    icon={React.cloneElement(
                    job.icon ?? CATEGORY_LIST.find(c => c.id === job.category)?.icon,
                    {
                      color: 'inherit',
                    }
                  )}
                    label={job.categoryLabel}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.background.default,
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
    </Box>
  );
}

