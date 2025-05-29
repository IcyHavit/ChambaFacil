import React from 'react';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar';

export default function Search() {
  const theme = useTheme();

  const handleBuscar = () => {
    console.log('Buscar trabajos');
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '14rem',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SearchBar handleBuscar={handleBuscar} />
    </Box>
  );
}
