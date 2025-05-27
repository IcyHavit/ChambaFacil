// src/components/PublicarServicio/Categoria_Precio.jsx
import React from 'react';
import {
  Grid, Paper, FormControl, InputLabel, Select,
  MenuItem, TextField, FormHelperText
} from '@mui/material';

export default function Categoria_Precio({
  categoria, setCategoria,
  tipoPrecio, setTipoPrecio
}) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={7}>
        <Paper sx={{ p: 3 }}>
          <FormControl fullWidth required>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              label="Categoría*"
            >
              <MenuItem value="Electricista">Electricista</MenuItem>
              <MenuItem value="Plomero">Plomero</MenuItem>
              <MenuItem value="Carpintero">Carpintero</MenuItem>
              <MenuItem value="Electrodomésticos">Reparación de electrodomésticos</MenuItem>
              <MenuItem value="Tecnología">Tecnología</MenuItem>
              <MenuItem value="Otros">Otros</MenuItem>
            </Select>
            <FormHelperText>Selecciona una categoría</FormHelperText>
          </FormControl>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 3 }}>
          <TextField
            label="Precio"
            placeholder="Ej. 500"
            fullWidth
            required
            type="number"
            InputProps={{ startAdornment: <span style={{ marginRight: 8 }}>$</span> }}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth required>
            <InputLabel>Tipo de precio</InputLabel>
            <Select
              value={tipoPrecio}
              onChange={(e) => setTipoPrecio(e.target.value)}
              label="Tipo de precio"
            >
              <MenuItem value="Por servicio">Por servicio</MenuItem>
              <MenuItem value="Por hora">Por hora</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}
