import { Box, Typography, TextField, Button, Paper, Stack, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import img from '../assets/images/contraseña/contraseña.png';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

export default function Contraseña() {
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      password: '',
      confirmPassword: '',
    };

    if (!regex.test(password)) {
      newErrors.password = 'Debe tener 8-15 caracteres, incluyendo mayúsculas, minúsculas, número y símbolo.';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);

    if (!newErrors.password && !newErrors.confirmPassword) {
      // Aquí puedes enviar la nueva contraseña al backend
      alert('Contraseña cambiada con éxito');
    }
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
                Cambiar Contraseña
                </Typography>

                 <Stack spacing={2} component="form" mt={2} onSubmit={handleSubmit}>
                  <TextField
                    label="Nueva contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                  />
                  <TextField
                    label="Confirmar contraseña"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    fullWidth
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Confirmar cambio
                  </Button>
                </Stack>
            </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}


