import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HouseIcon from '@mui/icons-material/House';
import { useTheme } from '@mui/material/styles';
import CardWork from '../Search/CardWork';
import { searchServices } from '../../api/service'; // <- Asegúrate de que el path es correcto
import { useNavigate } from 'react-router-dom';

const CATEGORY_LIST = [
  { id: 'plomeria', label: 'Plomería', icon: <PlumbingIcon /> },
  { id: 'electricidad', label: 'Electricidad', icon: <ElectricalServicesIcon /> },
  { id: 'hogar', label: 'Limpieza y cuidados', icon: <HouseIcon /> },
];

export default function Trabajos() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeCat, setActiveCat] = useState('hogar'); // categoría activa
  const [jobs, setJobs] = useState([]);

  // Mapeo de categorías reales a sus ids locales
  const categoriaMap = {
    plomeria: ['Plomería'],
    electricidad: ['Electricidad', 'Electricista'],
    hogar: ['Limpieza', 'Cuidado de niños', 'Cuidado de mascotas', 'Cuidado de adultos mayores'],
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const servicios = await searchServices('', '');

        const transformados = servicios.map(s => ({
          id: s.id,
          title: s.titulo,
          category: s.categoria || 'Sin categoría',
          location: s.zona ? JSON.parse(s.zona)[0] : '',
          description: s.descripcion,
          postedAgo: new Date(s.createdAt).toLocaleDateString(),
          nombrePrestamista: s.prestamistaData?.nombre || 'Desconocido',
          imagen: JSON.parse(s.imagenes)[0] || null,
        }));

        setJobs(transformados);
      } catch (error) {
        console.error('Error al obtener servicios:', error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    categoriaMap[activeCat]?.some(cat =>
      job.category?.toLowerCase().includes(cat.toLowerCase())
    )
  );

  return (
    <Box sx={{ pt: 0.5, pb: 6 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700}>
          Trabajos nuevos todos los días, soluciones al instante.
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mt: 1 }}>
          Estas son las oportunidades que se han publicado hoy. Encuentra personas listas para ayudarte y soluciona lo que necesitas de forma rápida y confiable.
        </Typography>
      </Box>

      {/* Filtros */}
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4, flexWrap: 'wrap' }}>
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
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <Grid item xs={12} sm={10} md={6} lg={3} key={job.id}>
              <CardWork
                titulo={job.title}
                nombre={job.nombrePrestamista}
                imagen={job.imagen}
                categoria={job.category}
                alcaldia={job.location}
                descripcion={job.description}
                fecha={job.postedAgo}
                onClick={() => navigate(`/search?trabajo=${encodeURIComponent(job.title)}`)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            No hay trabajos disponibles para esta categoría.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
