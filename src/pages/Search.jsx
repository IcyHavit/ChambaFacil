import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@emotion/react';
import FilterAltIcon from '@mui/icons-material/Tune';
import SearchBar from '../components/SearchBar';
import FilterDrawer from '../components/Search/FilterDrawer'; // Importar el nuevo componente

export default function Search() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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
    <Box
      sx={{
        width: '100%',
        height: '16rem',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
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
  );
}
