import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

/**
 * Card que muestra la información de una solicitud de trabajo
 * @param {Object} props
 * @param {Object} props.data  Objeto con { puesto, ubicacion, tipo, inicio }
 */
export default function SolicitudCard({ data }) {
  const { id_servicio, nombreServicio, ubicacion, direccion, tipo = 'Full Time', fechaSolicitud } = data;
  const formattedDate = new Date(fechaSolicitud).toLocaleString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Formato 24 horas
  });
  const ubicacionFinal = ubicacion || direccion || 'Ubicación no especificada';

  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* icono cuadrado */}
      <Box
        sx={{
          width: 48,
          height: 48,
          mr: 2,
          borderRadius: 1,
          bgcolor: 'secondary.main',
          color: 'tertiary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <WorkHistoryIcon />
      </Box>

      {/* texto */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontWeight="bold">{nombreServicio}</Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            fontSize: 14,
            color: 'text.secondary',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon fontSize="inherit" />
            {ubicacionFinal}
          </Box>
          <Divider orientation="vertical" flexItem />
          {tipo}
        </Box>

        <Typography variant="body2" color="text.secondary">
          Fecha de Solicitud:&nbsp;{formattedDate}
        </Typography>
      </Box>
    </Box>
  );
}
