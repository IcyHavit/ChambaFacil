import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import {
  Work as WorkIcon,
  Chat as ChatIcon,
  Description as DescriptionIcon,
  AccountCircle as AccountCircleIcon,
  Tune,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function Navbar({ isLoggedIn = true }) {
  const theme = useTheme();
  const navigate = useNavigate();


  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.background.paper, boxShadow: 'none'}}>
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
                onClick={() => navigate('/')}
                >
                ChambaFácil
            </Typography>
            {/* Íconos + Botones */}
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/search')}>
                    <WorkIcon sx={{ fontSize: 24 }} />
                </IconButton>

            {isLoggedIn ? (
            <>
              <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/chat')}>
                <ChatIcon sx={{ fontSize: 24 }} />
              </IconButton>
              <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/solicitudes')}>
                <DescriptionIcon sx={{ fontSize: 24 }} />
              </IconButton>
              <IconButton sx={{ color: theme.palette.secondary.dark }}>
                <AccountCircleIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{
                  color: 'black',
                  borderColor: 'black',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: theme.palette.secondary.dark,
                    color: theme.palette.background.default,
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
