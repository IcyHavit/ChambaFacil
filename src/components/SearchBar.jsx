import React, { useState } from 'react';
import {
  Autocomplete,
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

const trabajos = [
  { label: 'Desarrollador Frontend' },
  { label: 'Diseñador Gráfico' },
  { label: 'Gerente de Proyectos' },
  { label: 'Analista de Datos' },
  { label: 'Especialista en Marketing Digital' },
];

const alcaldias = [
  { label: 'Gustavo A. Madero' },
  { label: 'Iztapalapa' },
  { label: 'Coyoacán' },
  { label: 'Cuauhtémoc' },
  { label: 'Benito Juárez' },
];

const SearchBar = ({ handleBuscar }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);
  const [selectedAlcaldia, setSelectedAlcaldia] = useState(null);

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
        {/* Autocompletado para trabajos */}
        <Autocomplete
          options={trabajos}
          getOptionLabel={(option) => option.label || ''}
          freeSolo
          disableClearable
          open={open}
          onOpen={() => setOpen(inputValue.length > 0)}
          onClose={() => setOpen(false)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            setOpen(newInputValue.length > 0);
          }}
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setValue({ label: newValue });
            } else if (newValue && newValue.inputValue) {
              setValue({ label: newValue.inputValue });
            } else {
              setValue(newValue);
            }
          }}
          sx={{ flex: 0.7 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Trabajo a buscar"
              variant="standard"
              size="small"
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        {/* Autocompletado para alcaldías */}
        <Autocomplete
          disablePortal
          options={alcaldias}
          disableClearable
          getOptionLabel={(option) => option.label || ''}
          value={selectedAlcaldia}
          onChange={(event, newValue) => setSelectedAlcaldia(newValue)}
          sx={{ flex: 0.7 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona una alcaldía"
              variant="standard"
              size="small"
              slotProps={{
                input: {
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        {/* Botón para buscar */}
        <ButtonMod
          variant="secondary"
          textCont="Buscar"
          width="auto"
          height="2.4rem"
          clickEvent={() => handleBuscar(value?.label || '', selectedAlcaldia?.label || '')}
          startIcon={<SearchIcon />}
        />
      </Stack>
    </Box>
  );
};

export default SearchBar;
