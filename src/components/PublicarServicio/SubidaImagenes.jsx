// src/components/PublicarServicio/SubidaImagenes.jsx
import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

export default function SubidaImagenes({ handleImagenes }) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
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
        Puedes subir hasta 3 imágenes como evidencia de tu servicio.
      </Typography>
    </Paper>
  );
}
