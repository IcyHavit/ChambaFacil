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
import CardWork from '../Search/CardWork';


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
    location: 'Condesa',
    type: 'Full time',
    postedAgo: 'Hoy',
    description:
      'Soy una niñera con experiencia en el cuidado de bebés y niños pequeños. Ofrezco atención personalizada, actividades didácticas y apoyo básico en casa. Comprometida, responsable y con referencias disponibles....',
  },  {
    id: 1,
    category: 'Hogar',
    categoryLabel: 'Niñera',
    title: 'Niñera de tiempo completo',
    location: 'Condesa',
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
    location: 'Gustavo A. Madero',
    type: 'Medio tiempo',
    postedAgo: 'Hace 1 día',
    description:
      'Electricista con experiencia en instalaciones, reparaciones, mantenimiento de contactos, apagadores, luminarias y más. Trabajo limpio, seguro y con atención a los detalles. Ideal para casas, departamentos y negocios....',
  },
  {
    id: 3,
    category: 'plomeria',
    categoryLabel: 'Plomería',
    title: 'Plomero fines de semana',
    location: 'Coyoacán',
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
    location: 'Benito Juárez',
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
    location: 'Iztapalapa',
    type: 'Medio tiempo',
    postedAgo: 'Hace 2 días',
    description:
      'Ofrezco servicios de jardinería como corte de pasto, poda de arbustos, plantado de flores, limpieza de áreas verdes y mantenimiento general. Trabajo con responsabilidad y atención al detalle para que tu jardín luzca siempre bien cuidado......',
  },
];


export default function Trabajos() {
  const theme = useTheme();
  const [activeCat, setActiveCat] = useState('Hogar');          // categoría activa


  const filteredJobs =
    activeCat === 'all'
      ? JOBS
      : JOBS.filter(
          j =>
            j.category === activeCat ||
            j.categoryLabel.toLowerCase().includes(activeCat)
        );


  return (
    <Box sx={{ pt: 0.5, pb: 6 }}>
      <Box sx={{textAlign: 'center', }}>
      {/* Encabezado */}
      <Typography variant="h4" fontWeight={700}>
        Trabajos nuevos todos los días, soluciones al instante.
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mt: 1 }}>
        Estas son las oportunidades que se han publicado hoy.
        Encuentra personas listas para ayudarte y soluciona lo que necesitas de forma rápida y confiable.
      </Typography>
      </Box>

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
            <Grid item xs={12} sm={10} md={6} lg={3} key={job.id}>
              <CardWork
                titulo={job.title}
                nombre={job.categoryLabel}
                imagen={null} // Puedes reemplazar null por una URL de imagen si tienes una
                categoria={job.categoryLabel}
                alcaldia={job.location}
                descripcion={job.description}
                fecha={job.postedAgo}
                onClick={() => {}}
              />
            </Grid>
          ))}
        </Grid>
    </Box>
  );
}

