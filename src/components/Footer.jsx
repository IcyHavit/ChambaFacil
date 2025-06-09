import React, { useState } from 'react';
import { Box, Grid, Typography, IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTheme } from '@mui/material/styles';

export default function Footer({ }) {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box component="footer" sx={{ bgcolor: theme.palette.secondary.light, color: theme.palette.background.paper, pt: 1, pb: 1 }}>
      <Box sx={{ px: { xs: 1, md: 6 }}}>
        <Grid container spacing={15}>

          <Grid size={{xs: 12, md: 4}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              ChambaFácil
            </Typography>
            <Typography variant="body2">
              Descubre y organiza tus experiencias en la Ciudad de México <br />
              desde lugares icónicos hasta rincones menos conocidos.
            </Typography>
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Más de nosotros
            </Typography>
            <Stack spacing={1}>

              <Box onClick={() => navigate('/login')} sx={{ cursor: 'pointer', color: '#fff' }}>
                Términos y Condiciones
              </Box>
              <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer', color: '#fff' }}>
                Sobre nosotros
              </Box>
            </Stack>
          </Grid>

          {/* Contacto */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contacto
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <HomeIcon fontSize="small" /> <Typography variant="body2">Ciudad de México, México</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon fontSize="small" /> <Typography variant="body2">contacto@ChambaFácil.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon fontSize="small" /> <Typography variant="body2">+52 55 5555 5555</Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Redes sociales */}
          <Grid size = {{ xs: 12, md: 3}} >
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <IconButton onClick={() => navigate('/')} sx={{ color: '#fff' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton onClick={() => navigate('/')} sx={{ color: '#fff' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton onClick={() => navigate('/')} sx={{ color: '#fff' }}>
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box mt={5} textAlign="center" sx={{ borderTop: '1px solid #fff', pt: 1 }}>
        <Typography variant="body2">©️ {new Date().getFullYear()} ChambaFácil</Typography>
      </Box>
    </Box>
  );
}




