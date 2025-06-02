import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Trabajador from '../../assets/images/Home/Trabajador.png';

export default function Ofrecer() {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: theme.palette.secondary.light,
        px: 4,
        py: 3,
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
      }}
    >
      {/* Imagen */}
      <Box
        component="img"
        src={Trabajador} alt="Ilustración principal"
        sx={{
          maxWidth: '200px',
          width: '100%',
        }}
      />

      {/* Contenido */}
      <Box>
        <Typography variant="h6" fontWeight={600}>
          ¿Quieres ofrecer tus servicios?
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          Regístrate como prestador y conecta con personas que buscan justo lo que tú sabes hacer.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main,
            '&:hover': { bgcolor: theme.palette.primary.dark },
            fontWeight: 'bold',
            borderRadius: 2,
          }}
        >
          Crea una cuenta
        </Button>
      </Box>
    </Box>
  );
}
