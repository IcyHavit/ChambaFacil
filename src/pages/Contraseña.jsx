import { Box, Typography, TextField, Button, Paper, Stack, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import img from '../assets/images/contraseña/contraseña.png';

export default function Contraseña() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple de correo
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }

    setError('');
    // Aquí puedes enviar el correo al backend para recuperación
    alert('Se ha enviado un correo para recuperar tu contraseña');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 900,
          textAlign: 'center',
        }}
      >
        <Grid container spacing={10} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={img}
              alt="Recuperar contraseña"
              sx={{
                width: '100%',
                maxWidth: 260,
                display: 'block',
                mx: 'auto',
              }}
            />
          </Grid>
          {/**holaaaa */}

          {/* Formulario */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Recuperar Contraseña
            </Typography>
            <Typography variant="body1" mb={2}>
              Por favor ingresa tu correo para recuperar tu contraseña
            </Typography>
            <Stack spacing={2} component="form" mt={2} onSubmit={handleSubmit}>
              <TextField
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Enviar correo de recuperación
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}


