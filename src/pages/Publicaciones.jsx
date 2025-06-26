import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// Importa ButtonMod
import ButtonMod from '../components/ButtonMod';

export default function Publicaciones() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '85vh',
        bgcolor: theme.palette.background.default,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
      >
        Mis Publicaciones
      </Typography>

      <Box
        sx={{
          width: '90vw',
          height: '75vh',
          position: 'relative', 
          bgcolor: theme.palette.background.paper,
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          mt: 2,
          overflow: 'auto',
        }}
      >

        <Box
          sx={{
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
          }}
        >
          <ButtonMod
            variant="principal"
            textCont="Publicar servicios"
            width="auto"
            height="auto"
            clickEvent={() => navigate('/publicar')}
          />
        </Box>

        <Typography variant="body1" sx={{ mt: 6 }}>
          No tienes publicaciones aún. Haz clic en “Publicar servicios” para empezar.
        </Typography>
      </Box>
    </Box>
  );
}