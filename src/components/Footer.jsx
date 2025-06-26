import { Box, Typography, IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Facebook, X as Twitter, Instagram } from '@mui/icons-material';
import { Home, Email, Phone } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.secondary.light,
        color: theme.palette.background.paper,
        py: 0.5
      }}
    >
      <Box sx={{ px: { xs: 1, md: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          {/* Enlaces */}
          <Stack direction="row" spacing={2}>
            <Typography
              variant="caption"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Términos y Condiciones
            </Typography>
            <Typography
              variant="caption"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              Sobre nosotros
            </Typography>
          </Stack>

          {/* Contacto */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Home fontSize="small" />
            <Typography variant="caption">CDMX, México</Typography>
            <Email fontSize="small" />
            <Typography variant="caption">contacto@ChambaFácil.com</Typography>
            <Phone fontSize="small" />
            <Typography variant="caption">+52 55 5555 5555</Typography>
          </Stack>

          {/* Redes sociales */}
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => navigate('/')} sx={{ color: '#fff', p: 0.5 }}>
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton onClick={() => navigate('/')} sx={{ color: '#fff', p: 0.5 }}>
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton onClick={() => navigate('/')} sx={{ color: '#fff', p: 0.5 }}>
              <Instagram fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.background.paper}`,
          mt: 1,
          pt: 0.5,
          textAlign: 'center'
        }}
      >
        <Typography variant="caption">
          © {new Date().getFullYear()} ChambaFácil
        </Typography>
      </Box>
    </Box>
  );
}




