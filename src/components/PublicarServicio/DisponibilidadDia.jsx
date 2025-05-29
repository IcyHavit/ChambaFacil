// src/components/PublicarServicio/DisponibilidadDia.jsx
import React from 'react';
import { Box, TextField, FormControlLabel, Checkbox, useTheme } from '@mui/material';

export default function DisponibilidadDia({ dia, checked, desde, hasta, onCheck, onHorarioChange }) {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onCheck} />}
        label={dia}
        sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
      />

      {checked && (
        <Box sx={{ pl: 4, mt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Desde"
            type="time"
            value={desde}
            onChange={(e) => onHorarioChange('desde', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hasta"
            type="time"
            value={hasta}
            onChange={(e) => onHorarioChange('hasta', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      )}
    </Box>
  );
}
