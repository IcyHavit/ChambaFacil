import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';

export default function NavbarLogin() {
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

            {/* Íconos de navegación + Perfil juntos */}
            <Box sx={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <IconButton sx={{ color: 'white' }}>
                <HomeIcon sx={{ fontSize: 24 }} />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
                <WorkIcon sx={{ fontSize: 24 }} />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
                <ChatIcon sx={{ fontSize: 24 }} />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
                <DescriptionIcon sx={{ fontSize: 24 }} />
            </IconButton>

            {/* Perfil (ahora dentro del mismo grupo) */}
            <IconButton sx={{ color: theme.palette.background.default }}>
                <AccountCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
  );
}
