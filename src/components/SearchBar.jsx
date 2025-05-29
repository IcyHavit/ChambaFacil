import React, { useState } from 'react';
import { Autocomplete, TextField, Stack, InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import ButtonMod from './ButtonMod';
import { useTheme } from '@emotion/react';


const trabajos = [
  { label: 'Desarrollador Frontend' },
  { label: 'Diseñador Gráfico' },
  { label: 'Gerente de Proyectos' },
  { label: 'Analista de Datos' },
  { label: 'Especialista en Marketing Digital' },
];

const Alcaldías = [
  { label: 'Gustavo A. Madero' },
  { label: 'Iztapalapa' },
  { label: 'Coyoacán' },
  { label: 'Cuauhtémoc' },
  { label: 'Benito Juárez' },
];

const SearchBar = ({ handleBuscar }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{ bgcolor: 'tertiary.main', p: 2, borderRadius: theme.shape.borderRadius}}
    >
      <Autocomplete
        options={trabajos}
        getOptionLabel={(o) => o.label}
        freeSolo
        open={open}
        onOpen={() => {
          if (inputValue.length > 0) setOpen(true);
        }}
        onClose={() => setOpen(false)}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
          setOpen(newInputValue.length > 0);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Trabajo a buscar"
            variant="standard"
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        sx={{ width: 300 }}
      />

      <Autocomplete
        disablePortal
        options={Alcaldías}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecciona una alcaldía"
            variant="standard"
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        sx={{ width: 300 }}
      />

      <ButtonMod
        variant="secondary"
        textCont="Buscar"
        width="auto"
        height="2.4rem"
        clickEvent={handleBuscar}
        startIcon={<SearchIcon />}
      />
    </Stack>
  );
};

export default SearchBar;
