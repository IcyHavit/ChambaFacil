import React, { useState, useEffect } from 'react';
import { Box, IconButton, Grid, Chip, Pagination, Stack } from '@mui/material';
import { useTheme } from '@emotion/react';
import FilterAltIcon from '@mui/icons-material/Tune';
import SearchBar from '../components/SearchBar';
import FilterDrawer from '../components/Search/FilterDrawer'; // Importar el nuevo componente
import CardWork from '../components/Search/CardWork';
import Typography from '@mui/material/Typography';
import img from '../assets/images/Home/HERO_FINAL.png'
import Sidebar from '../components/Search/Sidebar';
import { useSearchParams } from 'react-router-dom';
// import { trabajos } from '../components/Search/trabajos'; // Importar el arreglo de trabajos

import { searchServices } from '../api/service';

export default function Search() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null); // Estado para el trabajo seleccionado
  const [page, setPage] = useState(1); // Estado para la página actual
  const [trabajos, setTrabajos] = useState([]); // Estado para los trabajos, inicialmente vacío
  const trabajosPorPagina = 9; // Número máximo de trabajos por página
  const totalPaginas = Math.ceil(trabajos.length / trabajosPorPagina);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const trabajo = searchParams.get('trabajo') || '';
    const alcaldia = searchParams.get('alcaldia') || '';
    if (trabajo || alcaldia) {
      handleBuscar(trabajo, alcaldia);
    }
  }, [searchParams]);

  const handlePageChange = (event, value) => {
    setPage(value); // Actualizar la página actual
  };

  const trabajosMostrados = trabajos.slice(
    (page - 1) * trabajosPorPagina,
    page * trabajosPorPagina
  );

  const handleCardClick = (trabajo) => {
    setSelectedWork(trabajo); // Actualizar el trabajo seleccionado
    console.log('Trabajo seleccionado:', trabajo);
    console.log('Datos Prestamista Seleccionado:', trabajo.prestamistaData);
  };

  const handleBuscar = async(trabajo, alcaldia) => {
    // Aquí se maneja la lógica de búsqueda con los valores de trabajo y alcaldía
    //trabajo de backend
    console.log('Buscar:', trabajo, 'en', alcaldia);

    try {
      const servicios = await searchServices(trabajo, alcaldia);
      const transformados = servicios.map(s => ({
      titulo: s.titulo,
      prestamista: s.prestamistaData.nombre || 'Desconocido',
      imagen: JSON.parse(s.imagenes)[0],
      categoria: s.categoria || 'Sin categoría',
      alcaldia: s.zona ? JSON.parse(s.zona)[0] : '',
      descripcion: s.descripcion,
      fecha: new Date(s.createdAt).toLocaleDateString(),
      incluyeMateriales: s.materiales,
      garantia: s.garantia,
      direccionReferencia: s.direccion,
      modalidadesCobro: JSON.parse(s.modalidades),
      disponibilidad: s.disponibilidad ? JSON.parse(s.disponibilidad) : [],
      evidencias: JSON.parse(s.imagenes),
      prestamistaId: s.prestamistaId,
      calificacionPrestamista: s.prestamistaData.calificacion ? s.prestamistaData.calificacion.toFixed(1) : 0,
      fotoPrestamista: s.prestamistaData.linkFoto || '', // Agregar foto por defecto
      nombrePrestamista: s.prestamistaData.nombre || 'Desconocido',
      correoPrestamista: s.prestamistaData.correo || 'No disponible',
    }));
    setTrabajos(transformados);
    setPage(1);
    setSelectedWork(null);
    }
    catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al buscar servicio, por favor intenta nuevamente.';
      console.error('Error al buscar servicios:', errorMessage);
      console.error(error);
      setTrabajos([]); // Limpiar trabajos en caso de error
      setSelectedWork(null); // Limpiar trabajo seleccionado en caso de error
    }
  };

  const handleApplyFilters = (filters) => {

    // Aquí se maneja la lógica de aplicación de filtros

    console.log('Filtros aplicados:', filters);
  }

  const handleFilter = (newOpen) => setOpen(newOpen);



  return (
    <>
      {/* Contenedor principal */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,

        }}
      >
        <Typography
        sx={{textAlign:'center', color:theme.palette.tertiary.main, fontWeight:'bold',fontFamily:theme.typography.bodyLarge, fontSize:60,}}>
          Buscador
        </Typography>
        <Box
        sx={{
          width: '100%',
          height: '10rem',
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
        </Box>

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
          {selectedWork ? (
            <Sidebar
              theme={theme}
              titulo={selectedWork.titulo}
              img={selectedWork.fotoPrestamista}
              nombre={selectedWork.nombrePrestamista}
              calificacion={selectedWork.calificacionPrestamista}
              fechaPublicacion={selectedWork.fecha}
              alcaldia={selectedWork.alcaldia}
              categoria={selectedWork.categoria}
              incluyeMateriales={selectedWork.incluyeMateriales}
              garantia={selectedWork.garantia}
              direccionReferencia={selectedWork.direccionReferencia}
              descripcion={selectedWork.descripcion}
              modalidadesCobro={selectedWork.modalidadesCobro}
              costo={selectedWork.costo}
              disponibilidad={selectedWork.disponibilidad}
              evidencias={selectedWork.evidencias}
            />
          ) : (
            <Box
              sx={{
                padding: '1rem',
                backgroundColor: theme.palette.tertiary.main,
                borderRadius: '8px',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, .5)',
                height: 'auto',
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', 
              }}
            >
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', textAlign: 'center' }}>
                Selecciona un trabajo para ver más detalles
              </Typography>
              <img
                src={img}
                alt="Imagen de ejemplo"
                style={{ width: 300, height: 'auto', marginTop: '2rem' }}
              />
            </Box>
          )}
        </Grid>

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
            {trabajosMostrados.map((trabajo, index) => (
              <CardWork
                key={index}
                titulo={trabajo.titulo}
                nombre={trabajo.prestamista}
                imagen={trabajo.imagen}
                categoria={trabajo.categoria}
                alcaldia={trabajo.alcaldia}
                descripcion={trabajo.descripcion}
                fecha={trabajo.fecha}
                onClick={() => handleCardClick(trabajo)} // Manejar clic en la tarjeta
              />
            ))}
          </Box>
          {/* Paginación */}
          <Stack spacing={2} sx={{ marginTop: '1rem', alignItems: 'center' }}>
            <Pagination count={totalPaginas} page={page} onChange={handlePageChange} />
          </Stack>
        </Grid>
      </Grid>



    </>
  );
}
