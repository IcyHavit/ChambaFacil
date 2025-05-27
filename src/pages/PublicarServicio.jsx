// Nuevo componente reorganizado y estilizado: src/pages/PublicarServicio.jsx
import React, { useState } from 'react';
import {
  Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormHelperText,
  Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../components/Navbar';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function PublicarServicio() {
  const theme = useTheme();
  const [categoria, setCategoria] = useState('');
  const [tipoPrecio, setTipoPrecio] = useState('');
  const [diasDisponibles, setDiasDisponibles] = useState({});
  const [imagenes, setImagenes] = useState([]);

  const handleCheckboxChange = (dia) => {
    setDiasDisponibles((prev) => ({
      ...prev,
      [dia]: prev[dia] ? undefined : { desde: '', hasta: '' }
    }));
  };

  const handleHorarioChange = (dia, campo, valor) => {
    setDiasDisponibles((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [campo]: valor }
    }));
  };

  const handleImagenes = (e) => {
    setImagenes([...e.target.files]);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: theme.palette.background.default }}>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            Publicar tu Servicio
          </Typography>

          {/* Título */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <TextField
              label="Título del servicio"
              placeholder="Reparación de celulares"
              fullWidth
              required
            />
          </Paper>

          {/* Descripción */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <TextField
              label="Descripción"
              placeholder="Describe tu servicio, tiempos de entrega, condiciones, etc."
              fullWidth
              multiline
              minRows={4}
              required
            />
          </Paper>

          {/* Categoría + Precio */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 3 }}>
                <FormControl fullWidth required>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    label="Categoría"
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

          {/* Disponibilidad */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Disponibilidad
            </Typography>

            {diasSemana.map((dia) => (
              <Box key={dia} sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!diasDisponibles[dia]}
                      onChange={() => handleCheckboxChange(dia)}
                    />
                  }
                  label={dia}
                />
                {diasDisponibles[dia] && (
                  <Box sx={{ pl: 4, mt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                      label="Desde"
                      type="time"
                      value={diasDisponibles[dia].desde}
                      onChange={(e) => handleHorarioChange(dia, 'desde', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Hasta"
                      type="time"
                      value={diasDisponibles[dia].hasta}
                      onChange={(e) => handleHorarioChange(dia, 'hasta', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Paper>

          {/* Imágenes */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Imágenes
            </Typography>
            <Button variant="outlined" component="label">
              Subir imágenes
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImagenes}
              />
            </Button>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Puedes subir varias imágenes como evidencia de tu servicio.
            </Typography>
          </Paper>

          {/* Botón Final */}
          <Box textAlign="center">
            <Button variant="contained" bgcolor= {theme.palette.secondary.dark}  sx={{ fontWeight: 'bold' }}>
                Publicar
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
