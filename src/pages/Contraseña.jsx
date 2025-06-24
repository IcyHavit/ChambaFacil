import { Box, Typography, TextField, Button, Paper, Stack, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import img from '../assets/images/contraseña/contraseña.png';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

export default function Contraseña() {
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar formato de contraseña
    if (!password.match(regex)) {
      setError('La contraseña debe tener entre 8 y 15 caracteres, incluyendo mayúsculas, minúsculas, un número y un símbolo.');
      return;
    }
    // Validar coincidencia
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setError('');

    alert('Tu contraseña ha sido actualizada exitosamente.');
  };

  return (
    <Box
      sx={{
        minHeight: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        p: 4,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 800,
          textAlign: 'center',
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid size={{xs: 10, md: 3}}>
            <Box
              component="img"
              src={img}
              alt="Recuperar contraseña"
              sx={{
                width: '100%',
                maxWidth: 200,
                display: 'block',
                mx: 'auto',
              }}
            />
          </Grid>
          <Grid size={{xs: 12, md: 9}}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Crea tu nueva contraseña
            </Typography>
            <Typography variant="body1" mb={2}>
              Ingresa y confirma tu nueva contraseña
            </Typography>
            <Stack
              component="form"
              spacing={2}
              onSubmit={handleSubmit}
            >
              <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                fullWidth
              />
              <TextField
                label="Confirmar contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!error}
                helperText={error}
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Actualizar contraseña
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}


