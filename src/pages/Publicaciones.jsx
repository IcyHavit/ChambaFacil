import { Box, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// Importa ButtonMod
import ButtonMod from '../components/ButtonMod';
import CardPublicacion from '../components/Publicaciones/cardPublicacion';

import { useEffect, useState } from 'react';
import { getService } from '../api/service';

export default function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id'); // o 'userId' dependiendo cómo lo guardas
    if (id) {
      getService(id)
        .then(data => setPublicaciones(data))
        .catch(error => console.error('Error al obtener publicaciones:', error));
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: '85vh',
        bgcolor: theme.palette.background.default,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
      >
        Mis Publicaciones
      </Typography>

      
        <Stack
        direction='column'
          sx={{
            width: '100%',
            padding: '1%',
            top: theme.spacing(2),
            right: theme.spacing(2),
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <ButtonMod
              variant="principal"
              textCont="Publicar servicios"
              width="auto"
              height="auto"
              clickEvent={() => navigate('/publicar')}
            />
          </Box>

          <Box
            sx={{
              width: '90vw',
              height: '75vh',
              position: 'relative', 
              bgcolor: theme.palette.background.paper,
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              mt: 2,
              overflow: 'auto',
            }}
          >
            
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            mt: 6,
          }}
        >
          {publicaciones.map((trabajo, index) => (
            <CardPublicacion
              key={index}
              titulo={trabajo.titulo}
              nombre="Tú o el nombre del prestamista"
              imagen={JSON.parse(trabajo.imagenes)[0] ?? ''}
              categoria={trabajo.categoria}
              alcaldia={JSON.parse(trabajo.zona)?.[0] ?? 'N/A'}
              descripcion={trabajo.descripcion}
              fecha={new Date(trabajo.createdAt).toLocaleDateString()}
            />
          ))}
        </Box>
        </Box>
        </Stack>
      </Box>
  );
}