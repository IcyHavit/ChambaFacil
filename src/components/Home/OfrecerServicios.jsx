import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
//import ButtonMod from '../ButtonMod';
import Trabajador from '../../assets/images/Home/Trabajador.png';

export default function Ofrecer() {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
            mt: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 4, md: 10 },
            py: 2,
            gap: { xs: 4, md: 10 },
            bgcolor: 'rgba(76, 155, 130, 0.85)', 
            border: '2px solid #2f5d4d',        // Borde oscuro
            borderRadius: 1.5,
            flexDirection: { xs: 'column', md: 'row' },
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
        <Typography variant="h6" fontWeight={600} color ={theme.palette.background.default}>
          ¿Quieres ofrecer tus servicios?
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 } } color={theme.palette.background.default}>
          Regístrate como prestador y conecta con personas que buscan justo lo que tú sabes hacer.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/register')}
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.secondary.dark,
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: 1,
            '&:hover': {
              bgcolor: theme.palette.secondary.dark,
              color: theme.palette.background.paper,
              transition: '0.3s',
            },
          }}
        >
          Ofrecer Servicios
        </Button>
      </Box>
    </Box>
  );
}
