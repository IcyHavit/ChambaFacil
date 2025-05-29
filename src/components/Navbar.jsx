import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Chat as ChatIcon,
  Description as DescriptionIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function Navbar({ isLoggedIn = true }) {
  const theme = useTheme();
  const navigate = useNavigate();


  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.secondary.dark, boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
            {/* Logo */}
            <Typography
                variant="button"
                sx={{
                    fontWeight: 'bold',
                    fontFamily: theme.typography.bodySmall,
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
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/publicar')}>
                    <WorkIcon sx={{ fontSize: 24 }} />
                </IconButton>

            {isLoggedIn ? (
            <>
              <IconButton sx={{ color: 'white' }} onClick={() => navigate('/chat')}>
                <ChatIcon sx={{ fontSize: 24 }} />
              </IconButton>
              <IconButton sx={{ color: 'white' }} onClick={() => navigate('/solicitudes')}>
                <DescriptionIcon sx={{ fontSize: 24 }} />
              </IconButton>
              <IconButton sx={{ color: theme.palette.background.default }}>
                <AccountCircleIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </>
          ) : (
            <>
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
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
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
                onClick={() => navigate('/register')}
              >
                Únete ahora
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
