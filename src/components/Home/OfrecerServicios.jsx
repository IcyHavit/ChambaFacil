import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
//import ButtonMod from '../ButtonMod';
import Trabajadores2 from '../../assets/images/Home/Trabajadores2.png';

export default function Ofrecer() {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
            mt: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'justify',
            px: { xs: 4, md: 19 },
            py: 2,
            gap: { xs: 4, md: 10 },
            bgcolor: 'rgba(76, 155, 130, 0.85)', 
            border: `3px solid ${theme.palette.primary.light}`, 
            flexDirection: { xs: 'column', md: 'row' },
            color: theme.palette.background.paper,
      }}
    >
      {/* Contenido */}
      <Grid 
      container alignItems="center"
      justifyContent="center"
      spacing={4}
      >
        <Grid size={{xs: 12, md: 5}}>
          <Box 
            component="img"
            display="flex" justifyContent="center"
            src={Trabajadores2} alt="Ilustración"
            sx={{
              maxWidth: '600px',
              width: '100%',
            }}
          >
          </Box>
        </Grid>

         <Grid size={{xs: 12, md: 7}}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            ¿Quieres ofrecer tus servicios?
          </Typography>
          <Typography variant="body1" mb={3}>
            Regístrate como prestador y conecta con personas que buscan justo lo que tú sabes hacer.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
