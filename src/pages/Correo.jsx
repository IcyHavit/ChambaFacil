import { Box, Typography, TextField, Button, Paper, Stack, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import img from '../assets/images/contraseña/contraseña.png';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

export default function Contraseña() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
   e.preventDefault();

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }

    setError('');

    // Lógica del backend
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
            <Grid size={{xs: 12, md: 5}}>
                <Box
                component="img"
                src={img}
                alt="Registro"
                sx={{
                    width: '100%',
                    maxWidth: 260,
                    display: 'block',
                    mx: 'auto',
                }}
                />
            </Grid>

            {/* Formulario */}
            <Grid size={{xs: 12, md: 6}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                Recuperar Contraseña
                </Typography>

                 <Stack spacing={2} component="form" mt={2} onSubmit={handleSubmit}>
                  <TextField
                    label="ejemplo@gmail.com"
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