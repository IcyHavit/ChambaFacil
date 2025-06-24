import { Box, Typography, TextField, Button, Paper, Stack, Grid, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';
import img from '../assets/images/Correo.png';


export default function Verificar() {
  
const theme = useTheme();

  
  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        p: 0.5,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 1,
          width: '100%',
          maxWidth: 900,
          textAlign: 'center',
        }}
      >
        <Grid container spacing={1} alignItems="center">
            <Grid size={{xs: 12, md: 5}}>
                <Box
                component="img"
                src={img}
                alt="Registro"
                sx={{
                    width: '100%',
                    maxWidth: 900,
                    display: 'block',
                    mx: 'auto',
                }}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Haz confirmado tu correo, dale click{' '}
                <Link component={RouterLink} to="/login">
                  aquí
                </Link>{' '}
                para iniciar sesión.
              </Typography>
            </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}