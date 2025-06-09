import { Box, Typography, TextField, Button, Paper, Stack, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import img from '../assets/images/contraseña/contraseña.png';

export default function Contraseña() {
  const theme = useTheme();

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

                <Stack spacing={2} component="form" mt={2}>
                    <TextField label="Nueva contraseña" type="password" fullWidth />
                    <TextField label="Confirmar contraseña" type="password" fullWidth />
                    <Button variant="contained" color="primary">
                        Confirmar cambio
                    </Button>
                </Stack>
            </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}


