import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Drawer,
  List, ListItem, ListItemIcon, ListItemText, Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Work as WorkIcon,
  Chat as ChatIcon,
  Description as DescriptionIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ isLoggedIn = true }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.paper, boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="button"
            onClick={() => navigate('/')}
            sx={{ ...theme.typography.bodySmall, fontWeight: 'bold', cursor: 'pointer', color: theme.palette.secondary.dark }}
          >
            CHAMBAFÁCIL
          </Typography>

          {/* El normal de desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, alignItems: 'center' }}>
            <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/search')}>
              <WorkIcon />
            </IconButton>

            {isLoggedIn ? (
              <>
                <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/chat')}>
                  <ChatIcon />
                </IconButton>
                <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/solicitudes')}>
                  <DescriptionIcon />
                </IconButton>
                <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/perfil')}>
                  <AccountCircleIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  onClick={() => navigate('/register')}
                >
                  Únete ahora
                </Button>
              </>
            )}
          </Box>

          {/* Esta parte es para lo del menú hamburguesa */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton sx={{ color: theme.palette.secondary.dark }}  onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: 220, p: 2 }} role="presentation" onClick={handleClose}>
          <List>
            <ListItem button onClick={() => navigate('/search')}>
              <ListItemIcon sx={{ color: theme.palette.secondary.dark }} ><WorkIcon /></ListItemIcon>
              <ListItemText primary="Buscar" />
            </ListItem>

            {isLoggedIn ? (
              <>
                <ListItem button onClick={() => navigate('/chat')}>
                  <ListItemIcon sx={{ color: theme.palette.secondary.dark }} ><ChatIcon /></ListItemIcon>
                  <ListItemText primary="Chat" />
                </ListItem>
                <ListItem button onClick={() => navigate('/solicitudes')}>
                  <ListItemIcon sx={{ color: theme.palette.secondary.dark }} ><DescriptionIcon /></ListItemIcon>
                  <ListItemText primary="Solicitudes" />
                </ListItem>
                <ListItem button onClick={() => navigate('/perfil')}>
                  <ListItemIcon sx={{ color: theme.palette.secondary.dark }} ><AccountCircleIcon /></ListItemIcon>
                  <ListItemText primary="Perfil" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button onClick={() => navigate('/login')}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button onClick={() => navigate('/register')}>
                  <ListItemText primary="Únete ahora" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
