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
  const { puesto, ubicacion, tipo, inicio } = data;

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
        <Typography fontWeight="bold">{puesto}</Typography>

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
            {ubicacion}
          </Box>
          <Divider orientation="vertical" flexItem />
          {tipo}
        </Box>

        <Typography variant="body2" color="text.secondary">
          Inicio:&nbsp;{inicio}
        </Typography>
      </Box>

      {/* flecha */}
      <IconButton>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
