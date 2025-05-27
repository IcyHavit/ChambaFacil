// src/pages/PublicarServicio.jsx
import React, { useState } from 'react';
import {
  Box, Button, Container, Paper, TextField, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import DisponibilidadDia from '../components/PublicarServicio/DisponibilidadDia';
import Categoria_Precio from '../components/PublicarServicio/Categoria_Precio';
import SubidaImagenes from '../components/PublicarServicio/SubidaImagenes';

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
          <Typography variant="h4" sx={{ ...theme.typography.bodyLarge, fontWeight: 'bold', color: theme.palette.primary.main, mb: 3 }}>
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
          <Categoria_Precio
            categoria={categoria}
            setCategoria={setCategoria}
            tipoPrecio={tipoPrecio}
            setTipoPrecio={setTipoPrecio}
          />

          {/* Disponibilidad */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Disponibilidad
            </Typography>

            {diasSemana.map((dia) => (
              <DisponibilidadDia
                key={dia}
                dia={dia}
                checked={!!diasDisponibles[dia]}
                desde={diasDisponibles[dia]?.desde || ''}
                hasta={diasDisponibles[dia]?.hasta || ''}
                onCheck={() => handleCheckboxChange(dia)}
                onHorarioChange={(campo, valor) => handleHorarioChange(dia, campo, valor)}
              />
            ))}
          </Paper>

          {/* Imágenes */}
          <SubidaImagenes handleImagenes={handleImagenes} />

          {/* Botón Final */}
          <Box textAlign="center">
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.secondary.dark,
                color: theme.palette.tertiary.main,
                fontWeight: 'bold',
                textTransform: 'none',
                px: 5, py: 1.5,
                '&:hover': { bgcolor: theme.palette.secondary.main }
              }}
            >
              Publicar
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
