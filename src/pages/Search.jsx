import React, { useState } from 'react';
import { Box, IconButton, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import FilterAltIcon from '@mui/icons-material/Tune';
import SearchBar from '../components/SearchBar';
import FilterDrawer from '../components/Search/FilterDrawer'; // Importar el nuevo componente
import CardWork from '../components/Search/CardWork';
import Typography from '@mui/material/Typography';
import img from '../assets/images/Home/HERO_FINAL.png'


export default function Search() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);


  //arreglo para los trabajos
  const trabajos = [
    {
      titulo: 'Desarrollador Frontend',
      prestamista: 'Juan Pérez',
      imagen: img,
      categoria: 'Tecnología',
      alcaldia: 'Cuauhtémoc',
      descripcion: 'Buscamos un desarrollador frontend con experiencia en React y JavaScript. LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI.',
      fecha: '2023-10-01',
    },
    {
      titulo: 'Diseñador Gráfico',
      prestamista: 'María López',

      categoria: 'Diseño',
      alcaldia: 'Benito Juárez',
      descripcion: 'Se requiere diseñador gráfico con habilidades en Adobe Photoshop e Illustrator.',
      fecha: '2023-10-02',
    },
    {
      titulo: 'Gerente de Proyectos',
      prestamista: 'Carlos García',
      categoria: 'Gestión',
      alcaldia: 'Iztapalapa',
      descripcion: 'Gerente de proyectos con experiencia en metodologías ágiles y gestión de equipos.',
      fecha: '2023-10-03',
    },
    {
      titulo: 'Analista de Datos',
      prestamista: 'Ana Martínez',
      categoria: 'Análisis',
      alcaldia: 'Coyoacán',
      descripcion: 'Buscamos un analista de datos con experiencia en SQL y herramientas de visualización.',
      fecha: '2023-10-04',
    },
    {
      titulo: 'Especialista en Marketing Digital',
      prestamista: 'Luis Hernández',
      categoria: 'Marketing',
      alcaldia: 'Gustavo A. Madero',
      descripcion: 'Especialista en marketing digital con experiencia en SEO y campañas de publicidad online.',
      fecha: '2023-10-05',
    },
    // Agrega más trabajos según sea necesario
  ];

  const handleBuscar = (trabajo, alcaldia) => {
    // Aquí puedes manejar la lógica de búsqueda con los valores de trabajo y alcaldía
    console.log('Buscar:', trabajo, 'en', alcaldia);

  };

  const handleApplyFilters = (filters) => {
    // Aquí puedes manejar la lógica de aplicación de filtros
    console.log('Filtros aplicados:', filters);
  }



  const handleFilter = (newOpen) => setOpen(newOpen);



  return (
    <>
      {/* Contenedor principal */}
      <Box
        sx={{
          width: '100%',
          height: '16rem',
          backgroundColor: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 0.5rem',
          position: 'relative',
        }}
      >
        {/* Barra de búsqueda */}
        <SearchBar handleBuscar={handleBuscar} />

        {/* Botón para abrir el drawer de filtros */}
        <IconButton color="secondary" onClick={() => handleFilter(true)}>
          <FilterAltIcon sx={{ fontSize: '2rem', color: theme.palette.tertiary.main }} />
        </IconButton>

        {/* Drawer de filtros */}
        <FilterDrawer
          open={open}
          onClose={() => handleFilter(false)}
          selectedApplyFilters={handleApplyFilters}
        />
      </Box>

      {/* Contenedor de trabajos */}
      <Grid container spacing={2} sx={{ width: '100%', margin: '0 auto', padding: '1rem' }}>
        {/* Sidebar */}
        <Grid size={{ xs: 0, md: 3.5 }}>
          <Box
            sx={{
              padding: '1rem',
              backgroundColor: theme.palette.tertiary.main,
              borderRadius: '8px',
              boxShadow: '0px 1px 4px rgba(0, 0, 0, .5)',
              height: 600,
              display: { xs: 'none', md: 'block' }, // Ocultar en móviles
              width: '100%',
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={img}
                    alt={img}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>Hernesto Zedillo Perez</Typography>
              </Box>
            </Typography>
            <Typography variant='h4' sx={{ color: theme.palette.primary.main, fontWeight: 'bold', marginTop: '1rem' }}>
              TITULO
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Alcaldía:</Typography> Cuauhtémoc
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Categoría:</Typography> Tecnología
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Subcategoría:</Typography> Desarrollo Web
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Incluye materiales:</Typography> Sí
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Garantía:</Typography> 15 días
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Dirección de referencia:</Typography> Av. Paseo de la Reforma 123, Col. Juárez, CDMX
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Descripción:</Typography> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Modalidad de trabajo:</Typography>
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Costo:</Typography> $5000
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Disponibilidad:</Typography> Lunes a Viernes, 9:00 AM - 5:00 PM
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Evidencias:</Typography>
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.secondary.main, marginTop: '0.5rem' }}>
              <Typography component="span" sx={{ fontWeight: 'bold' }}>Fecha de publicación:</Typography> 2023-10-01
            </Typography>

          </Box>
        </Grid>

        {/* El contenedor de cards ocupará todo el espacio en móviles */}
        <Grid size={{ xs: 12, md: 8.5 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center', // Centra las cartas horizontalmente
              alignItems: 'center', // Centra las cartas verticalmente
              padding: '1rem',
              gap: '1rem',
              maxWidth: '100%', // Asegura que el contenedor no exceda el ancho disponible
            }}
          >
            {trabajos.map((trabajo, index) => (
              <CardWork
                key={index}
                titulo={trabajo.titulo}
                nombre={trabajo.prestamista}
                imagen={trabajo.imagen}
                categoria={trabajo.categoria}
                alcaldia={trabajo.alcaldia}
                descripcion={trabajo.descripcion}
                fecha={trabajo.fecha}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

    </>
  );
}
