import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Paper, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export default function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            ...theme.typography.bodyLarge,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Bienvenido a ChambaFacil
        </Typography>
        <Typography
          sx={{
            ...theme.typography.bodySmall,
            color: theme.palette.secondary.main,
            mb: 3,
            fontWeight: 'bold',
          }}
        >
          Tu plataforma para encontrar y ofrecer servicios fácilmente xd.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/login"
          sx={{
            borderRadius: theme.shape.borderRadius,
            px: theme.spacing(4),
            py: theme.spacing(1.5),
            ...theme.typography.bodySmall,
            color: theme.palette.tertiary.main,
            bgcolor: theme.palette.primary.main,
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: theme.palette.secondary.main,
            },
          }}
        >
          Iniciar Sesión
        </Button>

      </Paper>
    </Box>
  );
}
