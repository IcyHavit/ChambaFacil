import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Navbar() {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.secondary.dark, boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
            {/* Logo / Título */}
            <Typography
                variant="button"
                sx={{
                    fontWeight: 'bold',
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.secondary.dark,
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                }}
                >
                ChambaFácil
            </Typography>
            {/* Íconos + Botones */}
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <IconButton sx={{ color: 'white' }}>
                    <HomeIcon sx={{ fontSize: 24 }} />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                    <WorkIcon sx={{ fontSize: 24 }} />
                </IconButton>

            {/* Botón Login */}
            <Button
                variant="outlined"
                sx={{
                color: 'white',
                borderColor: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                    borderColor: 'white',
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.secondary.dark,
                },
                }}
            >
                Login
            </Button>

            {/* Botón Únete ahora */}
            <Button
                variant="contained"
                sx={{
                bgcolor: theme.palette.primary.main,
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                },
                }}
            >
                Únete ahora
            </Button>
            </Box>
        </Toolbar>
        </AppBar>
  );
}
