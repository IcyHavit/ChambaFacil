import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Drawer,
  List, ListItem, ListItemIcon, ListItemText, Button,
  Tooltip, Zoom
} from '@mui/material';
import {
  Menu as MenuIcon,
  Work as WorkIcon,
  PostAdd as PostAddIcon,
  Chat as ChatIcon,
  Description as DescriptionIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { useTheme, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));


export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setLogged] = useState(true);

  // controla la visibilidad del botón
  const showPublishButton = true;

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: theme.palette.background.paper,
          boxShadow: '0px 8px 3px rgba(0, 0, 0, 0.05)',
          zIndex: 1100
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="button"
            onClick={() => navigate('/')}
            sx={{
              ...theme.typography.bodySmall,
              fontWeight: 'bold',
              cursor: 'pointer',
              color: theme.palette.secondary.dark
            }}
          >
            CHAMBAFÁCIL
          </Typography>

          {/* Menú desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, alignItems: 'center' }}>
            <LightTooltip title="Buscar trabajos" slots={{ transition: Zoom }}>
              <IconButton
                sx={{ color: theme.palette.secondary.dark }}
                onClick={() => navigate('/search')}
              >
                <WorkIcon />
              </IconButton>
            </LightTooltip>

            {isLoggedIn ? (
              <>
            {showPublishButton && (
              <LightTooltip title="Mis publicaciones" slots={{ transition: Zoom }}>
                  <IconButton
                    sx={{ color: theme.palette.secondary.dark }}
                    onClick={() => navigate('/publicaciones')}
                  >
                    <PostAddIcon />
                  </IconButton>
                </LightTooltip>
            )}

                <LightTooltip title="Chat" slots={{ transition: Zoom }}>
                  <IconButton
                    sx={{ color: theme.palette.secondary.dark }}
                    onClick={() => navigate('/chat')}
                  >
                    <ChatIcon />
                  </IconButton>
                </LightTooltip>

                <LightTooltip 
                  title="Solicitudes" 
                  slots={{
                    transition: Zoom,
                  }}
                >
                  <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/solicitudes')}>
                    <DescriptionIcon />
                  </IconButton>
                </LightTooltip>
                
                <LightTooltip 
                  title="Mi perfil" 
                  slots={{
                    transition: Zoom,
                  }}
                >
                  <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={() => navigate('/perfil')}>
                    <AccountCircleIcon />
                  </IconButton>
                </LightTooltip>
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

          {/* Menú móvil */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton sx={{ color: theme.palette.secondary.dark }} onClick={handleOpen}>
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
              <ListItem button onClick={() => navigate('/publicaciones')}>
                {showPublishButton && (
                  <LightTooltip title="Mis publicaciones" slots={{ transition: Zoom }}>
                    <IconButton
                      sx={{ color: theme.palette.secondary.dark }}
                      onClick={() => navigate('/chat')}
                    >
                      <PostAddIcon />
                    </IconButton>
                  </LightTooltip>
            )}
            <ListItemText primary="Mis publicaciones" />
            </ListItem>
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
