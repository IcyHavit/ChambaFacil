import React, { useState } from 'react';
import {
  TextField,
  Stack,
  InputAdornment,
  Box,
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import ButtonMod from './ButtonMod';

const SearchBar = ({ handleBuscar }) => {
  const theme = useTheme();
  const [trabajo, setTrabajo] = useState('');
  const [alcaldia, setAlcaldia] = useState('');

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1000px',
        mt: { xs: 4, md: 0 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          bgcolor: theme.palette.tertiary.main,
          p: 2,
          borderRadius: 2,
        }}
      >
        {/* Campo de texto para trabajo */}
        <TextField
          label="Trabajo a buscar"
          variant="standard"
          size="small"
          value={trabajo}
          onChange={(e) => setTrabajo(e.target.value)}
          sx={{ flex: 0.7 }}
          slotProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Campo de texto para alcaldía */}
        <TextField
          label="Alcaldía"
          variant="standard"
          size="small"
          value={alcaldia}
          onChange={(e) => setAlcaldia(e.target.value)}
          sx={{ flex: 0.7 }}
          slotProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Botón para buscar */}
        <ButtonMod
          variant="secondary"
          textCont="Buscar"
          width="auto"
          height="2.4rem"
          clickEvent={() => handleBuscar(trabajo, alcaldia)}
          startIcon={<SearchIcon />}
        />
      </Stack>
    </Box>
  );
};

export default SearchBar;
